import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../constants/Colors';
import { decimals } from '../helperFunctions/helperFunctions';

const MicronutrientSectionData = props => {
  const { heading, value, unit, recommendation } = props.value;
  return (
    <View style={styles.item} >
      <View style={styles.microNutrient}>
        <Text numberOfLines={2} style={styles.microNutrientName}>{heading}</Text>
        <Text style={styles.microNutrientValue}>{value.toFixed(decimals(value))}</Text>
        <Text style={styles.microNutrientUnit}>{unit}</Text>
        <Text style={styles.microNutrientRecommendation}>{recommendation ? (value / recommendation * 100).toFixed(0) + '%' : ''}</Text>
      </View>
    </View>
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
    width: '50%'
  },
  microNutrientValue: {
    paddingRight: 3,
    textAlign: 'right',
    width: '20%'
  },
  microNutrientUnit: {
    width: '10%',
    textAlign: 'left'
  },
  microNutrientRecommendation: {
    paddingRight: 10,
    textAlign: 'right',
    width: '20%'
  },

});

export default MicronutrientSectionData;