import React, { Component } from 'react';

import { Provider } from '../HOC/Provider';

import Button from '../Atoms/Button';
import Dice from '../Molecules/Dice';
import Scoreboard from './Scoreboard';

import './GameBoard.css';

class GameBoard extends Component {
  state = {
    dice: [
      { id: 1, val: 1, isFrozen: false, },
      { id: 2, val: 2, isFrozen: false, },
      { id: 3, val: 3, isFrozen: false, },
      { id: 4, val: 4, isFrozen: false, },
      { id: 5, val: 5, isFrozen: false, },
    ],
    isRolling: false,
    rollCounter: 0,
    activePlayer: 1,
    turnIsOver: false,
  };

  toggleFrozen = (id) => {
    if (this.state.isRolling || this.state.rollCounter === 0) return;

    const { dice } = this.state;
    const newDice = dice.map((die) => {
      if (die.id === id) {
        return Object.assign({}, die, { isFrozen: !die.isFrozen })
      } else {
        return die
      }
    });
    this.setState({ dice: newDice })
  };

  generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  rollDie = (die) => {
    return new Promise((resolve) => {
      const newVal = this.generateRandomNumber(1, 6);
      resolve({ val: newVal, id: die.id, isFrozen: die.isFrozen })  
    });
  }

  rollDice = () => {
    let { dice } = this.state;

    const promises = dice.map((die) => {
      if (die.isFrozen) {
        return die;
      } else {
        return this.rollDie(die)
      }
    });

    Promise.all(promises).then(values => {
      this.setState({ dice: values })
    });
    
  };

  shakeDice = () => {
    let shakesRemaining = this.generateRandomNumber(20, 40);

    const interval = setInterval(() => {
      if (shakesRemaining === 1) {
        this.setState({ isRolling: false });
        clearInterval(interval);
      }
      this.rollDice();

      shakesRemaining--;
    }, 50);
  };

  handleRoll = () => {
    let { rollCounter, turnIsOver } = this.state;
    
    rollCounter++

    switch (rollCounter) {
      case 1:
      case 2:
        this.setState({ isRolling: true, rollCounter });
        break;
      case 3:
        turnIsOver = true;
        this.setState({ turnIsOver, rollCounter });
        break;
      default:
        break;
    }
    this.shakeDice();
  }

  endTurn = () => {
    let { dice, activePlayer } = this.state;

    const unfrozenDice = dice.map((die) => {
      return Object.assign({}, die, { isFrozen: false });
    })

    activePlayer = activePlayer === 1 ? 2 : 1;

    this.setState({ 
      dice: unfrozenDice, 
      rollCounter: 0, 
      turnIsOver: false,
      activePlayer,
    });
  };

  render() {
    const { turnIsOver } = this.state;
    return (
      <Provider
        {...this.state}
      >
        <div className="game-board">
          <section>
            <div className="actions">
              <Button 
                disabled={turnIsOver}
                handleClick={this.handleRoll}
              >
                Roll The Dice
              </Button>
            </div>
            <Dice
              toggleFrozen={this.toggleFrozen}
            />
          </section>
          <section>
            <Scoreboard 
              endTurn={this.endTurn}
            />
          </section>
        </div>
      </Provider>
    )
  };
};

export default GameBoard;
