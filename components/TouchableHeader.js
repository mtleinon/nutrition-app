import React from 'react'
import { TouchableHighlight, View, StyleSheet } from 'react-native'
import ElevatedHeader from './ElevatedHeader';

const TouchableHeader = ({ onPress, children, style }) => (
  <TouchableHighlight onPress={onPress} >
    <ElevatedHeader style={style}>
      {children}
    </ElevatedHeader>
  </TouchableHighlight>
);

export default TouchableHeader;