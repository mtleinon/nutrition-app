import React, { useState, useRef, useEffect } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import Colors from '../constants/Colors';

const InputNumber2 = props => {
  const [value, setValue] = useState(props.value);
  const textInputRef = useRef(null);

  useEffect(() => {
    if (textInputRef && textInputRef.current && props.focus && value === 0) {
      // console.log('textInputRef =', textInputRef);
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
    <TextInput
      ref={textInputRef}
      keyboardType="number-pad"
      style={[styles.inputField, props.style]}
      onChangeText={setValueHandler} value={value.toString()}

    />
  )
}

const styles = StyleSheet.create({
  input: {
    alignItems: 'flex-start'
  },
  inputField: {
    textAlign: 'right',
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    // lineHeight: 1,
    includeFontPadding: false,
    textAlignVertical: 'bottom',
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
    paddingHorizontal: 3,
    paddingVertical: 0,
    minWidth: 45
  },

})
export default InputNumber2;