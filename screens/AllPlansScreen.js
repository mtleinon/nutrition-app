import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button, FlatList, View, StyleSheet, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as planActions from '../store/actions/plans';
import * as mealActions from '../store/actions/meals';
import * as nutrientActions from '../store/actions/nutrients';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import HeaderButton from '../components/HeaderButton';
import MicronutrientView from '../components/MicronutrientView';
import NameText from '../components/NameText';
import SmallText from '../components/SmallText';
import TouchableCard from '../components/TouchableCard';
import Icon from '../components/Icon';
import AddButton from '../components/AddButton';
import { ScrollView } from 'react-native-gesture-handler';

const Plan = ({ plan, deletePlanHandler, editPlanHandler, navigateToPlanHandler }) => {
  return (
    <TouchableCard onPress={() => navigateToPlanHandler(plan.id)} >
      <View style={styles.nameRow}>
        <NameText numberOfLines={2} style={styles.mealName}>{plan.name}</NameText>
        <View style={styles.row}>
          <Icon name="delete" onPress={() => deletePlanHandler(plan.id)} />
          <Icon name="edit" onPress={() => editPlanHandler(plan.id)} />
        </View>
      </View>
      <SmallText numberOfLines={2} style={styles.planDescription}>{plan.description}</SmallText>
      <View style={styles.micronutrientRow}>
        <MicronutrientView planId={plan.id} summary={true} noDataText="Click to add meals" />
      </View>
    </TouchableCard>
  );
}

const AllPlansScreen = props => {
  const plans = useSelector(state => state.plans.plans);
  const meals = useSelector(state => state.meals.meals);
  const dispatch = useDispatch();

  const navigateToPlanHandler = (planId) => {
    props.navigation.navigate('Plan', { planId });
  }

  const deletePlanHandler = planId => {
    const mealIdsToDelete = meals.filter(meal => meal.planId === planId).map(meal => meal.id);
    dispatch(nutrientActions.deleteNutrientsOfMealsFromDb(mealIdsToDelete));
    dispatch(mealActions.deleteMealsOfAPlanFromDb(mealIdsToDelete));
    dispatch(planActions.deletePlanFromDb(planId));
  }

  const editPlanHandler = planId => {
    props.navigation.navigate('NewPlan', { isEditMode: true, planId });
  }

  return (
    <View style={styles.screen}>
      <ScrollView>
        {plans.map(plan => <Plan key={plan.id} plan={plan}
          deletePlanHandler={deletePlanHandler}
          editPlanHandler={editPlanHandler}
          navigateToPlanHandler={navigateToPlanHandler} />)}
        <AddButton title='Add new plan' onPress={() => props.navigation.navigate('NewPlan')} />
      </ScrollView>

    </View>
  )
}

AllPlansScreen.navigationOptions = navData => {

  return {
    headerTitle: 'All Plans',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Add Plan"
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('NewPlan');
          }} />
        <Item title="Configure"
          iconName={Platform.OS === 'android' ? 'md-settings' : 'ios-settings'}
          onPress={() => {
            navData.navigation.navigate('Configure');
          }} />
      </HeaderButtons>
    )
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: Colors.screenBackground,
    justifyContent: 'flex-start'
  },
  mealName: {
    // width: '65%'
  },
  planDescription: {
    padding: 20
  },
  icons: {
    // paddingRight: 10
  },
  icon: {
    // backgroundColor: 'red',
    paddingHorizontal: 15,
    paddingVertical: 5,

    margin: 1
  },
  nameRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row'
  },
  // micronutrientRow: {
  //   marginLeft: 10,
  //   marginRight: 40,
  // },
  // elevated: {
  //   shadowColor: 'black',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowRadius: 4,
  //   padding: 5,
  //   elevation: 2,
  //   backgroundColor: 'white',
  //   borderRadius: 4,
  //   borderWidth: 0,
  //   borderColor: 'transparent',
  //   margin: 4,
  // }
})
export default AllPlansScreen;