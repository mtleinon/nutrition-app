import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Alert, TouchableOpacity, View, Text, StyleSheet, Platform } from 'react-native'
import Colors from '../constants/Colors';
import * as nutrientActions from '../store/actions/nutrients';
import Nutrient from '../models/Nutrient';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { NAME_I } from '../models/NutrientData';

const SelectNutrientWithBarcodeScreen = props => {
  const mealId = props.navigation.getParam('mealId');
  const nutrientsData = useSelector(state => state.nutrientsData.nutrientsData);
  const barcodes = useSelector(state => state.barcodes.barcodes);

  const [selectedCode, setSelectedCode] = useState('');
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const dispatch = useDispatch();

  const askCameraPermission = async () => {
    const askCameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    console.log('askCameraPermission', askCameraPermission);
    setHasCameraPermission(askCameraPermission.status === 'granted');
  }

  useEffect(() => {
    console.log('askCameraPermission');
    askCameraPermission();
  }, []);

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

  const addNutrient = (nutrient, mealId, barcode) => {
    Alert.alert(
      'Add nutrient to meal',
      nutrient[NAME_I],
      [
        {
          text: 'Add',
          onPress: () => {
            dispatch(nutrientActions.storeNutrientToDb(
              new Nutrient(null, mealId, barcode.nutrientDataId, 0)));
            props.navigation.goBack();
          }
        },
        {
          text: 'Scan a new barcode',
          onPress: () => {
            setScanned(false);
          }
        }
      ]);
  }

  const addNewBarcode = (scannedBarcode, mealId) => {
    Alert.alert(
      'Select nutrient',
      'Select nutrient for the new barcode',
      [
        {
          text: 'Select',
          onPress: () => {
            props.navigation.navigate('SelectNutrient', { barcode: +scannedBarcode, mealId });
          }
        },
        {
          text: 'Scan a new barcode',
          onPress: () => {
            console.log('Scan new barcode');
            setScanned(false);
          }
        }
      ]);
  }

  const handleBarCodeScanned = ({ data }) => {
    const scannedBarcode = +data;
    setScanned(true);
    setSelectedCode(scannedBarcode);
    barcode = barcodes.find(barcode => barcode.barcode === scannedBarcode);
    let nutrient;
    if (barcode) {
      nutrient = nutrientsData.find(data => data[0] === barcode.nutrientDataId)
    }
    if (nutrient) {
      addNutrient(nutrient, mealId, barcode);
    } else {
      addNewBarcode(scannedBarcode, mealId);
    };
  }

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
    </View>
  );
}

SelectNutrientWithBarcodeScreen.navigationOptions = navData => {
  const addNutrientHandler = navData.navigation.getParam('addNutrientHandler');
  return {
    headerTitle: (
      <TouchableOpacity style={styles.header} onPress={addNutrientHandler} >
        <Text style={styles.headerText}>Scan barcode</Text>
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

export default SelectNutrientWithBarcodeScreen;