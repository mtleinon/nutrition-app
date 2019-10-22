import React from 'react'
import { TouchableHighlight, View, StyleSheet } from 'react-native'
import ElevatedCard from './ElevatedCard';
const TouchableCard = ({ onPress, children }) => (
  <TouchableHighlight onPress={onPress} >
    <ElevatedCard>
      {children}
    </ElevatedCard>
  </TouchableHighlight>
);

export default TouchableCard;