var fs_1 = require('fs');
var path_1 = require('path');
console.log('XDD');
var convertToElements = function (data) {
    var prev = undefined;
    for (var _i = 0; _i < data.length; _i++) {
        var el = data[_i];
        var element = el.split('O');
        console.log('element is: ', element);
    }
};
var fileName = process.argv[2];
var filePath = path_1.join(__dirname, fileName);
var data = fs_1.readFileSync(filePath, 'utf8').split('\n');
convertToElements(data);
var directOrbits = 0;
var xd = 2;
var indirectOrbits = 0;
var orbitCountChecksums = directOrbits + indirectOrbits;
console.log('xddd');
console.log('w');
console.log('XDD');
