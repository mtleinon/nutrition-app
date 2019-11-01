import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Alert, TouchableOpacity, View, Text, StyleSheet, Platform } from 'react-native'

import InputText from '../components/InputText';
import Plan from '../models/Plan';

import * as planActions from '../store/actions/plans';
import { catchErrors } from '../store/actions/dbOperation';

import Colors from '../constants/Colors';
import i1n from 'i18n-js';

const NewPlanScreen = props => {
  const planId = props.navigation.getParam('planId');
  const isEditMode = Boolean(props.navigation.getParam('isEditMode'));
  const plan = useSelector(state => state.plans.plans.find(plan => plan.id === planId));

  const [name, setName] = useState(isEditMode ? plan.name : '');
  const [description, setDescription] = useState(isEditMode ? plan.description : '');
  const dispatch = useDispatch();

  const planHandler = useCallback(() => {
    if (!name) {
      Alert.alert(i1n.t('pleaseGiveName'),
        i1n.t('pleaseWritePlanNameToTheField'),
        [{ text: 'OK' }]);
      return;
    }
    if (isEditMode) {
      dispatch(catchErrors(
        planActions.updatePlanInDb(new Plan(planId, name, description))));
    } else {
      dispatch(catchErrors(
        planActions.storePlanToDb(new Plan(null, name, description))));
    }
    props.navigation.goBack();
  }, [name, description]);

  useEffect(() => {
    props.navigation.setParams({ planHandler })
    props.navigation.setParams({ actionText: isEditMode ? i1n.t('updatePlan') : i1n.t('addNewPlan') })
  }, [planHandler]);

  return (
    <View style={styles.screen}>
      <InputText
        label={i1n.t("name")}
        onChangeText={setName} value={name}
      />
      <InputText
        label={i1n.t("description")}
        multiline={true}
        numberOfLines={6}
        onChangeText={setDescription} value={description}
      />
    </View>
  )
}

NewPlanScreen.navigationOptions = navData => {
  const planHandler = navData.navigation.getParam('planHandler');
  const actionText = navData.navigation.getParam('actionText');

  return {
    headerTitle: (
      <TouchableOpacity style={styles.header} onPress={planHandler} >
        <Text style={styles.headerText}>{actionText}</Text>
      </TouchableOpacity>)
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 10,
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