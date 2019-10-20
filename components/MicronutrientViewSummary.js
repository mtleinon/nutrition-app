import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { ENERGY_I, CARBOHYDRATES_I, PROTEIN_I } from '../models/NutrientData';
import MicronutrientSummary from '../components/MicronutrientSummary';
import nutrientHeading from '../data/nutrientInfo';

const MicronutrientViewSummary = (dataToShow) => {

  const energy = dataToShow[ENERGY_I];

  const relativeToEnergy = (index, value) => {
    if (index === ENERGY_I) return value / energy;
    let micronutrientEnergy;
    if (index === CARBOHYDRATES_I || index === PROTEIN_I) {
      micronutrientEnergy = 4 * value * 4.186;
    } else {
      micronutrientEnergy = 9 * value * 4.186;
    }
    return micronutrientEnergy / energy;
  }

  return (
    // <View style={styles.screen}>
    <View>
      <FlatList
        data={dataToShow.slice(2)}
        renderItem={item => {
          return <MicronutrientSummary
            value={item.item}
            heading={nutrientHeading[item.index + 2].name.fiShort}
            unit={nutrientHeading[item.index + 2].unit}
            recommendation={relativeToEnergy(item.index + 2, item.item)} />
        }}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
}

export default MicronutrientViewSummary;