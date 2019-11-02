import React from 'react'
import { View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Heading2Text from '../components/Heading3Text';

const CheckBox = ({ label, handler, value }) => {
  return (
    <View style={{ marginVertical: 10 }}  >
      <TouchableWithoutFeedback onPress={handler}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ borderColor: 'black', borderWidth: 1, height: 20, width: 20, borderRadius: 10 }}>
            {value &&
              <View style={{
                backgroundColor: 'black', height: 14, width: 14, borderRadius: 7,
                margin: 2
              }}>
              </View>
            }
          </View>
          <View style={{ marginLeft: 20 }}>
            <Heading2Text >{label}</Heading2Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>);
}

export default CheckBox;