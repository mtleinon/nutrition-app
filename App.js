import React, { useState } from 'react';
import { View, Platform } from 'react-native'

import { createAppContainer } from 'react-navigation';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { AppLoading } from 'expo';

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
import AddBanner from './components/AddBanner';
import * as Localization from 'expo-localization';
import i1n from 'i18n-js';
import { fi, en } from './helperFunctions/translations';

// Set supported languages of the app and use device language
// as apps default language. Later in app startup we change the apps
// language if it has been set in the configuration file

i1n.fallbacks = true;
i1n.translations = { en, fi };
i1n.locale = Localization.locale;

// console.log('fi, en =', fi, en);
console.log('Localization.locale =', Localization.locale);
console.log('i1n.locale =', i1n.locale);
console.log('APP STARTED 1 ', Date.now());

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



const AppWithInitializer = ({ setIsReady }) => {
  const appInitialized = useSelector(state => state.configurations.configurations.appInitialized);
  const dispatch = useDispatch();

  const setAppInitialized = () => {
    dispatch(configurations.setAppInitialized());
    setIsReady(true);
  }
  return (
    appInitialized ?
      <AppNavigationContainer /> :
      <InitializeApp setAppInitialized={setAppInitialized} />
  );
}

// async _cacheResourcesAsync() {
//   const images = [require('./assets/snack-icon.png')];

//   const cacheImages = images.map(image => {
//     return Asset.fromModule(image).downloadAsync();
//   });
//   return Promise.all(cacheImages);
// }

export default function App() {
  const [isReady, setIsReady] = useState(false);
  console.log('APP STARTED render 2 =', Date.now());

  // if (!isReady) {
  //   return (
  //     <AppLoading
  //     // startAsync={_cacheResourcesAsync}
  //     // onFinish={() => setIsReady(true)}
  //     // onError={console.warn}
  //     />
  //   );
  // }

  return (<>
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <ErrorViewer>
          <AppWithInitializer setIsReady={setIsReady} />
        </ErrorViewer>
      </Provider>
    </View>
    {/* <AddBanner /> */}
  </>)
}

