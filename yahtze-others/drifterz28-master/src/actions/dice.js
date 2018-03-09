//import fetch from 'isomorphic-fetch'
import {ROLL_DICE} from '../constants';

// function fetchChart(name) {
//   const url = location.origin;
//   return dispatch => {
//     return fetch(url + '/api/npmPackage?npmPackage=' + name)
//       .then(req => req.json())
//       .then(json => dispatch(receiveChart(json)))
//   }
// }

function rollDice(json) {
  console.log('roll')
  return {
    type: ROLL_DICE,
    json: json,
    receivedAt: Date.now()
  }
}

export default rollDice;
