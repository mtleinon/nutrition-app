import * as Constants from '../../constants/Constants';
import {
  SET_GENDER,
  SET_LANGUAGE,
  SET_CONFIGURATIONS,
  SET_APP_INITIALIZED
} from '../actions/configurations';

const initialState = {
  configurations: {
    appInitialized: false,
    gender: Constants.DEFAULT_GENDER,
    language: Constants.DEFAULT_LANGUAGE,
  },
};

export default (state = initialState, action) => {
  console.log('configurations action', action.type);
  switch (action.type) {
    case SET_GENDER:
      return {
        configurations: { ...state.configurations, gender: action.gender }
      }
    case SET_LANGUAGE:
      return {
        configurations: { ...state.configurations, language: action.language }
      }
    case SET_CONFIGURATIONS:
      return {
        configurations: { ...state.configurations, ...action.configurations }
      }
    case SET_APP_INITIALIZED:
      return {
        configurations: { ...state.configurations, appInitialized: true }
      }
  }
  return state;
}
