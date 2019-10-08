import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { TouchableHighlight, FlatList, View, Text, StyleSheet, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as mealActions from '../store/actions/meals';

import { Ionicons } from '@expo/vector-icons';

import HeadingText from '../components/HeadingText';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import HeaderButton from '../components/HeaderButton';
import MicronutrientView from '../components/MicronutrientView';

const Meal = ({ meal, editMealHandler, deleteMealHandler, navigateToMealHandler }) => {
  return (
    <TouchableHighlight onPress={() => navigateToMealHandler(meal.id)} >
      <View style={[styles.meal, Styles.elevated]}>
        <View style={styles.nameRow}>
          <Text numberOfLines={2} style={styles.mealName}>{meal.name}</Text>
          <Ionicons
            style={styles.icon}
            onPress={() => deleteMealHandler(meal.id)}
            name="md-remove-circle" size={24} color="red" />
          <Ionicons
            style={styles.icon}
            onPress={() => editMealHandler(meal.id)}
            name="md-arrow-round-forward" size={24} color="blue" />

        </View>
        {/* <View style={styles.micronutrientRow}>
          <MicronutrientView mealId={meal.id} summary={true} oneRow={true} />
        </View> */}
      </View>
    </TouchableHighlight>
  );
}

const PlanScreen = props => {
  const planId = props.navigation.getParam('planId');
  const plan = useSelector(state => state.plans.plans.find(plan => plan.id == planId));
  const dispatch = useDispatch();
  const planMeals = useSelector(
    state => state.meals.meals.filter(meal => meal.planId === planId));

  const navigateToMealHandler = mealId => {
    props.navigation.navigate('Meal', { mealId });
  }

  const deleteMealHandler = mealId => {
    dispatch(mealActions.deleteMealFromDb(mealId));
  }
  const editMealHandler = mealId => {
    // console.log('nutrient=', nutrient);
    props.navigation.navigate('NewMeal', { isEditMode: true, mealId });
  }

  return (
    <View style={styles.screen}>
      <HeadingText>{plan.name}</HeadingText>
      {/* <View style={styles.micronutrientRow}>
        <MicronutrientView planId={plan.id} summary={true} oneRow={true} />
      </View> */}
      <FlatList
        data={planMeals}
        renderItem={item => <Meal meal={item.item}
          deleteMealHandler={deleteMealHandler}
          editMealHandler={editMealHandler}
          navigateToMealHandler={navigateToMealHandler} />}
        keyExtractor={item => item.id.toString()} />
    </View>
  )
}

PlanScreen.navigationOptions = navData => {
  const planId = navData.navigation.getParam('planId');

  return {
    headerTitle: 'Plan',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Add Meal"
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('NewMeal', { planId });
          }} />
        <Item title="Info"
          iconName='md-information-circle'
          onPress={() => {
            navData.navigation.navigate('Micronutrient', { planId, summary: true });
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
  meal: {
    borderBottomWidth: 1,
    paddingVertical: 5,
    borderBottomColor: Colors.grayBorder,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealName: {
    width: '70%'
  },
  icons: {
    paddingRight: 10
  },
  micronutrientRow: {
    marginLeft: 10,
    marginRight: 40,
  }
})
export default PlanScreen;