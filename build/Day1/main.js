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
var e_1, _a;
var fs = require('fs');
var fileName = process.argv[2];
var path = require('path');
var filePath = path.join(__dirname, fileName);
var data = fs.readFileSync(filePath, 'utf8').split("\n").map(Number);
var fuelCounterUpper = 0;
var fuelForAModule = function (mass) {
    var value = Math.floor(mass / 3) - 2;
    if (value > 0) {
        return value + fuelForAModule(value);
    }
    else {
        return 0;
    }
};
try {
    for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
        el = data_1_1.value;
        fuelCounterUpper += fuelForAModule(el);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
    }
    finally { if (e_1) throw e_1.error; }
}
console.log(fuelCounterUpper);
