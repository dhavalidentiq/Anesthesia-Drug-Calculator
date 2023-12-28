import React from 'react';
import {View} from 'react-native';
import {perfectSize} from '../styles/theme';

export const BarButton = ({isCurrent, options}) => {
  return (
    <View
      style={{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {options.tabBarIcon
        ? options.tabBarIcon({
            focused: isCurrent,
            color: 'white',
            size: perfectSize(40),
          })
        : null}
    </View>
  );
};
