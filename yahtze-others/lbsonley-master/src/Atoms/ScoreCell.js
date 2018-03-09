import React from 'react';
import PropTypes from 'proptypes';
import classNames from 'classnames';

import {withContext} from '../HOC/Provider';

const ScoreCell = ({ score, scoreName, scoreMethods, player, isTotal, isBonus, onClick, scores }) => {
  const isInTopSection = (key) => (
    key === 'ones' ||
    key === 'twos' ||
    key === 'threes' ||
    key === 'fours' ||
    key === 'fives' ||
    key === 'sixes'
  );

  const isTotalOrBonus = (key) => (
    key === 'topTotal' ||
    key === 'bonus' ||
    key === 'bottomTotal' ||
    key === 'total'
  );

  const getBonusScore = () => (getTopTotal() >= 63 ? 35 : null);

  const getTotalScore = () => (getTopTotal() + getBottomTotal() + getBonusScore());
  
  const getTopTotal = () => {
    const topScores = Object.keys(scores).filter(key => {
      return isInTopSection(key);
    }).reduce((acc, key) => (
      [...acc, scores[key][player]]
    ), []).reduce((acc, score) => acc + score, 0);

    return topScores === 0 ? null : topScores;
  };

  const getBottomTotal = () => {
    const bottomScores = Object.keys(scores).filter(key => {
      return !isInTopSection(key) && !isTotalOrBonus(key);
    }).reduce((acc, key) => (
      [...acc, scores[key][player]]
    ), []).reduce((acc, score) => acc + score, 0);

    return bottomScores === 0 ? null : bottomScores;
  }

  const getScore = () => {
    switch (scoreName.toLowerCase()) {
      case 'bonus':
        return getBonusScore();
      case 'toptotal':
        return getTopTotal();
      case 'bottomtotal':
        return getBottomTotal();
      case 'total':
        return getTotalScore();
      default:
        return score;
    }
  };

  return (
    <td 
      className={classNames({
        'total': isTotal,
        'bonus': isBonus,
      })}
      onClick={onClick}
    >
      {getScore()}
    </td>  
  )
}

const contextTypes = {
  scores: PropTypes.object,
  scoreMethods: PropTypes.object,
};

export default withContext(contextTypes)(ScoreCell);
