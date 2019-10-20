export const DATA_ID_I = 0;
export const NAME_I = 1;
export const ENERGY_I = 2;
export const CARBOHYDRATES_I = 3;
export const FET_I = 4;
export const PROTEIN_I = 5;

class NutrientData {
  constructor(id, nutrientData) {
    this.id = id;
    this.nutrientData = nutrientData;
  }
}
export default NutrientData