/**
 * Provider.js
 * @author Ben Sonley
 * @desc - a Higher order component to provide context as props to children down the component tree
 * based on https://github.com/rwieruch/react-provider-pattern
 * https://www.robinwieruch.de/react-provider-pattern-context/
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Provider extends Component {
  getChildContext() {
    return {
      ...this.props,
    };
  }

  render() {
    return <div> {this.props.children}</div>;
  }
}

Provider.propTypes = {
  children: PropTypes.object.isRequired,
};

Provider.defaultProps = {
};

Provider.childContextTypes = {
  // from GameBoard.js
  dice: PropTypes.arrayOf(PropTypes.object),
  isRolling: PropTypes.bool,
  rollCounter: PropTypes.number,
  activePlayer: PropTypes.number,
  turnIsOver: PropTypes.bool,
  // from ScoreBoard.js
  scoreRecorded: PropTypes.string,
  scores: PropTypes.object,
  scoreMethods: PropTypes.object,
  lockedScores: PropTypes.object,
  children: PropTypes.object.isRequired,
};

const withContext = contextTypes => Component => {
  const WithContext = (props, context) => <Component {...props} {...context} />;

  WithContext.contextTypes = contextTypes;

  return WithContext;
};

export { Provider, withContext };
