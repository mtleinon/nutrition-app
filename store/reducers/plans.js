import { SET_ALL_PLANS, NEW_PLAN, DELETE_PLAN, ADD_MEAL_TO_PLAN, REMOVE_MEAL_FROM_PLAN } from '../actions/plans';
import Plan from '../../models/Plan';
// import testPlansData from '../../data/testPlansData';

const initialState = {
  plans: [],
};

export default (state = initialState, action) => {
  // console.log('action', action);

  switch (action.type) {
    case SET_ALL_PLANS:
      return {
        plans: action.plans
      }
    case NEW_PLAN:
      return {
        plans: [...state.plans, new Plan(action.planId, action.name, action.description, [])]
      }
    case DELETE_PLAN:
      return {
        plans: state.plans.filter(plan => plan.id !== action.planId)
      }
    case ADD_MEAL_TO_PLAN:
      return {
        plans: state.plans.map(plan => {
          if (plan.id !== action.planId) {
            return plan;
          }
          return {
            ...plan,
            mealIds: plan.mealIds.concat(action.mealId)
          };
        })
      }
    case REMOVE_MEAL_FROM_PLAN:
      return {
        plans: state.plans.map(plan => {
          if (plan.id !== action.planId) {
            return plan;
          }
          return {
            ...plan,
            meals: plan.mealIds.filter(meal => meal !== action.mealId)
          };
        })
      }
  }
  return state;
}
