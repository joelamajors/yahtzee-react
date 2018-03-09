import React, { Component } from 'react';
import PropTypes from 'proptypes';
import classNames from 'classnames';

import { Provider, withContext } from '../HOC/Provider';

import Button from '../Atoms/Button';
import ScoreBoardRow from '../Molecules/ScoreBoardRow';

import scoreboardData from './scoreboard.data';
import './Scoreboard.css';

class Scoreboard extends Component {
  state = {
    ...scoreboardData,
    lockedScores: {},
    scoreRecorded: '',
  };

  updateScoreBoard = (name) => {
    const { scores, scoreMethods, scoreRecorded, } = this.state;
    const { rollCounter, dice, activePlayer } = this.props;
    let resetScore;

    if (rollCounter === 0) return;

    if (scoreRecorded !== '') {
      resetScore = Object.assign({}, scores[scoreRecorded], {
        [`player${activePlayer}`]: null
      });
    }

    const newScore = Object.assign({}, scores[name], { 
      [`player${activePlayer}`]: scoreMethods[name](dice) 
    });
    const newScores = (scoreRecorded !== '')
     ? Object.assign({}, scores, { [name]: newScore, [scoreRecorded]: resetScore })
     : Object.assign({}, scores, { [name]: newScore });

    this.setState({ scores: newScores, scoreRecorded: name });
  };

  handleEndTurn = () => {
    let { lockedScores, scoreRecorded } = this.state;
    const { endTurn, activePlayer } = this.props;

    const lockedScore = Object.assign({}, lockedScores[scoreRecorded], { [`player${activePlayer}`]: true })
    lockedScores = Object.assign({}, lockedScores, { [scoreRecorded]: lockedScore })
    this.setState({ scoreRecorded: '', lockedScores });
    endTurn();
  }

  render() {
    const { activePlayer } = this.props;
    const { scores, scoreRecorded } = this.state;
    return (
      <Provider {...this.state}>
        <div className="score-card">
          <Button 
            disabled={scoreRecorded === ''}
            handleClick={this.handleEndTurn}
          >End Turn</Button>
          <table>
            <thead>
              <tr>
                <th></th>
                <th className={classNames({
                  'is-active': activePlayer === 1,
                })}>Player1</th>
                <th className={classNames({
                  'is-active': activePlayer === 2,
                })}>Player2</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(scores).map(key => (
                <ScoreBoardRow 
                  key={key} 
                  scoreName={key} 
                  scores={scores[key]}
                  updateScoreBoard={this.updateScoreBoard}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Provider>
    );
  }
}

Scoreboard.propTypes = {
  activePlayer: PropTypes.number.isRequired,
};

const contextTypes = {
  activePlayer: PropTypes.number,
  rollCounter: PropTypes.number,
  dice: PropTypes.arrayOf(PropTypes.object),
};

export default withContext(contextTypes)(Scoreboard);
