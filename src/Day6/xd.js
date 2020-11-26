const fs = require('fs');
const path = require('path');

const fileName = process.argv[2];
const filePath = path.join(__dirname, fileName);

const starMap = fs
  .readFileSync(filePath, 'utf8')
  .split('\n')
  .map((el) => el.replace('\r', ''))
  .reduce((map, line) => {
    map[line.split(')')[1]] = line.split(')')[0];
    return map;
  }, {});
console.log(starMap);

const getAncestorCount = (body) => (body in starMap ? 1 + getAncestorCount(starMap[body]) : 0);

// starMap defined as above...
const getAncestors = (body) => (body in starMap ? [...getAncestors(starMap[body]), starMap[body]] : []);

const youAncestors = getAncestors('YOU');
const santaAncestors = getAncestors('SAN');

const transfers = youAncestors
  .filter((body) => santaAncestors.includes(body))
  .map((body) => [
    // .reverse is actually not necessary...
    ...youAncestors.slice(youAncestors.indexOf(body)).reverse(),
    // + 1 because we'd include the common planet twice
    ...santaAncestors.slice(santaAncestors.indexOf(body) + 1),
  ]);

// - 1 because we're counting the movements, not the positions
console.log(Math.min(...transfers.map((xfer) => xfer.length - 1)));
