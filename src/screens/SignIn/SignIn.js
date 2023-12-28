import {StyleSheet, ImageBackground, Dimensions} from 'react-native';
import React from 'react';
import Block from '../../components/utilities/Block';
import {colors, perfectSize} from '../../styles/theme';
import Text from '../../components/utilities/Text';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const SignIn = () => {
  const insets = useSafeAreaInsets();

  return (
    <Block flex={1} color={colors.white}>
      <ImageBackground
        source={require('../../assets/appImages/Splash.jpg')}
        resizeMode="cover"
        style={styles.img}></ImageBackground>
    </Block>
  );
};

export default SignIn;

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  img: {
    height: screenHeight,
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
