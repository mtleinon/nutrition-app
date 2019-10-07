import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';

import MicronutrientView from '../components/MicronutrientView';

// import Nutrients from '../data/finelliAllNutrients'; // 36 nutriitions
import Colors from '../constants/Colors';
import HeadingText from '../components/HeadingText';

const MicronutrientScreen = props => {
  const summary = props.navigation.getParam('summary');
  const nutrientData = props.navigation.getParam('nutrientData');
  const mealId = props.navigation.getParam('mealId');
  const planId = props.navigation.getParam('planId');
  const meals = useSelector(state => state.meals.meals);
  const plans = useSelector(state => state.plans.plans);
  const nutrientsData = useSelector(state => state.nutrientsData.nutrientsData);
  let headingText;
  if (mealId) {
    headingText = meal = meals.find(meal => meal.id == mealId).name;
  } else if (planId) {
    headingText = plans.find(plan => plan.id == planId).name;
  }
  return (
    <View style={styles.screen}>
      <HeadingText>TODO add heading</HeadingText>
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
    marginRight: 5
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