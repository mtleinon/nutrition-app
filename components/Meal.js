import React from 'react'
import { View, StyleSheet } from 'react-native'
import TouchableCard from '../components/TouchableCard';
import Icon from '../components/Icon';
import Heading2Text from '../components/Heading2Text';
import MicronutrientView from '../components/MicronutrientView';
import i1n from 'i18n-js';
import Colors from '../constants/Colors';

const Meal = ({ meal, editMealHandler, deleteMealHandler, navigateToMealHandler }) => {
  return (
    <TouchableCard onPress={() => navigateToMealHandler(meal.id)} style={styles.cardColor} >
      <View style={styles.nameRow} >
        <Heading2Text numberOfLines={2} style={styles.mealName}>{meal.name}</Heading2Text>
        <View style={styles.row}>
          <Icon name="delete" onPress={() => deleteMealHandler(meal.id)} />
          <Icon name="edit" onPress={() => editMealHandler(meal.id)} />
        </View>
      </View>
      <View style={styles.mealMicronutrientRow}>
        <MicronutrientView mealId={meal.id} summary={true} oneRow={true}
          noDataText={i1n.t('mealHasNoNutrientsYet')} />
      </View>
    </TouchableCard>
  );
}

const styles = StyleSheet.create({
  cardColor: {
    backgroundColor: Colors.mealColor
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 7,
    marginTop: 5,
  },
  mealMicronutrientRow: {
    marginLeft: 10,
    marginRight: 30,
    marginVertical: 5
  },
  mealName: {
    flex: 1
  },
  row: {
    flexDirection: 'row'
  },
});

export default Meal;