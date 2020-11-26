import { readFileSync } from 'fs';
import { join } from 'path';

function arraysEqual(a1: any, a2: any) {
  /* WARNING: arrays must not contain {objects} or behavior may be undefined */
  return JSON.stringify(a1) == JSON.stringify(a2);
}

type Element = {
  prev?: string;
  next?: string;
  current: string;
};
const convertToElements = (data: Array<string>) => {
  const chains: Array<Element> = [];
  for (const el of data) {
    const [current, next] = el.split(')');
    if (chains.length === 0) {
      const element: Element = { prev: undefined, current, next };
      // console.log('element is: ', element);
      chains.push(element);
    } else if (chains[chains.length - 1].next === current) {
      const element: Element = { prev: chains[chains.length - 1].current, current, next };
      chains.push(element);
    } else {
      const element: Element = { prev: chains[chains.length - 1].current, current: chains[chains.length - 1].next!, next: undefined };
      chains.push(element);
      for (let i = 0; i < chains.length; i++) {
        if (chains[i].next === current) {
          const element: Element = { prev: chains[i].current, current, next };
          chains.push(element);
        }
      }
    }
  }
  const element: Element = { prev: chains[chains.length - 1].current, current: chains[chains.length - 1].next!, next: undefined };
  chains.push(element);
  return chains;
};

const fileName = process.argv[2];
const filePath = join(__dirname, fileName);

const data = readFileSync(filePath, 'utf8').split('\n');
const chains = [];
const sum = 0;
const elements = convertToElements(data);
for (const el of elements) {
  if (el.next === undefined) {
    console.log('element is: ', el);
    const chain = [];
    let copyEl = { ...el };
    while (copyEl.prev) {
      copyEl = elements.find((el) => el.current === copyEl.prev)!;
      // console.log('copy el is: ', copyEl);
      chain.push(copyEl.current);
    }
    chains.push(chain.reverse());
  }
}
console.log('chains: ', chains);
let transformed = [];
for (const chain of chains) {
  console.log('i am here');
  console.log('length; ', chain.length);
  for (let i = 0; i <= chain.length - 1; i++) {
    const temp = [];
    for (let j = i; j < chain.length; j++) {
      temp.push(chain[j]);
    }
    transformed.push(temp);
  }
}

// const elements = convertToElements(data);
// console.log(elements);
const directOrbits = 0;
const xd = 2;
const indirectOrbits = 0;
const orbitCountChecksums = directOrbits + indirectOrbits;

const starMap = readFileSync(filePath, 'utf8')
  .split('\n')
  .reduce((map, line) => {
    map[line.split(')')[1]] = line.split(')')[0];
    return map;
  }, {} as any);

console.log('map is: ', starMap);
