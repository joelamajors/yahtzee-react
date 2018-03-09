import {UPDATE_SCORES} from '../constants';

const initialState = {
	upperScore: null,
	lowerScore: null,
	totalScore: null,
	upperBonus: null,
	upperYahtzee: null,
	hasYahtzee: false
};

function update(state = initialState, action) {
	switch (action.type) {
		case UPDATE_SCORES:
			return Object.assign({}, state, action.scores);
		default:
			return state;
  }
}

export default update;
