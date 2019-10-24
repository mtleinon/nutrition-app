import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux';
import * as nutrientDataActions from '../store/actions/nutrientsData';
import * as planActions from '../store/actions/plans';
import * as mealActions from '../store/actions/meals';
import * as nutrientActions from '../store/actions/nutrients';
import * as barcodeActions from '../store/actions/barcodes';
import nutrientInfo from '../data/nutrientInfo';
import * as db from '../helperFunctions/sqlite';
import { catchErrors } from '../store/actions/dbOperation';
const finelli = require('../data/finelli3.json');

const InitializeApp = ({ setAppInitialized }) => {
  const dispatch = useDispatch();

  const readNutritionFile = async () => {
    console.log('readNutritionFile');
    const nutrientDataCount = await db.getNutrientDataCount();
    if (nutrientDataCount > 0) {
      console.log('Nutrition data is in database, read and set it to reducer:', nutrientDataCount)
      await dispatch(catchErrors(nutrientDataActions.readNutrientDataFromDb()));
      console.log('Nutrition data set to reducer ');
      setAppInitialized(true);
      console.log('ALL INITIALIZED');

      return; // nutrients are already in the database
    }
    console.log('Read Nutrition data file and insert data to database', nutrientDataCount)
    const nutrientsData = [];
    for (const [i, finelliNutrition] of finelli.entries()) {
      if (i === 0) {
        // First row in the file contains header info of the
        // nutrition table. Add it to redux.
        dispatch(nutrientDataActions.addNutrientInfo(nutrientInfo));
      } else {
        const nutrition = finelliNutrition.map((n, i) => {
          if (i < 2) {
            return n;
          }
          return +(n.replace(',', '.').replace(' ', ''));
        });
        nutrientsData.push(nutrition);
      }
    }
    await db.insertAllNutrientData(nutrientsData);
    dispatch(nutrientDataActions.setNutrientsData(nutrientsData));
    setAppInitialized(true);
    console.log('ALL INITIALIZED');
  }

  async function readDataFromDatabase() {
    await dispatch(catchErrors(planActions.readAllPlansFromDb()));
    await dispatch(catchErrors(mealActions.readAllMealsFromDb()));
    await dispatch(catchErrors(nutrientActions.readAllNutrientsFromDb()));
    // await dispatch(nutrientActions.readAllNutrientsFromDb());
    await dispatch(catchErrors(barcodeActions.readAllBarcodesFromDb()));
    readNutritionFile();
  }

  useEffect(() => {
    readDataFromDatabase();
  }, [dispatch]);


  return (
    <View>
      <Text>InitializeApp</Text>
    </View>
  )
}

export default InitializeApp;