import React from 'react';
import PropTypes from 'proptypes';
import classNames from 'classnames';

import { withContext } from '../HOC/Provider';

import ScoreCell from '../Atoms/ScoreCell';

const ScoreBoardRow = ({ scoreName, scores, updateScoreBoard, activePlayer, lockedScores, ...props }) => {
  const isTotal = () => scoreName.toLowerCase().indexOf('total') !== -1;
  const isBonus = () => scoreName.toLowerCase().indexOf('bonus') !== -1;

  const handleScoreBoardClick = (name, player) => () => {
    const lowerCaseName = name.toLowerCase();
    const isLockedScore = lockedScores[name] && lockedScores[name][player];
    const isLocked = (
      lowerCaseName === 'bonus'
      || lowerCaseName.indexOf('total') !== -1
      || player !== `player${activePlayer}`
      || isLockedScore
    );

    if (isLocked) return;

    updateScoreBoard(name);
  };

  return (
    <tr>
      <td className={classNames({
        'total': isTotal(),
        'bonus': isBonus(),
      })}>{scoreName}</td>
      <ScoreCell
        score={scores.player1}
        scoreName={scoreName}
        player='player1'
        isTotal={isTotal()}
        isBonus={isBonus()}
        onClick={handleScoreBoardClick(scoreName, 'player1')}
      />
      <ScoreCell
        score={scores.player2}
        scoreName={scoreName}
        player='player2'
        isTotal={isTotal()}
        isBonus={isBonus()}
        onClick={handleScoreBoardClick(scoreName, 'player2')}
      />
    </tr>
  );
};

ScoreBoardRow.propTypes = {
  scoreName: PropTypes.string.isRequired,
  scores: PropTypes.shape({
    player1: PropTypes.number,
    player2: PropTypes.number,
  }).isRequired,
};

ScoreBoardRow.defaultProps = {
  scores: PropTypes.shape({
    player1: 0,
    player2: 0,
  })
}

const contextTypes = {
  activePlayer: PropTypes.number,
  lockedScores: PropTypes.object,
}

export default withContext(contextTypes)(ScoreBoardRow);
