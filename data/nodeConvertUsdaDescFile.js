// Node program that converts FOOD_DES.txt to json file
const fs = require('fs');
const readline = require('readline');
const inputFile = './FOOD_DES.txt';
// const inputFile = './usdaShort.txt';
const outputFile = './FOOD_DES.json';

const readInterface = readline.createInterface({
  input: fs.createReadStream(inputFile),
  output: null,
  console: false
});

let jsonArray = [];
readInterface.on('line', function (line) {
  const jsonLine = line.split('^')
  .map(c => c.replace(/~/g, ''))
  .map((c,i) => i === 0 ? +c : c)
  jsonArray.push(jsonLine);
});
readInterface.on('close', function () {
  // console.log('JSON = ', JSON.stringify(jsonArray));
  fs.writeFileSync(outputFile, JSON.stringify(jsonArray));
});

// function writeJsonFile(err, contents) {
//   if (err) {
//     console.log('readFile err =', err);
//     return;
//   } 

// }

// fs.readFile('./usdaNutrientData.txt', 'utf8',
//   writeJsonFile
// );