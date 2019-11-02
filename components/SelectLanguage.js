import React from 'react'
import { View } from 'react-native'
import i1n from 'i18n-js';
import * as Constants from '../constants/Constants';

import Heading2Text from './Heading2Text';
import CheckBox from './CheckBox';
import ElevatedCard from './ElevatedCard';

const SelectLanguage = ({ handler, value }) => {
  return (
    <ElevatedCard>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10 }}>
        <View style={{ flex: 1 }}>
          <Heading2Text>{i1n.t('language')}</Heading2Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <CheckBox handler={() => handler(Constants.ENGLISH)}
            label={i1n.t('english')}
            value={value === Constants.ENGLISH}
          />
          <CheckBox handler={() => handler(Constants.FINISH)}
            label={i1n.t('finish')}
            value={value === Constants.FINISH}
          />
        </View>
      </View>
    </ElevatedCard>
  );
}

export default SelectLanguage;