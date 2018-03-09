// This file has some useful mathematical support functions.

// factorial returns the factorial of the non-negative integer n.
export function factorial(n) {
  if (n < 0)
    throw new Error('Invalid factorial: factorial does not support negative input values.')
  if (factorial.memoization === undefined)
    factorial.memoization = []
  if (factorial.memoization[n] === undefined)
    factorial.memoization[n] = (n === 0 ? 1 : n*factorial(n-1))
  return factorial.memoization[n]
}

// binomial returns (n above a), where n and a should both be positive integers and n >= a.
export function binomial(n,a) {
  if (n < a)
    throw new Error('Invalid binomial: the given value of n was smaller than the given value of a. The value of n was "' + n + '" while the value of a was "' + a + '".')
  return factorial(n)/factorial(a)/factorial(n-a)
}
