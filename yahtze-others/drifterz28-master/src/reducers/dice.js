import {ROLL_DICE, UPDATE_HOLDS} from '../constants';

const initialState = {
  turn: 0,
  dice: [0,0,0,0,0],
	holds: [false, false, false, false, false]
};

function update(state = initialState, action) {
	switch (action.type) {
		case ROLL_DICE:
			return Object.assign({}, state, action.dice);
		case UPDATE_HOLDS:
			return Object.assign({}, state, action.dice);
		default:
			return state;
  }
}

export default update;
