import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';

import MicronutrientView from '../components/MicronutrientView';

import Colors from '../constants/Colors';
import HeadingText from '../components/HeadingText';
import { NAME_I } from '../models/NutrientData';

const MicronutrientScreen = props => {
  const summary = props.navigation.getParam('summary');
  const nutrientData = props.navigation.getParam('nutrientData');
  const mealId = props.navigation.getParam('mealId');
  const planId = props.navigation.getParam('planId');
  const meals = useSelector(state => state.meals.meals);
  const plans = useSelector(state => state.plans.plans);

  let headingText = '';
  if (mealId) {
    headingText = 'Meal : ' + meals.find(meal => meal.id == mealId).name;
  } else if (planId) {
    headingText = 'Plan : ' + plans.find(plan => plan.id == planId).name;
  } else if (nutrientData) {
    headingText = '100g of ' + nutrientData[NAME_I];
  }
  return (
    <View style={styles.screen}>
      <HeadingText>{headingText}</HeadingText>
      <MicronutrientView nutrientData={nutrientData} mealId={mealId} planId={planId} summary={summary} />
    </View>
  )
}

MicronutrientScreen.navigationOptions = navData => {
  // const item = navData.navigation.getParam('item');

  return {
    headerTitle: 'Micronutrient info',
    // headerTitle: place.title,
  }
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 5,
    paddingBottom: 60,
  },
  microNutrient: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 5,
    borderBottomColor: Colors.grayBorder,
  },
  microNutrientName: {
    width: '70%'
  },
  microNutrientValue: {
    paddingRight: 10
  }
})
export default MicronutrientScreen;