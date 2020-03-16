const fs = require("fs");
const fileName = process.argv[2];
const path = require("path");

const filePath = path.join(__dirname, fileName);

const data = fs
	.readFileSync(filePath, "utf8")
	.split(",")
	.map(Number);


data[1] = 12;
data[2] = 2;

let intCode = function(data) {
	let i = 0;
	while (true) {
		let optcode = data[i];
		if (optcode === 99) {
			return;
		} else if (optcode === 1) {
			data[data[i + 3]] = data[data[i + 1]] + data[data[i + 2]];
		} else if (optcode === 2) {
			data[data[i + 3]] = data[data[i + 1]] * data[data[i + 2]];
		}
		i += 4;
	}
};

intCode(data);

