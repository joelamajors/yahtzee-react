import './ScoreCard.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import gameActions from '../../../redux/gameState.js'
import { getFieldDisplayValue, showFieldValue, isFieldTaken, canClickOnField, getNumberFieldSum, getNonNumberFieldSum, getBonus, getGameScore, showBonus } from '../../../redux/gameState.js'
import { getSettings } from '../../../redux/settings.js'
import yana from '../../../logic/yahtzeeAnalysis.js'
import { createAscendingArray } from '../../../logic/util.js'

import ScoreField from './ScoreField.js'

class ScoreCard extends Component {
  getFieldTitle(ind) {
    if (ind < yana.numSides) {
      switch(ind) {
        case 0: return "Ones"
        case 1: return "Twos"
        case 2: return "Threes"
        case 3: return "Fours"
        case 4: return "Fives"
        case 5: return "Sixes"
        default: throw new Error('Could not get the title for a field with index "' + ind + '".')
      }
    } else {
      switch(ind - yana.numSides) {
        case 0: return "Three of a kind"
        case 1: return "Four of a kind"
        case 2: return "Full house"
        case 3: return "Small straight"
        case 4: return "Large straight"
        case 5: return "Chance"
        case 6: return "Yahtzee"
        default: throw new Error('Could not get the title for a field with index "' + ind + '".')
      }
    }
  }

  getFieldHotkey(ind) {
    if (ind < yana.numSides) {
      switch(ind) {
        case 0: return "(ctrl) 1"
        case 1: return "(ctrl) 2"
        case 2: return "(ctrl) 3"
        case 3: return "(ctrl) 4"
        case 4: return "(ctrl) 5"
        case 5: return "(ctrl) 6"
        default: throw new Error('Could not get the hotkey for a field with index "' + ind + '".')
      }
    } else {
      switch(ind - yana.numSides) {
        case 0: return "t"
        case 1: return "f"
        case 2: return "h"
        case 3: return "s"
        case 4: return "l"
        case 5: return "c"
        case 6: return "y"
        default: throw new Error('Could not get the hotkey for a field with index "' + ind + '".')
      }
    }
  }

  getScoreField(fieldIndex) {
    const gs = this.props.gameState
    return (
      <ScoreField
        key={fieldIndex}
        title={this.getFieldTitle(fieldIndex)}
        hotkey={this.getFieldHotkey(fieldIndex)}
        type="field"
        value={getFieldDisplayValue(gs, fieldIndex)}
        available={!isFieldTaken(gs, fieldIndex)}
        clickable={canClickOnField(gs, fieldIndex)}
        showValue={showFieldValue(gs, fieldIndex)}
        callOnClick={canClickOnField(gs, fieldIndex) ? () => this.props.clickField(fieldIndex) : null}
      />
    )
  }

  render() {
    const gs = this.props.gameState
    return (
      <div className="scoreCard">
        <div className="columnContainer">
          <div className="column1">
            {createAscendingArray(0, yana.numSides-1).map((ind) => (
              this.getScoreField(ind)
            ))}
            <ScoreField title="Sum" type="meta" value={getNumberFieldSum(gs)} />
            <ScoreField title="Bonus" type="meta" showValue={showBonus(gs)} value={getBonus(gs)} />
          </div>
          <div className="column2">
            {createAscendingArray(yana.numSides, yana.numFields-1).map((ind) => (
              this.getScoreField(ind)
            ))}
            <ScoreField title="Sum" type="meta" value={getNonNumberFieldSum(gs)} addClass="nonDiceSum" />
          </div>
        </div>
        <ScoreField title="Total score" type="meta" addClass="totalScore" value={getGameScore(gs)} />
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
      clickField: (ind) => dispatch(gameActions.clickField(ind)),
    }
  }
)(ScoreCard)
