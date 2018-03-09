import scoreHelpers from '../Assets/scoreHelpers.js';

export default {
  scores: {
    ones: {
      player1: null,
      player2: null,
    },
    twos: {
      player1: null,
      player2: null,
    },
    threes: {
      player1: null,
      player2: null,
    },
    fours: {
      player1: null,
      player2: null,
    },
    fives: {
      player1: null,
      player2: null,
    },
    sixes: {
      player1: null,
      player2: null,
    },
    bonus: {
      player1: null,
      player2: null,
    },
    topTotal: {
      player1: null,
      player2: null,
    },
    onePair: {
      player1: null,
      player2: null,
    },
    threeOfAKind: {
      player1: null,
      player2: null,
    },
    fourOfAKind: {
      player1: null,
      player2: null,
    },
    fullHouse: {
      player1: null,
      player2: null,
    },
    smallStraight: {
      player1: null,
      player2: null,
    },
    bigStraight: {
      player1: null,
      player2: null,
    },
    yahtzee: {
      player1: null,
      player2: null,
    },
    chance: {
      player1: null,
      player2: null,
    },
    bottomTotal: {
      player1: null,
      player2: null,
    },
    total: {
      player1: null,
      player2: null,
    },
  },
  scoreMethods: {
    ones: (dice) => {
      const values = scoreHelpers.extractValues(dice);
      const score = scoreHelpers.getFrequency(values, 1) * 1;
      return score;
    },
    twos: (dice) => {
      const values = scoreHelpers.extractValues(dice);
      return (scoreHelpers.getFrequency(values, 2) * 2);
    },
    threes: (dice) => {
      const values = scoreHelpers.extractValues(dice);
      return (scoreHelpers.getFrequency(values, 3) * 3);
    },
    fours: (dice) => {
      const values = scoreHelpers.extractValues(dice);
      return (scoreHelpers.getFrequency(values, 4) * 4);
    },
    fives: (dice) => {
      const values = scoreHelpers.extractValues(dice);
      return (scoreHelpers.getFrequency(values, 5) * 5);
    },
    sixes: (dice) => {
      const values = scoreHelpers.extractValues(dice);
      return (scoreHelpers.getFrequency(values, 6) * 6);
    },
    onePair: (dice) => {
      let largestPair = 0;
      const values = scoreHelpers.extractValues(dice)
      .sort((a,b) => a - b)
      .reduce((acc, val) => {
        if (val === acc) {
          largestPair = val;
        }
        return val
      }, 0);
      return largestPair * 2;
    },
    threeOfAKind: (dice) => {
      const diceValues = scoreHelpers.extractValues(dice);
      const mode = diceValues
        .reduce((acc, value, i, arr) => (
          scoreHelpers.getFrequency(arr, value) >= 3
            ? value 
            : acc
        ),
        0);
      return mode * 3;
    },
    fourOfAKind: (dice) => {
      const diceValues = scoreHelpers.extractValues(dice);
      const mode = diceValues
        .reduce((acc, value, i, arr) => (
          scoreHelpers.getFrequency(arr, value) >= 4
            ? value 
            : acc
        ),
        0);
      return mode * 4;
    },
    fullHouse: (dice) => {
      const values = scoreHelpers.extractValues(dice);
      const frequencies = values.reduce((acc, val, i, arr) => {
        const freq = scoreHelpers.getFrequency(values, val);
        return (freq >= 2)
          ? Object.assign({}, acc, { [val]: freq })
          : acc
      }, {})

      const valid = Object.keys(frequencies).reduce((acc, key, i, arr) => {
        return acc + frequencies[key];
      }, 0);

      return (valid >= 5)
        ? 25
        : 0;
    },
    smallStraight: (dice) => {
      const values = scoreHelpers.extractValues(dice)
        .sort((a,b) => a - b);
      return scoreHelpers.getStreakLength(values) >= 4
        ? 30
        : 0;
    },
    bigStraight: (dice) => {
      const values = scoreHelpers.extractValues(dice)
        .sort((a,b) => a - b);
      return scoreHelpers.getStreakLength(values) >= 5
        ? 40
        : 0;
    },
    yahtzee: (dice) => {
      const diceValues = scoreHelpers.extractValues(dice);
      const mode = diceValues
        .reduce((acc, value, i, arr) => (
          scoreHelpers.getFrequency(arr, value) === 5
            ? 50 
            : 0
        ),
        0);
      return mode;
    },
    chance: (dice) => {
      const values = scoreHelpers.extractValues(dice);
      return values.reduce((acc, val) => acc + val, 0);
    },
  },
};
