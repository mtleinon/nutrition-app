import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux';
import * as nutrientDataActions from '../store/actions/nutrientsData';
import * as planActions from '../store/actions/plans';
import * as mealActions from '../store/actions/meals';
import * as nutrientActions from '../store/actions/nutrients';
import nutrientInfo from '../data/nutrientInfo';
const finelli = require('../data/finelli3.json');
// const finelli = require('../data/finelliSmall.json');
import * as db from '../helperFunctions/sqlite';

const InitializeApp = ({ setAppInitialized }) => {
  const dispatch = useDispatch();

  async function testDb() {
    try {
      let result;
      // result = await db.insertPlan('Plan 1', 'Plan 1 description');
      // const planId = result.insertId;
      // result = await db.insertPlan('Plan 2', 'Plan 2 description');
      // console.log('insertId result', result.insertId);

      // result = await db.insertMeal(planId, 'Meal 1', 'Meal 1 description');
      // const mealId = result.insertId;
      // console.log('insertId result', result.insertId);

      // result = await db.insertNutrient(mealId, 812, 123.456);
      // const nutrientId = result.insertId;
      // console.log('insertId result', result.insertId);

      //result = await db.deleteNutrient(1);
      // console.log('deleteMeal result', result);
      // result = await db.deleteMeal(1);
      // console.log('deleteMeal result', result);

      // result = await db.deletePlan(1);
      // console.log('deletePlan result', result);
      // const allPlans = await db.getAllPlans();
      // console.log('allPlans', allPlans);
      // console.log('allPlans spread:', allPlans[0]);
    } catch (err) {
      // console.log('TEST FAILED: err=', err);
    }
  }
  // // Create test data only once
  // useEffect(() => { testDb() }, [dispatch]);

  const readNutritionFile = async () => {
    console.log('readNutritionFile');
    const nutrientDataCount = await db.getNutrientDataCount();
    if (nutrientDataCount > 0) {
      console.log('Nutrition data is in database, read and set it to reducer:', nutrientDataCount)
      await dispatch(nutrientDataActions.readNutrientDataFromDb());
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
    await dispatch(planActions.readAllPlansFromDb());
    await dispatch(mealActions.readAllMealsFromDb());
    await dispatch(nutrientActions.readAllNutrientsFromDb());
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