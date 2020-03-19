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
		const length = el.slice(1, 3);
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
console.log(intersection);


//testing
// let path1 = getWirePathCoordinates([R75,D30,R83,U83,L12,D49,R71,U7,L72]);
// let path2 = [...getWirePathCoordinates([U62,R66,U55,R34,D71,R55,D58,R83])];
// let intersection = path2.filter(pos => path1.has(pos)).map(pos => JSON.parse(pos));
// console.log(intersection)