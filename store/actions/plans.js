// actions store plans to database and reducer

import * as db from '../../helperFunctions/sqlite';

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
export const storePlanToDb = plan => {
  return async dispatch => {
    dbResult = await db.insertPlan(plan);
    plan.id = dbResult.insertId;
    // console.log('storePlanToDb', plan);
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

export const deletePlanFromDb = planId => {
  return async dispatch => {
    dbResult = await db.deletePlan(planId);
    // console.log('dbResult', dbResult);
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


