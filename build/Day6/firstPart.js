"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var e_1, _a, e_2, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
function arraysEqual(a1, a2) {
    /* WARNING: arrays must not contain {objects} or behavior may be undefined */
    return JSON.stringify(a1) == JSON.stringify(a2);
}
var convertToElements = function (data) {
    var e_3, _a;
    var chains = [];
    try {
        for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
            var el = data_1_1.value;
            var _b = __read(el.split(')'), 2), current = _b[0], next = _b[1];
            if (chains.length === 0) {
                var element_1 = { prev: undefined, current: current, next: next };
                // console.log('element is: ', element);
                chains.push(element_1);
            }
            else if (chains[chains.length - 1].next === current) {
                var element_2 = { prev: chains[chains.length - 1].current, current: current, next: next };
                chains.push(element_2);
            }
            else {
                var element_3 = { prev: chains[chains.length - 1].current, current: chains[chains.length - 1].next, next: undefined };
                chains.push(element_3);
                for (var i_1 = 0; i_1 < chains.length; i_1++) {
                    if (chains[i_1].next === current) {
                        var element_4 = { prev: chains[i_1].current, current: current, next: next };
                        chains.push(element_4);
                    }
                }
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    var element = { prev: chains[chains.length - 1].current, current: chains[chains.length - 1].next, next: undefined };
    chains.push(element);
    return chains;
};
var fileName = process.argv[2];
var filePath = path_1.join(__dirname, fileName);
var data = fs_1.readFileSync(filePath, 'utf8').split('\n');
var chains = [];
var sum = 0;
var elements = convertToElements(data);
var _loop_1 = function (el) {
    if (el.next === undefined) {
        console.log('element is: ', el);
        var chain = [];
        var copyEl_1 = __assign({}, el);
        while (copyEl_1.prev) {
            copyEl_1 = elements.find(function (el) { return el.current === copyEl_1.prev; });
            // console.log('copy el is: ', copyEl);
            chain.push(copyEl_1.current);
        }
        chains.push(chain.reverse());
    }
};
try {
    for (var elements_1 = __values(elements), elements_1_1 = elements_1.next(); !elements_1_1.done; elements_1_1 = elements_1.next()) {
        var el = elements_1_1.value;
        _loop_1(el);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (elements_1_1 && !elements_1_1.done && (_a = elements_1.return)) _a.call(elements_1);
    }
    finally { if (e_1) throw e_1.error; }
}
console.log('chains: ', chains);
var transformed = [];
try {
    for (var chains_1 = __values(chains), chains_1_1 = chains_1.next(); !chains_1_1.done; chains_1_1 = chains_1.next()) {
        var chain = chains_1_1.value;
        console.log('i am here');
        console.log('length; ', chain.length);
        for (var i_2 = 0; i_2 <= chain.length - 1; i_2++) {
            var temp = [];
            for (var j = i_2; j < chain.length; j++) {
                temp.push(chain[j]);
            }
            transformed.push(temp);
        }
    }
}
catch (e_2_1) { e_2 = { error: e_2_1 }; }
finally {
    try {
        if (chains_1_1 && !chains_1_1.done && (_b = chains_1.return)) _b.call(chains_1);
    }
    finally { if (e_2) throw e_2.error; }
}
// const elements = convertToElements(data);
// console.log(elements);
var directOrbits = 0;
var xd = 2;
var indirectOrbits = 0;
var orbitCountChecksums = directOrbits + indirectOrbits;
var starMap = fs_1.readFileSync(filePath, 'utf8')
    .split('\n')
    .reduce(function (map, line) {
    map[line.split(')')[1]] = line.split(')')[0];
    return map;
}, {});
console.log('map is: ', starMap);
