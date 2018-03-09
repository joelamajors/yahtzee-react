const scoreHelpers = {
  extractValues: (dice) => {
    return dice.map(die => die.val);
  },
  getFrequency: (diceValues, num) => {
    return diceValues.filter((value) => value === num).length;
  },
  getStreakLength: (diceValues) => {
    return diceValues.reduce((acc, val, i, arr) => (
      (val - arr[i - 1] === 1)
        ? acc + 1
        : acc
    ), 1);
  }
}

export default scoreHelpers;
