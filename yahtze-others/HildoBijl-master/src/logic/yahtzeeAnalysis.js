import { factorial, binomial } from './math.js'
import { getJSON, createAscendingArray } from './util.js'

// yahtzeeAnalysis is an object that analyzes the Yahtzee game.
const yahtzeeAnalysis = (() => {
  class YahtzeeAnalysis {
    // constructor sets up the game settings.
    constructor(version = 'full') {
      this.version = version
      switch (version) {
        case 'full': // Full-game Yahtzee settings
          this.numDice = 5 // Number of dice
          this.numSides = 6 // Number of sides on each dice
          this.bonusThreshold = 63 // Bonus threshold
          this.bonus = 35 // Bonus magnitude
          this.numFields = 13 // Number of fields on the score card
          this.numRolls = 3 // Number of rolls you get each turn
          break
        case 'semi': // Half-game Yahtzee settings
          this.numDice = 5 // Number of dice
          this.numSides = 6 // Number of sides on each dice
          this.bonusThreshold = 63 // Bonus threshold
          this.bonus = 35 // Bonus magnitude
          this.numFields = 7 // Number of fields on the score card
          this.numRolls = 3 // Number of rolls you get each turn
          break
        case 'easy': // Simplified game settings
          this.numDice = 3 // Number of dice
          this.numSides = 4 // Number of sides on each dice
          this.bonusThreshold = 20 // Bonus threshold
          this.bonus = 15 // Bonus magnitude
          this.numFields = 5 // Number of fields on the score card
          this.numRolls = 3 // Number of rolls you get each turn
          break
        default:
          throw new Error('Unknown Yahtzee game mode provided. A game mode of "' + version + '" was given.')
      }
      this.values = [] // Values for each game state (to be calculated).
      this.calculateTriangleNumbers() // Helpful numbers to be used during the game analysis.
    }

    // initialize sets up the game. It returns a promise.
    initialize() {
      return this.loadValues()
    }

    // calculateTriangleNumbers will calculate the triangle numbers needed for analyzing the game.
    calculateTriangleNumbers() {
      if (this.triangleNumbers !== undefined)
        return
      let index1Length = Math.max(this.numSides + 1, this.numDice + 2)
      let index2Length = Math.max(this.numSides, this.numDice + 1)
      this.triangleNumbers = [new Array(index2Length).fill(1)]
      this.triangleNumbers[0][0] = 0
      for (let i = 1; i < index1Length; i++) {
        this.triangleNumbers[i] = this.triangleNumbers[i-1].reduce((acc,v,i) => {
          acc.push((i === 0 ? 0 : acc[i-1]) + v)
          return acc
        }, [])
      }
    }

    // showStatus returns a string telling us what the analysis of the game is.
    showStatus() {
      if (this.values.length === 0)
        return 'Game has not been analyzed yet.'
      return 'The average value of the game is ' + Math.round(this.values[0]*10)/10 + '.'
    }

    /*
     * The following functions are useful for calculating scores which we can obtain for certain fields.
     */

    // Script for assigning scores to rolls. So basically what the score card does.
    fieldScore(field, roll) {
      // Check the input.
      if (field < 0 || field >= this.numFields)
        throw new Error('Invalid Yahtzee field. A field of "' + field + '" was given, while there are only ' + this.numFields + ' fields.')
      if (roll.length !== this.numDice)
        throw new Error('Invalid number of dice given in a roll. Expected ' + this.numDice + ' dice, but received an array with ' + roll.length + '.')

      // Check the number-fields.
      if (field < this.numSides)
        return (field+1)*this.getNumDiceEqualTo(roll, field+1)

      // Check the other fields.
      switch(field - this.numSides) {
        case 0: // Three of a kind
          return this.getNumDiceEqual(roll) < 3 ? 0 : this.getSumOfDice(roll)
        case 1: // Four of a kind
          return this.getNumDiceEqual(roll) < 4 ? 0 : this.getSumOfDice(roll)
        case 2: // Full house
          return roll[0] === roll[1] && roll[3] === roll[4] && (roll[2] === roll[1] || roll[2] === roll[3]) ? 25 : 0
        case 3: // Small straight
          return this.isFlawedStraight(roll) ? 30 : 0
        case 4: // Large straight
          return this.isStraight(roll) ? 40 : 0
        case 5: // Chance
          return this.getSumOfDice(roll)
        case 6: // Yahtzee
          return this.getNumDiceEqual(roll) < this.numDice ? 0 : 50
        default:
          throw new Error('Unknown field number encountered. Received "' + field + '" while we only support at most ' + (this.numSides + 7) + ' fields.')
      }
    }

    // bonusScore tells us how many points this field contributes to the bonus, subject to the given roll.
    bonusScore(field, roll) {
      if (field < this.numSides)
        return this.fieldScore(field, roll)
      else
        return 0
    }

    // getNumDiceEqualTo returns how many dice in the roll are equal to the given number.
    getNumDiceEqualTo(roll, number) {
      return roll.reduce((acc,v) => acc + (v === number ? 1 : 0), 0)
    }

    // getNumDiceEqual returns the largest number of dice in the roll that are equal to each other. So [3,2,2,1,1,1,1] returns 4, because there are four numbers equal to each other.
    getNumDiceEqual(roll) {
      let numDiceData = roll.reduce((acc,v) => (v === acc[0] ? [v,++acc[1],acc[2]] : [v,1,Math.max(acc[1],acc[2])]), [undefined,0,1])
      return Math.max(numDiceData[2], numDiceData[1])
    }

    // getSumOfDice returns the sum of all the dice in the roll.
    getSumOfDice(roll) {
      return roll.reduce((acc,d) => acc+d, 0)
    }

    // isStraight returns a boolean: are all the dice in the roll a straight?
    isStraight(roll) {
      for (let i = 0; i < roll.length-1; i++) {
        if (roll[i] !== roll[i+1] + 1)
          return false
      }
      return true
    }

    // isFlawedStraight returns a boolean: if we remove one dice (just the correct one) from the roll, are we then left with a straight?
    isFlawedStraight(roll) {
      for (let j = 0; j < roll.length; j++) {
        let cutRoll = roll.reduce((acc,v,i) => {
          if (j !== i)
            acc.push(v)
          return acc
        }, [])
        if (this.isStraight(cutRoll))
          return true
      }
      return false
    }

    /*
     * Functions analyzing the game and its states. This can tell you the optimal strategy.
     */

    // analyze calculates the values of the game. We can do this by just asking for a certain value, but analyze calculates them all in one go, and by doing it in the right order we save some computational complexity. If the optional parameter verbose is set to true, we get regular output on how far along we are.
    analyze(verbose = false) {
      // Did we already calculate the values? If so, don't do it again.
      if (this.values !== undefined && this.values.length > 0)
        return

      // We start walking through all the states, sorting them by the number of fields that are taken on the score card.
      if (verbose)
        console.log('Analyzing all game states')
      let startTime = (new Date()).getTime()
      let statesChecked = 0
      for (let fieldsTaken = this.numFields; fieldsTaken >= 0; fieldsTaken--) {
        // Analyze all game states with the given number of fields taken.
        if (verbose)
          console.log('Looking at all states in which ' + (fieldsTaken === 1 ? 'one field is' : fieldsTaken + ' fields are') + ' already taken.')
        let takenGenerator = this.constructor.binaryGeneratorWithTrue(this.numFields, fieldsTaken)
        for (let taken of takenGenerator) {
          for (let bonus = 0; bonus <= this.bonusThreshold; bonus++) {
            this.getValue({
              taken: taken,
              bonus: bonus,
            })
          }
        }

        // If required, report on the results.
        if (verbose) {
          statesChecked+= binomial(this.numFields, fieldsTaken)
          let totalStates = Math.pow(2,this.numFields)
          let timePassed = ((new Date()).getTime() - startTime)/1000
          let timeLeft = timePassed/(statesChecked - 1)*(totalStates - statesChecked)
          console.log('States with ' + (fieldsTaken === 1 ? 'one field' : fieldsTaken + ' fields') + ' taken are analyzed. ' + statesChecked + '/' + totalStates + ' (' + Math.round(statesChecked/totalStates*100*10)/10 + '%) part done. Time passed is ' + Math.round(timePassed*10)/10 + ' seconds.' + (fieldsTaken !== this.numFields ? ' Estimated time left is ' + Math.round(timeLeft*10)/10 + ' seconds.' : ''))
        }
      }

      // Extract the result of the analysis.
      if (verbose) {
        console.log('The average game score, upon perfect play, is ' + Math.round(this.getValue({
          taken: new Array(this.numFields).fill(false),
          bonus: 0
        })*10)/10 + '.')
      }

      console.log('Analyzing done')
    }

    // getValue obtains the value for the given state. If it's not memorized, it will be calculated.
    getValue(state) {
      // Check if the value is already stored.
      let code = this.codify(state)
      if (this.values[code] !== undefined)
        return this.values[code]

      // Check if the value is a final value, which happens when all fields are taken. In that case, we won't get any more points.
      if (this.getNumOpenFields(state) === 0) {
        this.values[code] = 0
        return this.values[code]
      }

      // It's calculation time! We browse through possible rolls and calculate each of their values.
      let stateValues = this.analyzeState(state) // The values for each roll (and hold/field) at each possible reroll step.
      this.values[code] = stateValues[0] // The value of the actual state.
      return this.values[code]
    }

    // analyze analyzes a given game state. It returns an array with nr+1 elements. (The steps.) The first element [0] gives the value of the state. The next nr-1 elements are objects with properties 'rollValues' and 'holdValues'. The last element is an object with properties 'rollValues' and 'fieldValues'. They indicate the values of the given rolls, and of the given hold/field choices. Default indices are used.
    analyzeState(state) {
      // Browse through all possible rolls, and for each roll examine which field gives the best value.
      let fields = this.getAllFields() // An array from 0 to nf-1, denoting the field numbers of the game.
      let rolls = this.getAllRolls() // All possible rolls.
      let holds = this.getAllHolds() // All possible holds.
      let fieldValues = []
      let rollValues = rolls.map((roll, rollIndex) => {
        fieldValues[rollIndex] = fields.map((field) => {
          if (state.taken[field])
            return -1
          let newState = {
            taken: state.taken.map((v,i) => (v || i === field)),
            bonus: Math.min(state.bonus + this.bonusScore(field, roll), this.bonusThreshold)
          }
          return this.fieldScore(field, roll) + this.getValue(newState) + (state.bonus < this.bonusThreshold && newState.bonus >= this.bonusThreshold ? this.bonus : 0)
        })
        return Math.max.apply(null, fieldValues[rollIndex])
      })

      // Prepare the result array, which will be returned.
      let result = []
      result[this.numRolls] = {
        rollValues: rollValues,
        fieldValues: fieldValues,
      }

      // Look at possible rerolls, and walk backwards through them.
      for (let reroll = this.numRolls - 1; reroll >= 1; reroll--) {
        // Browse through all possible holds and calculate their values. This is done by rerolling the remaining dice and calculating the average value.
        let holdValues = holds.map((hold) => { // eslint-disable-line no-loop-func
          let rolls = this.getAllRolls(this.numDice - hold.length) // These are all the possible rolls we can get with the remaining dice.
          return rolls.reduce((value,roll) => value + rollValues[this.getRollIndex(this.mergeRolls(hold, roll))]*this.getRollWeight(roll), 0) // We add up all the values of each of the rolls, with corresponding weight factor.
        })

        // Browse through all possible rolls, find the hold with the largest value, and set that as the roll value.
        rollValues = rolls.map((roll) => {
          let holds = this.getAllHoldsForRoll(roll) // These are all possible holds that we can generate from the roll.
          let valuePerHold = holds.map((hold) => holdValues[this.getHoldIndex(hold)]) // These are the corresponding values.
          return Math.max.apply(null, valuePerHold) // This is the best value we can get, and hence the value of the roll itself.
        })
        result[reroll] = {
          rollValues: rollValues,
          holdValues: holdValues,
        }
      }

      // That was the difficult part. Now average the values of all rolls at the first step to calculate the actual value of the state.
      result[0] = rolls.reduce((value,roll) => value + rollValues[this.getRollIndex(roll)]*this.getRollWeight(roll), 0) // Taking the average (weighted) value of all rolls at the very first rolling step.
      return result
    }

    // showAllValues logs all state values in a human-comprehensible format.
    showAllValues() {
      let bonusOptions = createAscendingArray(0, this.bonusThreshold) // An array from 0 to bt (inclusive).
      for (let taken of this.constructor.binaryGenerator(this.numFields)) {
        let values = bonusOptions.map((bonusOption) => this.getValue({
          taken: taken,
          bonus: bonusOption,
        }))
        console.log('The state [' + taken.map((v) => (v ? 'X' : ' ')).join(',') + '] has the values [' + values.map((v) => (Math.round(v*10)/10)).join(',') + ']')
      }
    }

    /*
     * The following functions are used to import/export the values, which prevents us from having to calculate them every time.
     */

    // exportValues returns a JSON string representation of the values array.
    exportValues() {
      if (this.values.length === 0)
        return 'Values are not known yet.'
      return '{"type":"regular","values":[' + this.values.join(', ') + ']}' // Export the JSON.
    }

    // exportCompressedValues returns a JSON string representation of the values array after some basic compression. This compression basically gets rid of repeated values as much as possible. In practice, this saves about 24% of the file space.
    exportCompressedValues() {
      if (this.values.length === 0)
        return 'Values are not known yet.'
      this.compressValues()
      return '{"type":"compressed","values":[[' + this.compressedValues.map((v) => v.join(',')).join('],[') + ']]}'
    }

    // loadValues loads the values for the given game, extracting the JSON object and passing it on to the importValues function.
    loadValues() {
      // If we already have values, we don't need to load them again.
      if (this.values.length > 0)
        return Promise.resolve()

      // Load the values. Try both files that are available.
      return getJSON('analysis/YahtzeeSolution' + (this.version.charAt(0).toUpperCase() + this.version.slice(1)) + 'Compressed.json')
        .catch((err) => {
          // First load attempt failed. Trying second.
          return getJSON('YahtzeeSolution' + (this.version.charAt(0).toUpperCase() + this.version.slice(1)) + '.json')
        })
        .catch((err) => {
          // Second load attempt failed.
          // this.analyze() // We could analyze things, but that will take too long. It's better to gently handle things.
          return Promise.reject(err)
        })
        .then((data) => {
          // Data was obtained, either from the first file, from the second file or from the "return false" statement.
          this.importValues(data)
          return Promise.resolve()
        })
    }

    // importValues loads in values from a JSON object.
    importValues(data) {
      // Are the values already defined?
      if (this.values.length > 0)
        return

      // Is there any data?
      if (!data)
        return

      // Importing regular values.
      if (data.type === 'regular') {
        this.values = data.values
        return
      }

      // Importing compressed values.
      if (data.type === 'compressed') {
        for (let i = 0; i < data.values.length; i++) {
          for (let j = data.values[i].length; j < this.bonusThreshold + 1; j++) {
            this.values.push(data.values[i][0])
          }
          Array.prototype.push.apply(this.values, data.values[i])
        }
        return
      }
      throw new Error('Data could not be imported. The type of the data was not known.')
    }

    // compressValues compresses the array of values into one preventing double values as much as possible. This reduces the memory size needed for the array by 24% to 76% (roughly).
    compressValues() {
      // Check if we didn't already compress the values.
      if (this.compressedValues)
        return

      // Walk through the values array to compress it.
      this.compressedValues = []
      let bonusOptions = createAscendingArray(0, this.bonusThreshold) // An array from 0 to bt (inclusive).
      for (let taken of this.constructor.binaryGenerator(this.numFields)) {
        let values = bonusOptions.map((bonusOption) => this.getValue({
          taken: taken,
          bonus: bonusOption,
        }))
        let takenInBinary = taken.reduce((acc,v) => 2*acc+v, 0)
        this.compressedValues[takenInBinary] = this.compressArray(values)
      }
    }

    // compressArray compresses a single value array by replacing the first n elements that are equal to one single element.
    compressArray(arr) {
      let res = [arr[0]]
      let firstDifferent = arr.findIndex((v) => (v !== arr[0]))
      for (let i = (firstDifferent === -1 ? arr.length : firstDifferent); i < arr.length; i++) {
        res.push(arr[i])
      }
      return res
    }

    /*
     * The following functions manipulate game states. They're useful for supporting the analysis.
     */

    // codify transforms a state into a unique number.
    codify(state) {
      let takenInBinary = state.taken.reduce((acc,v) => 2*acc+v, 0)
      return (this.bonusThreshold + 1)*takenInBinary + Math.min(state.bonus, this.bonusThreshold)
    }

    // decodify takes the unique state number and turns it back into a state again.
    decodify(code) {
      let state = {
        bonus: code % (this.bonusThreshold + 1),
        taken: []
      }
      code = (code - state.bonus)/(this.bonusThreshold + 1)
      for (let i = 0; i < this.numFields; i++) {
        state.taken[this.numFields - 1 - i] = (code % 2 === 1)
        code = (code - (code % 2))/2
      }
      return state
    }

    // getNumTakenFields takes a state and calculates how many fields are taken.
    getNumTakenFields(state) {
      return state.taken.reduce((acc,v) => (v ? ++acc : acc), 0)
    }

    // getNumOpenFields takes a state and calculates how many fields are open (not taken).
    getNumOpenFields(state) {
      return this.numFields - this.getNumTakenFields(state)
    }

    /*
     * These functions manipulate rolls. (Remember: a roll is an array of dice values.)
     */

    // mergeRolls takes two rolls and merge them, making sure their descending order remains intact. (I know, it's not the most efficient implementation. We're not using the fact that both arrays are already sorted. But hey, the arrays are small.)
    mergeRolls(roll1 = [], roll2 = []) {
      return roll1.concat(roll2).sort((a,b) => (b - a)) // Concatenate and sort descending.
    }

    // getRollWeight tells us how many times the given roll occurs in all possible rolls. That is, it calculates the weight factor and hence the weight? For example, the roll [1,2,3] occurs much more often than the roll [1,1,1] and hence has a much higher weight.
    getRollWeight(roll) {
      let dividerData = roll.reduce((acc,v) => (v === acc[0] ? [v,++acc[1],acc[2]] : [v,1,acc[2]*factorial(acc[1])]), [undefined,0,1])
      let divider = dividerData[2]*factorial(dividerData[1])
      let weightFactor = factorial(roll.length)/divider
      return weightFactor/Math.pow(this.numSides, roll.length)
    }

    // getRollIndex turns the roll into a unique index number.
    getRollIndex(roll) {
      return roll.reduce((acc,v,i) => (acc + this.triangleNumbers[i+1][this.numSides-1] - this.triangleNumbers[i+1][this.numSides-v]), 0)
    }

    // getHoldIndex turns the hold into a unique index number.
    getHoldIndex(hold) {
      return this.getRollIndex(hold) + this.triangleNumbers[this.numSides][hold.length]
    }

    /*
     * These are some support functions that can save us on runtime. They remember the things they return.
     */

    // getAllFields return an array with all fields indices. So, [0, 1, ..., numFields-1].
    getAllFields() {
      if (this.allFields === undefined)
        this.allFields = createAscendingArray(0, this.numFields - 1) // An array from 0 to nf-1, denoting the field numbers of the game.
      return this.allFields
    }

    // getAllRolls returns an array with all possible rolls that we can make. Inspect its output to see how it works.
    getAllRolls(nd = this.numDice) {
      if (this.allRolls === undefined)
        this.allRolls = []
      if (this.allRolls[nd] === undefined)
        this.allRolls[nd] = Array.from(this.constructor.rollGenerator(nd, this.numSides)) // All possible rolls.
      return this.allRolls[nd]
    }

    // getAllHolds returns an array with all possible holds that we can make. Inspect its output to see how it works.
    getAllHolds() {
      if (this.allHolds === undefined)
        this.allHolds = Array.from(this.constructor.holdGenerator(this.numDice, this.numSides)) // All possible holds.
      return this.allHolds
    }

    // getAllHoldsForRoll return all holds which we can make from a given roll.
    getAllHoldsForRoll(roll) {
      if (this.allHoldsForRoll === undefined)
        this.allHoldsForRoll = []
      let index = this.getRollIndex(roll)
      if (this.allHoldsForRoll[index] === undefined)
        this.allHoldsForRoll[index] = Array.from(this.constructor.subsetGenerator(roll))
      return this.allHoldsForRoll[index]
    }

    /*
     * The following functions return generators. These can be useful to walk through all possible rolls, holds, or something else.
     */

    // rollGenerator creates a generator for all rolls that you can make with the given number of dice, and with nn numbers per dice.
    static *rollGenerator(nd = 0, nn = 6) {
      let roll = new Array(nd).fill(1)
      while (true) {
        yield roll
        // Increment dice roll possibility.
        let incrementDice = roll.findIndex((v) => (v !== nn)) // Index of the first dice not equal to the highest number on the dice.
        if (incrementDice === -1)
          return
        roll = roll.map((v,i) => (i > incrementDice ? roll[i] : roll[incrementDice] + 1)) // eslint-disable-line no-loop-func
      }
    }

    // holdGenerator creates a generator for all holds that you can make with the given number of dice, and with nn numbers per dice.
    static *holdGenerator(nd = 0, nn = 6) {
      for (let i = 0; i <= nd; i++) {
        let rollGenerator = this.rollGenerator(i, nn)
        for (let roll of rollGenerator) {
          yield roll
        }
      }
    }

    // subsetGenerator creates a generator that walks through all possible subsets of items that we can select from the given array. It does not keep track of duplicates, so if we give it [3,2,2] we will get [],[3],[2],[2],[3,2],[3,2],[2,2],[3,2,2].
    static *subsetGenerator(arr) {
      for (let partOfSubset of this.binaryGenerator(arr.length)) {
        yield partOfSubset.reduce((acc,v,i) => {
          if (v)
            acc.push(arr[i])
          return acc
        }, [])
      }
    }

    // binaryGenerator creates a generator that gives all possible arrays of numElements elements in which the elements can be either true or false. If we give it an input of 2, we will get [false,false],[true,false],[false,true],[true,true].
    static *binaryGenerator(numElements = 0) {
      let arr = new Array(numElements).fill(false)
      while (true) {
        yield arr
        // Increment array.
        let incrementIndex = arr.indexOf(false)
        if (incrementIndex === -1)
          return
        arr = arr.map((v,i) => (i > incrementIndex ? arr[i] : i === incrementIndex)) // eslint-disable-line no-loop-func
      }
    }

    // binaryGeneratorWithTrue creates a generator that gives all possible arrays of numElements elements in which numTrue elements are true. If we give it (4,2) then we get [false,false,true,true],[false,true,false,true],[true,false,false,true],[false,true,true,false],[true,false,true,false],[true,true,false,false].
    static *binaryGeneratorWithTrue(numElements = 0, numTrue = 0) {
      let arr = new Array(numElements).fill(true).fill(false, 0, numElements - numTrue)
      while (true) {
        yield arr
        // Increment result.
        let encounteredFalse = 0
        let incrementIndex = arr.findIndex((v,i) => {
          encounteredFalse+= (!v ? 1 : 0)
          return (v && encounteredFalse > 0)
        })
        if (incrementIndex === -1)
          return
        arr = arr.map((v,i) => { // eslint-disable-line no-loop-func
          return (i <= incrementIndex ? (i >= encounteredFalse - 1 && i < incrementIndex) : arr[i])
        })
      }
    }
  }

  return new YahtzeeAnalysis()
})()

export default yahtzeeAnalysis