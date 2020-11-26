"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var e_1, _a, e_2, _b;
var fs = require("fs");
var path = require("path");
var fileName = process.argv[2];
var filePath = path.join(__dirname, fileName);
var data = fs.readFileSync(filePath, "utf8").split("\n");
var firstWire = data[0].split(",");
var secondWire = data[1].split(",");
function getWirePathCoordinates(wire) {
    var e_3, _a;
    var currentPosition = { x: 0, y: 0, moves: 0 };
    var coordinates = [];
    try {
        for (var wire_1 = __values(wire), wire_1_1 = wire_1.next(); !wire_1_1.done; wire_1_1 = wire_1.next()) {
            var el = wire_1_1.value;
            var direction = el[0];
            var length = el.slice(1);
            switch (direction) {
                case "L":
                    for (i = 0; i < length; i += 1) {
                        currentPosition.x -= 1;
                        currentPosition.moves += 1;
                        var position = (function (_a) {
                            var x = _a.x, y = _a.y, moves = _a.moves;
                            return ({ x: x, y: y, moves: moves });
                        })(currentPosition);
                        coordinates.push(position);
                    }
                    break;
                case "R":
                    for (i = 0; i < length; i += 1) {
                        currentPosition.x += 1;
                        currentPosition.moves += 1;
                        var position = (function (_a) {
                            var x = _a.x, y = _a.y, moves = _a.moves;
                            return ({ x: x, y: y, moves: moves });
                        })(currentPosition);
                        coordinates.push(position);
                    }
                    break;
                case "U":
                    for (i = 0; i < length; i += 1) {
                        currentPosition.y += 1;
                        currentPosition.moves += 1;
                        var position = (function (_a) {
                            var x = _a.x, y = _a.y, moves = _a.moves;
                            return ({ x: x, y: y, moves: moves });
                        })(currentPosition);
                        coordinates.push(position);
                    }
                    break;
                case "D":
                    for (i = 0; i < length; i += 1) {
                        currentPosition.y -= 1;
                        currentPosition.moves += 1;
                        var position = (function (_a) {
                            var x = _a.x, y = _a.y, moves = _a.moves;
                            return ({ x: x, y: y, moves: moves });
                        })(currentPosition);
                        coordinates.push(position);
                    }
                    break;
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (wire_1_1 && !wire_1_1.done && (_a = wire_1.return)) _a.call(wire_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return coordinates;
}
var pathCoordinatesFirstWire = getWirePathCoordinates(firstWire);
var pathCoordinatesSecondWire = getWirePathCoordinates(secondWire);
pathCoordinatesFirstWire = pathCoordinatesFirstWire.map(function (pos) { return JSON.stringify(pos); });
pathCoordinatesSecondWire = pathCoordinatesSecondWire.map(function (pos) { return JSON.stringify(pos); });
try {
    for (var pathCoordinatesFirstWire_1 = __values(pathCoordinatesFirstWire), pathCoordinatesFirstWire_1_1 = pathCoordinatesFirstWire_1.next(); !pathCoordinatesFirstWire_1_1.done; pathCoordinatesFirstWire_1_1 = pathCoordinatesFirstWire_1.next()) {
        var el1 = pathCoordinatesFirstWire_1_1.value;
        try {
            for (var pathCoordinatesSecondWire_1 = (e_2 = void 0, __values(pathCoordinatesSecondWire)), pathCoordinatesSecondWire_1_1 = pathCoordinatesSecondWire_1.next(); !pathCoordinatesSecondWire_1_1.done; pathCoordinatesSecondWire_1_1 = pathCoordinatesSecondWire_1.next()) {
                var el2 = pathCoordinatesSecondWire_1_1.value;
                var minimumSteps = 100000000;
                var xd1 = el1.slice(1, 19);
                var xd2 = el2.slice(1, 19);
                if (xd1 === xd2) {
                    xdd1 = JSON.parse(el1);
                    xdd2 = JSON.parse(el2);
                    console.log(xdd1.moves + xdd2.moves);
                    if (xdd1.moves + xdd2.moves < minimumSteps) {
                        minimumSteps = xdd1.moves + xdd2.moves;
                    }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (pathCoordinatesSecondWire_1_1 && !pathCoordinatesSecondWire_1_1.done && (_b = pathCoordinatesSecondWire_1.return)) _b.call(pathCoordinatesSecondWire_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (pathCoordinatesFirstWire_1_1 && !pathCoordinatesFirstWire_1_1.done && (_a = pathCoordinatesFirstWire_1.return)) _a.call(pathCoordinatesFirstWire_1);
    }
    finally { if (e_1) throw e_1.error; }
}
// let intersection = pathCoordinatesSecondWire
// 	.filter(pos => pathCoordinatesFirstWire.has(pos.slice(1,19)))
// 	.map(pos => JSON.parse(pos));
// console.log(intersection);
