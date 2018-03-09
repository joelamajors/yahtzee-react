import React from 'react'
import Player from './Player'
import {Grid, Row, Col} from 'react-bootstrap'

const Scorecard = () => {
  return (
    <Col xs={6} >
      <Grid className="score-grid">
        <Col xs={6} sm={4} md={2} >
          <Row className="show-grid"><Col className="scorecard-titles" >Players:</Col></Row>
          <Row className="show-grid"><Col className="scorecard-titles" >Aces:</Col></Row>
          <Row className="show-grid"><Col className="scorecard-titles" >Deuces:</Col></Row>
          <Row className="show-grid"><Col className="scorecard-titles" >Threes:</Col></Row>
          <Row className="show-grid"><Col className="scorecard-titles" >Fours:</Col></Row>
          <Row className="show-grid"><Col className="scorecard-titles" >Fives:</Col></Row>
          <Row className="show-grid"><Col className="scorecard-titles" >Sixes:</Col></Row>
          <Row className="show-grid"><Col className="scorecard-titles" >Total:</Col></Row>
          <Row className="show-grid"><Col className="scorecard-titles" >Upper Bonus:</Col></Row>
          <Row className="show-grid"><Col className="scorecard-titles" >Upper Total:</Col></Row>
          <Row className="show-grid"><Col className="scorecard-titles" >Three of a Kind:</Col></Row>
          <Row className="show-grid"><Col className="scorecard-titles" >Four of a Kind:</Col></Row>
          <Row className="show-grid"><Col className="scorecard-titles" >Full House:</Col></Row>
          <Row className="show-grid"><Col className="scorecard-titles" >Small Straight:</Col></Row>
          <Row className="show-grid"><Col className="scorecard-titles" >Large Straight:</Col></Row>
          <Row className="show-grid"><Col className="scorecard-titles" >Yahtzee!:</Col></Row>
          <Row className="show-grid"><Col className="scorecard-titles" >Chance:</Col></Row>
          <Row className="show-grid"><Col className="scorecard-titles" >Bonus:</Col></Row>
          <Row className="show-grid"><Col className="scorecard-titles" >Lower Total:</Col></Row>
          <Row className="show-grid"><Col className="scorecard-titles" >Upper Total:</Col></Row>
          <Row className="show-grid"><Col className="scorecard-titles" >Grand Total:</Col></Row>
        </Col>
        <Player />
      </Grid>
    </Col>
  );
}

export default Scorecard
