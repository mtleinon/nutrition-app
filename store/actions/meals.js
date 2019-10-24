import * as db from '../../helperFunctions/sqlite';
import { deleteNutrientsOfMealsFromDb } from './nutrients';
export const SET_ALL_MEALS = 'SET_ALL_MEALS';
export const ADD_MEAL = 'ADD_MEAL';
export const UPDATE_MEAL = 'UPDATE_MEAL';
export const DELETE_MEAL = 'DELETE_MEAL';
export const DELETE_MEALS = 'DELETE_MEALS';

// Handling the plans in redux
export const addMeal = meal => ({ type: ADD_MEAL, meal })
export const updateMeal = meal => ({ type: UPDATE_MEAL, meal })
export const deleteMeal = mealId => ({ type: DELETE_MEAL, mealId })
export const deleteMeals = mealIds => ({ type: DELETE_MEALS, mealIds })

// Handling the plans in database. Functions update database asynchronously
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
    const dbResult = await db.deleteMeal(mealId);
    // console.log('dbResult', dbResult);
    dispatch(deleteMeal(mealId));
  }
};

export const deleteMealAndItsContentFromDb = mealId => {
  return async dispatch => {
    const dbResult = await db.deleteMealAndItsContent(mealId);
    // console.log('dbResult', dbResult);
    dispatch(deleteMeal(mealId));
  }
};

export const deleteMealsOfAPlanFromDb = (mealIds) => {
  console.log('deleteMealsOfAPlanFromDb: mealIds, mealIds =', mealIds);
  return async dispatch => {
    // const result = await deleteNutrientsOfMealsFromDb(mealIds);
    const dbResult = await db.deleteMealsOfAPlan(mealIds);
    // console.log('dbResult', dbResult);
    dispatch(deleteMeals(mealIds));
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
