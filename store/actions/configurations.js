import * as FileSystem from 'expo-file-system';
import * as Constants from '../../constants/Constants';
export const SET_GENDER = 'SET_GENDER';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_CONFIGURATIONS = 'SET_CONFIGURATIONS';
export const SET_APP_INITIALIZED = 'SET_APP_INITIALIZED';
export const REINITIALIZE_APP = 'REINITIALIZE_APP';

export const setGender = gender => ({ type: SET_GENDER, gender });
export const setLanguage = language => ({ type: SET_LANGUAGE, language });
export const setConfigurations = configurations => ({ type: SET_CONFIGURATIONS, configurations });
export const setAppInitialized = () => ({ type: SET_APP_INITIALIZED });
export const reinitializeApp = () => ({ type: REINITIALIZE_APP });

export const storeGenderToFile = gender => {
  return async (dispatch, getState) => {
    const newConfigurations = { ...getState().configurations.configurations, gender }
    result = await FileSystem.writeAsStringAsync(
      FileSystem.documentDirectory + Constants.CONFIGURATION_FILE,
      JSON.stringify(newConfigurations));

    // // console.log('storeBarcodeToDb', barcode);
    dispatch(setConfigurations(newConfigurations));
  }
};

export const storeLanguageToFile = language => {
  return async (dispatch, getState) => {
    const newConfigurations = { ...getState().configurations.configurations, language }
    result = await FileSystem.writeAsStringAsync(
      FileSystem.documentDirectory + Constants.CONFIGURATION_FILE,
      JSON.stringify(newConfigurations));

    // // console.log('storeBarcodeToDb', barcode);
    dispatch(setConfigurations(newConfigurations));
    dispatch(reinitializeApp());
  }
};
