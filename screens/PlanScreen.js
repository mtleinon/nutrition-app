import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { View, ScrollView, StyleSheet, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as mealActions from '../store/actions/meals';
import * as nutrientActions from '../store/actions/nutrients';

import HeadingText from '../components/HeadingText';
import Colors from '../constants/Colors';
import HeaderButton from '../components/HeaderButton';
import MicronutrientView from '../components/MicronutrientView';
import AddButton from '../components/AddButton';
import Meal from '../components/Meal';
import TouchableHeader from '../components/TouchableHeader';
import { catchErrors } from '../store/actions/dbOperation';
import * as i1n from '../helperFunctions/translations';

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
    dispatch(catchErrors(nutrientActions.deleteNutrientsOfMealsFromDb([mealId])));
    dispatch(catchErrors(mealActions.deleteMealFromDb(mealId)));
  }
  const editMealHandler = mealId => {
    props.navigation.navigate('NewMeal', { isEditMode: true, mealId });
  }

  return (
    <View style={styles.screen}>
      <TouchableHeader
        onPress={() => {
          props.navigation.navigate('Micronutrient', { planId });
        }}
        style={styles.headerColor}
      >
        <HeadingText style={styles.HeadingText}>{plan.name}</HeadingText>
        <View style={styles.planMicronutrientRow}>
          <MicronutrientView planId={plan.id} summary={true}
            oneRow={true} noDataText=" " />
        </View>
      </TouchableHeader>
      <ScrollView>
        {planMeals.map(meal => <Meal key={meal.id} meal={meal}
          deleteMealHandler={deleteMealHandler}
          editMealHandler={editMealHandler}
          navigateToMealHandler={navigateToMealHandler} />)
        }
        <AddButton title={i1n.t('addNewMeal')} onPress={() => props.navigation.navigate('NewMeal', { planId })} />
      </ScrollView>
    </View>
  )
}

PlanScreen.navigationOptions = navData => {
  const planId = navData.navigation.getParam('planId');

  return {
    headerTitle: i1n.t('plan'),
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
            navData.navigation.navigate('Micronutrient', { planId });
          }} />
      </HeaderButtons>
    )
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
  },
  HeadingText: {
    marginLeft: 10,
  },
  headerColor: {
    backgroundColor: Colors.planColor
  },
  meal: {
    borderBottomWidth: 1,
    paddingVertical: 5,
    borderBottomColor: Colors.grayBorder,
  },
  planMicronutrientRow: {
    marginLeft: 10,
    marginRight: 30,
    marginTop: 3,
    marginBottom: 7
  }
});

export default PlanScreen;