import React from 'react'
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native'

import InputNumber2 from '../components/InputNumber2';
import Colors from '../constants/Colors';
import MicronutrientView from '../components/MicronutrientView';

import Icon from '../components/Icon';

const Nutrient = ({
  nutrient,
  removeNutrientHandler,
  updateNutrientAmountHandler,
  focus
}) => {
  const nutrientData = useSelector(state => state.nutrientsData.nutrientsData.find(n => {
    // console.log('n[0] === nutrient.id', n[0], nutrient.id);
    return n[0] === nutrient.nutrientDataId;
  }
  ));

  return (
    <View style={[styles.nutrientContainer, styles.elevated]}>
      <View style={styles.nutrient}>
        <Text numberOfLines={2} style={styles.nutrientName}>{nutrientData[1]}</Text>
        <InputNumber2 style={styles.amount}
          onChangeText={(value) => updateNutrientAmountHandler(nutrient, value)} value={nutrient.amount}
          focus={focus}
        />
        <Text>g</Text>
        <Icon name="delete" onPress={() => removeNutrientHandler(nutrient.id)} />
      </View>
      <View style={styles.micronutrientRow}>
        <MicronutrientView nutrientId={nutrient.id} summary={true} oneRow={true} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  micronutrientRow: {
    marginLeft: 10,
    marginRight: 40,
    marginBottom: 7
  },
  nutrientContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayBorder,
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
  },
  nutrient: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  nutrientName: {
    flex: 1
  },
  amount: {
    paddingRight: 10
  },
});

export default Nutrient;