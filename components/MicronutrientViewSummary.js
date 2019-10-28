import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { useSelector } from 'react-redux';
import { ENERGY_I, CARBOHYDRATES_I, PROTEIN_I } from '../models/NutrientData';
import MicronutrientSummary from '../components/MicronutrientSummary';
import nutrientHeading from '../data/nutrientInfo';
import nutrientHeadingEnglish from '../data/nutrientInfoUSDA';
import Language from '../constants/Language';
import { convertKCalToKJ } from '../helperFunctions/helperFunctions';
import * as Constants from '../constants/Constants';

const MicronutrientViewSummary = (dataToShow, language) => {
  // For some reason useSelector caused error shown below when nutrients and meals of a plan was 
  // added or deleted, Workaround was to pass the language parameter in props.
  // Invariant Violation: Invariant Violation: Invariant Violation: Rendered fewer hooks than expected. This may be caused by an accidental early return statement.
  // const language = useSelector(state => state.configurations.configurations.language);

  const energy = dataToShow[ENERGY_I];
  const relativeToEnergy = (index, value) => {
    if (index === ENERGY_I) return value / energy;
    let micronutrientEnergy;
    if (index === CARBOHYDRATES_I || index === PROTEIN_I) {
      micronutrientEnergy = 4 * value;
    } else {
      micronutrientEnergy = 9 * value;
    }
    return micronutrientEnergy / energy;
  }
  // TODO
  const relativeToEnergyFinish = (index, value) => {
    if (index === ENERGY_I) return value / energy;
    let micronutrientEnergy;
    if (index === CARBOHYDRATES_I || index === PROTEIN_I) {
      micronutrientEnergy = 4 * value * 4.186;
    } else {
      micronutrientEnergy = 9 * value * 4.186;
    }
    return micronutrientEnergy / energy;
  }

  let data = [];
  let heading = [];
  let unit = [];
  let relativeEnergy = [];
  if (language === Constants.ENGLISH) {
    data = [
      dataToShow[3],
      dataToShow[7],
      dataToShow[5],
      dataToShow[4]];
    relativeEnergy = [
      1,
      dataToShow[7] * 4 / dataToShow[3],
      dataToShow[5] * 9 / dataToShow[3],
      dataToShow[4] * 4 / dataToShow[3]];
    heading = [
      nutrientHeadingEnglish[3].name.enShort,
      nutrientHeadingEnglish[7].name.enShort,
      nutrientHeadingEnglish[5].name.enShort,
      nutrientHeadingEnglish[4].name.enShort
    ];
    unit = [
      nutrientHeadingEnglish[3].unit,
      nutrientHeadingEnglish[7].unit,
      nutrientHeadingEnglish[5].unit,
      nutrientHeadingEnglish[4].unit
    ];
  } else {
    data = dataToShow.slice(2, 6);
    heading = nutrientHeading.slice(2, 6).map(row => row.name.fiShort);
    unit = nutrientHeading.slice(2, 6).map(row => row.unit);
  }

  return (
    // <View style={styles.screen}>
    <View>
      <FlatList
        data={data}
        renderItem={item => {
          return <MicronutrientSummary
            value={item.item}
            heading={heading[item.index]}
            unit={unit[item.index]}
            recommendation={relativeEnergy[item.index]} />
        }}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
}

export default MicronutrientViewSummary;