import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'

import {
  AdMobBanner,
  // AdMobInterstitial,
  // PublisherBanner,
  // AdMobRewarded
} from 'expo-ads-admob';

const AddBanner = props => {
  return (
    <View style={styles.banner}>
      <AdMobBanner
        bannerSize="smartBannerPortrait"

        adUnitID={Platform.OS === 'android'
          ? "ca-app-pub-9120709668433720/3958710513"
          : "ca-app-pub-9120709668433720/3958710513"}
        servePersonalizedAds
        onDidFailToReceiveAdWithError={err => { console.warn('banner err =', err); }} />
    </View>
  )
}

const styles = StyleSheet.create({
  banner: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: -5 },
    shadowRadius: 5,
    marginTop: 0,
    elevation: 2,
    shadowOpacity: .3,
  }
})
export default AddBanner;