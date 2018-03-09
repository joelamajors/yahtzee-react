import fetch from 'isomorphic-fetch'
import {SAVE_CHART} from '../constants';

function postChart() {
  const url = location.origin;
  return dispatch => {
    return fetch(url + '/api/npmPackages?keyword=react-component')
      .then(req => req.json())
      .then(json => dispatch(saveChart(json)))
  }
}

function saveChart(json) {
  return {
    type: SAVE_CHART,
    json: json,
    receivedAt: Date.now()
  }
}

module.exports = {postChart, saveChart}
