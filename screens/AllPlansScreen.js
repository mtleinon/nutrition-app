import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button, TouchableHighlight, FlatList, View, Text, StyleSheet, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as planActions from '../store/actions/plans';
import * as mealActions from '../store/actions/meals';
import * as nutrientActions from '../store/actions/nutrients';
import { Ionicons } from '@expo/vector-icons';

import HeadingText from '../components/HeadingText';
import Colors from '../constants/Colors';
import HeaderButton from '../components/HeaderButton';
import MicronutrientView from '../components/MicronutrientView';
import NameText from '../components/NameText';
import SmallText from '../components/SmallText';
import { TouchableOpacity } from 'react-native-gesture-handler';

const TouchableCard = ({ onPress, children }) => (
  <TouchableHighlight onPress={onPress} >
    <View style={[styles.plan, styles.elevated]}>
      {children}
    </View>
  </TouchableHighlight>
);
const DeleteIcon = ({ onPress }) => (
  <Ionicons
    style={styles.icon}
    onPress={onPress}
    name="md-remove-circle" size={24} color="red" />
)
const EditIcon = ({ onPress }) => (
  <Ionicons
    style={styles.icon}
    onPress={onPress}
    name="md-create" size={24} color="green" />
)

const Plan = ({ plan, deletePlanHandler, editPlanHandler, navigateToPlanHandler }) => {
  return (
    <TouchableCard onPress={() => navigateToPlanHandler(plan.id)} >
      <View style={styles.nameRow}>
        <NameText numberOfLines={2} style={styles.mealName}>{plan.name}</NameText>
        <View style={styles.row}>
          <DeleteIcon onPress={() => deletePlanHandler(plan.id)} />
          <EditIcon onPress={() => editPlanHandler(plan.id)} />
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
      {/* <HeadingText>All plans</HeadingText> */}
      <FlatList
        data={plans}
        renderItem={item => <Plan plan={item.item}
          deletePlanHandler={deletePlanHandler}
          editPlanHandler={editPlanHandler}
          navigateToPlanHandler={navigateToPlanHandler} />}
        keyExtractor={item => item.id.toString()} />
      <Button title='Add new plan' onPress={() => props.navigation.navigate('NewPlan')} />
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
    paddingLeft: 10,
    paddingRight: 5,
    backgroundColor: Colors.screenBackground,
    justifyContent: 'flex-start'
  },
  plan: {
    borderBottomWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomColor: Colors.grayBorder,
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
    paddingVertical: 10,

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
  }
})
export default AllPlansScreen;