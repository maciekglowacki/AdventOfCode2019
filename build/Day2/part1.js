"use strict";
var fs = require("fs");
var fileName = process.argv[2];
var path = require("path");
var filePath = path.join(__dirname, fileName);
var data = fs
    .readFileSync(filePath, "utf8")
    .split(",")
    .map(Number);
data[1] = 12;
data[2] = 2;
var intCode = function (data) {
    var i = 0;
    while (true) {
        var optcode = data[i];
        if (optcode === 99) {
            return;
        }
        else if (optcode === 1) {
            data[data[i + 3]] = data[data[i + 1]] + data[data[i + 2]];
        }
        else if (optcode === 2) {
            data[data[i + 3]] = data[data[i + 1]] * data[data[i + 2]];
        }
        i += 4;
    }
};
intCode(data);
