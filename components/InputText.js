import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import Colors from '../constants/Colors';

const InputText = props => {
  return (
    <View style={styles.input}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        style={styles.inputField}
        onChangeText={props.onChangeText} value={props.value}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  inputField: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 5
  },

})
export default InputText;