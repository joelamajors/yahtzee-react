import React from 'react'
import PlayerList from '../data/players'
import PropTypes from 'prop-types'
import {Row, Col} from 'react-bootstrap'

const Player = props => {
  let players = PlayerList.map((props) => {
    return (
      <Col xs={6} sm={4} md={2} >
        <Row className="show-grid"> {props.name} </Row>
        <Row className="show-grid"> {props.aces} </Row>
        <Row className="show-grid"> {props.deuces} </Row>
        <Row className="show-grid"> {props.triples} </Row>
        <Row className="show-grid"> {props.quadruples} </Row>
        <Row className="show-grid"> {props.quintuples} </Row>
        <Row className="show-grid"> {props.sextuples} </Row>
        <Row className="show-grid">
          sum[{props.aces}, {props.deuces}, {props.triples}, {props.quadruples}, {props.quintuples}, {props.sextuples}];
        </Row>
        <Row className="show-grid"> if above > 63, += 35 </Row>
        <Row className="show-grid"> Total above two values </Row>
        
        <Row className="show-grid"> {props.threeKind} </Row>
        <Row className="show-grid"> {props.fourKind} </Row>
        <Row className="show-grid"> {props.fullHouse} </Row>
        <Row className="show-grid"> {props.smallStraight}.toString() </Row>
        <Row className="show-grid"> {props.largeStraight} </Row>
        <Row className="show-grid"> {props.yahtzee} </Row>
        <Row className="show-grid"> {props.chance} </Row>
        <Row className="show-grid"> {props.bonus}*100 </Row>
        <Row className="show-grid"> Computed </Row>
        
        <Row className="show-grid"> Pulled from above </Row>
        <Row className="show-grid"> Lower + Upper </Row>
        <Row className="show-grid"> Total </Row>
      </Col>
    );
  })

  return [
    players
  ];
}

Player.propTypes = {
  name: PropTypes.number, 
  aces: PropTypes.number, 
  deuces: PropTypes.number, 
  triples: PropTypes.number, 
  quadruples: PropTypes.number, 
  quintuples: PropTypes.number, 
  sextuples: PropTypes.number, 
  threeKind: PropTypes.number, 
  fourKind: PropTypes.number, 
  fullHouse: PropTypes.bool, 
  smallStraight: PropTypes.bool, 
  largeStraight: PropTypes.bool, 
  yahtzee: PropTypes.bool, 
  chance: PropTypes.number, 
  bonus: PropTypes.number, 
}

export default Player
