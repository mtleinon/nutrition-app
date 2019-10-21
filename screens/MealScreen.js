import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView, KeyboardAvoidingView, View, Text, StyleSheet, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as nutrientActions from '../store/actions/nutrients';
import HeadingText from '../components/HeadingText';
import Colors from '../constants/Colors';
import HeaderButton from '../components/HeaderButton';
import MicronutrientView from '../components/MicronutrientView';
import AddButton from '../components/AddButton';
import Nutrient from '../components/Nutrient';

const MealScreen = props => {
  const mealId = props.navigation.getParam('mealId');
  const meal = useSelector(state => state.meals.meals.find(meal => meal.id == mealId));
  const nutrients = useSelector(state =>
    state.nutrients.nutrients.filter(nutrient => nutrient.mealId == mealId));
  const dispatch = useDispatch();
  const scrollViewRef = useRef();

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
        <MicronutrientView mealId={meal.id} summary={true}
          oneRow={true} noDataText="Meal has no nutrients yet." />
      </View>
      <KeyboardAvoidingView
        behavior="padding" style={{ flex: 1 }}
        keyboardVerticalOffset={100}>
        {nutrients ? <ScrollView ref={scrollViewRef}
        >
          {nutrients.map((nutrient, index) => <Nutrient key={nutrient.id} nutrient={nutrient}
            removeNutrientHandler={removeNutrientHandler}
            updateNutrientAmountHandler={updateNutrientAmountHandler}
            focus={index === nutrients.length - 1}
          />)}
          <View style={styles.buttonRow}>
            <AddButton title='Add nutrient' onPress={() => props.navigation.navigate('SelectNutrient', { mealId })} />
            <AddButton title='Scan barcode' onPress={() => {
              props.navigation.navigate('SelectNutrientWithBarcode', { mealId });
            }} />
          </View>
        </ScrollView>
          : <Text>No nutrients in the meal</Text>}
      </KeyboardAvoidingView>
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
        <Item title="Select nutrient with barcode"
          iconName={Platform.OS === 'android' ? 'md-barcode' : 'ios-barcode'}
          onPress={() => {
            navData.navigation.navigate('SelectNutrientWithBarcode', { mealId });
          }} />
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
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 5,
    backgroundColor: Colors.screenBackground,
  },
  micronutrientRow: {
    marginLeft: 10,
    marginRight: 40,
    marginBottom: 7
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})
export default MealScreen;