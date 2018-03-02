import React from 'react'
import PlayerList from '../data/players'
import {Grid, Row, Col} from 'react-bootstrap'

const Scorecard = () => {
  let players = PlayerList.map((player) => {
    return (
      <Col sm={6} md={4}>
        <Grid className="score-grid">
          <Row className="show-grid">
            <Col xs={6} sm={4} md={2} >Players:</Col>
            <Col xs={6} sm={4} md={2} >{player.name}</Col>
          </Row>
          
          <Row className="show-grid">
            <Col xs={6} sm={4} md={2} >Aces:</Col>
            <Col xs={6} sm={4} md={2} >{player.aces}</Col>
          </Row>
        
          <Row className="show-grid">
            <Col xs={6} sm={4} md={2} >Deuces:</Col>
            <Col xs={6} sm={4} md={2} >{player.deuces}</Col>
          </Row>
        
          <Row className="show-grid">
            <Col xs={6} sm={4} md={2} >Threes:</Col>
            <Col xs={6} sm={4} md={2} >{player.triples}</Col>
          </Row>
        
          <Row className="show-grid">
            <Col xs={6} sm={4} md={2} >Fours:</Col>
            <Col xs={6} sm={4} md={2} >{player.quadruples}</Col>
          </Row>
        
          <Row className="show-grid">
            <Col xs={6} sm={4} md={2} >Fives:</Col>
            <Col xs={6} sm={4} md={2} >{player.quintuples}</Col>
          </Row>
        
          <Row className="show-grid">
            <Col xs={6} sm={4} md={2} >Sixes:</Col>
            <Col xs={6} sm={4} md={2} >{player.sextuples}</Col>
          </Row>
        
          <Row className="show-grid">
            <Col xs={6} sm={4} md={2} >Total:</Col>
            <Col xs={6} sm={4} md={2} >reduce([{player.aces},
{player.deuces},
{player.triples},
{player.quadruples},
{player.quintuples},
{player.sextuples}])</Col>
          </Row>
        
          <Row className="show-grid">
            <Col xs={6} sm={4} md={2} >Upper Bonus:</Col>
            <Col xs={6} sm={4} md={2} >compute if total > 63, add 35</Col>
          </Row>
        
          <Row className="show-grid">
            <Col xs={6} sm={4} md={2} >Upper Total:</Col>
            <Col xs={6} sm={4} md={2} >Total of the above two values</Col>
          </Row>
        
          <Row className="show-grid">
            <Col xs={6} sm={4} md={2} >Three of a Kind:</Col>
            <Col xs={6} sm={4} md={2} >{player.threeKind}</Col>
          </Row>
        
          <Row className="show-grid">
            <Col xs={6} sm={4} md={2} >Four of a Kind:</Col>
            <Col xs={6} sm={4} md={2} >{player.fourKind}</Col>
          </Row>
        
          <Row className="show-grid">
            <Col xs={6} sm={4} md={2} >Full House:</Col>
            <Col xs={6} sm={4} md={2} >{player.fullHouse}</Col>
          </Row>
        
          <Row className="show-grid">
            <Col xs={6} sm={4} md={2} >Small Straight:</Col>
            <Col xs={6} sm={4} md={2} >{player.smallStraight}</Col>
          </Row>
        
          <Row className="show-grid">
            <Col xs={6} sm={4} md={2} >Large Straight:</Col>
            <Col xs={6} sm={4} md={2} >{player.largeStraight}</Col>
          </Row>
        
          <Row className="show-grid">
            <Col xs={6} sm={4} md={2} >Yahtzee!:</Col>
            <Col xs={6} sm={4} md={2} >{player.yahtzee}</Col>
          </Row>
        
          <Row className="show-grid">
            <Col xs={6} sm={4} md={2} >Chance:</Col>
            <Col xs={6} sm={4} md={2} >{player.chance}</Col>
          </Row>
        
          <Row className="show-grid">
            <Col xs={6} sm={4} md={2} >Bonus:</Col>
            <Col xs={6} sm={4} md={2} >{player.bonus}x100</Col>
          </Row>
        
          <Row className="show-grid">
            <Col xs={6} sm={4} md={2} >Lower Total:</Col>
            <Col xs={6} sm={4} md={2} >Computed</Col>
          </Row>
        
          <Row className="show-grid">
            <Col xs={6} sm={4} md={2} >Upper Total:</Col>
            <Col xs={6} sm={4} md={2} >Pulled from above</Col>
          </Row>
        
          <Row className="show-grid">
            <Col xs={6} sm={4} md={2} >Grand Total:</Col>
            <Col xs={6} sm={4} md={2} >Lower + Upper</Col>
          </Row>
        
        </Grid>
      </Col>

    );
  })

  return [
      players
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
