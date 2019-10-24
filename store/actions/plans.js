// actions store plans to database and reducer

import * as db from '../../helperFunctions/sqlite';
import * as dbOperation from './dbOperation';
import * as nutrientActions from './nutrients';
import * as mealActions from './meals';

export const SET_ALL_PLANS = 'SET_ALL_PLANS';
export const ADD_PLAN = 'ADD_PLAN';
export const UPDATE_PLAN = 'UPDATE_PLAN';
export const DELETE_PLAN = 'DELETE_PLAN';

// Handling the plans in redux
export const addPlan = plan => ({ type: ADD_PLAN, plan });
export const updatePlan = plan => ({ type: UPDATE_PLAN, plan });
export const deletePlan = planId => ({ type: DELETE_PLAN, planId });

// Handling the plans in database. Functions update database asychronously
// and when it has finished they update redux accordingly
export const storePlanToDb2 = plan => {
  return async (dispatch) => {
    try {
      dispatch(dbOperation.start());

      dbResult = await db.insertPlan(plan);
      plan.id = dbResult.insertId;
      dispatch(addPlan(plan));

      dispatch(dbOperation.succeeded());
    } catch (err) {
      console.log('CATCH err =', err);
      dispatch(dbOperation.failed("Plan storing failed"));
    }
  }
};


// const errorMessage = "Plan storing failed";

export const storePlanToDb = (plan) => {
  return async (dispatch) => {
    dbResult = await db.insertPlan(plan);
    plan.id = dbResult.insertId;
    dispatch(addPlan(plan));
  }
}

// export const wrap = (functionRunInTryCatch) => {
//   return async function (dispatch) {
//     try {
//       dispatch(dbOperation.start());
//       await functionRunInTryCatch(dispatch);
//       dispatch(dbOperation.succeeded());
//     } catch (err) {
//       console.log('CATCH err =', err);
//       dispatch(dbOperation.failed(err));
//     }
//   }
// };

export const storePlanToDb_ORG = (plan) => {
  return async (dispatch) => {
    dbResult = await db.insertPlan(plan);
    plan.id = dbResult.insertId;
    dispatch(addPlan(plan));
  }
};

export const updatePlanInDb = plan => {
  return async dispatch => {
    // console.log('updatePlanToDb', plan);
    dbResult = await db.updatePlan(plan);
    dispatch(updatePlan(plan));
  }
};

export const deletePlanFromDb = (planId, mealIds) => {
  return async dispatch => {
    const dbResult = await db.deletePlan(planId);
    // console.log('dbResult', dbResult);
    dispatch(deletePlan(planId));
  }
};
export const deletePlanAndItsContentFromDb = (planId, mealIdsToDelete) => {
  return async dispatch => {
    const dbResult = await db.deletePlanAndItsContent(planId, mealIdsToDelete);
    console.log('dbResult', dbResult);
    dispatch(nutrientActions.deleteNutrientsOfMeals(mealIdsToDelete));
    dispatch(mealActions.deleteMeals(mealIdsToDelete));
    dispatch(deletePlan(planId));
  }
};

export const readAllPlansFromDb = () => {
  // console.log('readAllPlansFromDb');
  return async dispatch => {
    const plans = await db.getAllPlans();
    // console.log('readAllPlansFromDatabase', plans);
    dispatch({ type: SET_ALL_PLANS, plans });
  }
};


