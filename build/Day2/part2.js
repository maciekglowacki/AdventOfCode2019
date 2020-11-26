"use strict";
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
var fileName = process.argv[2];
var path = require("path");
var filePath = path.join(__dirname, fileName);
var data = fs
    .readFileSync(filePath, "utf8")
    .split(",")
    .map(Number);
var intCode = function (data, n, v) {
    data_mutated = __spread(data);
    data_mutated[1] = n;
    data_mutated[2] = v;
    var i = 0;
    while (true) {
        var optcode = data_mutated[i];
        if (optcode === 99) {
            return data_mutated[0];
        }
        else if (optcode === 1) {
            data_mutated[data_mutated[i + 3]] = data_mutated[data_mutated[i + 1]] + data_mutated[data_mutated[i + 2]];
        }
        else if (optcode === 2) {
            data_mutated[data_mutated[i + 3]] = data_mutated[data_mutated[i + 1]] * data_mutated[data_mutated[i + 2]];
        }
        i += 4;
    }
};
var noun = Array.from(Array(100).keys());
var verb = Array.from(Array(100).keys());
var checkForValue = function (noun, verb, value) {
    var e_1, _a, e_2, _b;
    try {
        for (var noun_1 = __values(noun), noun_1_1 = noun_1.next(); !noun_1_1.done; noun_1_1 = noun_1.next()) {
            n = noun_1_1.value;
            try {
                for (var verb_1 = (e_2 = void 0, __values(verb)), verb_1_1 = verb_1.next(); !verb_1_1.done; verb_1_1 = verb_1.next()) {
                    v = verb_1_1.value;
                    if (intCode(data, n, v) === value) {
                        return [n, v];
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (verb_1_1 && !verb_1_1.done && (_b = verb_1.return)) _b.call(verb_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (noun_1_1 && !noun_1_1.done && (_a = noun_1.return)) _a.call(noun_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
};
var calculateFinalScore = function (n, v) { return n * 100 + v; };
var xd = checkForValue(noun, verb, 19690720);
console.log(calculateFinalScore(xd[0], xd[1]));
