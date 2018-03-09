import './RollBoard.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import gameActions, { getNumSelectedDice, enableRollButton, canRollDice } from '../../../redux/gameState.js'
import { getSettings } from '../../../redux/settings.js'

import Dice from '../../components/Dice/Dice.js'
import DirectFeedback from '../../components/DirectFeedback/DirectFeedback.js'

class RollBoard extends Component {
  rollDice() {
    if (canRollDice(this.props.gameState))
      this.props.rollDice()
  }

  render() {
    const gs = this.props.gameState
    const settings = this.props.settings

    return (
      <div className={classnames("rollBoard", "selected" + getNumSelectedDice(gs))}>
        <div className="diceContainer">
          {gs.dice.map((d,ind) => {
            return (
              <Dice
                key={ind}
                index={ind}
                fromState={true}
              />
            )}
          )}
        </div>
        <div className="keepBar"></div>
        <span className={classnames(
            'btn',
            'rollButton',
            { 'aside': settings.luckFeedback || settings.choiceFeedback || settings.scoreFeedback }
          )} onClick={this.rollDice.bind(this)} disabled={!enableRollButton(gs)}>
          Roll dice
          <span className="hotkey rollButtonHotkey">space/enter</span>
        </span>
        <DirectFeedback />
      </div>
    )
  }
}

export default connect(
  function mapStateToProps(state) {
    return {
      gameState: state.gameState,
      settings: getSettings(state.settings),
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
      rollDice: () => dispatch(gameActions.rollDice()),
    }
  }
)(RollBoard)
