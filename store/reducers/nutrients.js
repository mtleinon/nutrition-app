import {
  SET_ALL_NUTRIENTS,
  DELETE_NUTRIENT,
  DELETE_NUTRIENTS_OF_MEALS,
  ADD_NUTRIENT,
  UPDATE_NUTRIENT,
} from '../actions/nutrients';

import Nutrient from '../../models/Nutrient';
// import testNutrientsData from '../../data/testNutrientsData';

const initialState = {
  nutrients: [],
};

export default (state = initialState, action) => {
  console.log('nutrients action', action.type);

  switch (action.type) {

    case ADD_NUTRIENT:
      return {
        nutrients: [...state.nutrients, action.nutrient]
      }
    case DELETE_NUTRIENT:
      return {
        nutrients: state.nutrients.filter(nutrient => nutrient.id !== action.nutrientId)
      }
    case DELETE_NUTRIENTS_OF_MEALS:
      return {
        nutrients: state.nutrients.filter(nutrient => !action.mealIds.includes(nutrient.mealId))
      }
    case UPDATE_NUTRIENT:
      console.log('UPDATE_NUTRIENT: nutrients action', action);
      return {
        nutrients: state.nutrients.map(nutrient => {
          if (nutrient.id === action.nutrient.id) {
            return new Nutrient(nutrient.id, nutrient.mealId, nutrient.nutrientDataId, action.nutrient.amount);
          }
          return nutrient;
        })
      }
    case SET_ALL_NUTRIENTS:
      return {
        nutrients: action.nutrients
      }
  }
  return state;
}
