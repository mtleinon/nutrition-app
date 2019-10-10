import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView, KeyboardAvoidingView, FlatList, View, Text, StyleSheet, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as mealActions from '../store/actions/meals';
import * as nutrientActions from '../store/actions/nutrients';
import { Ionicons } from '@expo/vector-icons';
import HeadingText from '../components/HeadingText';
import InputNumber2 from '../components/InputNumber2';
import Colors from '../constants/Colors';
// import Styles from '../constants/Styles';
import HeaderButton from '../components/HeaderButton';
import MicronutrientView from '../components/MicronutrientView';

const Nutrient = ({
  nutrient,
  removeNutrientHandler,
  updateNutrientAmountHandler,
  autofocus
}) => {
  // console.log('nutrient', nutrient);
  // const [amount, setAmount] = useState('');

  const nutrientData = useSelector(state => state.nutrientsData.nutrientsData.find(n => {
    // console.log('n[0] === nutrient.id', n[0], nutrient.id);
    return n[0] === nutrient.nutrientDataId;
  }
  ));

  return (
    <View style={[styles.nutrientContainer, styles.elevated]}>
      <View style={styles.nutrient}>
        <Text numberOfLines={2} style={styles.nutrientName}>{nutrientData[1]}</Text>
        <InputNumber2 style={styles.amount}
          onChangeText={(value) => updateNutrientAmountHandler(nutrient, value)} value={nutrient.amount}
          autofocus={autofocus}
        />
        <Ionicons
          onPress={() => removeNutrientHandler(nutrient.id)}
          name="md-remove-circle" size={24} color="red" />
      </View>
      <View style={styles.micronutrientRow}>
        <MicronutrientView nutrientId={nutrient.id} summary={true} oneRow={true} />
      </View>
    </View>
  );
}

const MealScreen = props => {
  const mealId = props.navigation.getParam('mealId');
  const meal = useSelector(state => state.meals.meals.find(meal => meal.id == mealId));
  const nutrients = useSelector(state =>
    state.nutrients.nutrients.filter(nutrient => nutrient.mealId == mealId));
  const dispatch = useDispatch();

  const removeNutrientHandler = (nutrientId) => {
    dispatch(nutrientActions.deleteNutrientFromDb(nutrientId));
  }

  const updateNutrientAmountHandler = (nutrient, newAmount) => {
    nutrient.amount = newAmount;
    dispatch(nutrientActions.updateNutrientInDb(nutrient));
  }

  return (
    <View style={styles.screen} >
      <HeadingText>{meal.name}</HeadingText>
      <View style={styles.micronutrientRow}>
        <MicronutrientView mealId={meal.id} summary={true} oneRow={true} />
      </View>
      <KeyboardAvoidingView
        behavior="padding" style={{ flex: 1 }}
        keyboardVerticalOffset={110}>
        {nutrients ? <ScrollView >
          {nutrients.map((nutrient) => <Nutrient key={nutrient.id} nutrient={nutrient}
            removeNutrientHandler={removeNutrientHandler}
            updateNutrientAmountHandler={updateNutrientAmountHandler}
          />)}
        </ScrollView>
          : <Text>No nutrients in the meal</Text>}
      </KeyboardAvoidingView>

      {/* <FlatList
        data={meal.nutrients}
        renderItem={item => <Nutrient nutrient={item.item}
          removeNutrientHandler={removeNutrientHandler}
          updateNutrientAmountHandler={updateNutrientAmountHandler}

        />}
        keyExtractor={item => item.id} /> */}
    </View>
  )
}

MealScreen.navigationOptions = navData => {
  const mealId = navData.navigation.getParam('mealId');
  const mealNutrientData = navData.navigation.getParam('mealNutrientData');

  return {
    headerTitle: 'Meal',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Select nutrient"
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('SelectNutrient', { mealId });
          }} />
        <Item title="Info"
          iconName='md-information-circle'
          onPress={() => {
            navData.navigation.navigate('Micronutrient', { mealId });
          }} />
      </HeaderButtons>
    )
  }
};



const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 5,
    backgroundColor: Colors.backgroundColor
  },
  micronutrientRow: {
    marginLeft: 10,
    marginRight: 40,
  },
  nutrientContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayBorder,
  },
  elevated: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    padding: 5,
    elevation: 2,
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 0,
    borderColor: 'transparent',
    margin: 4,
  },
  nutrient: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  nutrientName: {
    width: '70%'
  },
  amount: {
    paddingRight: 10
  },
})
export default MealScreen;