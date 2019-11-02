import React, { useState, useRef, useEffect } from 'react'
import { TextInput, StyleSheet } from 'react-native'
import Colors from '../constants/Colors';

const InputNumber = props => {
  const [value, setValue] = useState(props.value);
  const textInputRef = useRef(null);
  const maxLength = props.maxLength || 10;

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
    console.log('text =', text);
    if (text.length <= maxLength && text.length > 0 && (text.slice(-1) === '.' || !isNaN(number))) {
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
    if (text.length >= maxLength) {
      setValue(text.slice(0, maxLength));
    }
  }
  return (
    <TextInput
      maxLength={maxLength}
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
    textAlignVertical: 'center',
    // borderBottomWidth: 2,
    // borderBottomColor: Colors.primary,
    borderWidth: 1,
    borderColor: "#5f5",
    borderRadius: 3,
    paddingHorizontal: 4,
    paddingVertical: 0,
    backgroundColor: '#cfc',

    minWidth: 55
  },

})
export default InputNumber;