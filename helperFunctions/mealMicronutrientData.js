const summaryLength = 6;

export function calculateMealMicronutrientData(meal, mealNutrients, summary) {
  if (!mealNutrients) {
    return undefined;
  }
  let mealMicronutrientData;
  if (mealNutrients && mealNutrients.length > 0) {
    mealMicronutrientData = mealNutrients.reduce((acc, curr, nutrientIndex) => {
      return acc.map((row, i) => row + meal.nutrients[nutrientIndex].amount * curr[i] * 0.01);
    }
      , Array(summary ? summaryLength : mealNutrients[0].length).fill(0));
    mealMicronutrientData[1] = meal.name;
  }
  return mealMicronutrientData;
}