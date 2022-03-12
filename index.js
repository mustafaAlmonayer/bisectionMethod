const BisectionMethod = require('./bisectionMethod');

const bisectionMethod = new BisectionMethod(1, 2, 0.001, 'x^3+3*x-5');
console.log(bisectionMethod.solveRoot());
