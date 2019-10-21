import React, { useState, useRef, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import Colors from '../constants/Colors';

const InputNumber2 = props => {
  const [value, setValue] = useState(props.value);
  const textInputRef = useRef(null);

  useEffect(() => {
    if (textInputRef && textInputRef.current && props.focus && value === 0) {
      console.log('textInputRef =', textInputRef);
      textInputRef.current.focus();
    }
  });
  // let inputRef;
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
    if (text.length === 0) {
      setValue("0");
      props.onChangeText(0);
    }
  }
  return (
    <View style={styles.input}>
      <TextInput
        ref={textInputRef}
        keyboardType="number-pad"
        style={styles.inputField}
        onChangeText={setValueHandler} value={value.toString()}

      />
    </View>
  )
}

const styles = StyleSheet.create({
  // label: {
  //   color: Colors.primary,
  //   fontSize: 14,
  //   fontWeight: 'bold',
  //   marginTop: 5,
  // },
  inputField: {
    textAlign: 'right',
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
    // backgroundColor: Colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 0,
    minWidth: 50
  },

})
export default InputNumber2;