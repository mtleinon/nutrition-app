import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button, FlatList, View, StyleSheet, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as mealActions from '../store/actions/meals';
import * as nutrientActions from '../store/actions/nutrients';

import HeadingText from '../components/HeadingText';
import Heading2Text from '../components/Heading2Text';
import Colors from '../constants/Colors';
import HeaderButton from '../components/HeaderButton';
import MicronutrientView from '../components/MicronutrientView';
import TouchableCard from '../components/TouchableCard';
import Icon from '../components/Icon';
import AddButton from '../components/AddButton';
import { ScrollView } from 'react-native-gesture-handler';

const Meal = ({ meal, editMealHandler, deleteMealHandler, navigateToMealHandler }) => {
  return (
    <TouchableCard onPress={() => navigateToMealHandler(meal.id)} >
      <View style={styles.nameRow}>
        <Heading2Text numberOfLines={2} style={styles.mealName}>{meal.name}</Heading2Text>
        <View style={styles.row}>
          <Icon name="delete" onPress={() => deleteMealHandler(meal.id)} />
          <Icon name="edit" onPress={() => editMealHandler(meal.id)} />
        </View>
      </View>
      <View style={styles.mealMicronutrientRow}>
        <MicronutrientView mealId={meal.id} summary={true} oneRow={true} />
      </View>
    </TouchableCard>
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
    dispatch(nutrientActions.deleteNutrientsOfMealsFromDb([mealId]));
    dispatch(mealActions.deleteMealFromDb(mealId));
  }
  const editMealHandler = mealId => {
    props.navigation.navigate('NewMeal', { isEditMode: true, mealId });
  }

  return (
    <View style={styles.screen}>
      <HeadingText>{plan.name}</HeadingText>
      <View style={styles.planMicronutrientRow}>
        <MicronutrientView planId={plan.id} summary={true} oneRow={true} />
      </View>
      <ScrollView>
        {planMeals.map(meal => <Meal key={meal.id} meal={meal}
          deleteMealHandler={deleteMealHandler}
          editMealHandler={editMealHandler}
          navigateToMealHandler={navigateToMealHandler} />)
        }
        <AddButton title='Add new meal' onPress={() => props.navigation.navigate('NewMeal', { planId })} />
      </ScrollView>
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
            navData.navigation.navigate('Micronutrient', { planId });
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
    // margin: 5
  },
  row: {
    flexDirection: 'row'
  },
  mealName: {
    flex: 1
  },
  icons: {
    paddingRight: 10
  },
  mealMicronutrientRow: {
    marginLeft: 10,
    marginRight: 30,
    marginVertical: 5
  },
  planMicronutrientRow: {
    marginLeft: 10,
    marginRight: 40,
    marginTop: 3,
    marginBottom: 7
  }
})
export default PlanScreen;