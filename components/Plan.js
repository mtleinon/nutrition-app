import React from 'react'
import { View, StyleSheet } from 'react-native'
import MicronutrientView from '../components/MicronutrientView';
import HeadingText from '../components/HeadingText';
import SmallText from '../components/SmallText';
import TouchableCard from '../components/TouchableCard';
import Icon from '../components/Icon';
import i1n from 'i18n-js';
import Colors from '../constants/Colors';

const Plan = ({ plan, deletePlanHandler, editPlanHandler, navigateToPlanHandler }) => {
  return (
    <TouchableCard onPress={() => navigateToPlanHandler(plan.id)} style={styles.cardColor}>
      <View style={styles.nameRow}>
        <HeadingText numberOfLines={2} style={styles.mealName}>{plan.name}</HeadingText>
        <View style={styles.row}>
          <Icon name="delete" onPress={() => deletePlanHandler(plan.id)} />
          <Icon name="edit" onPress={() => editPlanHandler(plan.id)} />
        </View>
      </View>
      <SmallText numberOfLines={2} style={styles.planDescription}>{plan.description}</SmallText>
      <View style={styles.micronutrient}>
        <MicronutrientView planId={plan.id} summary={true} noDataText={i1n.t('clickToAddMeal')} />
      </View>
    </TouchableCard>
  );
}

const styles = StyleSheet.create({
  cardColor: {
    backgroundColor: Colors.planColor
  },
  nameRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingLeft: 9,
    paddingRight: 5,
    paddingTop: 5
  },
  mealName: {
    flex: 1,
    marginTop: 5
  },
  row: {
    flexDirection: 'row',
  },
  micronutrient: {
    paddingHorizontal: 10
  },
  planDescription: {
    padding: 20
  },
})

export default Plan;