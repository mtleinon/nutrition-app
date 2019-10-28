import React from 'react'
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native'
import MicronutrientViewOneRow from '../components/MicronutrientViewOneRow';
import MicronutrientViewSummary from '../components/MicronutrientViewSummary';
import MicronutrientViewLong from '../components/MicronutrientViewLong';
import { calculateDataToShow } from '../helperFunctions/calculateDataToShow';
const SUMMARY_LENGTH = 8; // In english data 8 column has needed data
import * as i1n from '../helperFunctions/translations';

const MicronutrientView = ({ nutrientId, mealId, planId, nutrientData, summary, oneRow, noDataText }) => {
  console.log('MicronutrientView: planId ', planId);
  const language = useSelector(state => state.configurations.configurations.language);

  const meals = useSelector(state => state.meals.meals);
  const plans = useSelector(state => state.plans.plans);
  const nutrients = useSelector(state => state.nutrients.nutrients);
  const nutrientsData = useSelector(state => state.nutrientsData.nutrientsData);
  const summaryLength = summary ? SUMMARY_LENGTH : 0;
  const noDataMessage = noDataText || i1n.t('noMicronutrientData');

  const dataToShow = calculateDataToShow(planId, mealId, nutrientId, nutrientData, plans, meals, nutrients, nutrientsData, summaryLength);

  if (dataToShow.length === 0) {
    return (<View style={styles.info}>
      <Text >{noDataMessage}</Text>
    </View>);
  } else if (oneRow) {
    return MicronutrientViewOneRow(dataToShow);
  } else if (summary) {
    // return MicronutrientViewOneRow(dataToShow);
    return MicronutrientViewSummary(dataToShow);
  }
  return MicronutrientViewLong(dataToShow, language);
}
const styles = StyleSheet.create({
  info: {
    alignItems: 'center',
    marginTop: 20
  }
});

export default MicronutrientView;