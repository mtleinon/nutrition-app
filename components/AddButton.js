import React from 'react'
import { Button, View } from 'react-native'

const AddButton = ({ title, onPress, color }) => (
  <View style={{ margin: 10, marginBottom: 15 }}>
    <Button title={title} onPress={onPress} color={color || 'blue'} />
  </View>
);

export default AddButton;