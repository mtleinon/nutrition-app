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
  // console.log('111 configurations action', action.type, state.configurations.appInitialized);
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
      console.log('SET_CONFIGURATIONS ', state.configurations, action.configurations);

      return {
        configurations: {
          ...state.configurations,
          language: action.configurations.language,
          gender: action.configurations.gender,
        }
      }
    case SET_APP_INITIALIZED:
      console.log('SET_APP_INITIALIZED');

      return {
        configurations: { ...state.configurations, appInitialized: true }
      }
  }
  return state;
}
