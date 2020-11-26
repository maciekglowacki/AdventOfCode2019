const fs = require("fs");
const path = require("path");

const fileName = process.argv[2];
const filePath = path.join(__dirname, fileName);

const data = fs.readFileSync(filePath, "utf8").split("\n");

class Planet {
  constructor(name, nextPlanet, prevPlanet) {
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

  hasPrevPlanet = () => (this.prevPlanet ? true : false);
}

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
  let planets = [];
  for (let line of data) {
    let prevPlanet = "";
    let nextPlanet = "";
    for (let i = 0; i < line.length; i++) {
      if (line[i] !== ")") {
        prevPlanet += line[i];
      } else {
        for (j = i + 1; j < line.length; j++) {
          nextPlanet += line[j];
        }
        break;
      }
    }
    if (!planets.find((planet) => planet.name === prevPlanet)) {
      planets.push(new Planet(prevPlanet, nextPlanet, null));
    }

    if (!planets.find((planet) => planet.name === nextPlanet)) {
      planets.push(new Planet(nextPlanet, null, prevPlanet));
    }
  }
  return planets;
}

function assignPrevPlanet(planets) {
  for (let planet of planets) {
    for (let directPlanet of planets) {
      if (directPlanet.nextPlanet === planet.name) {
        planet.prevPlanet = directPlanet.name;

        break;
      }
    }
  }
  return planets;
}

function calculateallPrevPlanets(planets) {
  for (planet of planets) {
    let allPrevPlanetsCount = 0;
    let currentPlanet = planet;
    while (true) {
      if (currentPlanet.hasPrevPlanet()) {
        allPrevPlanetsCount++;
        currentPlanet = planets.find((planet) => planet.name === currentPlanet.prevPlanet);
        // console.log(currentPlanet.name);
      } else {
        break;
      }
    }
    planet.allPrevPlanets = allPrevPlanetsCount;
  }
}

function getAllPrevPlanetsCount(planets) {
  let allPrevPlanetsCount = 0;
  for (const planet of planets) {
    allPrevPlanetsCount += planet.allPrevPlanets;
  }
  return allPrevPlanetsCount;
}

function parseDataToPlanets(data) {
  let planets = initialLoad(data);
  planets = assignPrevPlanet(planets);
  calculateallPrevPlanets(planets);
  const allPrevPlanetsCount = getAllPrevPlanetsCount(planets);
    console.log(allPrevPlanetsCount);

}
parseDataToPlanets(data);
