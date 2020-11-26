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
var util = require("util");
var numbers = [];
for (var i_1 = 246515; i_1 <= 739105; i_1 += 1) {
    numbers.push(i_1);
}
function twoAdjacentDigitsDeclarative(numbers) {
    var e_1, _a;
    var approvedNumbers = [];
    try {
        for (var numbers_1 = __values(numbers), numbers_1_1 = numbers_1.next(); !numbers_1_1.done; numbers_1_1 = numbers_1.next()) {
            var number = numbers_1_1.value;
            number = number.toString();
            for (var i_2 = 0; i_2 < number.length - 1; i_2 += 1) {
                if (number[i_2] === number[i_2 + 1]) {
                    approvedNumbers.push(parseInt(number));
                    break;
                }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (numbers_1_1 && !numbers_1_1.done && (_a = numbers_1.return)) _a.call(numbers_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return approvedNumbers;
}
function twoAdjacentDigitsFunctional(number) {
    number = number.toString();
    for (var i_3 = 0; i_3 < number.length - 1; i_3 += 1) {
        if (number[i_3] === number[i_3 + 1]) {
            return true;
        }
    }
    return false;
}
function increaseOrStaySameDeclarative(numbers) {
    var e_2, _a;
    var approvedNumbers = [];
    try {
        for (var numbers_2 = __values(numbers), numbers_2_1 = numbers_2.next(); !numbers_2_1.done; numbers_2_1 = numbers_2.next()) {
            var number = numbers_2_1.value;
            number = number.toString();
            var approved = true;
            for (var i_4 = 0; i_4 < number.length - 1; i_4 += 1) {
                if (number[i_4] > number[i_4 + 1]) {
                    approved = false;
                }
            }
            if (approved) {
                approvedNumbers.push(parseInt(number));
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (numbers_2_1 && !numbers_2_1.done && (_a = numbers_2.return)) _a.call(numbers_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return approvedNumbers;
}
function increaseOrStaySameFunctional(number) {
    number = number.toString();
    var approved = true;
    for (var i_5 = 0; i_5 < number.length - 1; i_5 += 1) {
        if (number[i_5] > number[i_5 + 1]) {
            approved = false;
        }
    }
    return approved;
}
function notPartOfLargerGroup(number) {
    number = number.toString();
    var approved = false;
    var repeatingDigit = [];
    for (var i_6 = 0; i_6 < number.length - 2; i_6 += 1) {
        if (number[i_6] === number[i_6 + 1] &&
            number[i_6 + 1] === number[i_6 + 2] &&
            number[i_6] === number[i_6 + 2] &&
            !repeatingDigit.includes(number[i_6])) {
            repeatingDigit.push(number[i_6]);
        }
    }
    if (repeatingDigit.length === 2) {
        return false;
    }
    for (var i_7 = 0; i_7 < number.length - 1; i_7 += 1) {
        if (number[i_7] === number[i_7 + 1] && number[i_7] !== repeatingDigit[0]) {
            approved = true;
        }
    }
    return approved;
}
var numbersFunctional = numbers
    .filter(twoAdjacentDigitsFunctional)
    .filter(increaseOrStaySameFunctional)
    .filter(notPartOfLargerGroup).length;
console.dir(numbersFunctional, { maxArrayLength: null });
