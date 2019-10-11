import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Alert, TouchableHighlight, TouchableOpacity, FlatList, TextInput, View, Text, StyleSheet, Platform, KeyboardAvoidingView, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import * as nutrientActions from '../store/actions/nutrients';
import InputNumber from '../components/InputNumber';
import InputText from '../components/InputText';
import Nutrient from '../models/Nutrient';

import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';


const NutrientDataView = ({ item, selectedNameHandler, showMicronutrientHandler }) => {
  return (
    <TouchableHighlight onPress={() => selectedNameHandler(item.item[1], item.item[0])} >
      <View style={styles.selectNutrition}>
        <Text style={styles.selectNutritionText}>{item.item[0]}. {item.item[1]}</Text>
        <Ionicons
          onPress={() => showMicronutrientHandler(item.item)}
          name="md-information-circle" size={24} color="green" />
      </View>
    </TouchableHighlight>
  )
}

const filterNutrient = (search, nutrientName) => {
  return search.toLowerCase().split(' ').every(part => nutrientName.toLowerCase().includes(part));
}


const SelectNutrientWithBarcodeScreen = props => {
  const mealId = props.navigation.getParam('mealId');
  const nutrientsData = useSelector(state => state.nutrientsData.nutrientsData);
  const barcodes = useSelector(state => state.barcodes.barcodes);
  // const [name, setName] = useState('');
  // const [amount, setAmount] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [selectedCode, setSelectedCode] = useState('');

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const dispatch = useDispatch();

  const askCameraPermission = async () => {
    const status = await Permissions.askAsync(Permissions.CAMERA);
    console.log('askCameraPermission', status);
    setHasCameraPermission(true);
    // setHasCameraPermission(status === 'granted');
  }

  useEffect(() => {
    console.log('askCameraPermission');
    askCameraPermission();
  }, []);

  const showMicronutrientHandler = (nutrient) => {
    props.navigation.navigate('Micronutrient', { nutrientData: nutrient });
  }

  const selectedNameHandler = (newSelectedName, newSelectedId) => {
    setSelectedName(newSelectedName);
    setSelectedId(newSelectedId);
  }

  const addNutrientHandler = useCallback(() => {
    if (!selectedCode) {
      Alert.alert('Please read barcode first',
        'Please use phones camera to read barcode',
        [{ text: 'OK' }]);
      return;
    }
    barcode = barcodes.find(barcode => barcode.barcode === selectedCode);
    if (barcode) {
      dispatch(nutrientActions.storeNutrientToDb(new Nutrient(null, mealId, barcode.nutrientDataId, 0)));
      props.navigation.goBack();
    }
    else {
      props.navigation.navigate('SelectNutrient', { barcode: selectedCode, mealId });
      //props.navigation.goBack();
    }
  }, [selectedCode]);

  useEffect(() => {
    props.navigation.setParams({ addNutrientHandler })
  }, [addNutrientHandler]);

  if (hasCameraPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setSelectedCode(data);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
    </View>
  );


  // return (
  //   <View style={styles.screen}>
  //     <InputText
  //       label="Search nutrition:"
  //       onChangeText={setSelectedName} value={selectedName}
  //     />
  //     <Text style={styles.label}>Select nutrition:</Text>
  //     <FlatList
  //       data={nutrientsData.filter(item => filterNutrient(selectedName, item[1]))}
  //       renderItem={item => <NutrientDataView
  //         item={item}
  //         selectedNameHandler={selectedNameHandler}
  //         showMicronutrientHandler={showMicronutrientHandler}
  //       />}
  //       keyExtractor={item => item[0].toString()}
  //     />
  //   </View>
  // )
}

SelectNutrientWithBarcodeScreen.navigationOptions = navData => {
  const addNutrientHandler = navData.navigation.getParam('addNutrientHandler');

  return {
    headerTitle: (
      <TouchableOpacity style={styles.header} onPress={addNutrientHandler} >
        <Text style={styles.headerText}>Use barcode</Text>
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
    width: '80%'
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
export default SelectNutrientWithBarcodeScreen;