import React from 'react'
import { Text, View, SectionList, StyleSheet } from 'react-native'
import nutrientHeading from '../data/nutrientInfo';
import Language from '../constants/Language';
import nutrientHeadingEnglish from '../data/nutrientInfoUSDA';
import MicronutrientSectionHeader from '../components/MicronutrientSectionHeader';
import MicronutrientSectionData from '../components/MicronutrientSectionData';
import * as Constants from '../constants/Constants';
import { useSelector } from 'react-redux';


const getRecommendation = header => {
  // console.log('getRecommendation - header:', header);

  if (header.dri) {
    if (header.dri.rda) {
      if (header.dri.rda.males) {
        return header.dri.rda.males;
      }
      return header.dri.rda;
    }
    if (header.dri.ai)
      return header.dri.ai;
  }
  return undefined;
}

const MicronutrientViewLong = ({ dataToShow, style }) => {
  const configurations = useSelector(state => state.configurations.configurations);

  // Convert data for SectionList
  const dataWithHeading = dataToShow.map((data, i) => ({
    value: data,
    heading: configurations.language === Constants.FINISH ? nutrientHeading[i].name.fiShort : nutrientHeadingEnglish[i].name.enShort,
    unit: configurations.language === Constants.FINISH ? nutrientHeading[i].unit : nutrientHeadingEnglish[i].unit,
    recommendation: configurations.language === Constants.FINISH ? getRecommendation(nutrientHeading[i]) : getRecommendation(nutrientHeadingEnglish[i])
  }));

  let data;
  if (configurations.language === Constants.FINISH) {
    data = [
      {
        title: { title: 'Pää ravintoaineet', amount: 'määrä', relative: '% ener' },
        data: dataWithHeading.slice(2, 6),
      },
      {
        title: { title: 'Yksityiskohdat', amount: 'määrä', relative: '' },
        data: dataWithHeading.slice(6, 33)
      },
      {
        title: { title: 'Hivenaineet', amount: 'määrä', relative: '% rel' },
        data: dataWithHeading.slice(33, 45)
      },
      {
        title: { title: 'Vitamiinit', amount: 'määrä', relative: '% suos' },
        data: dataWithHeading.slice(45, 56)
      },
    ];
  } else {
    data = [
      {
        title: { title: 'Main nutrients', amount: 'amount', relative: '% ener' },
        data: dataWithHeading.slice(2, 10)
      },
      {
        title: { title: 'Micronutrients', amount: 'amount', relative: '% rec' },
        data: dataWithHeading.slice(10, 20)
      },
      {
        title: { title: 'Vitamins', amount: 'amount', relative: '% rec' },
        data: dataWithHeading.slice(20, 44)
      },
      {
        title: { title: 'Fat acids', amount: 'amount', relative: '% rec' },
        data: dataWithHeading.slice(44, 53)
      },
    ];
  }
  return (<View style={styles.micronutrientList}>
    <SectionList
      // ListHeaderComponent={<Text> TEST:very long text that take several lines</Text>}
      sections={data}
      renderItem={item => {
        return <MicronutrientSectionData
          value={item.item} />
      }}
      renderSectionHeader={({ section: { title } }) => (
        <MicronutrientSectionHeader title={title} style={[styles.sectionHeader, style]} />)}
      stickySectionHeadersEnabled={true}
      keyExtractor={(_, index) => index.toString()}
    />
  </View>
  );
}
const styles = StyleSheet.create({
  micronutrientList: {
    marginLeft: 10,
    marginRight: 10,
    paddingHorizontal: 5,
    backgroundColor: 'white',
  },
  sectionHeader: {
    backgroundColor: '#fff'
  }
});

export default MicronutrientViewLong;