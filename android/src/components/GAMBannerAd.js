import React from 'react';
import {Platform} from 'react-native';
import {
  GAMBannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';

let adId = __DEV__
  ? TestIds.BANNER
  : Platform.OS === 'android'
  ? 'ca-app-pub-6913481715293080/4298340955'
  : 'ca-app-pub-6913481715293080/6003101025';

export default function HeaGAMBannerAdder({}) {
  return (
    <GAMBannerAd
      unitId={adId}
      sizes={[BannerAdSize.FULL_BANNER]}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  );
}
