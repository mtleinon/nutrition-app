import * as Constants from '../constants/Constants';

import SummaryData from '../models/SummaryData';
export default function (
  dataToShow,
  nutrientHeadingEnglish,
  nutrientHeadingFinish,
  language) {
  // TODO
  // const relativeToEnergyFinish = (index, value) => {
  //   if (index === ENERGY_I) return value / energy;
  //   let micronutrientEnergy;
  //   if (index === CARBOHYDRATES_I || index === PROTEIN_I) {
  //     micronutrientEnergy = 4 * value * 4.186;
  //   } else {
  //     micronutrientEnergy = 9 * value * 4.186;
  //   }
  //   return micronutrientEnergy / energy;
  // }
  const ENERGY_I = language === Constants.FINISH ? 2 : 3;
  const CARBOHYDRATES_I = language === Constants.FINISH ? 3 : 7;
  const FET_I = language === Constants.FINISH ? 4 : 5;
  const PROTEIN_I = language === Constants.FINISH ? 5 : 4;

  const energy = dataToShow[ENERGY_I];
  const relativeToEnergy = (index, value) => {
    if (index === ENERGY_I) {
      return value / energy;
    }
    let micronutrientEnergy;
    if (index === CARBOHYDRATES_I || index === PROTEIN_I) {
      micronutrientEnergy = 4 * value;
    } else {
      micronutrientEnergy = 9 * value;
    }
    return micronutrientEnergy / energy;
  }

  const summaryDataNutrientIndexes = [ENERGY_I, CARBOHYDRATES_I, FET_I, PROTEIN_I];

  let data;
  if (language === Constants.FINISH) {
    data = summaryDataNutrientIndexes
      .map(index => (
        new SummaryData(
          nutrientHeadingFinish[index].name.fiShort,
          dataToShow[index],
          nutrientHeadingFinish[index].unit,
          relativeToEnergy(index, dataToShow[index]),
        )
      ));
  } else {
    data = summaryDataNutrientIndexes.map(index => (
      new SummaryData(
        nutrientHeadingEnglish[index].name.enShort,
        dataToShow[index],
        nutrientHeadingEnglish[index].unit,
        relativeToEnergy(index, dataToShow[index]),
      )
    ));
  }
  return data;
}