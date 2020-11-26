"use strict";
var fs = require("fs");
var fileName = process.argv[2];
var path = require("path");
var filePath = path.join(__dirname, fileName);
var data = fs
    .readFileSync(filePath, "utf8")
    .split(",")
    .map(Number);
var getParameter = function (paramMode, position) {
    return paramMode === 0 ? data[data[position]] : data[position];
};
var intCode = function (data, id) {
    var instructionPointer = 0;
    var outputs = [];
    while (true) {
        var optcodeAndModes = String(data[instructionPointer]).padStart(5, "0");
        var optcode = optcodeAndModes[optcodeAndModes.length - 2] === "0" ? optcodeAndModes.slice(-1) : optcodeAndModes.slice(-2);
        var firstParamMode = Number(optcodeAndModes[optcodeAndModes.length - 3]);
        var secondParamMode = Number(optcodeAndModes[optcodeAndModes.length - 4]);
        // let thirdParamMode = Number(optcodeAndModes[optcodeAndModes.length - 5]);
        if (optcode === "99") {
            return outputs;
        }
        else if (optcode === "1") {
            var firstParam = getParameter(firstParamMode, instructionPointer + 1);
            var secondParam = getParameter(secondParamMode, instructionPointer + 2);
            var thirdParam = data[instructionPointer + 3];
            data[thirdParam] = firstParam + secondParam;
            instructionPointer += 4;
        }
        else if (optcode === "2") {
            var firstParam = getParameter(firstParamMode, instructionPointer + 1);
            var secondParam = getParameter(secondParamMode, instructionPointer + 2);
            var thirdParam = data[instructionPointer + 3];
            data[thirdParam] = firstParam * secondParam;
            instructionPointer += 4;
        }
        else if (optcode === "3") {
            var firstParam = data[instructionPointer + 1];
            data[firstParam] = id;
            instructionPointer += 2;
        }
        else if (optcode === "4") {
            var output = firstParamMode === 0 ? data[data[instructionPointer + 1]] : data[instructionPointer + 1];
            outputs.push(output);
            instructionPointer += 2;
        }
    }
};
var result = intCode(data, 1);
console.log(result);
