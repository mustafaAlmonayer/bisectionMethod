const BisectionMethod = require('./bisectionMethod');

const bisectionMethod = new BisectionMethod(0, 1, 0.0001, 'x^3-3*x+1', 'bisection');
console.log(bisectionMethod.solveRoot());
