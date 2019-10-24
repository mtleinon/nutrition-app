import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, View } from 'react-native'

import * as dbOperation from './store/actions/dbOperation';

const ErrorViewer = props => {
  const dbOperationState = useSelector(state => state.dbOperation);
  const dispatch = useDispatch();

  if (dbOperationState.state === dbOperation.ERROR) {
    Alert.alert("ERROR happened",
      dbOperationState.errorMessages,
      [{ text: 'OK', onPress: () => dispatch(dbOperation.clearError()) }]
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {props.children}
    </View>
  );
}

export default ErrorViewer;