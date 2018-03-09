import './Account.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import dateformat from 'dateformat'

import userActions, { isSignedIn, isFirebaseReady } from '../../../redux/user.js'
import { roundToDigits } from '../../../logic/util.js'

import Dice from '../../components/Dice/Dice.js'
import ScorePlot from '../../components/ScorePlot/ScorePlot.js'

const hideNotificationAfter = 6000

class Account extends Component {
  
  // The following functions are about rendering stuff.
  getNotification() {
    // Check if a notification exists.
    const notification = this.props.user.notification
    if (notification) {
      // Hide the notification when necessary.
      const timeUntilHide = hideNotificationAfter - (new Date() - notification.date)
      if (timeUntilHide > 0)
        setTimeout(this.forceUpdate.bind(this), timeUntilHide)

      // Give the notification HTML.
      return <p className={classnames(
        "notification",
        notification.type,
        { "hidden": timeUntilHide <= 0 }
      )}>{notification.message}</p>
    } else {
      return <p className="notification hidden"></p>
    }
  }

  render() {
    const user = this.props.user
    if (!this.props.online)
      return this.renderNotOnlinePage()
    if (!isFirebaseReady(user))
      return this.renderNotReadyPage()
    else if (!isSignedIn(user))
      return this.renderSignInPage()
    return this.renderAccountPage()
  }
  renderNotOnlinePage() {
    return (
      <div className="page account">
        <p className="warning notOnline">You are not online at the moment. Logging in is not possible.</p>
      </div>
    )
  }
  renderNotReadyPage() {
    return (
      <div className="page account">
        {this.getNotification()}
        <div className="loadingIndicator">
          <Dice />
          <span className="loadingMessage">Accessing server...</span>
        </div>
      </div>
    )
  }
  renderSignInPage() {
    return (
      <div className="page account">
        {this.getNotification()}
        <div className="signInButtons">
          <div className="btn redirectLogin" onClick={() => this.props.signInGoogle(true)}>Google sign-in</div>
          <div className="btn redirectLogin" onClick={() => this.props.signInFacebook(true)}>Facebook sign-in</div>
          <div className="btn popupLogin" onClick={() => this.props.signInGoogle(false)}>Google sign-in</div>
          <div className="btn popupLogin" onClick={() => this.props.signInFacebook(false)}>Facebook sign-in</div>
        </div>
        <p className="signInReasons">Signing in has various benefits.</p>
        <ul className="signInReasonList">
          <li>Keep track of statistics.</li>
          <li>Share settings across devices.</li>
          <li>Predictive mode (still under development).</li>
        </ul>
      </div>
    )
  }
  renderAccountPage() {
    const user = this.props.user
    const statistics = this.props.statistics
    return (
      <div className="page account">
        {this.getNotification()}
        <div className="signedInNote">
          <div className="signedInID">
            <span className="signedInMessage">Signed in as <strong>{user.name}</strong>. &lt;{user.email}&gt;</span>
          </div>
          <div className="btn" onClick={this.props.signOut}>Sign out</div>
        </div>
        {!statistics.loaded ? 
          <p>Loading your statistics...</p>
        :
          <div>
            {this.showOverallStats()}
            {this.showScorePlot()}
            {this.showGames()}
            {this.showUnfinishedGames()}
          </div>
        }
      </div>
    )
  }
  showOverallStats() {
    const statistics = this.props.statistics
    return (
      <div id="scoreLists">
        <ul>
          <li>Games played: <strong>{statistics.gamesFinished}</strong></li>
          <li>Average score: <strong>{statistics.gamesFinished > 0 ? roundToDigits(statistics.averageScore, 1) : '-'}</strong></li>
        </ul>
        <ul>
          <li>Best: <strong>{statistics.gamesFinished > 0 ? statistics.bestScore : '-'}</strong></li>
          <li>Worst: <strong>{statistics.gamesFinished > 0 ? statistics.worstScore : '-'}</strong></li>
        </ul>
      </div>
    )
  }
  showScorePlot() {
    return <ScorePlot />
  }
  showGames() {
    const stat = this.props.statistics
    if (!stat.bounds)
      return ''
    const [min, max] = stat.bounds
    const games = stat.games.filter(game => game.score >= min && game.score < max)
    return (
      <div id="finishedGames" className="gamesToShow">
        <h2>Scores from {min} to {max-1}</h2>
        <ul>
          {games.map((game,i) => {
            return <li key={i}><strong>{game.score}</strong> on {dateformat(game.end, 'ddd, mmmm dS, yyyy, H:MM')}</li>
          })}
        </ul>
      </div>
    )
    // TODO: IMPLEMENT INSPECTING FINISHED GAMES.
  }
  showUnfinishedGames() {
    const statistics = this.props.statistics
    const numUnfinishedGames = statistics.games.length - statistics.gamesFinished
    if (numUnfinishedGames === 0)
      return ''
    return ''
    // return (
    //   <div id="unfinishedGames" className="gamesToShow">
    //     <h2>Unfinished games</h2>
    //     <p>You still have <strong>{statistics.games.length - statistics.gamesFinished}</strong> unfinished games. In a later version of this game, you'll be able to finish those too.</p>
    //   </div>
    // )
    // TODO: IMPLEMENT FINISHING UNFINISHED GAMES.
  }
}

export default connect(
  function mapStateToProps(state) {
    return {
      user: state.user,
      statistics: state.statistics,
      online: state.status.online,
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
      signInGoogle: (redirect) => dispatch(userActions.signInGoogle(redirect)),
      signInFacebook: (redirect) => dispatch(userActions.signInFacebook(redirect)),
      signOut: () => dispatch(userActions.signOut()),
    }
  }
)(Account)