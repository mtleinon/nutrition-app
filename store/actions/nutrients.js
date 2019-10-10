import * as db from '../../helperFunctions/sqlite';

export const SET_ALL_NUTRIENTS = 'SET_ALL_NUTRIENTS';
export const ADD_NUTRIENT = 'ADD_NUTRIENT';
export const UPDATE_NUTRIENT = 'UPDATE_NUTRIENT';
export const DELETE_NUTRIENT = 'DELETE_NUTRIENT';

// Handling the plans in redux
export const addNutrient = nutrient => ({ type: ADD_NUTRIENT, nutrient })
export const updateNutrient = nutrient => ({ type: UPDATE_NUTRIENT, nutrient })
export const deleteNutrient = nutrientId => ({ type: DELETE_NUTRIENT, nutrientId })

// Handling the plans in database. Functions update database asychronously
// and when it has finished they update redux accordingly
export const storeNutrientToDb = nutrient => {
  return async dispatch => {
    dbResult = await db.insertNutrient(nutrient);
    nutrient.id = dbResult.insertId;
    // // console.log('storeNutrientToDb', nutrient);
    dispatch(addNutrient(nutrient));
  }
};

export const updateNutrientInDb = nutrient => {
  return async dispatch => {
    // console.log('updateNutrientToDb', nutrient);
    dbResult = await db.updateNutrient(nutrient);
    dispatch(updateNutrient(nutrient));
  }
};

export const deleteNutrientFromDb = nutrientId => {
  return async dispatch => {
    dbResult = await db.deleteNutrient(nutrientId);
    // console.log('dbResult', dbResult);
    dispatch(deleteNutrient(nutrientId));
  }
};

export const readAllNutrientsFromDb = () => {
  // console.log('readAllNutrientsFromDb');
  return async dispatch => {
    const nutrients = await db.getAllNutrients();
    // console.log('readAllPlansFromDatabase', nutrients);
    dispatch({ type: SET_ALL_NUTRIENTS, nutrients });
  }
};

