import React from 'react'
import { View } from 'react-native'
import i1n from 'i18n-js';
import * as Constants from '../constants/Constants';

import Heading2Text from './Heading2Text';
import CheckBox from './CheckBox';
import ElevatedCard from './ElevatedCard';

const SelectGender = ({ handler, value }) => {
  return (
    <ElevatedCard>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10 }}>
        <View style={{ flex: 1 }}>
          <Heading2Text>{i1n.t('gender')}</Heading2Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <CheckBox handler={() => handler(Constants.FEMALE)}
            label={i1n.t('female')}
            value={value === Constants.FEMALE}
          />
          <CheckBox handler={() => handler(Constants.MALE)}
            label={i1n.t('male')}
            value={value === Constants.MALE}
          />
        </View>
      </View>
    </ElevatedCard>
  );
}

export default SelectGender;