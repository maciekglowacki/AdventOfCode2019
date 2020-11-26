const fs = require("fs");
const path = require("path");

const fileName = process.argv[2];
const filePath = path.join(__dirname, fileName);

const data = fs.readFileSync(filePath, "utf8").split("\n");

const firstWire = data[0].split(",");
const secondWire = data[1].split(",");

//creating object from anoter object without arrow function
function getPosition({ x, y }) {
	return { x, y };
}

//creating object from another object without destructuring
function getPositionWithoutRestructuring(position) {
	return {
		x: position.x,
		y: position.y,
	};
}

function getWirePathCoordinates(wire) {
	let currentPosition = { x: 0, y: 0 };
	let coordinates = new Set();
	for (const el of wire) {
		const direction = el[0];
		const length = el.slice(1);
		switch (direction) {
			case "L":
				for (i = 0; i < length; i += 1) {
					currentPosition.x -= 1;
					coordinates.add(JSON.stringify(currentPosition));
				}
				break;
			case "R":
				for (i = 0; i < length; i += 1) {
					currentPosition.x += 1;
					coordinates.add(JSON.stringify(currentPosition));
				}
				break;
			case "U":
				for (i = 0; i < length; i += 1) {
					currentPosition.y += 1;
					coordinates.add(JSON.stringify(currentPosition));
				}
				break;
			case "D":
				for (i = 0; i < length; i += 1) {
					currentPosition.y -= 1;
					coordinates.add(JSON.stringify(currentPosition));
				}
				break;
		}
	}
	return coordinates;
}

let pathCoordinatesFirstWire = getWirePathCoordinates(firstWire);
let pathCoordinatesSecondWire = [...getWirePathCoordinates(secondWire)];

let intersection = pathCoordinatesSecondWire
	.filter(pos => pathCoordinatesFirstWire.has(pos))
	.map(pos => JSON.parse(pos))
	.map(pos => Math.abs(pos.x) + Math.abs(pos.y))
	.sort((a,b)=> a-b);
console.log(intersection[0]);

