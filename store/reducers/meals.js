import {
  SET_ALL_MEALS,
  ADD_NUTRIENT_TO_MEAL,
  REMOVE_NUTRIENT_FROM_MEAL,
  NEW_MEAL,
  UPDATE_NUTRIENT_IN_MEAL
} from '../actions/meals';

import Meal from '../../models/Meal';
import Nutrient from '../../models/Nutrient';
// import testMealsData from '../../data/testMealsData';

const initialState = {
  meals: [],
};

export default (state = initialState, action) => {
  // console.log('action', action);

  switch (action.type) {
    case SET_ALL_MEALS:
      return {
        meals: action.meals
      }
    case NEW_MEAL:
      return {
        meals: [...state.meals, new Meal(action.mealId, action.name, action.description, [])]
      }
    case ADD_NUTRIENT_TO_MEAL:
      return {
        meals: state.meals.map(meal => {
          if (meal.id !== action.mealId) {
            return meal;
          }
          return new Meal(meal.id, meal.name, meal.description,
            meal.nutrients.concat(new Nutrient(action.nutrientId, action.amount)));
        })
      }
    case REMOVE_NUTRIENT_FROM_MEAL:
      return {
        meals: state.meals.map(meal => {
          if (meal.id !== action.mealId) {
            return meal;
          }
          return new Meal(meal.id, meal.name, meal.description,
            meal.nutrients.filter(nutrient => nutrient.id !== action.nutrientId));
        })
      }
    case UPDATE_NUTRIENT_IN_MEAL:
      const newState = {
        meals: state.meals.map(meal => {
          if (meal.id !== action.mealId) {
            return meal;
          }
          return new Meal(meal.id, meal.name, meal.description,
            meal.nutrients.map(nutrient => {
              if (nutrient.id !== action.nutrientId) {
                return nutrient;
              }
              return new Nutrient(action.nutrientId, action.newAmount)
            })
          )
        })
      };
      return newState;
  }
  return state;
}
