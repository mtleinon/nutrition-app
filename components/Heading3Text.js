import React from 'react'
import { Text, StyleSheet } from 'react-native'

const Heading2Text = props => {
  return (
    <Text style={[styles.text, props.style]} >{props.children}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 15,
  }
})
export default Heading2Text;