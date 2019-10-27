import React from 'react'
import { Picker, Button, View, Text, StyleSheet, } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';

import * as db from '../helperFunctions/sqlite';
import Colors from '../constants/Colors';
import * as Constants from '../constants/Constants';
import * as configurationsActions from '../store/actions/configurations';


const ConfigureScreen = props => {
  const dispatch = useDispatch();
  const configurations = useSelector(state => state.configurations.configurations);
  const writeDbTablesToLog = async () => {
    let result = await db.getAllPlans();
    console.log('Plans result =', result);
    result = await db.getAllMeals();
    console.log('Meals result =', result);
    result = await db.getAllNutrients();
    console.log('Nutrients result =', result);
    result = await db.getAllBarcodes();
    console.log('Barcodes result =', result);
  }

  const dropTablesHandler = async () => {
    await db.dropAllTablesInDatabase();
  }
  const languageChangeHandler = language => {
    dispatch(configurationsActions.storeLanguageToFile(language));

  };
  const genderChangeHandler = gender => {
    dispatch(configurationsActions.storeGenderToFile(gender));
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>This version is used for testing.</Text>
      <View style={{ height: 100 }}>
        <Picker
          selectedValue={configurations.language}
          style={{ justifyContent: 'center', height: 50, width: 200 }}
          onValueChange={languageChangeHandler}
        >
          <Picker.Item label={Constants.ENGLISH} value={Constants.ENGLISH} />
          <Picker.Item label={Constants.FINISH} value={Constants.FINISH} />
        </Picker>
      </View>
      <View style={{ height: 100 }}>
        <Picker
          selectedValue={configurations.gender}
          style={{ justifyContent: 'center', height: 50, width: 200 }}
          onValueChange={genderChangeHandler}
        >
          <Picker.Item label={Constants.FEMALE} value={Constants.FEMALE} />
          <Picker.Item label={Constants.MALE} value={Constants.MALE} />
        </Picker>
      </View>
      <View style={styles.button}>
        <Button title="Drop database tables" onPress={dropTablesHandler} />
      </View>
      <View style={styles.button}>
        <Button title="Go to start screen" onPress={() => props.navigation.navigate('AllPlans')} />
      </View>
      <View style={styles.button}>
        <Button title="Write db tables to log" onPress={writeDbTablesToLog} />
      </View>
    </View>
  )
}

ConfigureScreen.navigationOptions = navData => {

  return {
    headerTitle: 'Nutrition planner version 0.01',
  }
};

const styles = StyleSheet.create({
  button: {
    margin: 20,
  },
  text: {
    textAlign: 'center'
  },
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
  planDescription: {
    padding: 20
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
export default ConfigureScreen;