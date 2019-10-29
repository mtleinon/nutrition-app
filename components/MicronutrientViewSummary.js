import React from 'react'
import { View, FlatList } from 'react-native'
import MicronutrientSummary from '../components/MicronutrientSummary';
import nutrientHeadingFinish from '../data/nutrientInfo';
import nutrientHeadingEnglish from '../data/nutrientInfoUSDA';
import calculateSummaryDataToShow from '../helperFunctions/CalculateSummaryDataToShow';
const MicronutrientViewSummary = ({ dataToShow, language }) => {
  const summaryData = calculateSummaryDataToShow(
    dataToShow, nutrientHeadingEnglish, nutrientHeadingFinish, language);

  return (
    <View>
      <FlatList
        data={summaryData}
        renderItem={item => <MicronutrientSummary nutrientData={item.item} />}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
}

export default MicronutrientViewSummary;