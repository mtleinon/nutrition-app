import React, { useState } from 'react';
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

  [appInitialized, setAppInitialized] = useState(false);
  return (
    <Provider store={store}>
      <ErrorViewer>
        {appInitialized ?
          <AppNavigationContainer /> :
          <InitializeApp setAppInitialized={setAppInitialized} />
        }
      </ErrorViewer>
    </Provider>);
}

/*
      {!appInitialized &&
        <InitializeApp setAppInitialized={setAppInitialized} />
*/