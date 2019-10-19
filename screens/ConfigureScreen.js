import React from 'react'
import { Button, View, Text, StyleSheet, } from 'react-native'
import * as db from '../helperFunctions/sqlite';
import Colors from '../constants/Colors';

const ConfigureScreen = props => {

  const writeDbTablesToLog = async () => {
    let result = await db.getAllPlans();
    console.log('Plans result =', result);
    result = await db.getAllMeals();
    console.log('Meals result =', result);
    result = await db.getAllNutrients();
    console.log('Nutrients result =', result);
  }

  const dropTablesHandler = async () => {
    await db.dropAllTablesInDatabase();
  }
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>This version is used for testing.</Text>
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