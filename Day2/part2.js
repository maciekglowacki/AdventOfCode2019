const fs = require("fs");
const fileName = process.argv[2];
const path = require("path");

const filePath = path.join(__dirname, fileName);

const data = fs
	.readFileSync(filePath, "utf8")
	.split(",")
	.map(Number);

let intCode = function(data, n, v) {
	data_mutated = [...data];
	data_mutated[1] = n;
	data_mutated[2] = v;
	let i = 0;
	while (true) {
		let optcode = data_mutated[i];
		if (optcode === 99) {
			return data_mutated[0];
		} else if (optcode === 1) {
			data_mutated[data_mutated[i + 3]] = data_mutated[data_mutated[i + 1]] + data_mutated[data_mutated[i + 2]];
		} else if (optcode === 2) {
			data_mutated[data_mutated[i + 3]] = data_mutated[data_mutated[i + 1]] * data_mutated[data_mutated[i + 2]];
		}
		i += 4;
	}
};

let noun = Array.from(Array(100).keys());
let verb = Array.from(Array(100).keys());

let checkForValue = function(noun, verb, value) {
	for (n of noun) {
		for (v of verb) {
			if (intCode(data, n, v) === value) {
				return [n, v];
			}
		}
	}
};

let calculateFinalScore = (n,v) => {return n*100 + v}



let xd = checkForValue(noun, verb, 19690720);
console.log(calculateFinalScore(xd[0],xd[1]));