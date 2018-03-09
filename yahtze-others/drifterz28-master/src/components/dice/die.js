import React, {Component} from 'react'
import {connect} from 'react-redux';
import styles from './dice.scss';

class Die extends Component {
  doHold(index) {
    let holds = this.props.dice.holds;
    let current = holds[index];
    holds[index] = current ? false : true;
    this.props.dispatch({
      'type': 'UPDATE_HOLDS',
      'holds': holds
    });
  }
  render() {
    const {index, number, isHold} = this.props;
    const numName = ['', 'one', 'two', 'three', 'four', 'five', 'six'];
    const numberClass = numName[number];
    const holdClass = isHold ? 'hold' : '';
    return (
      <div onClick={this.doHold.bind(this, index)} className={`dice ${numberClass} ${holdClass}`} >
    		<div className="dot"></div>
    		<div className="dot"></div>
    		<div className="dot"></div>
    		<div className="dot"></div>
    		<div className="dot"></div>
    		<div className="dot"></div>
    	</div>
    );
  }
};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Die);
