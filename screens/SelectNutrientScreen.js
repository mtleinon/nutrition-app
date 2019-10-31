import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Alert, TouchableHighlight, TouchableOpacity, FlatList, TextInput, View, Text, StyleSheet, Platform, KeyboardAvoidingView, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import * as nutrientActions from '../store/actions/nutrients';
import * as barcodeActions from '../store/actions/barcodes';
import InputText from '../components/InputText';
import Nutrient from '../models/Nutrient';
import Barcode from '../models/Barcode';
import Icon from '../components/Icon';
import { catchErrors } from '../store/actions/dbOperation';
import * as i1n from '../helperFunctions/translations';


const NutrientDataView = ({ item, selectedNameHandler, showMicronutrientHandler }) => {
  return (
    <TouchableHighlight onPress={() => selectedNameHandler(item.item[1], item.item[0])} >
      <View style={styles.selectNutrition}>
        <Text style={styles.selectNutritionText}>{item.item[0]}. {item.item[1]}</Text>
        <Icon name="information" onPress={() => showMicronutrientHandler(item.item)} />
      </View>
    </TouchableHighlight>
  )
}

const filterNutrient = (search, nutrientName) => {
  return search.toLowerCase().split(' ').every(part => nutrientName.toLowerCase().includes(part));
}

const SelectNutritionScreen = props => {
  console.log('SelectNutritionScreen - props', props);

  const mealId = props.navigation.getParam('mealId');
  const barcode = props.navigation.getParam('barcode');
  const scannedBarcode = props.navigation.getParam('scannedBarcode');
  const nutrientsData = useSelector(state => state.nutrientsData.nutrientsData);
  // const barcodes = useSelector(state => state.barcodes.barcodes);

  // const [name, setName] = useState('');
  // const [amount, setAmount] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const dispatch = useDispatch();

  const showMicronutrientHandler = (nutrient) => {
    props.navigation.navigate('Micronutrient', { nutrientData: nutrient });
  }

  const selectedNameHandler = (newSelectedName, newSelectedId) => {
    setSelectedName(newSelectedName);
    setSelectedId(newSelectedId);
    if (mealId) {
      dispatch(catchErrors(nutrientActions.storeNutrientToDb(new Nutrient(null, mealId, newSelectedId, 0))));
    }
    if (barcode) {
      dispatch(catchErrors(barcodeActions.updateBarcodeInDb(new Barcode(barcode.id, barcode.barcode, newSelectedId))));
    }
    if (scannedBarcode) {
      dispatch(catchErrors(barcodeActions.storeBarcodeToDb(new Barcode(null, scannedBarcode, newSelectedId))));
    }
    props.navigation.navigate('Meal');
  }

  const addNutrientHandler = useCallback(() => {
    if (!selectedId) {
      Alert.alert(i1n.t('pleaseSelectNutrient'),
        i1n.t('pleaseSelectNutrientByTouchingANutrientInTheList'),
        [{ text: 'OK' }]);
      return;
    }
    if (mealId) {
      dispatch(catchErrors(nutrientActions.storeNutrientToDb(new Nutrient(null, mealId, selectedId, 0))));
    }
    if (barcode) {
      const oldBarcode = barcodes.find(code => code.barcode === barcode);
      if (oldBarcode) {
        dispatch(catchErrors(barcodeActions.updateBarcodeInDb(new Barcode(null, barcode, selectedId))));
      } else {
        dispatch(catchErrors(barcodeActions.storeBarcodeToDb(new Barcode(null, barcode, selectedId))));
      }
      // return;
    }
    props.navigation.navigate('Meal');
    // props.navigation.goBack();
  }, [selectedId]);

  useEffect(() => {
    props.navigation.setParams({ addNutrientHandler })
  }, [addNutrientHandler]);

  return (
    <View style={styles.screen}>
      <InputText
        label={i1n.t('searchNutrient')}
        onChangeText={setSelectedName} value={selectedName}
      />
      <Text style={styles.label}>{i1n.t('selectNutrient')}:</Text>
      <FlatList
        data={nutrientsData.filter(item => filterNutrient(selectedName, item[1]))}
        renderItem={item => <NutrientDataView
          item={item}
          selectedNameHandler={selectedNameHandler}
          showMicronutrientHandler={showMicronutrientHandler}
        />}
        keyExtractor={item => item[0].toString()}
      />
    </View>
  )
}

SelectNutritionScreen.navigationOptions = navData => {
  const addNutrientHandler = navData.navigation.getParam('addNutrientHandler');
  const mealId = navData.navigation.getParam('mealId');
  const barcode = navData.navigation.getParam('barcode');

  return {
    headerTitle: (
      <TouchableOpacity style={styles.header} onPress={addNutrientHandler} >
        <Text style={styles.headerText}>{barcode ? i1n.t('selectNutrientForBarcode') : i1n.t('selectNutrient')}</Text>
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
  label: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  selectNutrition: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 5,
    borderBottomColor: Colors.grayBorder,
    marginRight: 8
  },
  selectNutritionText: {
    flex: 1
  },
  selectedName: {
    height: 40,
    paddingHorizontal: 5,
    // backgroundColor: '#efefef'
  },
  item: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 5
  },
  input: {
  },
  inputField: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
    // backgroundColor: Colors.primary,
    paddingHorizontal: 6
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
export default SelectNutritionScreen;