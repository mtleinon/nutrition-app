import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Alert, TouchableOpacity, View, Text, StyleSheet, Platform } from 'react-native'
import Colors from '../constants/Colors';
import * as nutrientActions from '../store/actions/nutrients';
import Nutrient from '../models/Nutrient';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { DATA_ID_I } from '../models/NutrientData';
import AddButton from '../components/AddButton';
import TouchableCard from '../components/TouchableCard';
import HeadingText from '../components/HeadingText';
import { catchErrors } from '../store/actions/dbOperation';
import i1n from 'i18n-js';

const SelectNutrientWithBarcodeScreen = props => {
  const mealId = props.navigation.getParam('mealId');
  const nutrientsData = useSelector(state => state.nutrientsData.nutrientsData);
  const barcodes = useSelector(state => state.barcodes.barcodes);

  const [scannedBarcode, setScannedBarcode] = useState('');
  const [barcode, setBarcode] = useState('');
  const [nutrientData, setNutrientData] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
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
    if (!scannedBarcode) {
      Alert.alert(i1n.t('pleaseScanBarcodeFirst'),
        i1n.t('pleaseUsePhonesCameraToReadBarcode'),
        [{ text: 'OK' }]);
      return;
    }
    const barcode = barcodes.find(barcode => barcode.barcode === scannedBarcode);
    if (barcode) {
      dispatch(catchErrors(nutrientActions.storeNutrientToDb(new Nutrient(null, mealId, barcode.nutrientDataId, 0))));
      props.navigation.goBack();
    }
    else {
      props.navigation.navigate('SelectNutrient', { barcode: scannedBarcode, mealId });
    }
  }, [scannedBarcode]);

  useEffect(() => {
    props.navigation.setParams({ addNutrientHandler })
  }, [addNutrientHandler]);

  if (hasCameraPermission === null) {
    return <Text>{i1n.t('requestingForCameraPermissions')}</Text>;
  }

  if (hasCameraPermission === false) {
    return <Text>{i1n.t('noAccessToCamera')}</Text>;
  }

  const handleBarCodeScanned = ({ data }) => {
    const scannedBarcodeNumber = +data;
    setScanned(true);

    setScannedBarcode(+scannedBarcodeNumber);
    setModalVisible(true);
    const foundBarcode = barcodes.find(barcode => barcode.barcode === scannedBarcodeNumber);
    if (foundBarcode) {
      setBarcode(foundBarcode);
      const foundNutrient = nutrientsData.find(nutrientData => nutrientData[DATA_ID_I] === foundBarcode.nutrientDataId)
      if (foundNutrient) {
        setNutrientData(foundNutrient);
      } else {
        setNutrientData(null);
      }
    } else {
      setBarcode(null);
      setNutrientData(null);
    }
  }

  const BarcodeResult = () => (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <TouchableCard>
        <HeadingText>{nutrientData ? i1n.t('found') + nutrientData[1] : i1n.t('noNutrientForTheBarcode')}</HeadingText>
      </TouchableCard>
      {nutrientData && (<AddButton title={i1n.t('AddNutrientToTheMeal')} color="green"
        onPress={() => {
          setModalVisible(false);
          dispatch(catchErrors(nutrientActions.storeNutrientToDb(
            new Nutrient(null, mealId, barcode.nutrientDataId, 0))));
          props.navigation.goBack();
        }} />)
      }{
        barcode && <AddButton title={i1n.t('setNewNutrientForTheBarcode')} color="green"
          onPress={() => {
            props.navigation.navigate('SelectNutrient', { barcode, mealId });
            setModalVisible(false);
          }} />
      }{
        !barcode && scannedBarcode &&
        <AddButton title={i1n.t('setNewNutrientForTheNewBarcode')} color="green"
          onPress={() => {
            props.navigation.navigate('SelectNutrient', { scannedBarcode, mealId });
            setModalVisible(false);
          }} />
      }<AddButton title={i1n.t('addNewBarcode')} color="blue"
        onPress={() => {
          setScanned(false);
          setModalVisible(false);
        }} />
    </View>
  );
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <BarcodeResult />
      </Modal>
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
        <Text style={styles.headerText}>{i1n.t('scanBarcode')}</Text>
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