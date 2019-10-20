import { NAME_I } from '../models/NutrientData';

function calculateMealMicronutrientData(mealNutrientsData, summaryLength) {
  let mealMicronutrientData;
  if (mealNutrientsData.length > 0) {
    mealMicronutrientData = mealNutrientsData.reduce((acc, curr) => {
      return acc.map((value, i) => value + curr.amount * curr.nutrientData[i] * 0.01);
    }
      , Array(summaryLength ? summaryLength : mealNutrientsData[0].nutrientData.length).fill(0));
  }
  return mealMicronutrientData;
}

function nutrientDataToShow(nutrientData, summaryLength) {
  let dataToShow = [];
  if (summaryLength) {
    dataToShow = nutrientData.slice(0, summaryLength);
  } else {
    dataToShow = [...nutrientData];
  }
  dataToShow[NAME_I] += ' 100g.'
  return dataToShow;
}

function nutrientIdDataToShow(nutrientId, nutrients, nutrientsData, summaryLength) {
  let dataToShow = [];
  const nutrientWithData = nutrients.filter(nutrient => nutrient.id === nutrientId).map(nutrient => (
    {
      amount: nutrient.amount,
      nutrientData: nutrientsData.find(nutrientData => nutrientData[0] === nutrient.nutrientDataId)
    })
  );
  dataToShow = calculateMealMicronutrientData(nutrientWithData, summaryLength);
  dataToShow[NAME_I] = nutrientWithData[0].nutrientData[NAME_I];
  return dataToShow;
}

function mealIdDataToShow(mealId, meals, nutrients, nutrientsData, summaryLength) {
  let dataToShow = [];
  const mealNutrients = nutrients.filter(nutrient => nutrient.mealId == mealId);
  if (mealNutrients.length > 0) {
    const mealNutrientsData = mealNutrients.map(nutrient => (
      {
        amount: nutrient.amount,
        nutrientData: nutrientsData.find(nutrientData => nutrientData[0] === nutrient.nutrientDataId)
      })
    );
    dataToShow = calculateMealMicronutrientData(mealNutrientsData, summaryLength);
    dataToShow[NAME_I] = meals.find(meal => meal.id === mealId).name;
  }
  return dataToShow;
}

function planIdDataToShow(planId, plans, meals, nutrients, nutrientsData, summaryLength) {
  let dataToShow = [];
  const planMeals = meals.filter(meal => meal.planId === planId);
  const planNutrients = nutrients.filter(nutrient => planMeals.some(meal => meal.id === nutrient.mealId));
  if (planNutrients.length > 0) {
    const planNutrientsData = planNutrients.map(nutrient => (
      {
        amount: nutrient.amount,
        nutrientData: nutrientsData.find(nutrientData => nutrientData[0] === nutrient.nutrientDataId)
      })
    );
    dataToShow = calculateMealMicronutrientData(planNutrientsData, summaryLength);
    dataToShow[1] = plans.find(plan => plan.id === planId).name;
  }
  return dataToShow;
}

export function calculateDataToShow(planId, mealId, nutrientId, nutrientData, plans, meals, nutrients, nutrientsData, summaryLength) {
  if (nutrientData) {
    return nutrientDataToShow(nutrientData, summaryLength);
  } else if (nutrientId) {
    return nutrientIdDataToShow(nutrientId, nutrients, nutrientsData, summaryLength);
  } else if (mealId) {
    return mealIdDataToShow(mealId, meals, nutrients, nutrientsData, summaryLength);
  } else if (planId) {
    return planIdDataToShow(planId, plans, meals, nutrients, nutrientsData, summaryLength);
  }
}

/*
  mealNutrientsData [{amount: 123, nutrientData: [1, 'name', energy, prot, ...] },
                     {amount: 432, nutrientData: [5, 'name', energy, prot, ...] }
                    ]

*/