import React from 'react'
import { View, StyleSheet } from 'react-native'
import SmallerText from '../components/SmallerText';
import { NAME_I, ENERGY_I, CARBOHYDRATES_I, FET_I, PROTEIN_I } from '../models/NutrientData';
import { convertKCalToKJ } from '../helperFunctions/helperFunctions';
const MicronutrientViewOneRow = (dataToShow) =>
  (
    <View style={styles.summaryRow}>
      <SmallerText>ener: {convertKCalToKJ(dataToShow[ENERGY_I]).toFixed(0)}kJ</SmallerText>
      <SmallerText>carb: {dataToShow[CARBOHYDRATES_I].toFixed(0)}g</SmallerText>
      <SmallerText>fet: {dataToShow[FET_I].toFixed(0)}g</SmallerText>
      <SmallerText>pro: {dataToShow[PROTEIN_I].toFixed(0)}g</SmallerText>
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