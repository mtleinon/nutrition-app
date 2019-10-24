import React, { useState } from 'react';
import { Platform } from 'react-native'

import { createAppContainer } from 'react-navigation';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import InitializeApp from './components/InitializeApp';
import nutrientsDataReducer from './store/reducers/nutrientsData';
import mealsReducer from './store/reducers/meals';
import plansReducer from './store/reducers/plans';
import nutrientsReducer from './store/reducers/nutrients';
import barcodesReducer from './store/reducers/barcodes';
import dbOperationReducer from './store/reducers/dbOperation';
// import SelectNutritionScreen from './screens/SelectNutritionScreen';
// import MicronutrientScreen from './screens/MicronutrientScreen';
import ErrorViewer from './ErrorViewer';

import Constants from 'expo-constants';

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from 'expo-ads-admob';


import { initializeDatabase } from './helperFunctions/sqlite';
console.log('APP STARTED');

const rootReducer = combineReducers({
  nutrientsData: nutrientsDataReducer,
  nutrients: nutrientsReducer,
  barcodes: barcodesReducer,
  plans: plansReducer,
  meals: mealsReducer,
  dbOperation: dbOperationReducer
});
console.log('APP STARTED: rootReducer made');

initializeDatabase().then(() => {
  console.log('Sqlite database initialization succeeded');
}).catch((err) => {
  console.log('Sqlite database initialization failed', err);
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

import AppNavigator from './navigation/Navigator';
const AppNavigationContainer = createAppContainer(AppNavigator);

export default function App() {
  console.log('App function STARTED');
  console.log('Constants =', Constants);
  [appInitialized, setAppInitialized] = useState(false);
  return (
    <Provider store={store}>
      <ErrorViewer>
        {appInitialized ?
          <AppNavigationContainer /> :
          <InitializeApp setAppInitialized={setAppInitialized} />
        }
      </ErrorViewer>
      <AdMobBanner
        bannerSize="fullBanner"

        adUnitID={Platform.OS === 'android'
          ? "ca-app-pub-3940256099942544/6300978111"
          : "ca-app-pub-3940256099942544/6300978111"}
        // adUnitID={Platform.OS === 'android'
        //   ? "ca-app-pub-9120709668433720/3958710513"
        //   : "ca-app-pub-9120709668433720/4955548677"}
        // testDeviceID="EMULATOR"
        testDeviceID="5756bdbc-f5cc-4999-9788-190c4c7371d9"
        servePersonalizedAds
        onDidFailToReceiveAdWithError={err => { console.warn('banner err =', err); }} />
    </Provider>);
}

/*
      {!appInitialized &&
        <InitializeApp setAppInitialized={setAppInitialized} />
*/