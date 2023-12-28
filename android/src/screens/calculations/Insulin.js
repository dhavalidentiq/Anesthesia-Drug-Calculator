import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Block from '../../components/utilities/Block';
import Text from '../../components/utilities/Text';
import Header from '../../components/Header';
import {colors, font, perfectSize, sizes} from '../../styles/theme';
import HeaGAMBannerAdder from '../../components/GAMBannerAd';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {showADs} from '../../components/IntertitialAd';

export default function Insulin({navigation}) {
  const insets = useSafeAreaInsets();
  return (
    <Block flex={1} color={'white'}>
      <Header
        headerTitle={'Insulin'}
        isBackIcon={true}
        _onPressBack={() => {
          navigation.goBack();
        }}
      />

      <ScrollView>
        <Block
          flex={1}
          color={'white'}
          middle
          padding={[perfectSize(10), perfectSize(10)]}>
          <Block flex={false}>
            <Text center regular size={perfectSize(25)} color={colors.black}>
              Does the patient and/or surgery meet the following conditions?
            </Text>
          </Block>

          <Block flex={false} margin={[perfectSize(10), perfectSize(10)]}>
            <Text
              size={perfectSize(14)}
              regular
              style={styles.marginTop}
              color={colors.black}>
              Critically ill
            </Text>

            <Text
              size={perfectSize(14)}
              regular
              style={styles.marginTop}
              color={colors.black}>
              Poorly controlled BG at home
            </Text>
            <Text
              size={perfectSize(14)}
              regular
              style={styles.marginTop}
              color={colors.black}>
              Surgery duration {'>'} 4 hours
            </Text>
            <Text
              size={perfectSize(14)}
              regular
              style={styles.marginTop}
              color={colors.black}>
              Anticipated use of inotropes
            </Text>
            <Text
              size={perfectSize(14)}
              regular
              style={styles.marginTop}
              color={colors.black}>
              Anticipated significant changes in temperature (active cooling,
              passive hypothermia, hyperthermic intraperitoneal chemotherapy.)
            </Text>
            <Text
              size={perfectSize(14)}
              regular
              style={styles.marginTop}
              color={colors.black}>
              Anticipated significant hemodynamic changes
            </Text>
            <Text
              size={perfectSize(14)}
              regular
              style={styles.marginTop}
              color={colors.black}>
              Anticipated significant fluid shifts
            </Text>
          </Block>

          <Block flex={false} center middle row>
            <TouchableOpacity
              onPress={() => {
                showADs(navigation, 'InsulinInfusion');
              }}
              style={[styles.decisionButton, {backgroundColor: '#7fbe3c'}]}>
              <Text center color={'white'} medium size={perfectSize(20)}>
                Yes - IV
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                showADs(navigation, 'InsulinClassification');
              }}
              style={[styles.decisionButton, {backgroundColor: 'red'}]}>
              <Text center color={'white'} medium size={perfectSize(20)}>
                No - SQ
              </Text>
            </TouchableOpacity>
          </Block>
        </Block>
      </ScrollView>

      <Block
        style={{position: 'absolute', bottom: 0}}
        flex={false}
        padding={[0, 0, insets.bottom - perfectSize(20), 0]}>
        <HeaGAMBannerAdder />
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  marginTop: {
    marginVertical: perfectSize(10),
  },
  decisionButton: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    margin: 10,
    marginTop: 20,
  },
});
