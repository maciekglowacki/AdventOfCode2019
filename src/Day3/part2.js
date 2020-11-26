const fs = require("fs");
const path = require("path");

const fileName = process.argv[2];
const filePath = path.join(__dirname, fileName);

const data = fs.readFileSync(filePath, "utf8").split("\n");

const firstWire = data[0].split(",");
const secondWire = data[1].split(",");

function getWirePathCoordinates(wire) {
	let currentPosition = { x: 0, y: 0, moves: 0 };
	let coordinates = [];
	for (const el of wire) {
		const direction = el[0];
		const length = el.slice(1);
		switch (direction) {
			case "L":
				for (i = 0; i < length; i += 1) {
					currentPosition.x -= 1;
					currentPosition.moves += 1;
					const position = (({ x, y, moves }) => ({ x, y, moves }))(currentPosition);
					coordinates.push(position);
				}
				break;
			case "R":
				for (i = 0; i < length; i += 1) {
					currentPosition.x += 1;
					currentPosition.moves += 1;
					const position = (({ x, y, moves }) => ({ x, y, moves }))(currentPosition);
					coordinates.push(position);
				}
				break;
			case "U":
				for (i = 0; i < length; i += 1) {
					currentPosition.y += 1;
					currentPosition.moves += 1;
					const position = (({ x, y, moves }) => ({ x, y, moves }))(currentPosition);
					coordinates.push(position);
				}
				break;
			case "D":
				for (i = 0; i < length; i += 1) {
					currentPosition.y -= 1;
					currentPosition.moves += 1;
					const position = (({ x, y, moves }) => ({ x, y, moves }))(currentPosition);
					coordinates.push(position);
				}
				break;
		}
	}
	return coordinates;
}

let pathCoordinatesFirstWire = getWirePathCoordinates(firstWire);
let pathCoordinatesSecondWire = getWirePathCoordinates(secondWire);
pathCoordinatesFirstWire = pathCoordinatesFirstWire.map(pos => JSON.stringify(pos));
pathCoordinatesSecondWire = pathCoordinatesSecondWire.map(pos => JSON.stringify(pos));

for (let el1 of pathCoordinatesFirstWire) {
    for (let el2 of pathCoordinatesSecondWire) {
        let minimumSteps = 100000000;
        let xd1 = el1.slice(1,19);
        let xd2 = el2.slice(1,19);
        if(xd1 === xd2){
            xdd1 = JSON.parse(el1);
            xdd2 = JSON.parse(el2);
            console.log(xdd1.moves+xdd2.moves);
            if(xdd1.moves + xdd2.moves < minimumSteps){
                minimumSteps = xdd1.moves + xdd2.moves;
            }
        }
    }
}

// let intersection = pathCoordinatesSecondWire
// 	.filter(pos => pathCoordinatesFirstWire.has(pos.slice(1,19)))
// 	.map(pos => JSON.parse(pos));
// console.log(intersection);
