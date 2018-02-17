import React from 'react'
import PropTypes from 'prop-types'
import PlayerList from '../data/players'

const Scorecard = () => {
  let players = PlayerList.map((player) => {
    return (
      <tbody>
        <tr>
          <th>Players:</th>
          <td>{player.name}</td>
        </tr>
        <tr>
          <th>Total Points:</th>
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
export default Scorecard
