

const fs = require('fs')
const fileName = process.argv[2];
const path = require('path')

const filePath = path.join(__dirname, fileName);

const data = fs.readFileSync(filePath, 'utf8').split("\n").map(Number);

let fuelCounterUpper = 0;

let fuelForAModule = function(mass){
    let value = Math.floor(mass / 3) - 2;
    if(value>0){
        return value + fuelForAModule(value);
    } else {
        return 0;
    }
}


for(el of data){
    fuelCounterUpper += fuelForAModule(el);
}


console.log(fuelCounterUpper);