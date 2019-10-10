import * as db from '../../helperFunctions/sqlite';

export const SET_ALL_MEALS = 'SET_ALL_MEALS';
export const ADD_MEAL = 'ADD_MEAL';
export const UPDATE_MEAL = 'UPDATE_MEAL';
export const DELETE_MEAL = 'DELETE_MEAL';
// export const ADD_NUTRIENT_TO_MEAL = 'ADD_NUTRIENT_TO_MEAL';
// export const REMOVE_NUTRIENT_FROM_MEAL = 'REMOVE_NUTRIENT_FROM_MEAL';
// export const UPDATE_NUTRIENT_IN_MEAL = 'UPDATE_NUTRIENT_IN_MEAL';

// Handling the plans in redux
export const addMeal = meal => ({ type: ADD_MEAL, meal })
export const updateMeal = meal => ({ type: UPDATE_MEAL, meal })
export const deleteMeal = mealId => ({ type: DELETE_MEAL, mealId })

// Handling the plans in database. Functions update database asychronously
// and when it has finished they update redux accordingly
export const storeMealToDb = meal => {
  return async dispatch => {
    dbResult = await db.insertMeal(meal);
    meal.id = dbResult.insertId;
    // console.log('storeMealToDb', meal);
    dispatch(addMeal(meal));
  }
};

export const updateMealInDb = meal => {
  return async dispatch => {
    // console.log('updateMealToDb', meal);
    dbResult = await db.updateMeal(meal);
    dispatch(updateMeal(meal));
  }
};

export const deleteMealFromDb = mealId => {
  return async dispatch => {
    dbResult = await db.deleteMeal(mealId);
    // console.log('dbResult', dbResult);
    dispatch(deleteMeal(mealId));
  }
};

export const readAllMealsFromDb = () => {
  // console.log('readAllMealsFromDb');
  return async dispatch => {
    const meals = await db.getAllMeals();
    // console.log('readAllPlansFromDatabase', meals);
    dispatch({ type: SET_ALL_MEALS, meals });
  }
};

// export const addNutrientToMeal = (nutrientId, mealId, nutrientDataId, amount) => {
//   return async dispatch => {
//     const newNutrientId = await db.insertNutrient(nutrientId, mealId, nutrientDataId, amount);
//     dispatch({ type: ADD_NUTRIENT_TO_MEAL, nutrientId, mealId, nutrientDataId, amount });
//   }
// };

// export const addReadNutrientToMeal = (nutrientId, mealId, nutrientDataId, amount) => {
//   return { type: ADD_NUTRIENT_TO_MEAL, mealId, nutrientId, amount };
// };

// export const removeNutrientFromMeal = (mealId, nutrientId) => {
//   return async dispatch => {
//     await db.removeNutrient(mealId, nutrientId);
//     dispatch({ type: REMOVE_NUTRIENT_FROM_MEAL, mealId, nutrientId });
//   }
// };

// export const updateNutrientAmount = (mealId, nutrientId, newAmount) => {
//   return async dispatch => {
//     const newMealId = await db.updateNutrientAmount(mealId, nutrientId, newAmount);
//     // console.log('newMealId', newMealId.insertId);

//     dispatch({ type: UPDATE_NUTRIENT_IN_MEAL, mealId, nutrientId, newAmount });
//   }
// };

// export const addNewMealToPlan = (planId, name, description) => {
//   return async dispatch => {
//     const newMealId = await db.insertMeal(planId, name, description);
//     // console.log('newMealId', newMealId.insertId);

//     dispatch(addMealIdToPlan(planId, newMealId.insertId));
//     dispatch({ type: NEW_MEAL, mealId: newMealId.insertId, name, description });
//   }
// };

// export const readAllMealsFromDatabase = () => {
//   return async dispatch => {
//     const mealsInDb = await db.getAllMeals();
//     console.log('readAllMealsFromDatabase', mealsInDb);
//     const meals = mealsInDb.map(meal => {
//       return {
//         ...meal,
//         // id: meal.id.toString(),
//         nutrients: []
//       };
//     });
//     // console.log('readAllPlansFromDatabase', dbResult.rows._array);

//     dispatch({ type: SET_ALL_MEALS, meals });
//     meals.forEach(meal => dispatch(addMealIdToPlan(meal.planId, meal.id)));
//   }
// };


// export const readAllNutrientsFromDatabase = () => {
//   return async dispatch => {
//     const nutrientsInDb = await db.getAllNutrients();
//     // console.log('readAllNutrientsFromDatabase', nutrientsInDb);
//     nutrientsInDb.forEach(nutrient => dispatch(addReadNutrientToMeal(nutrient.id, nutrient.mealId, nutrient.nutrientDataId, nutrient.amount)));
//   };
// };
