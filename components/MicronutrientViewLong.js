import React from 'react'
import { View, SectionList } from 'react-native'
import nutrientHeading from '../data/nutrientInfo';
import MicronutrientSectionHeader from '../components/MicronutrientSectionHeader';
import MicronutrientSectionData from '../components/MicronutrientSectionData';


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

const MicronutrientViewLong = (dataToShow) => {

  // Convert data for SectionList
  const dataWithHeading = dataToShow.map((data, i) => ({
    value: data,
    heading: nutrientHeading[i].name.fiShort,
    unit: nutrientHeading[i].unit,
    recommendation: getRecommendation(nutrientHeading[i])
  }));

  const data = [
    {
      title: { title: 'Main nutrients', amount: 'amount', relative: '%energy' },
      data: dataWithHeading.slice(2, 6)
    },
    {
      title: { title: 'Detailed nutrients', amount: 'amount', relative: '' },
      data: dataWithHeading.slice(6, 33)
    },
    {
      title: { title: 'Micronutrients', amount: 'amount', relative: '% daily rec' },
      data: dataWithHeading.slice(33, 45)
    },
    {
      title: { title: 'Vitamins', amount: 'amount', relative: '% daily recom' },
      data: dataWithHeading.slice(45, 56)
    },
  ];

  return (<View>
    <SectionList
      sections={data}
      renderItem={item => {
        return <MicronutrientSectionData
          value={item.item} />
      }}
      renderSectionHeader={({ section: { title } }) => (
        <MicronutrientSectionHeader title={title} />)}
      stickySectionHeadersEnabled={true}
      keyExtractor={(_, index) => index.toString()}
    />
  </View>
  );
}

export default MicronutrientViewLong;