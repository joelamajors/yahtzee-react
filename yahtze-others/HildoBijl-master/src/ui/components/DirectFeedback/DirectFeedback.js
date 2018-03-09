import './DirectFeedback.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { isGameJustStarting, getExpectedScoreOfRoll, getExpectedScoreOfChoice } from '../../../redux/gameState.js'
import { getSettings } from '../../../redux/settings.js'
import { roundToDigits, roundToSignificantDigits } from '../../../logic/util.js'

class DirectFeedback extends Component {
	render() {
		// Extract data.
    const gs = this.props.gameState
		const settings = this.props.settings

		// Check out the settings: what should we show?
    const numDirectFeedback = (settings.luckFeedback ? 1 : 0) + (settings.choiceFeedback ? 1 : 0) + (settings.scoreFeedback ? 1 : 0)
    const decisionNumber = (3 - gs.rollsLeft) + 4*gs.scores.reduce((sum,v) => sum + (v === -1 ? 0 : 1), 0)
		
		// Can we calculate stuff already?
		if (!gs.solutionAvailable)
			return <div className={classnames('directFeedback', `size${numDirectFeedback}`, 'loading')}></div>

    // Evaluate the state we're in and how lucky that is.
    const expectedRollScore = getExpectedScoreOfRoll(gs)
    const luckEffectKnown = (gs.expectedScoreBeforeRoll !== -1 && expectedRollScore !== -1)
    const luckEffect = expectedRollScore - gs.expectedScoreBeforeRoll
    const isLucky = (luckEffect >= 0)
		const luckMessage = luckEffectKnown ? 'Luck of last roll' : '[No roll was done yet]'
		const luckNumber = luckEffectKnown ? (Math.abs(luckEffect) < 0.1 ? roundToSignificantDigits(luckEffect, 1) : roundToDigits(luckEffect, 1)) : ''

    // Evaluate the choice that has been made.
    const expectedChoiceScore = getExpectedScoreOfChoice(gs)
    const choiceMade = (expectedChoiceScore !== -1) && !isGameJustStarting(gs)
    const choiceEffect = expectedChoiceScore - expectedRollScore
		const isOptimalChoice = (choiceEffect > -0.000001)
		let choiceMessage, choiceNumber
		if (choiceMade) {
			if (gs.selectedField === -1) {
				choiceMessage = isOptimalChoice ? 'Optimal dice selection' : 'Result of dice selection'
			} else {
				choiceMessage = isOptimalChoice ? 'Optimal field choice' : 'Result of field choice'
			}
		} else {
			if (gs.rollsLeft === 0) {
				choiceMessage = '[No field is chosen yet]'
			} else {
				choiceMessage = '[No dice were chosen yet]' // Should not occur.
			}
		}
		if (!choiceMade || isOptimalChoice) {
			choiceNumber = ''
		} else {
			choiceNumber = Math.abs(choiceEffect) < 0.1 ? roundToSignificantDigits(choiceEffect, 1) : roundToDigits(choiceEffect, 1)
		}

    // Calculate the expected score. If choice feedback is on, we take into account the cost of the choice. If not, we assume an optimal choice.
    const expectedScore = (settings.choiceFeedback && expectedChoiceScore !== -1 ? expectedChoiceScore : expectedRollScore)
		const scoreMessage = 'Expected score'
		const scoreNumber = roundToDigits(expectedScore, 1)

		return (
			<TransitionGroup className={classnames('directFeedback', `size${numDirectFeedback}`)}>
				<CSSTransition key={decisionNumber} timeout={2000} classNames="feedbackContainer">
					<div className="feedbackContainer">
						{settings.luckFeedback ? (
							<div className={classnames(
								'item',
								{'good': luckEffectKnown && isLucky},
								{'bad': luckEffectKnown && !isLucky},
							)}>
								<span className="description">{luckMessage}</span>
								<span className="number">{luckNumber}</span>
							</div>
						) : ''}
						{settings.choiceFeedback ? (
						<div className={classnames(
							'item',
							{'good': choiceMade && isOptimalChoice},
							{'bad': choiceMade && !isOptimalChoice},
						)}>
							<span className="description">{choiceMessage}</span>
							<span className="number">{choiceNumber}</span>
						</div>
						) : ''}
						{numDirectFeedback === 3 ? <div className="bar" /> : ''}
						{settings.scoreFeedback ? (
						<div className={classnames(
							'item',
						)}>
							<span className="description">{scoreMessage}</span>
							<span className="number">{scoreNumber}</span>
						</div>
						) : ''}
					</div>
				</CSSTransition>
			</TransitionGroup>
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
    return {}
  }
)(DirectFeedback)
