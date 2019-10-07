import Meal from '../models/Meal';
import Nutrient from '../models/Nutrient';

export default [
  new Meal("1", 'Aamiainen', 'Puuroa ja kananmunia',
    [new Nutrient("606", 300),
    new Nutrient("30175", 400),
    new Nutrient("30175", 400),
    new Nutrient("30175", 400),
    new Nutrient("30175", 400),
    new Nutrient("30175", 400),
    new Nutrient("30175", 400),
    new Nutrient("30175", 400),
    new Nutrient("30175", 400),
    new Nutrient("30175", 400),
    new Nutrient("8513", 200)]),

  new Meal("2", 'Paivallinen', 'Puuroa ja kananmunia',
    [new Nutrient("606", 300),
    new Nutrient("8513", 200)])

]