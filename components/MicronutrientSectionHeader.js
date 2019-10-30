import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../constants/Colors';

const MicronutrientSectionHeader = ({ title, style }) => {
  return (
    <View style={[styles.sectionHeader, style]}>
      <Text style={styles.sectionHeaderName}>{title.title}</Text>
      <Text style={styles.sectionHeaderValue}>{title.amount}</Text>
      <Text style={styles.sectionHeaderUnit}> </Text>
      <Text style={styles.sectionHeaderRecommendation}>{title.relative}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  sectionHeaderName: {
    width: '50%',
    fontWeight: 'bold'
  },
  sectionHeaderValue: {
    paddingRight: 3,
    textAlign: 'right',
    width: '25%',
    fontWeight: 'bold'

  },
  sectionHeaderUnit: {
    width: '2%',
    textAlign: 'left',
    fontWeight: 'bold'
  },
  sectionHeaderRecommendation: {
    paddingRight: 10,
    textAlign: 'right',
    width: '23%',
    fontWeight: 'bold'

  },
  sectionHeader: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingTop: 20,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: Colors.darkGrayBorder,
    // backgroundColor: 'white'
  }
});

export default MicronutrientSectionHeader;