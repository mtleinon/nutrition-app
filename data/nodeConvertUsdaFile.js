// Node program that converts usdaNutrientData.txt to json file
const fs = require('fs');
const readline = require('readline');
const inputFile = './usdaNutrientData.txt';
// const inputFile = './usdaShort.txt';
const outputFile = './usdaData.json';

const readInterface = readline.createInterface({
  input: fs.createReadStream(inputFile),
  output: null,
  console: false
});

let jsonArray = [];
readInterface.on('line', function (line) {
  const jsonLine = line.split('^')
  .map(c => c.replace(/~/g, ''))
  .map((c, i) => i === 1 
    ? c[0] + c.slice(1).toLowerCase().replace(/,/g, ', ').replace(/w\//g, 'with ').replace(/wo\//g, 'with ').replace(/  /g, ' ')
    : c)
  .map((c, i) => i === 1 ? c : (isNaN(+c) ? 0 : +c));
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