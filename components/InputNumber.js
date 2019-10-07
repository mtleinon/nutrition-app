import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import Colors from '../constants/Colors';

const InputNumber = props => {
  [value, setValue] = useState(props.value);

  const setValueHandler = (text) => {
    const number = parseFloat(text);
    //TODO: must , be handled too?
    if (text.length > 0 && (text.slice(-1) === '.' || !isNaN(number))) {
      if (text.slice(-1) === '.' && !text.slice(0, -1).includes('.')) {
        setValue(number.toString() + '.');
      } else {
        setValue(number.toString());
      }
      if (!isNaN(number)) {
        props.onChangeText(number);
      }
    }
  }
  return (
    <View style={styles.input}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        keyboardType="number-pad"
        style={styles.inputField}
        onChangeText={setValueHandler} value={value.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  inputField: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
    // backgroundColor: Colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 5,
  },

})
export default InputNumber;