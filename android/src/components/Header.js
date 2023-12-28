import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Block from './utilities/Block';
import Text from './utilities/Text';
import {colors, deviceWidth, font, perfectSize} from '../styles/theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BackIcon from '../assets/appImages/BackIcon.svg';

export default function Header({
  headerTitle,
  isBackIcon,
  _onPressBack = () => {},
}) {
  const insets = useSafeAreaInsets();
  return (
    <Block
      flex={false}
      center
      middle
      width={deviceWidth}
      style={styles.mainView}
      padding={[insets.top > 40 ? insets.top : insets.top, 0, 0, 0]}
      color={colors.headerThemeColor}>
      <Block flex={false} row center padding={[perfectSize(15), 0, 0, 0]}>
        {isBackIcon ? (
          <TouchableOpacity
            style={styles.backButtonStyle}
            onPress={() => _onPressBack()}
            hitSlop={{top: 15, left: 15, right: 15, bottom: 15}}>
            <BackIcon width={perfectSize(25)} height={perfectSize(20)} />
          </TouchableOpacity>
        ) : null}
        <Text
          size={22}
          color={colors.white}
          regular
          weight={'500'}
          style={styles.headerTitleText}>
          {headerTitle}
        </Text>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  mainView: {
    overflow: 'visible',
    paddingBottom: perfectSize(15),
    borderBottomLeftRadius: perfectSize(15),
    borderBottomRightRadius: perfectSize(15),
  },
  headerTitleText: {
    flex: 1,
    textAlign: 'center',
  },
  backButtonStyle: {
    position: 'absolute',
    left: perfectSize(15),
    top: perfectSize(20),
    zIndex: 1,
  },
});
