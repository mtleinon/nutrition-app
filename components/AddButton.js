import React from 'react'
import { Button, View } from 'react-native'

const AddButton = ({ title, onPress }) => (
  <View style={{ margin: 5, marginBottom: 15 }}>
    <Button title={title} onPress={onPress} />
  </View>
);

export default AddButton;