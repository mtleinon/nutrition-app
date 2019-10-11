// Contains finelli nutrient data information 57 
// nutrients has 57 columns and 3600 rows of data
// nutrientsInfo has 57 columns header data info

import { ADD_NUTRIENT_INFO, ADD_NUTRIENT_DATA, SET_NUTRIENTS_DATA } from '../actions/nutrientsData';

const initialState = {
  nutrientsData: [],
  nutrientInfo: {}
};

export default (state = initialState, action) => {
  console.log('action', action.type);

  switch (action.type) {
    case SET_NUTRIENTS_DATA:
      return {
        ...state,
        nutrientsData: action.nutrientsData
      }
    case ADD_NUTRIENT_INFO:
      return {
        ...state,
        nutrientInfo: action.nutrientInfo
      }

    case ADD_NUTRIENT_DATA:
      return {
        ...state,
        nutrientsData: [...state.nutrientsData, action.nutrientData]
      }
  }
  return state;
}
