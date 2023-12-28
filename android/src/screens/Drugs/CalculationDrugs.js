import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import DrugList from '../../components/Drugs'; //returns a function that the weight can be passed to
import Text from '../../components/utilities/Text';
import Block from '../../components/utilities/Block';
import Header from '../../components/Header';
import {colors, perfectSize} from '../../styles/theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import HeaGAMBannerAdder from '../../components/GAMBannerAd';

//Rational is that there will ALWAYS be a low number (so if it is just a single dose number, it is entered as the item.low).  If the range is per kg, then the raw numbers are multiplied times the kg entered.  Otherwise the raw numbers are returned.
//there wont always be a high

export default CalculationDrugs = ({navigation, route}) => {
  const weight = route.params.weight;
  const context = route.params.context; //this is pediatric or adult
  const Drugs = DrugList(weight);
  const drugs = Drugs[context]; //populate the pediatric or adult drugs
  const IBW = route.params.ibw; //ideal body weight
  const insets = useSafeAreaInsets();
  const roundToNearest = (number, decimal) => {
    return Math.round(decimal * number) / decimal;
  };

  const outputUses = (Uses, textColor) => {
    //destructure styles
    const {usesText, notesStyle} = styles;

    //map through the uses of each drug
    return Uses.map((item, i) => {
      //constants
      const low = item.perIBW
        ? roundToNearest(item.low * route.params.ibw, 10)
        : item.perKg
        ? roundToNearest(item.low * weight, 10)
        : item.low;
      const high = item.perIBW
        ? roundToNearest(item.high * route.params.ibw, 10)
        : item.perKg
        ? roundToNearest(item.high * weight, 10)
        : item.high;
      // const high = item.perKg ? (roundToNearest(item.high * weight,10)) : (item.high)
      const notes = item.topNotes ? (
        <Text style={[notesStyle, {color: textColor}]}>*{item.topNotes}</Text>
      ) : null;
      const perKgRange = item => {
        if (item.perKg) {
          if (item.high) {
            return (
              <Text
                regular
                style={[
                  usesText,
                  {color: textColor},
                ]}>{`(${item.low} - ${item.high} ${item.unitsKg}${item.weightUnits}${item.infusionUnits})`}</Text>
            );
          } else {
            return (
              <Text
                regular
                style={[
                  usesText,
                  {color: textColor},
                ]}>{`(${item.low} ${item.unitsKg}${item.weightUnits}${item.infusionUnits})`}</Text>
            );
          }
        } else {
        }
      };
      // const perKgRange = item.perKg ? `(${item.low} - ${item.high} ${item.unitsKg}${item.weightUnits}${item.infusionUnits})` : null
      const mgRange = item => {
        if (item.high && item.max != null && high > item.max) {
          //checks to make sure the high or low is not > the max
          if (low > item.max) {
            return (
              <View style={{flexDirection: 'row'}}>
                <Text
                  regular
                  style={[
                    usesText,
                    {color: textColor, position: 'absolute', left: -7},
                  ]}>
                  {item.perIBW ? String.fromCodePoint(parseInt(8224)) : null}
                </Text>
                <Text regular style={[usesText, {color: textColor}]}>
                  {item.max} {item.unitsKg}{' '}
                </Text>
              </View>
            );
          } else {
            return (
              <View style={{flexDirection: 'row'}}>
                <Text
                  regular
                  style={[
                    usesText,
                    {color: textColor, position: 'absolute', left: -7},
                  ]}>
                  {item.perIBW ? String.fromCodePoint(parseInt(8224)) : null}
                </Text>
                <Text regular style={[usesText, {color: textColor}]}>
                  {low} - {item.max} {item.unitsKg}{' '}
                </Text>
              </View>
            );
          }
        } else if (item.high) {
          return (
            <View style={{flexDirection: 'row'}}>
              <Text
                regular
                style={[
                  usesText,
                  {color: textColor, position: 'absolute', left: -7},
                ]}>
                {item.perIBW ? String.fromCodePoint(parseInt(8224)) : null}
              </Text>
              <Text regular style={[usesText, {color: textColor}]}>
                {low} - {high} {item.unitsKg}{' '}
              </Text>
            </View>
          );
        } else {
          return (
            <Text regular style={[usesText, {color: textColor}]}>
              {low} {item.unitsKg}{' '}
            </Text>
          );
        }
      };
      const mlRange = item => {
        if (item.supplied) {
          if (item.high && item.max != null && high > item.max) {
            //checks to make sure the high is not > the max
            // return <Text style={{color: textColor}}>{roundToNearest((low)/item.supplied, 100)} - {roundToNearest((item.max)/item.supplied, 10)} mL ({item.supplied} {item.unitsKg}/mL)</Text>
            if (low > item.max) {
              return (
                <Text regular style={{color: textColor}}>
                  {roundToNearest(item.max / item.supplied, 100)} mL (
                  {item.supplied} {item.unitsKg}/mL)
                </Text>
              );
            } else {
              return (
                <Text regular style={{color: textColor}}>
                  {roundToNearest(low / item.supplied, 100)} -{' '}
                  {roundToNearest(item.max / item.supplied, 10)} mL (
                  {item.supplied} {item.unitsKg}/mL)
                </Text>
              );
            }
          } else if (item.high) {
            return (
              <Text regular style={{color: textColor}}>
                {roundToNearest(low / item.supplied, 100)} -{' '}
                {roundToNearest(high / item.supplied, 10)} mL ({item.supplied}{' '}
                {item.unitsKg}/mL)
              </Text>
            );
          } else {
            return (
              <Text regular style={{color: textColor}}>
                {roundToNearest(low / item.supplied, 100)} mL ({item.supplied}{' '}
                {item.unitsKg}/mL)
              </Text>
            );
          }
        }
      };

      // const mLs = item.supplied ?

      //only take the topLevel items
      if (item.topLevel) {
        if (item.method === 'infusion') {
          return (
            <View key={i}>
              <Text key={i} style={[usesText, {color: textColor}]}>
                {item.perIBW ? String.fromCodePoint(parseInt(8224)) : null}
                {perKgRange(item)}
              </Text>
              {notes}
            </View>
          );
        } else {
          return (
            <View key={i}>
              <View style={styles.mg}>
                {mgRange(item)}
                {perKgRange(item)}
              </View>
              <View>{mlRange(item)}</View>
              <View>{notes}</View>
            </View>
          );
        }
      }
    });
  };

  const calculateDosages = Drugs => {
    const {
      drugContainer,
      titleContainer,
      drugName,
      drugPrimaryPurpose,
      usesContainer,
    } = styles;

    return Drugs.map((item, i) => {
      const label = item.label;
      const textColor = item.textColor;
      const border = item.border ? item.border : {borderWidth: 0.2}; //default border if not specified in the drug object
      const primaryPurposeUC =
        item.primaryPurpose.charAt(0).toUpperCase() +
        item.primaryPurpose.slice(1); //upper case the fisrt letter of the primary purpose
      const title = item.useTradeName
        ? item.tradeName.toUpperCase()
        : item.genericName.toUpperCase(); //select the most used drug name

      return (
        <View key={i}>
          <View
            key={i}
            style={[drugContainer, border, {backgroundColor: label}]}>
            <View style={titleContainer}>
              <Text
                bold
                style={[drugName, {color: textColor}]}
                adjustsFontSizeToFit
                numberOfLines={1}>
                {title}
              </Text>
              <Text regular style={[drugPrimaryPurpose, {color: textColor}]}>
                {primaryPurposeUC}
              </Text>
            </View>
            <View style={usesContainer}>
              {outputUses(item.uses, item.textColor)}
            </View>
          </View>
        </View>
      );
    });
  };

  return (
    <Block flex={1} color={colors.white}>
      <Header
        headerTitle={'Dosages'}
        isBackIcon={true}
        _onPressBack={() => {
          navigation.goBack();
        }}
      />

      <ScrollView>{calculateDosages(drugs)}</ScrollView>

      <Block flex={false} padding={[0, 0, insets.bottom - perfectSize(20), 0]}>
        <HeaGAMBannerAdder />
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    flex: 1,
    paddingRight: 20,
  },
  drugName: {
    fontSize: 25,
  },
  drugPrimaryPurpose: {
    top: -5,
    fontSize: 12,
  },
  drugContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  usesContainer: {
    flex: 1.4,
    flexShrink: 1,
  },
  usesText: {},
  notesStyle: {
    fontSize: 10,
  },
  mg: {
    flexDirection: 'row',
  },
});
