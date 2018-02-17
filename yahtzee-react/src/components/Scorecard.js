import React from 'react'
import PropTypes from 'prop-types'
import PlayerList from '../data/players'

const Scorecard = () => {
  let players = PlayerList.map((player) => {
    return (
      <tbody>
        <tr>
          <td>Players:</td>
          <td>{player.name}</td>
        </tr>
        <tr>
          <td>Total Points:</td>
          <td>{player.score}</td>
        </tr>
      </tbody>
    );
  })

  return (
    <table className="stats">
      {players}
    </table>
  );
}

// Scorecard.propTypes = {
//   name: PropTypes.string.isRequired,
//   index: PropTypes.number.isRequired,
//   score: PropTypes.number.isRequired,
// }


export default Scorecard
