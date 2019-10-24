export const START = 'START';
export const SUCCEEDED = 'SUCCEEDED';
export const FAILED = 'FAILED';
export const CLEAR_ERROR = 'CLEAR_ERROR';

// State of asynchronous operations started by the program 
export const READY = 'READY';
export const WAITING = 'WAITING';
export const ERROR = 'ERROR';

export const start = () => ({ type: START });
export const succeeded = () => ({ type: SUCCEEDED });
export const failed = errorMessage => ({ type: FAILED, errorMessage });
export const clearError = () => ({ type: CLEAR_ERROR });

export const catchErrors = (functionRunInTryCatch) => {
  return async function (dispatch) {
    try {
      dispatch(start());
      await functionRunInTryCatch(dispatch);
      dispatch(succeeded());
    } catch (err) {
      console.log('CATCH err =', err);
      dispatch(failed(err));
    }
  }
};