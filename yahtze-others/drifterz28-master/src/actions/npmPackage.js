import fetch from 'isomorphic-fetch'
import {RECEIVE_CHART} from '../constants';

function fetchChart(name) {
  const url = location.origin;
  return dispatch => {
    return fetch(url + '/api/npmPackage?npmPackage=' + name)
      .then(req => req.json())
      .then(json => dispatch(receiveChart(json)))
  }
}

function receiveChart(json) {
  return {
    type: RECEIVE_CHART,
    json: json,
    receivedAt: Date.now()
  }
}

module.exports = { fetchChart, receiveChart }
