import * as db from '../../helperFunctions/sqlite';
// import { NEW_MEAL } from './meals';

export const SET_ALL_PLANS = 'SET_ALL_PLANS';
export const DELETE_PLAN = 'DELETE_PLAN';
export const NEW_PLAN = 'NEW_PLAN';
export const ADD_MEAL_TO_PLAN = 'ADD_MEAL_TO_PLAN';
export const REMOVE_MEAL_FROM_PLAN = 'REMOVE_MEAL_FROM_PLAN';


export const newPlan = (name, description) => {
  return async dispatch => {
    dbResult = await db.insertPlan(name, description);
    console.log('dbResult', dbResult, dbResult.insertId);

    dispatch({ type: NEW_PLAN, planId: dbResult.insertId, name, description });
  }
};

export const readAllPlansFromDatabase = () => {
  return async dispatch => {
    const plansInDb = await db.getAllPlans();
    // console.log('readAllPlansFromDatabase', dbResult.rows._array);
    const plans = plansInDb.map(plan => {
      return {
        ...plan,
        // id: plan.id.toString(),
        mealIds: []
      };
    });
    // console.log('readAllPlansFromDatabase', dbResult.rows._array);

    dispatch({ type: SET_ALL_PLANS, plans });
  }
};

export const deletePlan = (planId) => {
  return { type: DELETE_PLAN, planId }
};

export const addMealIdToPlan = (planId, mealId) => {
  return { type: ADD_MEAL_TO_PLAN, planId, mealId }
};

// export const addNewMealToPlan = (planId, name, description) => {
//   return async dispatch => {
//     const newMealId = await db.insertMeal(planId, name, description);
//     console.log('newMealId', newMealId.insertId);

//     dispatch({ type: ADD_MEAL_TO_PLAN, planId, mealId: newMealId.insertId });
//     dispatch({ type: NEW_MEAL, mealId: newMealId.insertId, name, description });
//   }
// };

export const removeMealFromPlan = (planId, mealId) => {
  return { type: REMOVE_MEAL_FROM_PLAN, planId, mealId }
};
