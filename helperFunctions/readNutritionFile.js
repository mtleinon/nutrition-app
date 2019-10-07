
const finelli = require('./finelli6.json');

export function readNutritionFile(addNutrient, addNutrientInfo) {

  for (const [i, finelliNutrition] of finelli.entries()) {
    // console.log(i, finelliNutrition);
    // if (i > 10) {
    //   break;
    // }
    if (i === 0) {
      // First row in the file contains header info of the
      // nutrition table. Add it to redux.
      addNutrientInfo(nutritionInfo);
    } else {
      // All other rows contain data of one nutrition. 
      // Convert data to numbers and store each nutrition
      // to redux
      nutrition = {};
      nutrition = {
        id: +finelliNutrition[0],
        name: finelliNutrition[1],
        energy: +finelliNutrition[2].replace(',', '.').replace(' ', ''),
        carbohydrates: +finelliNutrition[3].replace(',', '.').replace(' ', ''),
        fet: +finelliNutrition[4].replace(',', '.').replace(' ', ''),
        protein: +finelliNutrition[5].replace(',', '.').replace(' ', '')
      };
      for (const [j, part] of finelliNutrition.entries()) {
        if (j > 1) {
          nutrition[j.toString()] = +finelliNutrition[j]
            .replace(',', '.')
            .replace(' ', '');
        } else {
          nutrition[j.toString()] = finelliNutrition[j];
        }
      }

      addNutrient(nutrition);
    }
  }
}
