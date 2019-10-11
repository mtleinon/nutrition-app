import {
  SET_ALL_MEALS,
  // ADD_NUTRIENT_TO_MEAL,
  // REMOVE_NUTRIENT_FROM_MEAL,
  DELETE_MEAL,
  ADD_MEAL,
  UPDATE_MEAL,
  // UPDATE_NUTRIENT_IN_MEAL
} from '../actions/meals';

import Meal from '../../models/Meal';
import Nutrient from '../../models/Nutrient';
// import testMealsData from '../../data/testMealsData';

const initialState = {
  meals: [],
};

export default (state = initialState, action) => {
  console.log('meals action', action.type);

  switch (action.type) {

    case ADD_MEAL:
      return {
        meals: [...state.meals, action.meal]
      }
    case DELETE_MEAL:
      return {
        meals: state.meals.filter(meal => meal.id !== action.mealId)
      }
    case UPDATE_MEAL:
      return {
        meals: state.meals.map(meal => {
          if (meal.id === action.meal.id) {
            return new Meal(meal.id, meal.planId, action.meal.name, action.meal.description);
          }
          return meal;
        })
      }
    case SET_ALL_MEALS:
      return {
        meals: action.meals
      }
  }
  return state;
}
