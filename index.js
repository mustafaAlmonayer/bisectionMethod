const BisectionMethod = require('./bisectionMethod');

const bisectionMethod = new BisectionMethod(0, 1, 0.00001, 'x^3-3*x+1', true);
console.log(bisectionMethod.solveRoot());
