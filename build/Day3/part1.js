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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var fs = require("fs");
var path = require("path");
var fileName = process.argv[2];
var filePath = path.join(__dirname, fileName);
var data = fs.readFileSync(filePath, "utf8").split("\n");
var firstWire = data[0].split(",");
var secondWire = data[1].split(",");
//creating object from anoter object without arrow function
function getPosition(_a) {
    var x = _a.x, y = _a.y;
    return { x: x, y: y };
}
//creating object from another object without destructuring
function getPositionWithoutRestructuring(position) {
    return {
        x: position.x,
        y: position.y,
    };
}
function getWirePathCoordinates(wire) {
    var e_1, _a;
    var currentPosition = { x: 0, y: 0 };
    var coordinates = new Set();
    try {
        for (var wire_1 = __values(wire), wire_1_1 = wire_1.next(); !wire_1_1.done; wire_1_1 = wire_1.next()) {
            var el = wire_1_1.value;
            var direction = el[0];
            var length = el.slice(1);
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
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (wire_1_1 && !wire_1_1.done && (_a = wire_1.return)) _a.call(wire_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return coordinates;
}
var pathCoordinatesFirstWire = getWirePathCoordinates(firstWire);
var pathCoordinatesSecondWire = __spread(getWirePathCoordinates(secondWire));
var intersection = pathCoordinatesSecondWire
    .filter(function (pos) { return pathCoordinatesFirstWire.has(pos); })
    .map(function (pos) { return JSON.parse(pos); })
    .map(function (pos) { return Math.abs(pos.x) + Math.abs(pos.y); })
    .sort(function (a, b) { return a - b; });
console.log(intersection[0]);
