import React from 'react'
import { useSelector } from 'react-redux';
import { View, Text } from 'react-native'
import MicronutrientViewOneRow from '../components/MicronutrientViewOneRow';
import MicronutrientViewSummary from '../components/MicronutrientViewSummary';
import MicronutrientViewLong from '../components/MicronutrientViewLong';
import { calculateDataToShow } from '../helperFunctions/calculateDataToShow';
const SUMMARY_LENGTH = 6;

const MicronutrientView = ({ nutrientId, mealId, planId, nutrientData, summary, oneRow, noDataText }) => {
  const noDataMessage = noDataText || 'No micronutrient data';
  const meals = useSelector(state => state.meals.meals);
  const plans = useSelector(state => state.plans.plans);
  const nutrients = useSelector(state => state.nutrients.nutrients);
  const nutrientsData = useSelector(state => state.nutrientsData.nutrientsData);
  const summaryLength = summary ? SUMMARY_LENGTH : 0;

  const dataToShow = calculateDataToShow(planId, mealId, nutrientId, nutrientData, plans, meals, nutrients, nutrientsData, summaryLength);

  if (dataToShow.length === 0) {
    return (<View>
      <Text>{noDataMessage}</Text>
    </View>);
  } else if (oneRow) {
    return MicronutrientViewOneRow(dataToShow);
  } else if (summary) {
    return MicronutrientViewSummary(dataToShow);
  }
  return MicronutrientViewLong(dataToShow);
}

export default MicronutrientView;