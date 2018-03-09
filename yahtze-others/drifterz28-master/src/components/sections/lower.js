import React, { Component} from 'react';
import {connect} from 'react-redux';
import Section from './scoreSection';

class LowerSection extends Component {
  addDice(dice) {
    return dice.reduce(function(a, b) {
      return a + b;
    }, 0);
  }
  threeOfaKind(dice) {
    console.log('three')
    if([...new Set(dice)].length <= 3) {
      return this.addDice(dice);
    }
    return 0;
  }
  fourOfaKind(dice) {
    if([...new Set(dice)].length <= 2) {
      console.log('4')
      return this.addDice(dice);
    }
    return 0;
  }
  getCountAndUnique(dice) {
    return dice.reduce(function(prev, cur) {
      prev[cur] = (prev[cur] || 0) + 1;
      return prev;
    }, {});
  }
  clearSections(sections) {
    return sections.map((sec) => {
      if(!sec.isLocked) {
        sec.points = null;
      }
      return sec;
    });
  }
  isSmallStraight(dice) {
    const combo = ['1234', '2345', '3456'];
    let diceSort = dice.slice(0);
    const diceString = diceSort.sort().join('');

    for(let i = 0; i < combo.length; i++) {
      if(diceString.indexOf(combo[i]) !== -1) {
        return true;
      }
    }
    return false;
  }
  isLargeStraight(dice) {
    const combo = ['12345', '23456'];
    let diceSort = dice.slice(0);
    const diceString = diceSort.sort().join('');
    for(let i = 0; i < combo.length; i++) {
      if(diceString.indexOf(combo[i]) !== -1) {
        return true;
      }
    }
    return false;
  }
  addPoints = (number) => {
    const {dice} = this.props.dice;
    let {lower, upper, scores} = this.props;
    let points = 0;

    if(lower[number].isLocked) {
      return;
    }

    upper = this.clearSections(upper);
    lower = this.clearSections(lower);
    console.log(lower[number].label)
    switch(lower[number].label) {
      case '3 of a Kind':
        points = this.threeOfaKind(dice);
        break;
      case '4 of a Kind':
        points = this.fourOfaKind(dice);
        break;
      case 'Chance':
        points = this.addDice(dice);
        break;
      case 'Full House':
        if([...new Set(dice)].length === 2) {
          points = lower[number].maxPoints;
        }
        break;
      case 'Small Straight':
        console.log('is small', this.isSmallStraight(dice))
        if(this.isSmallStraight(dice)) {
          points = lower[number].maxPoints;
        }
        break;
      case 'Large Straight':
        if(this.isLargeStraight(dice)) {
          points = lower[number].maxPoints;
        }
        break;
      case 'Yahtzee':
        if([...new Set(dice)].length === 1 && dice[0] !== 0) {
          points = lower[number].maxPoints;
          scores.hasYahtzee = true;
        }
        break;
    }

    lower[number].points = points;
    this.props.dispatch({
      type: 'UPDATE_LOWER',
      lower
    });

    console.log('add points', points);
  }
  render() {
    const {lower, scores} = this.props
    return (
      <section className="lower">
        {lower.map((section, i) => {
          return <Section key={i} addPoints={this.addPoints} index={i} section={section}/>
        })}
        <div className="sectionLabel upperScore">
          <div className="label">
            Lower Total
          </div>
          <div className="scoreBox">{scores.lowerScore}</div>
          <div className="scoreBox"></div>
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(LowerSection);
