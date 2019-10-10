import React from 'react'
import { useSelector } from 'react-redux';
import { TouchableHighlight, FlatList, View, Text, StyleSheet } from 'react-native'
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
    <TouchableHighlight style={styles.item} onPress={() => { }} >
      <View style={styles.microNutrient}>
        <Text numberOfLines={2} style={styles.microNutrientName}>{heading}</Text>
        <Text style={styles.microNutrientValue}>{value.toFixed(decimals(value))}</Text>
        <Text style={styles.microNutrientUnit}>{unit}</Text>
        <Text style={styles.microNutrientRecommendation}>{recommendation ? (value / recommendation * 100).toFixed(0) + '%' : ''}</Text>
      </View>
    </TouchableHighlight>
  )
}

const summaryLength = 6;
const MicronutrientView = ({ nutrientId, mealId, planId, nutrientData, summary, oneRow }) => {
  const meals = useSelector(state => state.meals.meals);
  const plans = useSelector(state => state.plans.plans);
  const nutrients = useSelector(state => state.nutrients.nutrients);
  const nutrientsData = useSelector(state => state.nutrientsData.nutrientsData);

  let dataToShow;
  if (nutrientData && summary) {
    dataToShow = nutrientData.slice(0, summaryLength);
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
      <Text>No micronutrient data</Text>
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
  microNutrientRecommendation: {
    paddingRight: 10,
    textAlign: 'right',
    width: '20%'
  },
  microNutrientUnit: {
    width: '10%',
    textAlign: 'left'
  }
})
export default MicronutrientView;