import React from 'react'
import { View, StyleSheet } from 'react-native'

const ElevatedHeader = ({ children }) => (
  <View style={styles.header}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  header: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    marginBottom: 1,
    padding: 5,
    paddingTop: 15,
    elevation: 2,
    shadowOpacity: .3,

    backgroundColor: 'white',
  },
}
);

export default ElevatedHeader;