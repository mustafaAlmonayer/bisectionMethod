const Parser = require('expr-eval').Parser;

class BisectionMethod {
	equation;
	a;
	b;
	e;
	cArray;
	output;

	constructor(startPoint, endPoint, givenError, equation) {
		this.a = startPoint;
		this.b = endPoint;
		this.e = givenError;
		this.equation = equation;
		this.cArray = new Array();
		this.output = [ {} ];
	}

	solveEquation(number) {
		return Parser.evaluate(this.equation, { x: number });
	}

	solveRoot() {
		if (this.solveEquation(this.a) * this.solveEquation(this.b) > 0) {
			return;
		} else {
			let u = this.solveEquation(this.a);
			let v = this.solveEquation(this.b);
			let i = 0;
			while (true) {
				const c = (this.a + this.b) / 2;
				this.cArray[i] = c;
				const w = this.solveEquation(c);

				if (u * w < 0) {
					this.b = c;
					v = w;
				} else if (v * w < 0) {
					this.a = c;
					u = w;
				} else {
					return;
				}

				if (i !== 0) {
					const curC = this.cArray[i];
					const preC = this.cArray[i - 1];
					const error = Math.abs(curC - preC) / curC;
					this.output[i] = { i, c, w, error };

					if (error < this.e) {
						return this.output;
					}
				} else {
					this.output[i] = { i, c, w, error: undefined };
				}

				i += 1;
			}
		}
	}
}

module.exports = BisectionMethod;
