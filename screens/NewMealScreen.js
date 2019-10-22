import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Alert, TouchableHighlight, TouchableOpacity, FlatList, TextInput, View, Text, StyleSheet, Platform } from 'react-native'
import Colors from '../constants/Colors';
//import uuid from 'react-native-uuid';

import InputText from '../components/InputText';
import * as mealActions from '../store/actions/meals';
import Meal from '../models/Meal.js';
const NewMealScreen = props => {
  const planId = props.navigation.getParam('planId');
  const mealId = props.navigation.getParam('mealId');
  const isEditMode = Boolean(props.navigation.getParam('isEditMode'));
  const meal = useSelector(state => state.meals.meals.find(meal => meal.id === mealId));

  const [name, setName] = useState(isEditMode ? meal.name : '');
  const [description, setDescription] = useState(isEditMode ? meal.description : '');
  const dispatch = useDispatch();

  const mealHandler = useCallback(() => {
    if (!name) {
      Alert.alert('Please give name',
        'Please write meal name to the field',
        [{ text: 'OK' }]);
      return;
    }
    if (isEditMode) {
      dispatch(mealActions.updateMealInDb(new Meal(mealId, meal.planId, name, description)));
    } else {
      dispatch(mealActions.storeMealToDb(new Meal(null, planId, name, description)));
    }
    props.navigation.goBack();
  }, [mealId, name, description]);

  useEffect(() => {
    props.navigation.setParams({ mealHandler });
    props.navigation.setParams({ actionText: isEditMode ? "Update meal" : "Add meal" })
  }, [mealHandler]);

  return (
    <View style={styles.screen}>
      <InputText
        label="Name"
        onChangeText={setName} value={name}
      />
      <InputText
        label="Description"
        multiline={true}
        numberOfLines={6}
        onChangeText={setDescription} value={description}
      />
    </View>
  )
}

NewMealScreen.navigationOptions = navData => {
  const mealHandler = navData.navigation.getParam('mealHandler');
  const actionText = navData.navigation.getParam('actionText');

  return {
    headerTitle: (
      <TouchableOpacity style={styles.header} onPress={mealHandler} >
        <Text style={styles.headerText}>{actionText}</Text>
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