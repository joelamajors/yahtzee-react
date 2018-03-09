import React, { Component} from 'react';
import {connect} from 'react-redux';
import Section from './scoreSection';

class UpperSection extends Component {
  hasYahtzee(dice) {
    return ([...new Set(dice)].length === 1 && dice[0] !== 0);
  }
  addUppers(dice, number) {
    var total = dice.reduce(function(a, b) {
      b = (b !== number) ? 0 : b;
      return a + b;
    }, 0);
    return total;
  }
  clearSections(sections) {
    return sections.map((sec) => {
      if(!sec.isLocked) {
        sec.points = null;
      }
      return sec;
    });
  }
  addPoints = (number) => {
    // will need to add Yahtzee check and give +50 points on
    // top of the score and make display
    const {dice} = this.props.dice;
    let {upper, lower, scores} = this.props;

    if(upper[number].isLocked) {
      return;
    }

    let points = this.addUppers(dice, number + 1);
    upper = this.clearSections(upper);
    lower = this.clearSections(lower);
    if(this.hasYahtzee(dice) && scores.hasYahtzee) {
      upper[number].hasBonus = true;
    }
    upper[number].points = points;

    this.props.dispatch({
      type: 'UPDATE_LOWER',
      lower
    });

    this.props.dispatch({
      type: 'UPDATE_UPPER',
      upper
    });
  }
  render() {
    const {upper, scores} = this.props;
    //scores.upperScore > 0 && scores.upperBonus + scores.upperScore + scores.yahtzeeBonus
    let totalScore = 0;
    totalScore += scores.upperScore ? scores.upperScore : 0;
    totalScore += scores.upperBonus ? scores.upperBonus : 0;
    totalScore += scores.upperYahtzee ? scores.upperYahtzee : 0;
    return (
      <section className="lower">
        {upper.map((section, i) => {
          return <Section key={i} index={i} addPoints={this.addPoints} section={section}/>
        })}
        <div className="sectionLabel lowerScore">
          <div className="label">
            Upper Subtotal
          </div>
          <div className="scoreBox">
            {scores.upperScore}
          </div>
          <div className="scoreBox"></div>
        </div>
        <div className="sectionLabel lowerScore">
          <div className="label">
            Bonus
          </div>
          <div className="scoreBox">{scores.upperBonus}</div>
          <div className="scoreBox"></div>
        </div>
        <div className="sectionLabel lowerScore">
          <div className="label">
            Upper Total
          </div>
          <div className="scoreBox">{totalScore > 0 && totalScore}</div>
          <div className="scoreBox"></div>
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  console.log(state)
  return state;
}

export default connect(mapStateToProps)(UpperSection);
