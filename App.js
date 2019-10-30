import React, { useState } from 'react';
import { View, Platform } from 'react-native'

import { createAppContainer } from 'react-navigation';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

import ReduxThunk from 'redux-thunk';
import InitializeApp from './components/InitializeApp';
import nutrientsDataReducer from './store/reducers/nutrientsData';
import mealsReducer from './store/reducers/meals';
import plansReducer from './store/reducers/plans';
import nutrientsReducer from './store/reducers/nutrients';
import barcodesReducer from './store/reducers/barcodes';
import dbOperationReducer from './store/reducers/dbOperation';
import configurationsReducer from './store/reducers/configurations';
import ErrorViewer from './ErrorViewer';
import * as configurations from './store/actions/configurations';
import {
  AdMobBanner,
  // AdMobInterstitial,
  // PublisherBanner,
  // AdMobRewarded
} from 'expo-ads-admob';


// import { initializeDatabase } from './helperFunctions/sqlite';
console.log('APP STARTED');

const appReducer = combineReducers({
  nutrientsData: nutrientsDataReducer,
  nutrients: nutrientsReducer,
  barcodes: barcodesReducer,
  plans: plansReducer,
  meals: mealsReducer,
  dbOperation: dbOperationReducer,
  configurations: configurationsReducer
});
console.log('APP STARTED: rootReducer made');

// initializeDatabase().then(() => {
//   console.log('Sqlite database initialization succeeded');
// }).catch((err) => {
//   console.log('Sqlite database initialization failed', err);
// });

const rootReducer = (state, action) => {
  console.log('rootReducer - action.type =', action.type);
  if (action.type === configurations.REINITIALIZE_APP) {
    state = undefined; // Clear reducer when language is changed
  }

  return appReducer(state, action)
}
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

import AppNavigator from './navigation/Navigator';
import Colors from './constants/Colors';
const AppNavigationContainer = createAppContainer(AppNavigator);


const AppWithInitializer = () => {
  const appInitialized = useSelector(state => state.configurations.configurations.appInitialized);
  const dispatch = useDispatch();

  const setAppInitialized = () => {
    dispatch(configurations.setAppInitialized());
  }
  return (
    appInitialized ?
      <AppNavigationContainer /> :
      <InitializeApp setAppInitialized={setAppInitialized} />
  );
}

export default function App() {
  console.log('App function STARTED');
  return (<>
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <ErrorViewer>
          <AppWithInitializer />
        </ErrorViewer>
      </Provider>
    </View>
    {/* <View style={{
      // marginTop: 3, 
      elevation: 2,
      shadowOpacity: .3,
      backgroundColor: Colors.screenBackground,
      // height: 60,
    }}> */}
    <AdMobBanner
      bannerSize="smartBannerPortrait"

      adUnitID={Platform.OS === 'android'
        ? "ca-app-pub-9120709668433720/3958710513"
        : "ca-app-pub-9120709668433720/4955548677"}
      // testDeviceID="EMULATOR"
      testDeviceID="5756bdbc-f5cc-4999-9788-190c4c7371d9"
      servePersonalizedAds
      onDidFailToReceiveAdWithError={err => { console.warn('banner err =', err); }} />
    {/* </View> */}
  </>)
}

/*
      {!appInitialized &&
        <InitializeApp setAppInitialized={setAppInitialized} />
*/