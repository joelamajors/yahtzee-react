import firebase from '../config/firebase.js'
import { isSignedIn } from './user.js'
import { selectField, getNumRemainingFields, getGameScore } from './gameState.js'

/*
 * First, set up the actions changing things.
 */

const actions = {
  loadStatistics: () => (
		(dispatch, getState) => {
			const user = getState().user
			if (!isSignedIn(user))
				return
      firebase.database().ref('games/' + user.uid).once('value').then((snapshot) => {
				dispatch({
					type: 'StatisticsLoaded',
					games: snapshot.val(),
          user: user,
				})
			})
		}
	),
  setStatisticsBounds: (newBounds) => ({
    type: 'SetStatisticsBounds',
    bounds: newBounds,
  })
}
export default actions

/*
 * Second, set up the reducer applying the actions to the state.
 */

export function reducer(statistics = getDefaultState(), action) {
  switch (action.type) {

    case 'StatisticsLoaded': {
			// If no user is logged in, then something is wrong. Ignore the call.
			if (!isSignedIn(action.user))
				return getDefaultState()

      // Extract the games from the database, put them in an array and calculate some important parameters.
      const gamesFromFirebase = action.games
      const games = []
      let gamesFinished = 0
      let totalScore = 0
      for (var key in gamesFromFirebase) {
        const game = gamesFromFirebase[key]
        game.key = key
        games.push(game)
        if (game.end) {
          gamesFinished++
          totalScore+= game.score
        }
      }
      return {
        ...statistics,
        games,
        gamesFinished,
        averageScore: gamesFinished === 0 ? 0 : totalScore/gamesFinished,
        bestScore: games.reduce((max,game) => game.end ? Math.max(max,game.score) : max, Number.MIN_VALUE),
        worstScore: games.reduce((min,game) => game.end ? Math.min(min,game.score) : min, Number.MAX_VALUE),
        loaded: true,
      }
    }

    // When a field is clicked, and when this finishes the game, update the game statistics.
    case 'ClickField': {
      // If the statistics haven't been loaded yet, or there isn't a user in the first place, there's not much we can do.
      if (!statistics.loaded || !isSignedIn(action.user))
        return statistics

      // Get the game state and apply the last action to it. Then check if the game is finished.
      const gameState = selectField(action.gameState, action.index)
      const gameScore = getGameScore(gameState)
      if (getNumRemainingFields(gameState) !== 0 || !gameState.canSaveGame || !gameState.historyKey)
        return statistics

      // Extract the old statistics and add this new game to it. Do check whether this game was already in the stats though.
      let { games, gamesFinished, averageScore, bestScore, worstScore } = statistics
      games = games.slice(0)
      let game = games.find(game => game.key === gameState.historyKey)
      if (!game) {
        game = { start: new Date().getTime() } // Not really correct, since the actual start date is not know. But it's a decent placeholder for something that's not important in the first place.
        games.push(game)
      }
      game.process = gameState.history
      game.end = new Date().getTime()
      game.score = gameScore

      return {
        ...statistics,
        games,
        gamesFinished: gamesFinished + 1,
        averageScore: (averageScore*gamesFinished + gameScore)/(gamesFinished + 1),
        bestScore: Math.max(bestScore, gameScore),
        worstScore: Math.min(worstScore, gameScore),
      }
    }

    case 'SetStatisticsBounds': {
      return {
        ...statistics,
        bounds: action.bounds,
      }
    }

    case 'SignOut': {
			// On a user sign-out, we erase the statistics from our state.
			return getDefaultState()
    }

    default: {
      return statistics
    }
  }
}

function getDefaultState() {
	return { loaded: false }
}

/*
 * Third, set up getter functions for various useful parameters.
 */
