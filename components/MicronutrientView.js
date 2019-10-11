import React from 'react'
import { useSelector } from 'react-redux';
import { TouchableHighlight, SectionList, FlatList, View, Text, StyleSheet } from 'react-native'
import { calculateMealMicronutrientData } from '../helperFunctions/mealMicronutrientData';
import nutrientHeading from '../data/nutrientInfo';
// import Nutrients from '../data/finelliAllNutrients'; // 36 nutriitions
import Colors from '../constants/Colors';
import HeadingText from '../components/HeadingText';
import SmallText from '../components/SmallText';

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

const Micronutrient = ({ value, heading, unit, recommendation }) => {
  // console.log('Micronutrient:', heading, value);
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
  // console.log('SectionHeader', title);
  return (
    <View style={styles.sectionHeader}>

      <Text style={styles.sectionHeaderName}>{title.title}</Text>
      <Text style={styles.sectionHeaderValue}>{title.amount}</Text>
      <Text style={styles.sectionHeaderUnit}> </Text>
      <Text style={styles.sectionHeaderRecommendation}>{title.relative}</Text>
    </View>
  )
}

const summaryLength = 6;
const MicronutrientView = ({ nutrientId, mealId, planId, nutrientData, summary, oneRow, noDataText }) => {
  const noDataMessage = noDataText || 'No micronutrient data';
  const meals = useSelector(state => state.meals.meals);
  const plans = useSelector(state => state.plans.plans);
  const nutrients = useSelector(state => state.nutrients.nutrients);
  const nutrientsData = useSelector(state => state.nutrientsData.nutrientsData);

  let dataToShow;
  if (nutrientData) {
    if (summary) {
      dataToShow = nutrientData.slice(0, summaryLength);
    } else {
      dataToShow = [...nutrientData];
    }
    dataToShow[1] += ' 100g.'
  }
  if (nutrientId) {
    const singleNutrient = nutrients.filter(nutrient => nutrient.id === nutrientId);
    const nutrientWithData = singleNutrient.map(nutrient => (
      {
        amount: nutrient.amount,
        nutrientData: nutrientsData.find(nutrientData => nutrientData[0] === nutrient.nutrientDataId)
      })
    );
    dataToShow = calculateMealMicronutrientData(nutrientWithData, summary);
    dataToShow[1] = nutrientWithData[0].nutrientData[1];
  }

  if (mealId) {
    const mealNutrients = nutrients.filter(nutrient => nutrient.mealId == mealId);
    if (mealNutrients.length > 0) {
      const mealNutrientsData = mealNutrients.map(nutrient => (
        {
          amount: nutrient.amount,
          nutrientData: nutrientsData.find(nutrientData => nutrientData[0] === nutrient.nutrientDataId)
        })
      );
      dataToShow = calculateMealMicronutrientData(mealNutrientsData, summary);
      dataToShow[1] = meals.find(meal => meal.id === mealId).name;
    }
  }

  if (planId) {
    const planMeals = meals.filter(meal => meal.planId === planId);
    const planNutrients = nutrients.filter(nutrient => planMeals.some(meal => meal.id === nutrient.mealId));
    if (planNutrients.length > 0) {
      const planNutrientsData = planNutrients.map(nutrient => (
        {
          amount: nutrient.amount,
          nutrientData: nutrientsData.find(nutrientData => nutrientData[0] === nutrient.nutrientDataId)
        })
      );
      dataToShow = calculateMealMicronutrientData(planNutrientsData, summary);
      dataToShow[1] = plans.find(plan => plan.id === planId).name;
    }
  }
  if (!dataToShow) {
    return <View>
      <Text>{noDataMessage}</Text>
    </View>
  }
  if (oneRow) {
    return (
      <View style={styles.summaryRow}>
        <SmallText style={styles.smallText}>energ: {dataToShow[2].toFixed(0)}cal</SmallText>
        <SmallText style={styles.smallText}>carb: {dataToShow[3].toFixed(0)}g</SmallText>
        <SmallText style={styles.smallText}>fet: {dataToShow[4].toFixed(0)}g</SmallText>
        <SmallText style={styles.smallText}>prot: {dataToShow[5].toFixed(0)}g</SmallText>
      </View>
    );
  }
  const dataWithHeading = dataToShow.map((data, i) => ({
    value: data,
    heading: nutrientHeading[i].name.fiShort,
    unit: nutrientHeading[i].unit,
    recommendation: getRecommendation(nutrientHeading[i])
  }));

  if (summary) {
    //Render data with FlatList
    return (
      <View style={styles.screen}>
        {/* <HeadingText>{dataToShow[1]}</HeadingText> */}
        <FlatList
          data={dataToShow.slice(2)}
          renderItem={item => {
            return <Micronutrient
              value={item.item}
              heading={nutrientHeading[item.index + 2].name.fiShort}
              unit={nutrientHeading[item.index + 2].unit}
              recommendation={getRecommendation(nutrientHeading[item.index + 2])} />
          }}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    )
  }
  // Render data with SectionList
  else {
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
      <HeadingText>{dataToShow[1]}</HeadingText>
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