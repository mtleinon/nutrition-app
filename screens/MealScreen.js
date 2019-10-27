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
import TouchableHeader from '../components/TouchableHeader';
import { catchErrors } from '../store/actions/dbOperation';
import * as i1n from '../helperFunctions/translations';

const MealScreen = props => {
  const mealId = props.navigation.getParam('mealId');
  const meal = useSelector(state => state.meals.meals.find(meal => meal.id == mealId));
  const nutrients = useSelector(state =>
    state.nutrients.nutrients.filter(nutrient => nutrient.mealId == mealId));
  const dispatch = useDispatch();
  const scrollViewRef = useRef();

  const removeNutrientHandler = (nutrientId) => {
    dispatch(catchErrors(nutrientActions.deleteNutrientFromDb(nutrientId)));
  }

  const updateNutrientAmountHandler = (nutrient, newAmount) => {
    nutrient.amount = newAmount;
    dispatch(catchErrors(nutrientActions.updateNutrientInDb(nutrient)));
  }

  return (
    <View style={styles.screen} >
      <TouchableHeader onPress={() => {
        props.navigation.navigate('Micronutrient', { mealId });
      }}>
        <HeadingText style={styles.HeadingText}>{meal.name}</HeadingText>
        <View style={styles.micronutrientRow}>
          <MicronutrientView mealId={meal.id} summary={true}
            oneRow={true} noDataText=" " />
        </View>
      </TouchableHeader>
      <KeyboardAvoidingView
        behavior="padding" style={{ flex: 1 }}
        keyboardVerticalOffset={100}>
        {nutrients ? <ScrollView ref={scrollViewRef}
        >
          {nutrients.map((nutrient, index) => <Nutrient key={nutrient.id} nutrient={nutrient}
            removeNutrientHandler={removeNutrientHandler}
            updateNutrientAmountHandler={updateNutrientAmountHandler}
            focus={index === nutrients.length - 1}
            onPress={() => {
              props.navigation.navigate('Micronutrient', { nutrientId: nutrient.id });
            }}
          />)}
          <View style={styles.buttonRow}>
            <AddButton title={i1n.t('addNutrient')} onPress={() => props.navigation.navigate('SelectNutrient', { mealId })} />
            <AddButton title={i1n.t('scanBarcode')} onPress={() => {
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
  // const mealNutrientData = navData.navigation.getParam('mealNutrientData');

  return {
    headerTitle: i1n.t('meal'),
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
    // paddingTop: 10,
    // paddingLeft: 5,
    // paddingRight: 5,
    backgroundColor: Colors.screenBackground,
  },
  HeadingText: {
    marginLeft: 10,
  },
  micronutrientRow: {
    marginLeft: 15,
    marginRight: 25,
    marginBottom: 7
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})
export default MealScreen;