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
var fs = require("fs");
var path = require("path");
var fileName = process.argv[2];
var filePath = path.join(__dirname, fileName);
var data = fs.readFileSync(filePath, "utf8").split("\n");
var Planet = /** @class */ (function () {
    function Planet(name, nextPlanet, prevPlanet) {
        var _this = this;
        this.hasPrevPlanet = function () { return (_this.prevPlanet ? true : false); };
        this.name = name;
        if (this.nextPlanets === undefined) {
            this.nextPlanets = [];
        }
        if (nextPlanet !== null) {
            this.nextPlanets.push(nextPlanet);
        }
        this.prevPlanet = prevPlanet;
        this.allPrevPlanets = 0;
    }
    return Planet;
}());
// function initialLoad(planets) {
//   for (let el of data) {
//     let name = "";
//     let nextPlanet = "";
//     for (let i = 0; i < el.length; i++) {
//       if (el[i] !== ")") {
//         name += el[i];
//       } else {
//         for (j = i + 1; j < el.length; j++) {
//           nextPlanet += el[j];
//         }
//         break;
//       }
//     }
//     planets.push(new Planet(name, nextPlanet));
//   }
//   return planets;
// }
function initialLoad(data) {
    var e_1, _a;
    var planets = [];
    var _loop_1 = function (line) {
        var prevPlanet = "";
        var nextPlanet = "";
        for (var i_1 = 0; i_1 < line.length; i_1++) {
            if (line[i_1] !== ")") {
                prevPlanet += line[i_1];
            }
            else {
                for (j = i_1 + 1; j < line.length; j++) {
                    nextPlanet += line[j];
                }
                break;
            }
        }
        if (!planets.find(function (planet) { return planet.name === prevPlanet; })) {
            planets.push(new Planet(prevPlanet, nextPlanet, null));
        }
        if (!planets.find(function (planet) { return planet.name === nextPlanet; })) {
            planets.push(new Planet(nextPlanet, null, prevPlanet));
        }
    };
    try {
        for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
            var line = data_1_1.value;
            _loop_1(line);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return planets;
}
function assignPrevPlanet(planets) {
    var e_2, _a, e_3, _b;
    try {
        for (var planets_1 = __values(planets), planets_1_1 = planets_1.next(); !planets_1_1.done; planets_1_1 = planets_1.next()) {
            var planet = planets_1_1.value;
            try {
                for (var planets_2 = (e_3 = void 0, __values(planets)), planets_2_1 = planets_2.next(); !planets_2_1.done; planets_2_1 = planets_2.next()) {
                    var directPlanet = planets_2_1.value;
                    if (directPlanet.nextPlanet === planet.name) {
                        planet.prevPlanet = directPlanet.name;
                        break;
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (planets_2_1 && !planets_2_1.done && (_b = planets_2.return)) _b.call(planets_2);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (planets_1_1 && !planets_1_1.done && (_a = planets_1.return)) _a.call(planets_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return planets;
}
function calculateallPrevPlanets(planets) {
    var e_4, _a;
    var _loop_2 = function () {
        var allPrevPlanetsCount = 0;
        var currentPlanet = planet;
        while (true) {
            if (currentPlanet.hasPrevPlanet()) {
                allPrevPlanetsCount++;
                currentPlanet = planets.find(function (planet) { return planet.name === currentPlanet.prevPlanet; });
                // console.log(currentPlanet.name);
            }
            else {
                break;
            }
        }
        planet.allPrevPlanets = allPrevPlanetsCount;
    };
    try {
        for (var planets_3 = __values(planets), planets_3_1 = planets_3.next(); !planets_3_1.done; planets_3_1 = planets_3.next()) {
            planet = planets_3_1.value;
            _loop_2();
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (planets_3_1 && !planets_3_1.done && (_a = planets_3.return)) _a.call(planets_3);
        }
        finally { if (e_4) throw e_4.error; }
    }
}
function getAllPrevPlanetsCount(planets) {
    var e_5, _a;
    var allPrevPlanetsCount = 0;
    try {
        for (var planets_4 = __values(planets), planets_4_1 = planets_4.next(); !planets_4_1.done; planets_4_1 = planets_4.next()) {
            var planet = planets_4_1.value;
            allPrevPlanetsCount += planet.allPrevPlanets;
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (planets_4_1 && !planets_4_1.done && (_a = planets_4.return)) _a.call(planets_4);
        }
        finally { if (e_5) throw e_5.error; }
    }
    return allPrevPlanetsCount;
}
function parseDataToPlanets(data) {
    var planets = initialLoad(data);
    planets = assignPrevPlanet(planets);
    calculateallPrevPlanets(planets);
    var allPrevPlanetsCount = getAllPrevPlanetsCount(planets);
    console.log(allPrevPlanetsCount);
}
parseDataToPlanets(data);
