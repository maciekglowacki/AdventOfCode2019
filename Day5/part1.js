const fs = require("fs");
const fileName = process.argv[2];
const path = require("path");

const filePath = path.join(__dirname, fileName);

const data = fs
	.readFileSync(filePath, "utf8")
	.split(",")
	.map(Number);

let intCode = function(data, id) {
	let i = 0;
	let outputs = [];
	while (true) {
		let optcodeAndModes = String(data[i]);
		let optcode;
		if (optcodeAndModes[optcodeAndModes.length - 2] === "0") {
			optcode = optcodeAndModes.slice(-1);
		} else {
			optcode = optcodeAndModes.slice(-2);
		}
		// console.log(optcode);
		let firstParamMode = optcodeAndModes.length >= 3 ? Number(optcodeAndModes[optcodeAndModes.length - 3]) : 0;
		let secondParamMode = optcodeAndModes.length >= 4 ? Number(optcodeAndModes[optcodeAndModes.length - 4]) : 0;
		// let thirdParamMode = optcodeAndModes.length >= 5 ? Number(optcodeAndModes[optcodeAndModes.length - 5]) : 0;

		if (optcode === "99") {
			console.log(data);
			return outputs;
			// return data[0];
		} else if (optcode === "1") {
			let firstParam = firstParamMode === 0 ? data[data[i + 1]] : data[i + 1];
			let secondParam = secondParamMode === 0 ? data[data[i + 2]] : data[i + 2];
			//output value
			data[data[i + 3]] = firstParam + secondParam;
			i += 4;
		} else if (optcode === "2") {
			let firstParam = firstParamMode === 0 ? data[data[i + 1]] : data[i + 1];
			let secondParam = secondParamMode === 0 ? data[data[i + 2]] : data[i + 2];
			//output value
			data[data[i + 3]] = firstParam * secondParam;
			i += 4;
		} else if (optcode === "3") {
			data[data[i + 1]] = id;
			i += 2;
		} else if (optcode === "4") {
			let output = firstParamMode === 0 ? data[data[i + 1]] : data[i + 1];
			outputs.push(output);
			i += 2;
		}
	}
};

let sample = [1002, 4, 3, 4, 33];

// console.log(intCode(sample, 1));
let result = intCode(data, 1);

console.log(result);

// let arr = [1,2,3,4,5,6,7,8,9];
// console.log(arr.slice(-2));
