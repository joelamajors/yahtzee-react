import React from 'react';
import PropTypes from 'proptypes';
import classNames from 'classnames';

import './Die.css';

const Die = ({ die, toggleFrozen }) => {
  const { id, val, isFrozen } = die;

  const handleClick = () => {
    toggleFrozen(id);
  }

  return (
    <span 
      className={classNames({
        'die': true,
        'is-frozen': isFrozen, 
      })}
      onClick={handleClick}
    >
      {val}
    </span>
  );
};

Die.propTypes = {
  val: PropTypes.number,
  die: PropTypes.shape({
    id: PropTypes.number.isRequired,
    val: PropTypes.number.isRequired,
    isFrozen: PropTypes.bool.isRequired,
  }).isRequired,
};

Die.defaultProps = {
  val: 1,
};

export default Die;
