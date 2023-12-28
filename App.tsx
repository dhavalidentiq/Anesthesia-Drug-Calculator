import React, { useEffect } from 'react';
import { LogBox, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import SplashScreen from 'react-native-splash-screen';
import DeviceInfo from 'react-native-device-info';
import OneSignal from 'react-native-onesignal';
import { initializeApp } from '@react-native-firebase/app';

const OneSignalId = 'd8011315-d6c1-4daf-bf46-98dedb3492be';

export default function App() {
  const firebaseConfig = {
    apiKey: 'AIzaSyC20H7G3Fucf2v7njLXPQIfu8Es9_UbO58',
    authDomain: 'anesthesia-calculations.firebaseapp.com',
    databaseURL: 'https://anesthesia-calculations-default-rtdb.firebaseio.com',
    projectId: 'anesthesia-calculations',
    storageBucket: 'anesthesia-calculations.appspot.com',
    messagingSenderId: '618243328840',
    appId: '1:618243328840:ios:f1ee345e2226604b12017d',
  };

  LogBox.ignoreAllLogs();

  if (__DEV__) {
    const ignoreWarns = [
      'VirtualizedLists should never be nested inside plain ScrollViews',
    ];

    const errorWarn = global.console.error;
    global.console.error = (...arg) => {
      for (const error of ignoreWarns) {
        if (arg[0]?.startsWith(error)) {
          return;
        }
      }
      errorWarn(...arg);
    };
  }

  useEffect(() => {
    OneSignal.setAppId(OneSignalId);
    OneSignal.setLogLevel(6, 0);
    OneSignal.promptForPushNotificationsWithUserResponse(response => {});

    OneSignal.setNotificationWillShowInForegroundHandler(notifReceivedEvent => {
      const { notification } = notifReceivedEvent;
      console.log(
        'notification setNotificationWillShowInForegroundHandler',
        notification,
      );
    });

    OneSignal.setNotificationOpenedHandler(notification => {
      console.log('notification setNotificationOpenedHandler', notification);
    });
    OneSignal.setInAppMessageClickHandler(event => {});
  }, []);

  useEffect(() => {
    SplashScreen.hide();
    // console.log("DeviceInfo", typeof DeviceInfo.getUniqueId());
    OneSignal.setExternalUserId(
      DeviceInfo.getUniqueId().toString(),
      results => {
        console.log('results====== ', results);
      },
    );
  }, []);
  useEffect(() => {
    initializeApp(firebaseConfig);
  }, []);
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <Navigation />
    </SafeAreaProvider>
  );
}
