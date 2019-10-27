import React from 'react'
import { View, StyleSheet } from 'react-native'
import SmallerText from '../components/SmallerText';
import { NAME_I, ENERGY_I, CARBOHYDRATES_I, FET_I, PROTEIN_I } from '../models/NutrientData';
import { convertKCalToKJ } from '../helperFunctions/helperFunctions';
import * as i1n from '../helperFunctions/translations';


//TODO with finish data convert from kJ
const MicronutrientViewOneRow = (dataToShow) =>
  (
    <View style={styles.summaryRow}>
      <SmallerText>{i1n.t('ener')}: {dataToShow[ENERGY_I].toFixed(0)}kcal</SmallerText>
      <SmallerText>{i1n.t('carb')}: {dataToShow[CARBOHYDRATES_I].toFixed(0)}g</SmallerText>
      <SmallerText>{i1n.t('fet')}: {dataToShow[FET_I].toFixed(0)}g</SmallerText>
      <SmallerText>{i1n.t('pro')}: {dataToShow[PROTEIN_I].toFixed(0)}g</SmallerText>
    </View>
  );
const styles = StyleSheet.create({
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});

export default MicronutrientViewOneRow;