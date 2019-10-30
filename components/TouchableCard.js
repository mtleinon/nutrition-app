import React from 'react'
import { TouchableHighlight, View, StyleSheet } from 'react-native'
import ElevatedCard from './ElevatedCard';
const TouchableCard = ({ onPress, children, style }) => (
  <TouchableHighlight onPress={onPress} >
    <ElevatedCard style={style}>
      {children}
    </ElevatedCard>
  </TouchableHighlight>
);

export default TouchableCard;