import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { Alert, TouchableOpacity, View, Text, StyleSheet, Platform } from 'react-native'

import InputText from '../components/InputText';
import * as planActions from '../store/actions/plans';
import Colors from '../constants/Colors';

const NewPlanScreen = props => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const addPlanHandler = useCallback(() => {
    if (!name) {
      Alert.alert('Please give name',
        'Please write plan name to the field',
        [{ text: 'OK' }]);
      return;
    }
    if (!description) {
      Alert.alert('Please give description',
        'Please write plan description to the field',
        [{ text: 'OK' }]);
      return;
    }
    // const planId = new Date().toISOString();
    dispatch(planActions.newPlan(name, description));
    props.navigation.goBack();
  }, [name, description]);

  useEffect(() => {
    props.navigation.setParams({ addPlanHandler })
  }, [addPlanHandler]);

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

NewPlanScreen.navigationOptions = navData => {
  const addPlanHandler = navData.navigation.getParam('addPlanHandler');

  return {
    headerTitle: (
      <TouchableOpacity style={styles.header} onPress={addPlanHandler} >
        <Text style={styles.headerText}>Add plan</Text>
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
export default NewPlanScreen;