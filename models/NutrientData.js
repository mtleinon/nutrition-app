import Language from '../constants/Language'

export const DATA_ID_I = 0;
export const NAME_I = 1;
export const ENERGY_I = Language.current === Language.finish ? 2 : 3; // TODO Check this, now we don't have current
export const CARBOHYDRATES_I = Language.current === Language.finish ? 3 : 7;
export const FET_I = Language.current === Language.finish ? 4 : 5;
export const PROTEIN_I = Language.current === Language.finish ? 5 : 4;

class NutrientData {
  constructor(id, nutrientData) {
    this.id = id;
    this.nutrientData = nutrientData;
  }
}
export default NutrientData