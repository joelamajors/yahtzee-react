import React, { Component} from 'react';
import {connect} from 'react-redux';
import UpperSection from '../components/sections/upper';
import LowerSection from '../components/sections/lower';
import styles from '../components/sections/sections.scss';

class ScoreBoard extends Component {
  render() {
    return (
      <div className="boardWrapper">
        <UpperSection/>
        <LowerSection/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(null)(ScoreBoard);
