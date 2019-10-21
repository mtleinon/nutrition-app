import React from 'react'
import { TouchableHighlight, View, StyleSheet } from 'react-native'

const TouchableCard = ({ onPress, children }) => (
  <TouchableHighlight onPress={onPress} >
    <View style={styles.elevated}>
      {children}
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  elevated: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    padding: 10,
    elevation: 2,
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 0,
    borderColor: 'transparent',
    margin: 4,
  }
});

export default TouchableCard;