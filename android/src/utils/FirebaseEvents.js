import analytics from '@react-native-firebase/analytics';

const firebase_Analytics_Events = ({eventName, params}) =>
  new Promise(async (resolve, reject) => {
    switch (eventName) {
      case 'onclick_calculation':
        await analytics().logEvent('onclick_calculation', {
          type: params?.type,
          name: params?.name,
        });

      default:
        break;
    }
  });

export {firebase_Analytics_Events};
