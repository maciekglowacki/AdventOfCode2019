const fs = require("fs");
const fileName = process.argv[2];
const path = require("path");

const filePath = path.join(__dirname, fileName);

const data = fs
	.readFileSync(filePath, "utf8")
	.split(",")
	.map(Number);

const getParameter = (paramMode, position) => {
	return paramMode === 0 ? data[data[position]] : data[position];
};

const intCode = function(data, id) {
	let instructionPointer = 0;
	let outputs = [];
	while (true && instructionPointer < data.length) {
		const optcodeAndModes = String(data[instructionPointer]).padStart(5, "0");
		const optcode = optcodeAndModes[optcodeAndModes.length - 2] === "0" ? optcodeAndModes.slice(-1) : optcodeAndModes.slice(-2);
		const firstParamMode = Number(optcodeAndModes[optcodeAndModes.length - 3]);
		const secondParamMode = Number(optcodeAndModes[optcodeAndModes.length - 4]);
		// let thirdParamMode = Number(optcodeAndModes[optcodeAndModes.length - 5]);
		if (optcode === "99") {
			return outputs;
		} else if (optcode === "1") {
			const firstParam = getParameter(firstParamMode, instructionPointer + 1);
			const secondParam = getParameter(secondParamMode, instructionPointer + 2);
			const thirdParam = data[instructionPointer + 3];
			data[thirdParam] = firstParam + secondParam;
			instructionPointer += 4;
		} else if (optcode === "2") {
			const firstParam = getParameter(firstParamMode, instructionPointer + 1);
			const secondParam = getParameter(secondParamMode, instructionPointer + 2);
			const thirdParam = data[instructionPointer + 3];
			data[thirdParam] = firstParam * secondParam;
			instructionPointer += 4;
		} else if (optcode === "3") {
			const firstParam = data[instructionPointer + 1];
			data[firstParam] = id;
			instructionPointer += 2;
		} else if (optcode === "4") {
			let output = firstParamMode === 0 ? data[data[instructionPointer + 1]] : data[instructionPointer + 1];
			outputs.push(output);
			instructionPointer += 2;
		} else if (optcode === "5") {
			const firstParam = getParameter(firstParamMode, instructionPointer + 1);
			const secondParam = getParameter(secondParamMode, instructionPointer + 2);
			firstParam !== 0 ? instructionPointer = secondParam : instructionPointer += 3;
		} else if (optcode === "6") {
			const firstParam = getParameter(firstParamMode, instructionPointer + 1);
			const secondParam = getParameter(secondParamMode, instructionPointer + 2);
			firstParam === 0 ? instructionPointer = secondParam : instructionPointer += 3;
		} else if (optcode === "7") {
			const firstParam = getParameter(firstParamMode, instructionPointer + 1);
			const secondParam = getParameter(secondParamMode, instructionPointer + 2);
			const thirdParam = data[instructionPointer + 3];
			data[thirdParam] = firstParam < secondParam ? 1 : 0;
			instructionPointer += 4;
		} else if (optcode === "8") {
			const firstParam = getParameter(firstParamMode, instructionPointer + 1);
			const secondParam = getParameter(secondParamMode, instructionPointer + 2);
			const thirdParam = data[instructionPointer + 3];
			data[thirdParam] = firstParam === secondParam ? 1 : 0;
			instructionPointer += 4;
		}
	}
};
