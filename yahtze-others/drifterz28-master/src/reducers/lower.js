import {UPDATE_LOWER} from '../constants';

const initLower = [
	{
		label: '3 of a Kind',
		isLocked: false,
		points: null,
		description: '',
		maxPoints: 30
	},{
		label: '4 of a Kind',
		isLocked: false,
		points: null,
		description: '',
		maxPoints: 30
	},{
		label: 'Full House',
		isLocked: false,
		points: null,
		description: '',
		maxPoints: 25
	},{
		label: 'Small Straight',
		isLocked: false,
		points: null,
		description: '',
		maxPoints: 30
	},{
		label: 'Large Straight',
		isLocked: false,
		points: null,
		description: '',
		maxPoints: 40
	},{
		label: 'Yahtzee',
		isLocked: false,
		points: null,
		description: '',
		maxPoints: 50
	},{
		label: 'Chance',
		isLocked: false,
		points: null,
		description: '',
		maxPoints: 30
	}
];

function update(state = initLower, action) {
	switch (action.type) {
	case 'UPDATE_LOWER':
			return Object.assign([], state, action);
		default:
			return state;
  }
}

export default update;
