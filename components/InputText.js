import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import Colors from '../constants/Colors';

const InputText = ({ label, numberOfLines, value, onChangeText }) => {
  return (
    <View style={styles.input}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.inputField, numberOfLines > 1 && styles.textTop]}
        multiline={numberOfLines > 1}
        numberOfLines={numberOfLines || 1}
        onChangeText={onChangeText} value={value}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
  },
  inputField: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    includeFontPadding: false,
    textAlignVertical: 'center',
    borderWidth: 1,
    borderColor: "#5f5",
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 3,
    backgroundColor: '#cfc',
  },

  // inputField: {
  //   borderBottomWidth: 1,
  //   borderBottomColor: Colors.primary,
  //   paddingHorizontal: 6,
  //   paddingVertical: 5,
  // },
  textTop: {
    textAlignVertical: 'top'
  }
})
export default InputText;