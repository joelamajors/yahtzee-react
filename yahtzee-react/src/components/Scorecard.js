import React from 'react'
import PlayerList from '../data/players'
// import ReactTable from 'react-table'
import {Grid, Row, Col, Webpack} from 'react-bootstrap'
// import PlayerName from './playerinfo/PlayerName'

const Scorecard = () => {
  let players = PlayerList.map((player) => {
    return [
      <Grid>
        <Row className="show-grid">
          <Col xs={6}>Players:</Col>
          <Col xs={6}>{player.name}</Col>
        </Row>
        
        <Row className="show-grid">
          <Col xs={6}>Aces:</Col>
          <Col xs={6}>{player.aces}</Col>
        </Row>

        <Row className="show-grid">
          <Col xs={6}>Deuces:</Col>
          <Col xs={6}>{player.deuces}</Col>
        </Row>

        <Row className="show-grid">
          <Col xs={6}>Threes:</Col>
          <Col xs={6}>{player.triples}</Col>
        </Row>

        <Row className="show-grid">
          <Col xs={6}>Fours:</Col>
          <Col xs={6}>{player.quadruples}</Col>
        </Row>

        <Row className="show-grid">
          <Col xs={6}>Fives:</Col>
          <Col xs={6}>{player.quintuples}</Col>
        </Row>

        <Row className="show-grid">
          <Col xs={6}>Sixes:</Col>
          <Col xs={6}>{player.sextuples}</Col>
        </Row>

        <Row className="show-grid">
          <Col xs={6}>Total:</Col>
          <Col xs={6}>add the values of the above</Col>
        </Row>

        <Row className="show-grid">
          <Col xs={6}>Upper Bonus:</Col>
          <Col xs={6}>compute if total > 63, add 35</Col>
        </Row>

        <Row className="show-grid">
          <Col xs={6}>Upper Total:</Col>
          <Col xs={6}>Total of the above two values</Col>
        </Row>

        <Row className="show-grid">
          <Col xs={6}>Three of a Kind:</Col>
          <Col xs={6}>{player.threeKind}</Col>
        </Row>

        <Row className="show-grid">
          <Col xs={6}>Four of a Kind:</Col>
          <Col xs={6}>{player.fourKind}</Col>
        </Row>

        <Row className="show-grid">
          <Col xs={6}>Full House:</Col>
          <Col xs={6}>{player.fullHouse}</Col>
        </Row>

        <Row className="show-grid">
          <Col xs={6}>Small Straight:</Col>
          <Col xs={6}>{player.smallStraight}</Col>
        </Row>

        <Row className="show-grid">
          <Col xs={6}>Large Straight:</Col>
          <Col xs={6}>{player.largeStraight}</Col>
        </Row>

        <Row className="show-grid">
          <Col xs={6}>Yahtzee!:</Col>
          <Col xs={6}>{player.yahtzee}</Col>
        </Row>

        <Row className="show-grid">
          <Col xs={6}>Chance:</Col>
          <Col xs={6}>{player.chance}</Col>
        </Row>

        <Row className="show-grid">
          <Col xs={6}>Bonus:</Col>
          <Col xs={6}>{player.bonus}x100</Col>
        </Row>

        <Row className="show-grid">
          <Col xs={6}>Lower Total:</Col>
          <Col xs={6}>Computed</Col>
        </Row>

        <Row className="show-grid">
          <Col xs={6}>Upper Total:</Col>
          <Col xs={6}>Pulled from above</Col>
        </Row>

        <Row className="show-grid">
          <Col xs={6}>Grand Total:</Col>
          <Col xs={6}>Lower + Upper</Col>
        </Row>

      </Grid>

    ];
  })

  return [
      {players}
  ];
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

