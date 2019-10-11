import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button, TouchableHighlight, FlatList, View, Text, StyleSheet, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import HeadingText from '../components/HeadingText';
import Colors from '../constants/Colors';
import HeaderButton from '../components/HeaderButton';
import NameText from '../components/NameText';
import SmallText from '../components/SmallText';
import * as db from '../helperFunctions/sqlite';

const ConfigureScreen = props => {
  const dispatch = useDispatch();

  const dropTablesHandler = async () => {
    await db.dropAllTablesInDatabase();
  }
  return (
    <View style={styles.screen}>
      <Text>Configure</Text>
      <Button title="Drop database tables" onPress={dropTablesHandler} />
      <Button title="Go to All plans screen" onPress={() => props.navigation.navigate('AllPlans')} />
    </View>
  )
}

ConfigureScreen.navigationOptions = navData => {

  return {
    headerTitle: 'Configure',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Add Plan"
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('NewPlan');
          }} />
      </HeaderButtons>
    )
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 5,
    backgroundColor: Colors.screenBackground,
  },
  plan: {
    borderBottomWidth: 1,
    paddingVertical: 5,
    borderBottomColor: Colors.grayBorder,
  },
  mealName: {
    width: '70%'
  },
  planDescription: {
    padding: 20
  },
  icons: {
    paddingRight: 10
  },
  nameRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  micronutrientRow: {
    marginLeft: 10,
    marginRight: 40,
  },
  elevated: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    padding: 5,
    elevation: 2,
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 0,
    borderColor: 'transparent',
    margin: 4,
  }
})
export default ConfigureScreen;