import React, {Component} from 'react';
import {connect} from 'react-redux';
import Die from '../components/dice/die';

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Dice extends Component {
  roll() {
    let {turn, holds} = this.props.dice;
    turn++;
    const diceRoll = this.rollDice();
    let dice = {
      'turn': turn,
      'dice': diceRoll,
      'holds': holds
    };
    this.props.dispatch({
      'type': 'ROLL_DICE',
      dice
    });
  }
  rollDice() {
    let {dice, holds} = this.props.dice;
    for(var i = 0; i < 5; i++) {
  		if(!holds[i]) {
  			var ranNum = getRandomIntInclusive(1, 6);
  			dice[i] = ranNum;
  		}
  	}
    return dice;
  }
  play() {
    this.updateHoldsLower();
    this.updateHoldsUpper();
    this.updateScores()
  }
  updateHoldsLower() {
    let {lower, dispatch} = this.props;
    console.log(lower)
    lower = lower.map(section => {
      if(section.points) {
        section.isLocked = true;
      }
      return section;
    });
    dispatch({
      type: 'UPDATE_LOWER',
      lower
    });
  }
  updateHoldsUpper() {
    let {upper, dispatch} = this.props;
    upper = upper.map(section => {
      if(section.points) {
        section.isLocked = true;
      }
      return section;
    });
    dispatch({
      type: 'UPDATE_UPPER',
      upper
    });
  }
  updateScores() {
    let {upper, lower, scores, dispatch} = this.props;
    let yahtzeeBonus = 0;
    let upperScore = upper.reduce(function(a, b) {
      if(b.hasBonus) {
        yahtzeeBonus = yahtzeeBonus + 50;
      }
      return a + b.points;
    }, 0);

    let lowerScore = lower.reduce(function(a, b) {
      return a + b.points;
    }, 0);

    if(upperScore >= 63) {
      scores.upperBonus = 35;
    }

    scores.upperScore = upperScore === 0 ? null : upperScore;
    scores.lowerScore = lowerScore === 0 ? null : lowerScore;
    scores.upperYahtzee = yahtzeeBonus;
    scores.totalScore = upperScore + lowerScore + scores.upperBonus + yahtzeeBonus;

    dispatch({
      type: 'UPDATE_SCORES',
      scores
    });

    dispatch({
      type: 'ROLL_DICE',
      dice: {
        turn: 0,
        dice: [0,0,0,0,0],
        holds: [false, false, false, false, false]
      }
    });
  }
  render() {
    const {turn, dice, holds} = this.props.dice;
    let die = [];
    for(let i = 0; i < 5; i++) {
      const number = dice[i];
      const isHold = holds[i];
      die.push(<Die key={i} index={i} number={number} isHold={isHold}/>);
    }
    return (
      <div className="diceWrap">
        {turn > 0 && turn < 100 && <div><button onClick={this.roll.bind(this)}>Roll {turn}</button></div>}
        {turn > 0 ? die : <button onClick={this.roll.bind(this)} className="playBtn">Play</button>}
        {turn > 0 && <div><button onClick={this.play.bind(this)}>Play</button></div>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Dice);
