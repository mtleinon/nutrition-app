import React from 'react'
import { View, StyleSheet, Button } from 'react-native'
import { useSelector } from 'react-redux';

import MicronutrientView from '../components/MicronutrientView';

import Colors from '../constants/Colors';
import HeadingText from '../components/HeadingText';
import { NAME_I } from '../models/NutrientData';
import ElevatedHeader from '../components/ElevatedHeader';
import * as i1n from '../helperFunctions/translations';

const MicronutrientScreen = props => {
  const summary = props.navigation.getParam('summary');
  const nutrientData = props.navigation.getParam('nutrientData');
  const nutrientId = props.navigation.getParam('nutrientId');
  const mealId = props.navigation.getParam('mealId');
  const planId = props.navigation.getParam('planId');
  const meals = useSelector(state => state.meals.meals);
  const plans = useSelector(state => state.plans.plans);
  const nutrients = useSelector(state => state.nutrients.nutrients);
  const nutrientsData = useSelector(state => state.nutrientsData.nutrientsData);

  let headingText = '';
  if (nutrientId) {
    const nutrient = nutrients.find(nutrient => nutrient.id === nutrientId);
    const nutrientName = nutrientsData.find(data => data[0] === nutrient.nutrientDataId)[NAME_I];
    headingText = nutrient.amount + 'g ' + i1n.t('of') + ' ' + nutrientName;
  } else if (mealId) {
    headingText = i1n.t('meal') + ' : ' + meals.find(meal => meal.id === mealId).name;
  } else if (planId) {
    headingText = i1n.t('plan') + ' : ' + plans.find(plan => plan.id === planId).name;
  } else { // nutrientData contains data to be shown
    headingText = '100g ' + i1n.t('of') + ' ' + nutrientData[NAME_I];
  }

  return (
    <View style={styles.screen}>
      <ElevatedHeader>
        <HeadingText style={styles.headingText} numberOfLines={3}>{headingText}</HeadingText>
      </ElevatedHeader>
      <View style={{ flex: 1 }}>
        <MicronutrientView
          nutrientData={nutrientData} nutrientId={nutrientId} mealId={mealId}
          planId={planId} summary={summary} />
      </View>
    </View>
  )
}

MicronutrientScreen.navigationOptions = navData => {
  // const item = navData.navigation.getParam('item');

  return {
    headerTitle: i1n.t('micronutrientContent'),
    // headerTitle: place.title,
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
    // paddingBottom: 55,
  },
  // microNutrient: {
  //   flexDirection: 'row',
  //   width: '100%',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   borderBottomWidth: 1,
  //   paddingVertical: 5,
  //   borderBottomColor: Colors.grayBorder,
  // },
  microNutrientName: {
    width: '70%'
  },
  headingText: {
    marginLeft: 10,
  },
  microNutrientValue: {
    paddingRight: 10
  }
})
export default MicronutrientScreen;