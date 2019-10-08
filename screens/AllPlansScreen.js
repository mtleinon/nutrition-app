import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { TouchableHighlight, FlatList, View, Text, StyleSheet, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as planActions from '../store/actions/plans';
import { Ionicons } from '@expo/vector-icons';

import HeadingText from '../components/HeadingText';
import Colors from '../constants/Colors';
import HeaderButton from '../components/HeaderButton';
import MicronutrientView from '../components/MicronutrientView';
import NameText from '../components/NameText';

const Plan = ({ plan, deletePlanHandler, editPlanHandler, navigateToPlanHandler }) => {
  // console.log('Plan', plan);

  return (
    <TouchableHighlight onPress={() => navigateToPlanHandler(plan.id)} >
      <View style={[styles.plan, styles.elevated]}>
        <View style={styles.nameRow}>
          <NameText numberOfLines={2} style={styles.mealName}>{plan.name}</NameText>
          <Ionicons
            style={styles.icon}
            onPress={() => deletePlanHandler(plan.id)}
            name="md-remove-circle" size={24} color="red" />
          <Ionicons
            style={styles.icon}
            onPress={() => editPlanHandler(plan.id)}
            name="md-arrow-round-forward" size={24} color="blue" />
        </View>
        {/* <View style={styles.micronutrientRow}>
          <MicronutrientView planId={plan.id} summary={true} oneRow={true} />
        </View> */}
      </View>
    </TouchableHighlight>
  );
}

const AllPlansScreen = props => {
  const plans = useSelector(state => state.plans.plans);
  const dispatch = useDispatch();
  // console.log('AllPlansScreen');

  const navigateToPlanHandler = (planId) => {
    // console.log('navigateToPlanHandler=', planId);

    props.navigation.navigate('Plan', { planId });
  }
  const deletePlanHandler = planId => {
    // console.log('nutrient=', nutrient);
    dispatch(planActions.deletePlanFromDb(planId));
  }
  const editPlanHandler = planId => {
    // console.log('nutrient=', nutrient);
    props.navigation.navigate('NewPlan', { isEditMode: true, planId });
  }

  return (
    <View style={styles.screen}>
      <HeadingText>All plans</HeadingText>
      <FlatList
        data={plans}
        renderItem={item => <Plan plan={item.item}
          deletePlanHandler={deletePlanHandler}
          editPlanHandler={editPlanHandler}
          navigateToPlanHandler={navigateToPlanHandler} />}
        keyExtractor={item => item.id.toString()} />
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
  plan: {
    borderBottomWidth: 1,
    paddingVertical: 5,
    borderBottomColor: Colors.grayBorder,
  },
  mealName: {
    width: '70%'
  },
  icons: {
    paddingRight: 10
  },
  nameRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  micronutrientRow: {
    marginLeft: 10,
    marginRight: 40,
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
  }
})
export default AllPlansScreen;