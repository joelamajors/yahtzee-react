import fetch from 'isomorphic-fetch';
import {RECEIVE_CHARTS} from '../constants';

function fetchCharts() {
  const url = location.origin;
  return dispatch => {
    return fetch(url + '/api/npmPackages?keyword=react-component')
      .then(req => req.json())
      .then(json => dispatch(receiveCharts(json)))
  }
}

function receiveCharts(json) {
  return {
    type: RECEIVE_CHARTS,
    json: json,
    receivedAt: Date.now()
  }
}

module.exports = {fetchCharts, receiveCharts}
