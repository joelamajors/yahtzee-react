import React, { Component } from 'react';
import PropTypes from 'proptypes';

import { withContext } from '../HOC/Provider';

import Die from '../Atoms/Die';

import './Dice.css';

class Dice extends Component {

  render () {
    const { dice, toggleFrozen } = this.props;

    return (
      <div className="roll-zone">
        {dice.map(die => 
            <Die 
              key={die.id} 
              die={die} 
              toggleFrozen={toggleFrozen}
            />
        )}
      </div>
    )
  }
}

Dice.propTypes = {
  dice: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleFrozen: PropTypes.func.isRequired,
};

const contextTypes = {
  dice: PropTypes.arrayOf(PropTypes.object),
};

export default withContext(contextTypes)(Dice);
