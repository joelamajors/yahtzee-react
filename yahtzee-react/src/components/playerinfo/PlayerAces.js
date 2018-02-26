import React from 'react'
import PropTypes from 'prop-types'

const PlayerAces = props => {
  return (
    <td
      type="text"
      value={props.aces}
    />
  );
};

GuestName.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  handleNameEdits: PropTypes.func.isRequired
};

export default GuestName
