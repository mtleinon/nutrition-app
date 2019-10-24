import React from 'react'
import { TouchableHighlight, View, StyleSheet } from 'react-native'
import ElevatedHeader from './ElevatedHeader';

const TouchableHeader = ({ onPress, children }) => (
  <TouchableHighlight onPress={onPress} >
    <ElevatedHeader>
      {children}
    </ElevatedHeader>
  </TouchableHighlight>
);

export default TouchableHeader;