import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { View, ScrollView, StyleSheet, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as planActions from '../store/actions/plans';
import Plan from '../components/Plan';
import Colors from '../constants/Colors';
import HeaderButton from '../components/HeaderButton';
import AddButton from '../components/AddButton';
import { catchErrors } from '../store/actions/dbOperation';

// import i1n from 'i18n-js';
import i1n from 'i18n-js';
console.log('AllPlansScreen i1n.locale =', i1n.locale);

const AllPlansScreen = props => {
  const plans = useSelector(state => state.plans.plans);
  const meals = useSelector(state => state.meals.meals);

  const dispatch = useDispatch();

  const navigateToPlanHandler = (planId) => {
    props.navigation.navigate('Plan', { planId });
  }

  const deletePlanHandler = planId => {
    const mealIdsToDelete = meals.filter(meal => meal.planId === planId).map(meal => meal.id);
    dispatch(catchErrors(planActions.deletePlanAndItsContentFromDb(planId, mealIdsToDelete)));
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
        <AddButton title={i1n.t('addNewPlan')} onPress={() => props.navigation.navigate('NewPlan')} />
      </ScrollView>

    </View>
  )
}

AllPlansScreen.navigationOptions = navData => {

  return {
    headerTitle: i1n.t('allPlans'),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="AddNewPlan"
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
    backgroundColor: Colors.screenBackground,
    justifyContent: 'flex-start'
  },

})
export default AllPlansScreen;