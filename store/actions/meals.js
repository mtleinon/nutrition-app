import * as db from '../../helperFunctions/sqlite';
import { addMealIdToPlan } from './plans';

export const DELETE_MEAL = 'DELETE_MEAL';
export const NEW_MEAL = 'NEW_MEAL';
export const SET_ALL_MEALS = 'SET_ALL_MEALS';
export const ADD_NUTRIENT_TO_MEAL = 'ADD_NUTRIENT_TO_MEAL';
export const REMOVE_NUTRIENT_FROM_MEAL = 'REMOVE_NUTRIENT_FROM_MEAL';
export const UPDATE_NUTRIENT_IN_MEAL = 'UPDATE_NUTRIENT_IN_MEAL';

export const newMeal = (mealId, name, description) => {
  return { type: NEW_MEAL, mealId, name, description }
};
export const addNutrientToMeal = (mealId, nutrientId, amount) => {
  return async dispatch => {
    const newNutrientId = await db.insertNutrient(mealId, nutrientId, amount);
    dispatch({ type: ADD_NUTRIENT_TO_MEAL, mealId, nutrientId, amount });
  }

};
export const addReadNutrientToMeal = (mealId, nutrientId, amount) => {
  return { type: ADD_NUTRIENT_TO_MEAL, mealId, nutrientId, amount };
};

export const removeNutrientFromMeal = (mealId, nutrientId) => {
  return async dispatch => {
    await db.removeNutrient(mealId, nutrientId);
    dispatch({ type: REMOVE_NUTRIENT_FROM_MEAL, mealId, nutrientId });
  }
};

export const updateNutrientAmount = (mealId, nutrientId, newAmount) => {
  return async dispatch => {
    const newMealId = await db.updateNutrientAmount(mealId, nutrientId, newAmount);
    // console.log('newMealId', newMealId.insertId);

    dispatch({ type: UPDATE_NUTRIENT_IN_MEAL, mealId, nutrientId, newAmount });
  }
};

export const addNewMealToPlan = (planId, name, description) => {
  return async dispatch => {
    const newMealId = await db.insertMeal(planId, name, description);
    // console.log('newMealId', newMealId.insertId);

    dispatch(addMealIdToPlan(planId, newMealId.insertId));
    dispatch({ type: NEW_MEAL, mealId: newMealId.insertId, name, description });
  }
};

export const readAllMealsFromDatabase = () => {
  return async dispatch => {
    const mealsInDb = await db.getAllMeals();
    console.log('readAllMealsFromDatabase', mealsInDb);
    const meals = mealsInDb.map(meal => {
      return {
        ...meal,
        // id: meal.id.toString(),
        nutrients: []
      };
    });
    // console.log('readAllPlansFromDatabase', dbResult.rows._array);

    dispatch({ type: SET_ALL_MEALS, meals });
    meals.forEach(meal => dispatch(addMealIdToPlan(meal.planId, meal.id)));
  }
};


export const readAllNutrientsFromDatabase = () => {
  return async dispatch => {
    const nutrientsInDb = await db.getAllNutrients();
    // console.log('readAllNutrientsFromDatabase', nutrientsInDb);
    nutrientsInDb.forEach(nutrient => dispatch(addReadNutrientToMeal(nutrient.mealId, nutrient.nutrientDataId, nutrient.amount)));
  };
};
