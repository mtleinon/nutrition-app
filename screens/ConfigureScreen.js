import React from 'react'
import { Button, View, Text, StyleSheet, } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';

import * as db from '../helperFunctions/sqlite';
import Colors from '../constants/Colors';
import * as Constants from '../constants/Constants';
import * as configurationsActions from '../store/actions/configurations';
import i1n from 'i18n-js';
import Heading2Text from '../components/Heading3Text';
import ElevatedCard from '../components/ElevatedCard';
import CheckBox from '../components/CheckBox';

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

  const languageChangeHandler = newValue => {
    if (newValue === Constants.ENGLISH) {
      if (configurations.language !== Constants.ENGLISH) {
        dispatch(configurationsActions.storeLanguageToFile(Constants.ENGLISH));
      }
    }
    if (newValue === Constants.FINISH) {
      if (configurations.language !== Constants.FINISH) {
        dispatch(configurationsActions.storeLanguageToFile(Constants.FINISH));
      }
    }
  };
  const genderChangeHandler = gender => {
    dispatch(configurationsActions.storeGenderToFile(gender));
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>{i1n.t('programVersion')}</Text>

      <ElevatedCard>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10 }}>
          <View style={{ flex: 1 }}>
            <Heading2Text>{i1n.t('language')}</Heading2Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <CheckBox handler={() => languageChangeHandler(Constants.ENGLISH)}
              label={i1n.t('english')}
              value={configurations.language === Constants.ENGLISH}
            />
            <CheckBox handler={() => languageChangeHandler(Constants.FINISH)}
              label={i1n.t('finish')}
              value={configurations.language === Constants.FINISH}
            />
          </View>
        </View>
      </ElevatedCard>
      <ElevatedCard>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10 }}>
          <View style={{ flex: 1 }}>
            <Heading2Text>{i1n.t('genre')}</Heading2Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <CheckBox handler={() => genderChangeHandler(Constants.FEMALE)}
              label={i1n.t('female')}
              value={configurations.gender === Constants.FEMALE}
            />
            <CheckBox handler={() => genderChangeHandler(Constants.MALE)}
              label={i1n.t('male')}
              value={configurations.gender === Constants.MALE}
            />
          </View>
        </View>
      </ElevatedCard>
      <View style={styles.button}>
        <Button title={i1n.t('goToStartScreen')} onPress={() => props.navigation.navigate('AllPlans')} />
      </View>
      <View style={styles.button}>
        <Button title={i1n.t('clearAllData')} onPress={dropTablesHandler} color='red' />
      </View>
      <View style={styles.button}>
        <Button title={i1n.t('testWriteDatabasesToLog')} onPress={writeDbTablesToLog} color='orange' />
      </View>
    </View >
  )
}

ConfigureScreen.navigationOptions = navData => {

  return {
    headerTitle: i1n.t('configurationScreenTitle'),
  }
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
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