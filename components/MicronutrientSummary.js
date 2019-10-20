import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../constants/Colors';

const decimals = value => {
  if (value === 0) {
    return 0;
  } else if (value < 1) {
    return 2;
  } else if (value < 10) {
    return 1;
  }
  return
}
const MicronutrientSummary = ({ value, heading, unit, recommendation }) => {
  // console.log('MicronutrientSummary:', heading, value);
  return (
    <View style={styles.item} >
      <View style={styles.microNutrient}>
        <Text numberOfLines={2} style={styles.microNutrientName}>{heading}</Text>
        <View style={styles.row} >
          <Text style={styles.microNutrientValue}>{value.toFixed(decimals(value))}</Text>
          <Text style={styles.microNutrientUnit}>{unit}</Text>
          <Text style={styles.microNutrientRecommendation}>{recommendation ? (recommendation * 100).toFixed(0) + '%' : ''}</Text>
        </View>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
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
    width: '60%'
  },
  row: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  microNutrientValue: {
    paddingRight: 3,
    textAlign: 'right',
    flex: 1
  },
  microNutrientUnit: {
    flex: 1,
    textAlign: 'left'
  },
  microNutrientRecommendation: {
    // paddingRight: 10,
    textAlign: 'right',
    flex: 1,
  }
});

export default MicronutrientSummary;