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
import * as FileSystem from 'expo-file-system';
import * as Constants from '../constants/Constants';
// import Language from '../constants/Language';
import * as configurations from '../store/actions/configurations';

const finelli = require('../data/finelli3.json');
const usdaData = require('../data/usdaDataLong.json');

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
      console.log('ALL INITIALIZED 1');

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
    console.log('ALL INITIALIZED 2');
  }

  const readUsdaNutritionFile = async () => {
    console.log('readUsdaNutritionFile');
    const nutrientDataCount = await db.getNutrientDataCount();
    if (nutrientDataCount > 0) {
      console.log('Nutrition data is in database, read and set it to reducer:', nutrientDataCount)
      await dispatch(catchErrors(nutrientDataActions.readNutrientDataFromDb()));
      console.log('Nutrition data set to reducer ');
      setAppInitialized(true);
      console.log('ALL INITIALIZED 3');

      return; // nutrients are already in the database
    }
    console.log('Read USDA Nutrition data file and insert data to database', nutrientDataCount)
    usdaData.forEach((d, i, data) => {
      if (d.length !== data[0].length) {
        console.log('i, d.length =', i, d.length);
      }
    })
    await db.insertAllNutrientData(usdaData);
    dispatch(nutrientDataActions.setNutrientsData(usdaData));
    setAppInitialized(true);
    console.log('ALL INITIALIZED 4');
  }

  async function readDataFromDatabase(language) {

    await dispatch(catchErrors(planActions.readAllPlansFromDb()));
    await dispatch(catchErrors(mealActions.readAllMealsFromDb()));
    await dispatch(catchErrors(nutrientActions.readAllNutrientsFromDb()));
    // await dispatch(nutrientActions.readAllNutrientsFromDb());
    await dispatch(catchErrors(barcodeActions.readAllBarcodesFromDb()));

    if (language === Constants.FINISH) {
      readNutritionFile();
    } else {
      readUsdaNutritionFile();
    }
  }

  const initializeDB = async () => {
    let configurationInFile;
    try {
      const configurationString = await FileSystem.readAsStringAsync(
        FileSystem.documentDirectory + Constants.CONFIGURATION_FILE,
      );
      configurationInFile = JSON.parse(configurationString);
      dispatch(configurations.setConfigurations(configurationInFile));
    } catch (err) {
      console.log(`Configuration file cold not be read,
      use default configuration:`, err);
    }
    const language = configurationInFile ?
      configurationInFile.language :
      Constants.DEFAULT_LANGUAGE;
    console.log('initializeDB language =', language);
    db.initializeDatabase(language).then(() => {
      console.log('Sqlite database initialization succeeded');
    }).catch((err) => {
      console.log('Sqlite database initialization failed', err);
    });
    readDataFromDatabase(language);
  }

  useEffect(() => {
    initializeDB();
  }, [dispatch]);


  return (
    <View>
      <Text>InitializeApp</Text>
    </View>
  )
}

export default InitializeApp;