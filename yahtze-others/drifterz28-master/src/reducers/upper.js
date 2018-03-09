import {UPDATE_UPPER} from '../constants';

const initUpper = [
	{
		label: 'Ones',
		isLocked: false,
		points: null,
		description: 'Total Value of Ones',
		hasBonus: false,
		maxPoints: 5
	},{
		label: 'Twos',
		isLocked: false,
		points: null,
		hasBonus: false,
		description: 'Total Value of Twos',
		maxPoints: 10
	},{
		label: 'Threes',
		isLocked: false,
		points: null,
		hasBonus: false,
		description: 'Total Value of Threes',
		maxPoints: 15
	},{
		label: 'Fours',
		isLocked: false,
		points: null,
		hasBonus: false,
		description: 'Total Value of Fours',
		maxPoints: 20
	},{
		label: 'Fives',
		isLocked: false,
		points: null,
		hasBonus: false,
		description: 'Total Value of Fives',
		maxPoints: 25
	},{
		label: 'Sixes',
		isLocked: false,
		points: null,
		hasBonus: false,
		description: 'Total Value of Sixes',
		maxPoints: 30
	}
];

function update(state = initUpper, action) {
	console.log('action', action);
	switch (action.type) {
		case 'UPDATE_UPPER':
			return Object.assign([], state, action.upper);
		default:
			return state;
  }
}

export default update;
