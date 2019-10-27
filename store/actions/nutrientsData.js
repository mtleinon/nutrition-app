import * as db from '../../helperFunctions/sqlite';

export const DELETE_NUTRIENT_DATA = 'DELETE_NUTRIENT_DATA';
export const ADD_NUTRIENT_DATA = 'ADD_NUTRIENT_DATA';
export const ADD_NUTRIENT_INFO = 'ADD_NUTRIENT_INFO';
export const SET_NUTRIENTS_DATA = 'SET_NUTRIENTS_DATA';

export const addNutrient = nutrient => {
  return { type: ADD_NUTRIENT_DATA, nutrient }
};

export const setNutrientsData = nutrientsData => {
  return { type: SET_NUTRIENTS_DATA, nutrientsData }
};

export const addNutrientInfo = nutrientInfo => {
  return { type: ADD_NUTRIENT_INFO, nutrientInfo }
};

export const readNutrientDataFromDb = () => {
  return async dispatch => {
    const nutrientsInDb = await db.getNutrientData();
    const nutrientsData = nutrientsInDb.map(nutrientInDb => Object.values(nutrientInDb).slice(1));
    dispatch(setNutrientsData(nutrientsData));
    console.log('readNutrientDataFromDb');

  }
};
