import './Dice.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import gameActions, { isAFieldSelected, getDicePositionInCategory, canClickOnDice } from '../../../redux/gameState.js'
import { getSettings } from '../../../redux/settings.js'
import { createAscendingArray } from '../../../logic/util.js'
import yana from '../../../logic/yahtzeeAnalysis.js'

class Dice extends Component {
  render() {
    const gs = this.props.gameState
    const classes = {
      dice: true
    }
    let active = false

    // Is this a dice on the rollboard, whose status we should derive from the game state?
    let number
    if (this.props.fromState) {
      // We derive some important properties.
      const index = this.props.index
      number = isAFieldSelected(gs) ? -1 : gs.dice[index] // -1 means an unknown number.
      const selected = !isAFieldSelected(gs) && gs.selectedDice[index]
      const rollsLeft = isAFieldSelected(gs) ? yana.numRolls : gs.rollsLeft
      active = canClickOnDice(gs)

      classes['dice' + index] = true
      classes[number <= 0 ? 'noNumber' : ('number' + number)] = true
      classes[selected ? 'selected' : 'unselected'] = true
      classes[(selected ? 'selected' : 'unselected') + getDicePositionInCategory(gs, index)] = true
      classes['rollsLeft' + rollsLeft] = true
      classes['active'] = active
    } else {
      number = this.props.number ? this.props.number : -1
      const rollsLeft = this.props.rollsLeft ? this.props.rollsLeft : 3
      classes[number <= 0 ? 'noNumber' : ('number' + number)] = true
      classes['rollsLeft' + rollsLeft] = true
    }
    classes.small = this.props.small

    return (
      <div className={classnames(classes)} onClick={active ? () => this.props.clickDice(this.props.index) : null}>
        <div className="diceContents">
          {createAscendingArray(1, yana.numSides).map((ind) => <span key={ind} className={classnames("dot", "dot"+ind)} />)}
        </div>
        <div className="hotkey diceHotkey">{number === -1 ? '' : number}</div>
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
      clickDice: (index) => dispatch(gameActions.clickDice(index)),
    }
  }
)(Dice)
