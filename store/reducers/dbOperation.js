import {
  START,
  SUCCEEDED,
  FAILED,
  CLEAR_ERROR,
  WAITING,
  ERROR,
  READY,
} from '../actions/dbOperation';

// For no this supports only one async operation at a time. 
// Later there could be a list of the states of ongoing async operations
const initialState = {
  errorMessages: "",
  state: READY
};

export default (state = initialState, action) => {
  console.log('errors action', action.type);

  switch (action.type) {
    case START:
      return {
        errorMessages: "",
        state: WAITING
      }
    case SUCCEEDED:
      return {
        errorMessages: "",
        state: READY
      }
    case FAILED:
      return {
        errorMessages: state.errorMessages + action.errorMessage + '|',
        state: ERROR
      }
    case CLEAR_ERROR:
      return {
        errorMessages: "",
        state: READY
      }
  }
  return state;
}
