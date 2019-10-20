import React from 'react'
import { useSelector } from 'react-redux';
import { SectionList, FlatList, View, Text, StyleSheet } from 'react-native'
import { calculateMealMicronutrientData } from '../helperFunctions/mealMicronutrientData';
import nutrientHeading from '../data/nutrientInfo';
import Colors from '../constants/Colors';
import SmallText from '../components/SmallText';
import MicronutrientSummary from '../components/MicronutrientSummary';
import { NAME_I, ENERGY_I, CARBOHYDRATES_I, FET_I, PROTEIN_I } from '../models/NutrientData';

const SUMMARY_LENGTH = 6;

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
const kjTokCal = value => value / 4.184;


const Micronutrient2 = props => {
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
const SectionHeader = ({ title }) => {
  return (
    <View style={styles.sectionHeader}>

      <Text style={styles.sectionHeaderName}>{title.title}</Text>
      <Text style={styles.sectionHeaderValue}>{title.amount}</Text>
      <Text style={styles.sectionHeaderUnit}> </Text>
      <Text style={styles.sectionHeaderRecommendation}>{title.relative}</Text>
    </View>
  )
}

function nutrientDataToShow(nutrientData, summaryLength) {
  let dataToShow = [];
  if (summaryLength) {
    dataToShow = nutrientData.slice(0, summaryLength);
  } else {
    dataToShow = [...nutrientData];
  }
  dataToShow[NAME_I] += ' 100g.'
  return dataToShow;
}

function nutrientIdDataToShow(nutrientId, nutrients, nutrientsData, summaryLength) {
  let dataToShow = [];
  const nutrientWithData = nutrients.filter(nutrient => nutrient.id === nutrientId).map(nutrient => (
    {
      amount: nutrient.amount,
      nutrientData: nutrientsData.find(nutrientData => nutrientData[0] === nutrient.nutrientDataId)
    })
  );
  dataToShow = calculateMealMicronutrientData(nutrientWithData, summaryLength);
  dataToShow[NAME_I] = nutrientWithData[0].nutrientData[NAME_I];
  return dataToShow;
}

function mealIdDataToShow(mealId, meals, nutrients, nutrientsData, summaryLength) {
  let dataToShow = [];
  const mealNutrients = nutrients.filter(nutrient => nutrient.mealId == mealId);
  if (mealNutrients.length > 0) {
    const mealNutrientsData = mealNutrients.map(nutrient => (
      {
        amount: nutrient.amount,
        nutrientData: nutrientsData.find(nutrientData => nutrientData[0] === nutrient.nutrientDataId)
      })
    );
    dataToShow = calculateMealMicronutrientData(mealNutrientsData, summaryLength);
    dataToShow[NAME_I] = meals.find(meal => meal.id === mealId).name;
  }
  return dataToShow;
}

function planIdDataToShow(planId, plans, meals, nutrients, nutrientsData, summaryLength) {
  let dataToShow = [];
  const planMeals = meals.filter(meal => meal.planId === planId);
  const planNutrients = nutrients.filter(nutrient => planMeals.some(meal => meal.id === nutrient.mealId));
  if (planNutrients.length > 0) {
    const planNutrientsData = planNutrients.map(nutrient => (
      {
        amount: nutrient.amount,
        nutrientData: nutrientsData.find(nutrientData => nutrientData[0] === nutrient.nutrientDataId)
      })
    );
    dataToShow = calculateMealMicronutrientData(planNutrientsData, summaryLength);
    dataToShow[1] = plans.find(plan => plan.id === planId).name;
  }
  return dataToShow;
}

function calculateDataToShow(planId, mealId, nutrientId, nutrientData, plans, meals, nutrients, nutrientsData, summaryLength) {
  if (nutrientData) {
    return nutrientDataToShow(nutrientData, summaryLength);
  } else if (nutrientId) {
    return nutrientIdDataToShow(nutrientId, nutrients, nutrientsData, summaryLength);
  } else if (mealId) {
    return mealIdDataToShow(mealId, meals, nutrients, nutrientsData, summaryLength);
  } else if (planId) {
    return planIdDataToShow(planId, plans, meals, nutrients, nutrientsData, summaryLength);
  }
}

const MicronutrientViewOneRow = (dataToShow) =>
  (
    <View style={styles.summaryRow}>
      <SmallText style={styles.smallText}>energ: {dataToShow[ENERGY_I].toFixed(0)}cal</SmallText>
      <SmallText style={styles.smallText}>carb: {dataToShow[CARBOHYDRATES_I].toFixed(0)}g</SmallText>
      <SmallText style={styles.smallText}>fet: {dataToShow[FET_I].toFixed(0)}g</SmallText>
      <SmallText style={styles.smallText}>prot: {dataToShow[PROTEIN_I].toFixed(0)}g</SmallText>
    </View>
  );

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
    <View style={styles.screen}>
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

const MicronutrientViewLong = (dataToShow) => {

  const dataWithHeading = dataToShow.map((data, i) => ({
    value: data,
    heading: nutrientHeading[i].name.fiShort,
    unit: nutrientHeading[i].unit,
    recommendation: getRecommendation(nutrientHeading[i])
  }));

  // Convert data for SectionList
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
  return (<View style={styles.screen}>
    <SectionList
      sections={data}
      renderItem={item => {
        return <Micronutrient2
          value={item.item} />
      }}
      renderSectionHeader={({ section: { title } }) => (
        <SectionHeader title={title} />)}
      stickySectionHeadersEnabled={true}
      keyExtractor={(_, index) => index.toString()}
    />
  </View>
  );
}

const MicronutrientView = ({ nutrientId, mealId, planId, nutrientData, summary, oneRow, noDataText }) => {
  const noDataMessage = noDataText || 'No micronutrient data';
  const meals = useSelector(state => state.meals.meals);
  const plans = useSelector(state => state.plans.plans);
  const nutrients = useSelector(state => state.nutrients.nutrients);
  const nutrientsData = useSelector(state => state.nutrientsData.nutrientsData);
  const summaryLength = summary ? SUMMARY_LENGTH : 0;

  const dataToShow = calculateDataToShow(planId, mealId, nutrientId, nutrientData, plans, meals, nutrients, nutrientsData, summaryLength);

  if (dataToShow.length === 0) {
    return (<View>
      <Text>{noDataMessage}</Text>
    </View>);
  } else if (oneRow) {
    return MicronutrientViewOneRow(dataToShow);
  } else if (summary) {
    return MicronutrientViewSummary(dataToShow);
  }
  return MicronutrientViewLong(dataToShow);
}

const styles = StyleSheet.create({
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  smallText: {
    fontSize: 12
  },
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
    // justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingTop: 20,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: Colors.darkGrayBorder,
    backgroundColor: 'white'
  }
})
export default MicronutrientView;