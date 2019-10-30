import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'

const ElevatedCard = ({ children, style }) => (
  <View style={[styles.elevated, style]}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  elevated: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: .5,
    shadowRadius: 1,
    elevation: 1,

    padding: 5,
    paddingTop: 1,
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 0,
    borderColor: 'transparent',
    marginVertical: 2,
    marginHorizontal: Dimensions.get('window').width < 350 ? 4 : 10,

  }
});

export default ElevatedCard;