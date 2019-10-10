import { ADD_PLAN, UPDATE_PLAN, DELETE_PLAN, SET_ALL_PLANS } from '../actions/plans';
import Plan from '../../models/Plan';
// import testPlansData from '../../data/testPlansData';

const initialState = {
  plans: [],
};

export default (state = initialState, action) => {
  // console.log('action', action);

  switch (action.type) {
    case ADD_PLAN:
      return {
        plans: [...state.plans, action.plan]
      }
    case DELETE_PLAN:
      return {
        plans: state.plans.filter(plan => plan.id !== action.planId)
      }
    case UPDATE_PLAN:
      return {
        plans: state.plans.map(plan => {
          if (plan.id === action.plan.id) {
            return new Plan(action.plan.id, action.plan.name, action.plan.description);
          }
          return plan;
        })
      }
    case SET_ALL_PLANS:
      return {
        plans: action.plans
      }
    // case ADD_MEAL_TO_PLAN:
    //   return {
    //     plans: state.plans.map(plan => {
    //       if (plan.id !== action.planId) {
    //         return plan;
    //       }
    //       return {
    //         ...plan,
    //         mealIds: plan.mealIds.concat(action.mealId)
    //       };
    //     })
    //   }
    // case REMOVE_MEAL_FROM_PLAN:
    //   return {
    //     plans: state.plans.map(plan => {
    //       if (plan.id !== action.planId) {
    //         return plan;
    //       }
    //       return {
    //         ...plan,
    //         meals: plan.mealIds.filter(meal => meal !== action.mealId)
    //       };
    //     })
    //   }
  }
  return state;
}
