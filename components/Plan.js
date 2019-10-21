import React from 'react'
import { View, StyleSheet } from 'react-native'
import MicronutrientView from '../components/MicronutrientView';
import NameText from '../components/NameText';
import SmallText from '../components/SmallText';
import TouchableCard from '../components/TouchableCard';
import Icon from '../components/Icon';

const Plan = ({ plan, deletePlanHandler, editPlanHandler, navigateToPlanHandler }) => {
  return (
    <TouchableCard onPress={() => navigateToPlanHandler(plan.id)} >
      <View style={styles.nameRow}>
        <NameText numberOfLines={2} style={styles.mealName}>{plan.name}</NameText>
        <View style={styles.row}>
          <Icon name="delete" onPress={() => deletePlanHandler(plan.id)} />
          <Icon name="edit" onPress={() => editPlanHandler(plan.id)} />
        </View>
      </View>
      <SmallText numberOfLines={2} style={styles.planDescription}>{plan.description}</SmallText>
      <View style={styles.micronutrientRow}>
        <MicronutrientView planId={plan.id} summary={true} noDataText="Click to add meals" />
      </View>
    </TouchableCard>
  );
}

const styles = StyleSheet.create({
  nameRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row'
  },
  planDescription: {
    padding: 20
  },
})

export default Plan;