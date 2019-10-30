import React from 'react'
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, Platform, Dimensions } from 'react-native'

import InputNumber2 from '../components/InputNumber2';
import Colors from '../constants/Colors';
import MicronutrientView from '../components/MicronutrientView';
import { NAME_I } from '../models/NutrientData';
import Icon from '../components/Icon';
import TouchableCard from './TouchableCard';
import Heading3Text from './Heading3Text';

const Nutrient = ({
  nutrient,
  removeNutrientHandler,
  updateNutrientAmountHandler,
  focus,
  onPress
}) => {
  const nutrientData = useSelector(state => state.nutrientsData.nutrientsData.find(n => {
    // console.log('n[0] === nutrient.id', n[0], nutrient.id);
    return n[0] === nutrient.nutrientDataId;
  }
  ));
  return (
    <TouchableCard onPress={onPress} style={styles.cardColor}>
      <View style={styles.nutrient}>
        <Heading3Text numberOfLines={2} style={styles.nutrientName}>{nutrientData[NAME_I]}</Heading3Text>
        <InputNumber2 style={styles.amount}
          onChangeText={(value) => updateNutrientAmountHandler(nutrient, value)}
          value={nutrient.amount}
          focus={focus}
        />
        <Heading3Text style={styles.unit}>g</Heading3Text>
        <Icon name="delete" onPress={() => removeNutrientHandler(nutrient.id)} />
      </View>
      <View style={styles.micronutrientRow}>
        <MicronutrientView nutrientId={nutrient.id} summary={true} oneRow={true} />
      </View>
    </TouchableCard>
  );
}

const styles = StyleSheet.create({
  cardColor: {
    backgroundColor: Colors.nutrientColor
  },
  micronutrientRow: {
    marginLeft: 10,
    marginRight: 30,
    marginBottom: 5,
    marginTop: 5
  },
  nutrient: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  nutrientName: {
    flex: 1,
    marginLeft: 10,
    marginLeft: 10,
  },
  amount: {
    marginBottom: Platform.OS === 'android' ? 9 : 0,
    fontSize: 15
  },
  unit: {
    marginRight: 5,
    marginLeft: 2
  }
});

export default Nutrient;