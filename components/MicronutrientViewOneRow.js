import React from 'react'
import { View, StyleSheet } from 'react-native'
import SmallerText from '../components/SmallerText';
import { NAME_I, ENERGY_I, CARBOHYDRATES_I, FET_I, PROTEIN_I } from '../models/NutrientData';
import { convertKCalToKJ } from '../helperFunctions/helperFunctions';
import i1n from 'i18n-js';
import * as Constants from '../constants/Constants';
import nutrientHeadingFinish from '../data/nutrientInfo';
import nutrientHeadingEnglish from '../data/nutrientInfoUSDA';

import calculateSummaryDataToShow from '../helperFunctions/CalculateSummaryDataToShow';


//TODO with finish data convert from kJ
const MicronutrientViewOneRow = ({ dataToShow, language }) => {
  const summaryData = calculateSummaryDataToShow(
    dataToShow, nutrientHeadingEnglish, nutrientHeadingFinish, language);

  // const ENERGY_I = language === Constants.FINISH ? 2 : 3;
  // const CARBOHYDRATES_I = language === Constants.FINISH ? 3 : 7;
  // const FET_I = language === Constants.FINISH ? 4 : 5;
  // const PROTEIN_I = language === Constants.FINISH ? 5 : 4;

  return (
    <View style={styles.summaryRow}>
      <SmallerText>{i1n.t('ener')}: {summaryData[0].value.toFixed(0)}kcal</SmallerText>
      <SmallerText>{i1n.t('carb')}: {summaryData[1].value.toFixed(0)}g</SmallerText>
      <SmallerText>{i1n.t('fet')}: {summaryData[2].value.toFixed(0)}g</SmallerText>
      <SmallerText>{i1n.t('pro')}: {summaryData[3].value.toFixed(0)}g</SmallerText>
    </View>
  );
}
const styles = StyleSheet.create({
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});

export default MicronutrientViewOneRow;