import React from 'react'
import PlayerList from '../data/players'
import {Grid, Row, Col} from 'react-bootstrap'

const Player = () => {
  let players = PlayerList.map((player) => {
    return (
      <Col xs={6} sm={4} md={2} >
        <Row className="show-grid">
          <Col >{player.name}</Col>
        </Row>
        <Row className="show-grid">
          <Col >{player.aces}</Col>
        </Row>
        <Row className="show-grid">
          <Col >{player.deuces}</Col>
        </Row>
        <Row className="show-grid">
          <Col >{player.triples}</Col>
        </Row>
        <Row className="show-grid">
          <Col >{player.quadruples}</Col>
        </Row>
        <Row className="show-grid">
          <Col >{player.quintuples}</Col>
        </Row>
        <Row className="show-grid">
          <Col >{player.sextuples}</Col>
        </Row>
        <Row className="show-grid">
          <Col > [{player.aces},
                  {player.deuces},
                  {player.triples},
                  {player.quadruples},
                  {player.quintuples},
                  {player.sextuples}].reduce(sum);
          </Col>
        </Row>
        <Row className="show-grid">
          <Col >compute if total > 63, add 35</Col>
        </Row>
        <Row className="show-grid">
          <Col >Total of the above two values</Col>
        </Row>
        <Row className="show-grid">
          <Col >{player.threeKind}</Col>
        </Row>
        <Row className="show-grid">
          <Col >{player.fourKind}</Col>
        </Row>
        <Row className="show-grid">
          <Col >{player.fullHouse}</Col>
        </Row>
        <Row className="show-grid">
          <Col >{player.smallStraight}</Col>
        </Row>
        <Row className="show-grid">
          <Col >{player.largeStraight}</Col>
        </Row>
        <Row className="show-grid">
          <Col >{player.yahtzee}</Col>
        </Row>
        <Row className="show-grid">
          <Col >{player.chance}</Col>
        </Row>
        <Row className="show-grid">
          <Col >{player.bonus}x100</Col>
        </Row>
        <Row className="show-grid">
          <Col >Computed</Col>
        </Row>
        <Row className="show-grid">
          <Col >Pulled from above</Col>
        </Row>
        <Row className="show-grid">
          <Col >Lower + Upper</Col>
        </Row>
        <Row className="show-grid">
          <Col >Total</Col>
        </Row>
      </Col>
    );
  })

  return [
    players
  ];
}

export default Player
