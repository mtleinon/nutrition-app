const summaryLength = 6;

// export function calculateMealMicronutrientData(meal, mealNutrients, summary) {
//   if (!mealNutrients) {
//     return undefined;
//   }
//   let mealMicronutrientData;
//   if (mealNutrients && mealNutrients.length > 0) {
//     mealMicronutrientData = mealNutrients.reduce((acc, curr, nutrientIndex) => {
//       return acc.map((row, i) => row + meal.nutrients[nutrientIndex].amount * curr[i] * 0.01);
//     }
//       , Array(summary ? summaryLength : mealNutrients[0].length).fill(0));
//     mealMicronutrientData[1] = meal.name;
//   }
//   return mealMicronutrientData;
// }
export function calculateMealMicronutrientData(mealNutrientsData, summary) {
  let mealMicronutrientData;
  if (mealNutrientsData.length > 0) {
    mealMicronutrientData = mealNutrientsData.reduce((acc, curr) => {
      return acc.map((value, i) => value + curr.amount * curr.nutrientData[i] * 0.01);
    }
      , Array(summary ? summaryLength : mealNutrientsData[0].nutrientData.length).fill(0));
  }
  return mealMicronutrientData;
}

/*
  mealNutrientsData [{amount: 123, nutrientData: [1, 'name', energy, prot, ...] },
                     {amount: 432, nutrientData: [5, 'name', energy, prot, ...] }
                    ]

*/