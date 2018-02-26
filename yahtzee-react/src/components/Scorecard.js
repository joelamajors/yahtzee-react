import React, { Component } from 'react'
import PlayerList from '../data/players'
import ReactTable from 'react-table'
// import PlayerName from './playerinfo/PlayerName'

const Scorecard = () => {
  let players = PlayerList.map((player) => {
    return (
      <tbody>
        <tr>
          <th>Players:</th>
          <td>{player.name}</td>
        </tr>
        <tr>
          <th>Aces:</th>
          <td>{player.aces}</td>
        </tr>
        <tr>
          <th>Deuces:</th>
          <td>{player.deuces}</td>
        </tr>
        <tr>
          <th>Threes:</th>
          <td>{player.triples}</td>
        </tr>
        <tr>
          <th>Fours:</th>
          <td>{player.quadruples}</td>
        </tr>
        <tr>
          <th>Fives:</th>
          <td>{player.quintuples}</td>
        </tr>
        <tr>
          <th>Sixes:</th>
          <td>{player.sextuples}</td>
        </tr>
        <tr>
          <th>Total:</th>
          <td>add the values of the above</td>
        </tr>
        <tr>
          <th>Upper Bonus:</th>
          <td>compute if total > 63, add 35</td>
        </tr>
        <tr>
          <th>Upper Total:</th>
          <td>Total of the above two values</td>
        </tr>
        <tr>
          <th>Three of a Kind:</th>
          <td>{player.threeKind}</td>
        </tr>
        <tr>
          <th>Four of a Kind:</th>
          <td>{player.fourKind}</td>
        </tr>
        <tr>
          <th>Full House:</th>
          <td>{player.fullHouse}</td>
        </tr>
        <tr>
          <th>Small Straight:</th>
          <td>{player.smallStraight}</td>
        </tr>
        <tr>
          <th>Large Straight:</th>
          <td>{player.largeStraight}</td>
        </tr>
        <tr>
          <th>Yahtzee!:</th>
          <td>{player.yahtzee}</td>
        </tr>
        <tr>
          <th>Chance:</th>
          <td>{player.chance}</td>
        </tr>
        <tr>
          <th>Bonus:</th>
          <td>{player.bonus}x100</td>
        </tr>
        <tr>
          <th>Lower Total:</th>
          <td>Computed</td>
        </tr>
        <tr>
          <th>Upper Total:</th>
          <td>Pulled from above</td>
        </tr>
        <tr>
          <th>Grand Total:</th>
          <td>Lower + Upper</td>
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

// <td>{player.aces}</td>
// <td>{player.deuces}</td>
// <td>{player.triples}</td>
// <td>{player.quadruples}</td>
// <td>{player.quintuples}</td>
// <td>{player.sextuples}</td>
// <td>{player.threeKind}</td>
// <td>{player.fourKind}</td>
// <td>{player.fullHouse}</td>
// <td>{player.smallStraight}</td>
// <td>{player.largeStraight}</td>
// <td>{player.yahtzee}</td>
// <td>{player.chance}</td>
// <td>{player.bonus}</td>
