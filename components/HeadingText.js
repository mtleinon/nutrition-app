import React from 'react'
import { Text, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'

const HeadingText = props => {
  return (
    <Text style={[styles.text, props.style]} numberOfLines={props.numberOfLines}>{props.children}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  }
})
export default HeadingText;