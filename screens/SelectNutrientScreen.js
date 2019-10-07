import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Alert, TouchableHighlight, TouchableOpacity, FlatList, TextInput, View, Text, StyleSheet, Platform, KeyboardAvoidingView, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import * as mealActions from '../store/actions/meals';
import InputNumber from '../components/InputNumber';
import InputText from '../components/InputText';

//import nutrients from '../data/finelliAllNutrients'; // 36 nutriitions
//import nutrients from '../data/finelli5'; // all 3400 nutriitions

const Nutrient = ({ item, selectedNameHandler, showMicronutrientHandler }) => {
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

const SelectNutritionScreen = props => {
  const mealId = props.navigation.getParam('mealId');
  const nutrientsData = useSelector(state => state.nutrientsData.nutrientsData);
  // const nutrientsData = nutrients.slice(1);
  // console.log('nutrientsData.length =', nutrientsData.length);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const dispatch = useDispatch();

  const showMicronutrientHandler = (nutrient) => {
    // console.log('nutrient=', nutrient);
    props.navigation.navigate('Micronutrient', { nutrientData: nutrient });
  }

  const selectedNameHandler = (newSelectedName, newSelectedId) => {
    // console.log('selectedNameHandler', newSelectedName);
    setSelectedName(newSelectedName);
    setSelectedId(newSelectedId);
  }

  const addNutrientHandler = useCallback(() => {
    if (!selectedName) {
      Alert.alert('Please select nutrient',
        'Please select nutrient by touching a nutrient in the list',
        [{ text: 'OK' }]);
      return;
    }
    // if (!amount) {
    //   Alert.alert('Please add amount',
    //     'Please by writing it in the input',
    //     [{ text: 'OK' }]);
    //   return;
    // }
    // dispatch(mealActions.addNutrientToMeal(mealId, selectedId, +amount));
    dispatch(mealActions.addNutrientToMeal(mealId, selectedId, 0));
    props.navigation.goBack();
  }, [selectedName, amount]);

  useEffect(() => {
    props.navigation.setParams({ addNutrientHandler })
  }, [addNutrientHandler]);

  return (
    <View style={styles.screen}>
      {/* <View style={styles.selectedNutrition}>
        <Text style={styles.label}>Selected nutrition:</Text>
        <Text style={styles.selectedName}>{selectedName ? selectedName : 'Select nutrient'}</Text>
      </View> */}
      {/* <InputNumber
        label="Amount"
        onChangeText={setAmount} value={amount}
      /> */}
      <InputText
        label="Search nutrition:"
        onChangeText={setSelectedName} value={selectedName}
      />
      {/* <InputText
        label="Search nutrition:"
        onChangeText={setName} value={name}
      /> */}
      <Text style={styles.label}>Select nutrition:</Text>
      <FlatList
        // data={nutrientsData.filter(item => filterNutrient(name, item[1]))}
        data={nutrientsData.filter(item => filterNutrient(selectedName, item[1]))}
        renderItem={item => <Nutrient
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

  return {
    headerTitle: (
      <TouchableOpacity style={styles.header} onPress={addNutrientHandler} >
        <Text style={styles.headerText}>Add nutrition</Text>
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
export default SelectNutritionScreen;