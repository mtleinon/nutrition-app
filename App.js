import React, { useState } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import InitializeApp from './components/InitializeApp';
import nutrientsDataReducer from './store/reducers/nutrientsData';
import mealsReducer from './store/reducers/meals';
import plansReducer from './store/reducers/plans';
// import SelectNutritionScreen from './screens/SelectNutritionScreen';
// import MicronutrientScreen from './screens/MicronutrientScreen';

import { initializeDatabase } from './helperFunctions/sqlite';

const rootReducer = combineReducers({
  nutrientsData: nutrientsDataReducer,
  meals: mealsReducer,
  plans: plansReducer
});

initializeDatabase().then(() => {
  console.log('Sqlite database initialization succeeded');
}).catch((err) => {
  console.log('Sqlite database initialization failed', err);
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

import AppNavigator from './navigation/Navigator';
const AppNavigationContainer = createAppContainer(AppNavigator);

export default function App() {
  [appInitialized, setAppInitialized] = useState(false);
  return (
    <Provider store={store}>
      {!appInitialized ?
        <InitializeApp setAppInitialized={setAppInitialized} /> :
        <AppNavigationContainer />
      }
    </Provider>);
}

