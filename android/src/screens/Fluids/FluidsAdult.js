import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Text from '../../components/utilities/Text';
import Block from '../../components/utilities/Block';
import Header from '../../components/Header';
import {colors, perfectSize} from '../../styles/theme';
import {responsiveScale} from '../../styles/mixins';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import HeaGAMBannerAdder from '../../components/GAMBannerAd';
import {showADs} from '../../components/IntertitialAd';

export default FluidsAdult = ({navigation, route}) => {
  const {container, decisionButton, buttonText} = styles;
  const {weight, context, habitus, age, gender} = route.params;
  const insets = useSafeAreaInsets();

  return (
    <Block flex={1} color={colors.white}>
      <Header
        headerTitle={'Fluids'}
        isBackIcon={true}
        _onPressBack={() => {
          navigation.goBack();
        }}
      />

      <View style={container}>
        <View>
          <Text
            regular
            style={{textAlign: 'center', fontSize: 25}}
            color={colors.black}>
            Is your patient anticiptated to lose more than{' '}
            <Text bold size={responsiveScale(20)} color={colors.black}>
              500 ml
            </Text>{' '}
            of blood or have major fluid shifts?
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              showADs(navigation, 'FluidDecision', {
                decision: 'yes',
                weight: weight,
                context: context,
                habitus: habitus,
                age: age,
                gender: gender,
              });
            }}
            style={[decisionButton, {backgroundColor: '#7fbe3c'}]}>
            <Text bold style={buttonText}>
              Yes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              showADs(navigation, 'FluidDecision', {
                decision: 'no',
                weight: weight,
                context: context,
                habitus: habitus,
                age: age,
                gender: gender,
              });
            }}
            style={[decisionButton, {backgroundColor: 'red'}]}>
            <Text bold style={buttonText}>
              No
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Block
        style={{position: 'absolute', bottom: 0}}
        flex={false}
        padding={[0, 0, insets.bottom - perfectSize(20), 0]}>
        <HeaGAMBannerAdder />
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  decisionButton: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    width: 75,
    margin: 10,
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
  },
});
