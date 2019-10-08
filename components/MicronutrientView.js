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

const Micronutrient = ({ value, heading }) => {
  // console.log('Micronutrient:', heading, value);
  return (
    <TouchableHighlight style={styles.item} onPress={() => { }} >
      <View style={styles.microNutrient}>
        <Text numberOfLines={2} style={styles.microNutrientName}>{heading}</Text>
        <Text style={styles.microNutrientValue}>{value.toFixed(decimals(value))}</Text>
      </View>
    </TouchableHighlight>
  )
}

const summaryLength = 6;
const MicronutrientView = ({ mealId, planId, nutrientData, summary, oneRow }) => {
  const meals = useSelector(state => state.meals.meals);
  const plans = useSelector(state => state.plans.plans);
  const nutrientsData = useSelector(state => state.nutrientsData.nutrientsData);

  if (nutrientData && summary) {
    nutrientData = nutrientData.slice(0, summaryLength);
  }
  if (mealId) {
    meal = meals.find(meal => meal.id == mealId);
    if (meal && meal.nutrients && meal.nutrients.length > 0) {
      const mealNutrients = nutrientsData.filter(
        data => meal.nutrients.some(mealNutrient => mealNutrient.nutrientDataId === data[0]));
      nutrientData = calculateMealMicronutrientData(meal, mealNutrients, summary);
      nutrientData[1] = meal.name;
    }
  }
  if (planId) {
    const plan = plans.find(plan => plan.id == planId)
    const planMeals = meals.filter(
      meal => plan.mealIds.some(
        mealId => mealId === meal.id));
    const pmd = planMeals.map(meal => {
      const mealNutrients = nutrientsData.filter(
        data => meal.nutrients.some(mealNutrient => mealNutrient.nutrientDataId === data[0]));
      return calculateMealMicronutrientData(meal, mealNutrients, summary);
    }).filter(mealData => mealData !== undefined && mealData[0] != undefined);
    if (pmd.length > 0) {
      nutrientData = pmd.filter(mealData => mealData !== undefined).reduce((acc, curr) => acc.map((r, i) => r + curr[i]), Array(pmd[0].length).fill(0))
      nutrientData[1] = plan.name;
    }
  }
  if (!nutrientData) {
    return <View>
      <Text>No micronutrient data</Text>
    </View>
  }
  if (oneRow) {
    return (
      <View style={styles.summaryRow}>
        <SmallText style={styles.smallText}>energ: {nutrientData[2].toFixed(0)}cal</SmallText>
        <SmallText style={styles.smallText}>carb: {nutrientData[3].toFixed(0)}g</SmallText>
        <SmallText style={styles.smallText}>fet: {nutrientData[4].toFixed(0)}g</SmallText>
        <SmallText style={styles.smallText}>prot: {nutrientData[5].toFixed(0)}g</SmallText>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      {/* <HeadingText>{nutrientData[1]}</HeadingText> */}
      <FlatList
        data={nutrientData.slice(2)}
        renderItem={item => {
          return <Micronutrient value={item.item} heading={nutrientHeading[item.index + 2].name.fi} />
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
    width: '70%'
  },
  microNutrientValue: {
    paddingRight: 10
  }
})
export default MicronutrientView;