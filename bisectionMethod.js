const Parser = require('expr-eval').Parser;

class BisectionMethod {
	constructor(startPoint, endPoint, givenError, equation, config) {
		this.a = startPoint;
		this.b = endPoint;
		this.e = givenError;
		this.equation = equation;
		this.config = config;
		this.c = undefined;
		this.cArray = new Array();
		this.output = [ {} ];
	}

	solveEquation(number) {
		return Parser.evaluate(this.equation, { x: number });
	}

	bisectionRoot() {
		this.c = (this.a + this.b) / 2;
	}

	falsePositionRoot() {
		const fb = this.solveEquation(this.b);
		const fa = this.solveEquation(this.a);
		this.c = this.b - fb * (this.a - this.b) / (fa - fb);
	}

	solveRoot() {
		if (this.solveEquation(this.a) * this.solveEquation(this.b) > 0) {
			return;
		} else {
			let u = this.solveEquation(this.a);
			let v = this.solveEquation(this.b);
			let i = 0;

			while (true) {
				if (this.config) {
					this.bisectionRoot();
				} else {
					this.falsePositionRoot();
					console.log(this.c);
				}

				this.cArray[i] = this.c;
				const w = this.solveEquation(this.c);

				if (u * w < 0) {
					this.b = this.c;
					v = w;
				} else {
					this.a = this.c;
					u = w;
				}

				if (i !== 0) {
					const curC = this.cArray[i];
					const preC = this.cArray[i - 1];
					const error = Math.abs((curC - preC) / curC);
					const root = this.c;
					this.output[i] = { i, root, w, error };

					if (error < this.e) {
						return this.output;
					}
				} else {
					const root = this.c;
					this.output[i] = { i, root, w, error: undefined };
				}

				i += 1;
			}
		}
	}
}

module.exports = BisectionMethod;
