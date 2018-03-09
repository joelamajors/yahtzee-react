// This file has some useful utility functions.

// getJSON is like jQuery's getJSON but instead returns a promise, obtained through the fetch function.
export function getJSON(filename) {
	return fetch(new Request(filename, {
		method: 'GET',
		headers: {}
	})).then((data) => data.json())
}

// createAscendingArray creates an array having the numbers [min, min+1, ..., max-1, max].
export function createAscendingArray(min, max) {
  return Array.apply(null, {length: max - min + 1}).map((v,i) => i + min)
}

// roundToDigits rounds the given number to the given amount of digits.
export function roundToDigits(num, digits = 1) {
	const factor = Math.pow(10, digits)
	return Math.round(num*factor)/factor
}

// roundToSignificantDigits rounds a number to make sure it has the given number of significant digits. So we have r(0.00995, 2) become 0.010 while r(0.00994) becomes 0.0099. It returns a string of the result, to ensure that "0.010" keeps its ending zero.
export function roundToSignificantDigits(num, significantDigits) {
	const divisionFactor = 1 - Math.pow(10, -significantDigits)/2
	const digits = -Math.floor(Math.log10(Math.abs(num)/divisionFactor)) + significantDigits - 1
	if (digits >= 12)
		return '0' + (significantDigits > 1 ? '.' + (new Array(significantDigits - 1)).fill(0).join('') : '')
	return parseFloat(roundToDigits(num, digits)).toFixed(digits)
}