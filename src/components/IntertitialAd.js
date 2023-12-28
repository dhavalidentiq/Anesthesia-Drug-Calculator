import {
  TestIds,
  AdEventType,
  InterstitialAd,
} from 'react-native-google-mobile-ads';
import {getAdCount, setAdCount} from '../screens/helpers/auth';
import {Platform} from 'react-native';

let adId = __DEV__
  ? TestIds.INTERSTITIAL
  : Platform.OS == 'android'
  ? 'ca-app-pub-6913481715293080/4171144607'
  : 'ca-app-pub-6913481715293080/3312562340';

const IntertitialAd = {
  loadOrShowIntertitialAd: async (navigation, screen, params) => {
    let interstitial = InterstitialAd.createForAdRequest(adId, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing'],
    });
    interstitial.addAdEventListener(AdEventType.LOADED, () => {
      interstitial.show();
    });
    interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      console.log('navigation ::', navigation);
      console.log('screen ::', screen);
      if (navigation != undefined && screen != undefined) {
        navigation.navigate(screen, params);
      }
    });
    interstitial.load();
  },
};

export default IntertitialAd;

export const showADs = async (navigation, screen, params) => {
  let adCount = await getAdCount();
  console.log('adCount', adCount);
  if (adCount == null) {
    await setAdCount(1);
  } else {
    let totalCount = parseInt(adCount) + 1;
    await setAdCount(totalCount);
  }
  if (adCount >= 5) {
    IntertitialAd.loadOrShowIntertitialAd(navigation, screen, params);
    await setAdCount(1);
  } else {
    navigation.navigate(screen, params);
  }
};
