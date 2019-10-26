const fs = require('fs');
const foodDes = require('./FOOD_DES.json');
const usdaData = require('./usdaData.json');

const usdaDataLongNames = usdaData.map(
  n => {
    if(foodDes.find(des=>des[0]===n[0])) {
        return [n[0],foodDes.find(des=>des[0]===n[0])[2], ...n.slice(2)];
    } 
    return n;
  }
);

fs.writeFileSync('./usdaDataLong.json', JSON.stringify(usdaDataLongNames));  