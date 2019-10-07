import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Alert, TouchableHighlight, TouchableOpacity, FlatList, TextInput, View, Text, StyleSheet, Platform } from 'react-native'
import Colors from '../constants/Colors';
//import uuid from 'react-native-uuid';

import InputText from '../components/InputText';
import * as planActions from '../store/actions/plans';
import * as mealActions from '../store/actions/meals';

const NewMealScreen = props => {
  const planId = props.navigation.getParam('planId');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const planMealIds = useSelector(state => state.plans.plans.find(plan => plan.id === planId).meals);

  const addMealHandler = useCallback(() => {
    if (!name) {
      Alert.alert('Please give name',
        'Please write meal name to the field',
        [{ text: 'OK' }]);
      return;
    }
    if (!description) {
      Alert.alert('Please give description',
        'Please write meal description to the field',
        [{ text: 'OK' }]);
      return;
    }
    // dispatch(mealActions.newMeal(mealId, name, description))
    dispatch(mealActions.addNewMealToPlan(planId, name, description, planMealIds));
    props.navigation.goBack();
  }, [planId, name, description]);

  useEffect(() => {
    props.navigation.setParams({ addMealHandler })
  }, [addMealHandler]);

  return (
    <View style={styles.screen}>
      <InputText
        label="Name"
        onChangeText={setName} value={name}
      />
      <InputText
        label="Description"
        onChangeText={setDescription} value={description}
      />
    </View>
  )
}

NewMealScreen.navigationOptions = navData => {
  const addMealHandler = navData.navigation.getParam('addMealHandler');

  return {
    headerTitle: (
      <TouchableOpacity style={styles.header} onPress={addMealHandler} >
        <Text style={styles.headerText}>Add meal</Text>
      </TouchableOpacity>)
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 3,
    width: '100%'
  },
  header: {
    paddingLeft: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Platform.OS === 'android' ? 'white' : Colors.primary,
  }
});
export default NewMealScreen;