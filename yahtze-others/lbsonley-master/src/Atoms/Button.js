import React from 'react';
import PropTypes from 'proptypes';

import './Button.css';

const Button = ({ handleClick, disabled, ...props }) => {
  return (
    <button 
      disabled={disabled}
      className="button"
      type="button" 
      onClick={handleClick}>
      {props.children}
    </button>
  );
};

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default Button;
