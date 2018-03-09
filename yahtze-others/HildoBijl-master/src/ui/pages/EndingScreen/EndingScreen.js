import './EndingScreen.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import gameActions from '../../../redux/gameState.js'
import { getGameScore } from '../../../redux/gameState.js'

class EndingScreen extends Component {
  render() {
    return (
      <div className="page endingScreen">
        <p className="announcer">You obtained a final score of</p>
        <h3 className="finalScore">{getGameScore(this.props.gameState)}</h3>
        <div className="buttonHolder"><span className="btn resetButton" onClick={this.props.resetGame}>Play again!</span></div>
      </div>
    )
  }
}

export default connect(
  function mapStateToProps(state) {
    return {
			gameState: state.gameState,
		}
  },
  function mapDispatchToProps(dispatch) {
    return {
      resetGame: () => dispatch(gameActions.resetGame()),
    }
  }
)(EndingScreen)
