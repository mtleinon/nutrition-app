import React from 'react'
import { Ionicons } from '@expo/vector-icons';

import { StyleSheet } from 'react-native'

const iconName = name => {
  switch (name) {
    case 'delete': return "md-remove-circle";
    case 'edit': return "md-create";
    case 'information': return "md-information-circle";
  }
}
const iconColor = name => {
  switch (name) {
    case 'delete': return "red";
    case 'edit': return "green";
    case 'information': return "green";
  }
}

const Icon = ({ name, onPress }) => (
  <Ionicons
    style={styles.icon}
    onPress={onPress}
    name={iconName(name)} size={24} color={iconColor(name)} />
);

const styles = StyleSheet.create({
  icon: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    margin: 1
  },
});
export default Icon;
