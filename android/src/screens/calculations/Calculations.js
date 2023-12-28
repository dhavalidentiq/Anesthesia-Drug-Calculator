import {
  InputAccessoryView,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Block from '../../components/utilities/Block';
import Header from '../../components/Header';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import Text from '../../components/utilities/Text';
import Button from '../../components/Button';
import InsulinIcon from '../../assets/appImages/InsulinIcon.svg';
import DrugsIcon from '../../assets/appImages/DrugsIcon.svg';
import AdultIcon from '../../assets/appImages/Adult.svg';
import PediatricsIcon from '../../assets/appImages/Pediatrics.svg';
import FluidIcon from '../../assets/appImages/FluidIcon.svg';
import BloodIcon from '../../assets/appImages/BloodIcon.svg';
import SeizureIcon from '../../assets/appImages/SeizureIcon.svg';
import FemaleIcon from '../../assets/appImages/FemaleIcon.svg';
import MaleIcon from '../../assets/appImages/MaleIcon.svg';
import {Airway, Hemodynamics, Obesity} from '../../utils/CommonMethods';
import GraphIcon from '../../assets/appImages/GraphIcon.svg';
import AirIcon from '../../assets/appImages/AirIcon.svg';
import ReactNativePickerModule from 'react-native-picker-module';
import Modal from 'react-native-modal';
import DeleteIcon from '../../assets/appImages/DeleteIcon.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {showADs} from '../../components/IntertitialAd';
import {firebase_Analytics_Events} from '../../utils/FirebaseEvents';
import {
  colors,
  deviceWidth,
  font,
  perfectSize,
  sizes,
} from '../../styles/theme';
import {responsiveScale} from '../../styles/mixins';
import LinearGradient from 'react-native-linear-gradient';
import DropShadow from 'react-native-drop-shadow';

export default function Calculations({navigation, isSubscribed}) {
  const [weight, setWeight] = useState(40);
  const [height, setHeight] = useState(58);
  const [gender, setGender] = useState('male');
  const [displayAgeUnits, setDisplayAgeUnits] = useState('flex');
  const [peds, setPeds] = useState(0);
  const [isSelect_LBS_And_KG, setIsSelect_LBS_And_KG] = useState('KG');
  const [isSelect_INCH_And_CM, setIsSelect_INCH_And_CM] = useState('CM');
  const [lbsValue, setLbsValue] = useState(88);
  const [cmValue, setCmValue] = useState(147);
  const [pickerValue, setPickerValue] = useState('2 yrs');
  const [isSelect_LBS_And_KG_Pediatric, setIsSelect_LBS_And_KG_Pediatric] =
    useState('KG');
  const [pediatricKGValue, setPediatricKGValue] = useState('0');
  const [pediatricLBSValue, setPediatricLBSValue] = useState('0');
  const [selectedYearAndMonValue, setSelectedYearAndMonValue] = useState({});
  const [isOpenKGKeyboard, setIsOpenKGKeyboard] = useState(false);
  const [isOpenCMKeyboard, setIsOpenCMKeyboard] = useState(false);
  const [isOpenKGKeyboardPediatric, setIsOpenKGKeyboardPediatric] =
    useState(false);
  const [selectedLbs, setSelectedLbs] = useState(0);
  const [selectedInch, setSelectedInch] = useState(1);
  const [selectedLBSpediatric, setSelectedLBSpediatric] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const insets = useSafeAreaInsets();

  const textInputKG = useRef(null);
  const textInputCM = useRef(null);
  const pickerRef = useRef(null);
  const textInputKGPediatric = useRef(null);

  const focusTextInputKGPediatric = () => {
    textInputKGPediatric.current.focus();
    setIsOpenKGKeyboardPediatric(true);
  };

  const focusTextInputKG = () => {
    textInputKG.current.focus();
    setIsOpenKGKeyboard(true);
  };

  const focusTextInputCM = () => {
    textInputCM.current.focus();
    setIsOpenCMKeyboard(true);
  };

  const focusPickerRef = () => {
    pickerRef.current?.show();
    Keyboard.dismiss();
  };

  useEffect(() => {
    ageTranslatednew(pickerValue);
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      _keyboardDidShow,
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      _keyboardDidHide,
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [weight, lbsValue, cmValue, pediatricKGValue]);

  const _keyboardDidShow = e => {
    // this.focusPickerRefHide()
  };

  const _keyboardDidHide = () => {
    setIsOpenCMKeyboard(false);
    setIsOpenKGKeyboard(false);
    setIsOpenKGKeyboardPediatric(false);

    if (isSelect_LBS_And_KG_Pediatric === 'KG') {
      if (
        Math.round(pediatricKGValue) <
        Math.round(selectedYearAndMonValue?.lowWeight / 10)
      ) {
        setIsModalVisible(true);
        setModalText(
          `Lower limit is ${Math.round(
            selectedYearAndMonValue?.lowWeight / 10,
          )}` + ' kg',
        );

        setPediatricKGValue(
          Math.round(selectedYearAndMonValue?.lowWeight / 10),
        );
        setPediatricLBSValue(
          Math.round((selectedYearAndMonValue?.lowWeight / 10) * 2.2),
        );
      }

      if (
        Math.round(pediatricKGValue) >
        Math.round(selectedYearAndMonValue?.highWeight / 10)
      ) {
        setIsModalVisible(true);
        setModalText(
          `Upper limit is ${Math.round(
            selectedYearAndMonValue?.highWeight / 10,
          )}` + ' kg',
        );
        setPediatricKGValue(
          Math.round(selectedYearAndMonValue?.highWeight / 10),
        );
        setPediatricLBSValue(
          Math.round((selectedYearAndMonValue?.highWeight / 10) * 2.2),
        );
      }
    }

    if (isSelect_LBS_And_KG_Pediatric === 'LBS') {
      if (
        Math.round(pediatricLBSValue) <
        Math.round((selectedYearAndMonValue?.lowWeight / 10) * 2.2)
      ) {
        setIsModalVisible(true);
        setModalText(
          `Lower limit is ${Math.round(
            (selectedYearAndMonValue?.lowWeight / 10) * 2.2,
          )}` + ' lbs',
        );
        setPediatricKGValue(
          Math.round(selectedYearAndMonValue?.lowWeight / 10),
        );
        setPediatricLBSValue(
          Math.round((selectedYearAndMonValue?.lowWeight / 10) * 2.2),
        );
      }

      if (
        Math.round(pediatricLBSValue) >
        Math.round((selectedYearAndMonValue?.highWeight / 10) * 2.2)
      ) {
        setIsModalVisible(true);
        setModalText(
          `Upper limit is ${Math.round(
            (selectedYearAndMonValue?.highWeight / 10) * 2.2,
          )}` + ' lbs',
        );

        setPediatricKGValue(
          Math.round(selectedYearAndMonValue?.highWeight / 10),
        );
        setPediatricLBSValue(
          Math.round((selectedYearAndMonValue?.highWeight / 10) * 2.2),
        );
      }
    }

    if (isSelect_LBS_And_KG === 'KG') {
      if (weight < 40) {
        setIsModalVisible(true);
        setModalText('Lower limit is 40kg');

        setWeight(40);
        setLbsValue(88);
      }
      if (weight > 150) {
        setIsModalVisible(true);
        setModalText('Upper limit is 150kg');

        setWeight(150);
        setLbsValue(330);
      }
    }

    if (isSelect_LBS_And_KG === 'LBS') {
      if (lbsValue < 88) {
        setIsModalVisible(true);
        setModalText('Lower limit is 88 lbs');

        setLbsValue(88);
        setWeight(40);
      }
      if (lbsValue > 330) {
        setIsModalVisible(true);
        setModalText('Upper limit is 330 lbs');

        setLbsValue(330);
        setWeight(150);
      }
    }

    if (isSelect_INCH_And_CM === 'CM') {
      if (cmValue < 147) {
        setIsModalVisible(true);
        setModalText('Lower limit is 147 cm');

        setCmValue(147);
        setHeight(58);
      } else if (cmValue > 213) {
        setIsModalVisible(true);
        setModalText('Upper limit is 213 cm');
        setCmValue(213);
        setHeight(84);
      }
    }

    if (isSelect_INCH_And_CM === 'INCH') {
      if (height < 58) {
        setIsModalVisible(true);
        setModalText('Upper limit is 58 in');

        setCmValue(147);
        setHeight(58);
      } else if (height > 84) {
        setIsModalVisible(true);
        setModalText('Upper limit is 84 in');

        setCmValue(213);
        setHeight(84);
      }
    }
  };

  const ageTranslatednew = (data, setState, dispatch) => {
    const translated = {
      main: null,
      units: null,
      highWeight: null,
      lowWeight: null,
      age: null,
    };
    if (data === 'PRE') {
      translated.main = 'PRE';
      translated.units = null;
      translated.highWeight = 30;
      translated.lowWeight = 5;
      translated.age = -133;
    } else if (data === 'NBRN') {
      translated.main = 'NBRN';
      translated.units = null;
      translated.highWeight = 41;
      translated.lowWeight = 23;
      translated.age = -120;
    } else if (data === '1 mos') {
      translated.main = 1;
      translated.units = 'mos';
      translated.highWeight = 50;
      translated.lowWeight = 32;
      translated.age = -108;
    } else if (data === '2 mos') {
      translated.main = 2;
      translated.units = 'mos';
      translated.highWeight = 64;
      translated.lowWeight = 42;
      translated.age = -96;
    } else if (data === '3 mos') {
      translated.main = 3;
      translated.units = 'mos';
      translated.highWeight = 73;
      translated.lowWeight = 48;
      translated.age = -84;
    } else if (data === '4 mos') {
      translated.main = 4;
      translated.units = 'mos';
      translated.highWeight = 83;
      translated.lowWeight = 55;
      translated.age = -72;
    } else if (data === '5 mos') {
      translated.main = 5;
      translated.units = 'mos';
      translated.highWeight = 89;
      translated.lowWeight = 60;
      translated.age = -60;
    } else if (data === '6 mos') {
      translated.main = 6;
      translated.units = 'mos';
      translated.highWeight = 96;
      translated.lowWeight = 65;
      translated.age = -48;
    } else if (data === '7 mos') {
      translated.main = 7;
      translated.units = 'mos';
      translated.highWeight = 101;
      translated.lowWeight = 69;
      translated.age = -36;
    } else if (data === '8 mos') {
      translated.main = 8;
      translated.units = 'mos';
      translated.highWeight = 107;
      translated.lowWeight = 74;
      translated.age = -24;
    } else if (data === '9 mos') {
      translated.main = 9;
      translated.units = 'mos';
      translated.highWeight = 112;
      translated.lowWeight = 77;
      translated.age = -12;
    } else if (data === '10 mos') {
      translated.main = 10;
      translated.units = 'mos';
      translated.highWeight = 116;
      translated.lowWeight = 80;
      translated.age = 0;
    } else if (data === '11 mos') {
      translated.main = 11;
      translated.units = 'mos';
      translated.highWeight = 120;
      translated.lowWeight = 83;
      translated.age = 12;
    } else if (data === '1 yrs') {
      translated.main = 1;
      translated.units = 'yrs';
      translated.highWeight = 152;
      translated.lowWeight = 86;
      translated.age = 24;
    } else if (data === '2 yrs') {
      console.log('====Trueeeeee');
      translated.main = 2;
      translated.units = 'yrs';
      translated.highWeight = 174;
      translated.lowWeight = 106;
      translated.age = 36;
    } else if (data === '3 yrs') {
      translated.main = 3;
      translated.units = 'yrs';
      translated.highWeight = 200;
      translated.lowWeight = 120;
      translated.age = 48;
    } else if (data === '4 yrs') {
      translated.main = 4;
      translated.units = 'yrs';
      translated.highWeight = 230;
      translated.lowWeight = 140;
      translated.age = 60;
    } else if (data === '5 yrs') {
      translated.main = 5;
      translated.units = 'yrs';
      translated.highWeight = 270;
      translated.lowWeight = 150;
      translated.age = 72;
    } else if (data === '6 yrs') {
      translated.main = 6;
      translated.units = 'yrs';
      translated.highWeight = 310;
      translated.lowWeight = 170;
      translated.age = 84;
    } else if (data === '7 yrs') {
      translated.main = 7;
      translated.units = 'yrs';
      translated.highWeight = 350;
      translated.lowWeight = 180;
      translated.age = 96;
    } else if (data === '8 yrs') {
      translated.main = 8;
      translated.units = 'yrs';
      translated.highWeight = 400;
      translated.lowWeight = 200;
      translated.age = 108;
    } else if (data === '9 yrs') {
      translated.main = 9;
      translated.units = 'yrs';
      translated.highWeight = 460;
      translated.lowWeight = 220;
      translated.age = 120;
    } else if (data === '10 yrs') {
      translated.main = 10;
      translated.units = 'yrs';
      translated.highWeight = 530;
      translated.lowWeight = 240;
      translated.age = 132;
    } else if (data === '11 yrs') {
      translated.main = 11;
      translated.units = 'yrs';
      translated.highWeight = 590;
      translated.lowWeight = 270;
      translated.age = 144;
    } else if (data === '12 yrs') {
      translated.main = 12;
      translated.units = 'yrs';
      translated.highWeight = 660;
      translated.lowWeight = 300;
      translated.age = 156;
    } else if (data === '13 yrs') {
      translated.main = 13;
      translated.units = 'yrs';
      translated.highWeight = 730;
      translated.lowWeight = 330;
      translated.age = 168;
    } else if (data === '14 yrs') {
      translated.main = 14;
      translated.units = 'yrs';
      translated.highWeight = 790;
      translated.lowWeight = 380;
      translated.age = 180;
    } else if (data === '15 yrs') {
      translated.main = 15;
      translated.units = 'yrs';
      translated.highWeight = 850;
      translated.lowWeight = 420;
      translated.age = 192;
    } else if (data === '16 yrs') {
      translated.main = 16;
      translated.units = 'yrs';
      translated.highWeight = 890;
      translated.lowWeight = 470;
      translated.age = 204;
    } else if (data === '17 yrs') {
      translated.main = 17;
      translated.units = 'yrs';
      translated.highWeight = 920;
      translated.lowWeight = 500;
      translated.age = 205;
    }
    setSelectedYearAndMonValue(translated);
    setPediatricKGValue(Math.round(translated?.lowWeight / 10));
    setPediatricLBSValue(Math.round((translated?.lowWeight / 10) * 2.2));
  };

  const weightTranslated = weight;

  const inputAccessoryViewID = 'uniqueID';

  const genderSelectionFunction = () => {
    if (gender === 'male') {
      setGender('female');
    } else {
      setGender('male');
    }
  };

  const fluidsAge = peds === 1 ? selectedYearAndMonValue?.age : null;
  const fluidsNav = peds === 1 ? 'CalculationFluid' : 'FluidsAdult';

  const mHeight = (height * 2.54) / 100;

  const IBWm = Math.round(50 + 0.91 * (height * 2.54 - 152.4));
  const IBWf = Math.round(45.5 + 0.91 * (height * 2.54 - 152.4));
  const IBW = () => {
    if (peds === 1) {
      if (
        selectedYearAndMonValue?.age > 12 &&
        selectedYearAndMonValue?.age <= 108
      ) {
        return 2 * selectedYearAndMonValue?.main + 9;
      } else if (selectedYearAndMonValue?.age > 108) {
        return 3 * selectedYearAndMonValue?.main;
      } else {
        return 0;
      }
    } else {
      return gender == 'male' ? IBWm : IBWf;
    }
  };

  const BMI = Math.round(weightTranslated / mHeight ** 2);

  const LBW =
    gender == 'male'
      ? Math.round((9270 * weightTranslated) / (6680 + 216 * BMI))
      : Math.round((9270 * weightTranslated) / (8780 + 244 * BMI));

  const AjBW = Math.round(IBW() + 0.4 * (Math.round(weightTranslated) - IBW()));

  const habitus = Obesity(BMI);
  const context = peds === 1 ? 'pediatric' : 'adult';
  const UCcontext = context.charAt(0).toUpperCase() + context.slice(1);
  const weightLBS = Math.round(weightTranslated * 2.2);
  const airwayObj = Airway(pediatricKGValue, selectedYearAndMonValue?.age);
  const hemodynamics = Hemodynamics(selectedYearAndMonValue?.age);

  const MtidalVolume = Math.round(IBWm * 6) + ' - ' + Math.round(IBWm * 8);
  const FtidalVolume = Math.round(IBWf * 6) + ' - ' + Math.round(IBWf * 8);
  const tidalVolume = gender == 'male' ? MtidalVolume : FtidalVolume;

  const PtidalVolume =
    Math.round(pediatricKGValue * 6) + ' - ' + Math.round(pediatricKGValue * 8);

  const dataset_1 = [
    'PRE',
    'NBRN',
    '1 mos',
    '2 mos',
    '3 mos',
    '4 mos',
    '5 mos',
    '6 mos',
    '7 mos',
    '8 mos',
    '9 mos',
    '10 mos',
    '11 mos',
    '1 yrs',
    '2 yrs',
    '3 yrs',
    '4 yrs',
    '5 yrs',
    '6 yrs',
    '7 yrs',
    '8 yrs',
    '9 yrs',
    '10 yrs',
    '11 yrs',
    '12 yrs',
    '13 yrs',
    '14 yrs',
    '15 yrs',
    '16 yrs',
    '17 yrs',
  ];

  const additionalInfo =
    peds === 1 ? (
      <View
        style={[
          styles.vitals,
          {
            paddingBottom: perfectSize(10),
          },
        ]}>
        <View style={[styles.half, {alignItems: 'center'}]}>
          <GraphIcon width={perfectSize(40)} height={perfectSize(40)} />
          <Text
            regular
            size={15}
            style={{marginTop: perfectSize(10)}}
            color={colors.black}>
            HR: {hemodynamics.hr}
          </Text>
          <Text
            regular
            size={15}
            style={{marginTop: perfectSize(8)}}
            color={colors.black}>
            SBP: {hemodynamics.sbp}
          </Text>

          <Text
            regular
            size={15}
            style={{marginTop: perfectSize(5)}}
            color={colors.black}>
            MAP: {hemodynamics.map}
          </Text>
          <Text
            regular
            size={15}
            style={{marginTop: perfectSize(5)}}
            color={colors.black}>
            RR: {hemodynamics.RR}
          </Text>
          <Text
            regular
            size={15}
            style={{marginTop: perfectSize(5)}}
            color={colors.black}>
            TV: {PtidalVolume} mL
          </Text>
          {IBW() ? (
            <Text
              regular
              size={15}
              style={{marginTop: perfectSize(5)}}
              color={colors.black}>
              IBW: {IBW()} kg
            </Text>
          ) : null}
        </View>
        <View
          style={[
            styles.half,
            {alignItems: 'center', marginTop: perfectSize(10)},
          ]}>
          <AirIcon width={perfectSize(40)} height={perfectSize(40)} />
          <Text regular size={15} color={colors.black}>
            ETT: {airwayObj.ett}
          </Text>
          <Text regular size={15} color={colors.black}>
            ETT depth: {airwayObj.ettCM}
          </Text>

          <View style={{paddingVertical: 5, alignItems: 'center'}}>
            <Text
              regular
              size={15}
              style={{marginTop: perfectSize(5)}}
              color={colors.black}>
              Blade: {airwayObj.blade}
            </Text>
            <Text
              regular
              size={15}
              style={{marginTop: perfectSize(5)}}
              color={colors.black}>
              Mask: {airwayObj.mask}
            </Text>
            <Text
              regular
              size={15}
              style={{marginTop: perfectSize(5)}}
              color={colors.black}>
              LMA size: {airwayObj.lma}
            </Text>
            <Text
              regular
              size={15}
              style={{marginTop: perfectSize(5)}}
              color={colors.black}>
              Oral Airway: {airwayObj.oralAirway}
            </Text>
          </View>
        </View>
      </View>
    ) : (
      <View style={[styles.vitals, {paddingBottom: perfectSize(10)}]}>
        <View style={[styles.half, {alignItems: 'center', width: '80%'}]}>
          <View style={{flexDirection: 'row', marginTop: perfectSize(10)}}>
            {IBW() ? (
              <Text regular size={15} color={colors.black}>
                IBW: {IBW()} kg |{' '}
              </Text>
            ) : null}
            <Text regular size={15} color={colors.black}>
              LBW: {LBW} kg |{' '}
            </Text>
            <Text regular size={15} color={colors.black}>
              AjBW: {AjBW} kg
            </Text>
          </View>

          <Text
            regular
            size={15}
            style={{marginTop: perfectSize(10)}}
            color={colors.black}>
            BMI: {BMI}
          </Text>
          <Text
            regular
            size={15}
            style={{marginTop: perfectSize(10)}}
            color={colors.black}>
            Habitus: {habitus}
          </Text>
          <View
            style={{flexDirection: 'row', marginTop: perfectSize(10)}}
            color={colors.black}>
            <Text regular size={15} color={colors.black}>
              &#8224;
            </Text>
            <Text regular size={15} color={colors.black}>
              Tidal Volume: {tidalVolume} mL
            </Text>
          </View>
        </View>
      </View>
    );

  const _handleKeyboardKGAndLBS = text => {
    if (isSelect_LBS_And_KG === 'KG') {
      const parsedQty = Number.parseInt(text);
      setWeight(isNaN(parsedQty) ? 0 : parsedQty);
    }
  };

  const _handleKeyboardLBS = text => {
    const parsedLbsValue = Number.parseInt(text);
    setLbsValue(isNaN(parsedLbsValue) ? 0 : parsedLbsValue);
    setWeight(isNaN(parsedLbsValue) ? 0 : Math.round(parsedLbsValue / 2.2));
  };

  const _handleKeyboardCM = text => {
    const parsedCMValue = Number.parseInt(text);
    setCmValue(isNaN(parsedCMValue) ? 0 : parsedCMValue);
    setHeight(isNaN(parsedCMValue) ? 0 : Math.round(parsedCMValue / 2.54));
  };

  const _handleKeyboardInch = text => {
    const parsedCMValue = Number.parseInt(text);
    setHeight(isNaN(parsedCMValue) ? 0 : Math.round(parsedCMValue));
    setCmValue(isNaN(parsedCMValue) ? 0 : Math.round(parsedCMValue * 2.54));
  };

  const _handleKeyboardKGPediatric = text => {
    const valueKGPediatric = Number.parseInt(text);
    setPediatricKGValue(isNaN(valueKGPediatric) ? 0 : valueKGPediatric);
    setPediatricLBSValue(
      isNaN(valueKGPediatric) ? 0 : Math.round(valueKGPediatric * 2.2),
    );
  };

  const _handleKeyboardLBSPediatric = text => {
    const parsedLbsValue = Number.parseInt(text);
    setPediatricLBSValue(
      isNaN(parsedLbsValue) ? 0 : Math.round(parsedLbsValue),
    );
    setPediatricKGValue(
      isNaN(parsedLbsValue) ? 0 : Math.round(parsedLbsValue / 2.2),
    );
  };

  const firebaseEvent = name => {
    firebase_Analytics_Events({
      eventName: 'onclick_calculation',
      params: {
        type: peds === 0 ? 'Adult' : 'Pediatric',
        name: name,
      },
    });
  };

  return (
    <Block flex={1} color={'rgba(247,247,247, 0.9)'}>
      {/* <Header headerTitle={'Calculations'} /> */}

      <Block
        flex={false}
        center
        middle
        width={deviceWidth}
        style={styles.headerView}
        padding={[insets.top > 40 ? insets.top : insets.top, 0, 0, 0]}
        color={colors.themeColorNew}>
        <Block
          flex={false}
          row
          center
          padding={[
            perfectSize(10),
            perfectSize(10),
            perfectSize(10),
            perfectSize(10),
          ]}>
          <TouchableOpacity
            onPress={() => setPeds(0)}
            style={[
              styles.adultAndPediatricButton,
              {
                backgroundColor: peds === 0 ? colors.white : undefined,
              },
            ]}>
            <AdultIcon width={perfectSize(40)} height={perfectSize(40)} />
            <Text
              style={[
                styles.adultAndPediatricTextColor,
                {
                  color: peds === 0 ? colors.themeColorNew : colors.white,
                },
              ]}>
              Adult
            </Text>
          </TouchableOpacity>
          <Block flex={false} width={10} />
          <TouchableOpacity
            onPress={() => setPeds(1)}
            style={[
              styles.adultAndPediatricButton,
              {
                backgroundColor: peds === 1 ? colors.white : undefined,
              },
            ]}>
            <PediatricsIcon width={perfectSize(40)} height={perfectSize(40)} />
            <Text
              style={[
                styles.adultAndPediatricTextColor,
                {
                  color: peds === 1 ? colors.themeColorNew : colors.white,
                },
              ]}>
              Pediatric
            </Text>
          </TouchableOpacity>
        </Block>
      </Block>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: insets.bottom + perfectSize(85),
        }}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            _keyboardDidHide();
          }}
          style={styles.mainView}
          activeOpacity={1}>
          <DropShadow style={styles.dropShadowView}>
            <LinearGradient
              colors={['#C6DCFF', '#FFFFFF']}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 1}}
              style={styles.linearGradientView}>
              {peds === 0 ? (
                <>
                  <Block flex={false} row center width={'100%'}>
                    <Block flex={false} row center width={'50%'} middle>
                      {isSelect_LBS_And_KG === 'KG' ? (
                        <>
                          <TextInput
                            style={[
                              styles.textInputStyle,
                              {color: colors.themeColorNew},
                            ]}
                            maxLength={3}
                            keyboardType="number-pad"
                            selectTextOnFocus={true}
                            adjustsFontSizeToFit={true}
                            inputAccessoryViewID={inputAccessoryViewID}
                            allowFontScaling={false}
                            keyboardAppearance="dark"
                            numberOfLines={1}
                            onSubmitEditing={() => {
                              Keyboard.dismiss();
                              _keyboardDidHide();
                            }}
                            value={
                              isSelect_LBS_And_KG === 'KG'
                                ? weightTranslated >= 10
                                  ? Math.round(weightTranslated).toString()
                                  : weightTranslated.toString()
                                : weightTranslated < 1
                                ? ''
                                : '' + weightLBS + ''
                            }
                            ref={textInputKG}
                            onChangeText={text => _handleKeyboardKGAndLBS(text)}
                          />
                          <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => focusTextInputKG()}>
                            <Text size={30} color={colors.black} regular>
                              kg
                            </Text>
                            <Text size={18} color={colors.lightGrey} regular>
                              {weightTranslated < 1
                                ? ''
                                : '( ' + weightLBS + ' lb)'}
                            </Text>
                          </TouchableOpacity>
                        </>
                      ) : (
                        <>
                          <TextInput
                            style={[
                              styles.textInputStyle,
                              {color: colors.themeColorNew},
                            ]}
                            maxLength={3}
                            keyboardType="number-pad"
                            selectTextOnFocus={true}
                            adjustsFontSizeToFit={true}
                            inputAccessoryViewID={inputAccessoryViewID}
                            allowFontScaling={false}
                            keyboardAppearance="dark"
                            numberOfLines={1}
                            onSubmitEditing={() => {
                              Keyboard.dismiss();
                              _keyboardDidHide();
                            }}
                            value={Math.round(lbsValue).toString()}
                            ref={textInputKG}
                            onChangeText={text => _handleKeyboardLBS(text)}
                          />
                          <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => focusTextInputKG()}>
                            <Text size={30} color={colors.black} regular>
                              lbs
                            </Text>
                            <Text size={18} color={colors.lightGrey} regular>
                              {weightTranslated >= 10
                                ? '( ' +
                                  Math.round(weightTranslated).toString() +
                                  ' kg)'
                                : '( ' + weightTranslated.toString() + ' kg)'}
                            </Text>
                          </TouchableOpacity>
                        </>
                      )}
                    </Block>

                    <Block
                      flex={false}
                      row
                      center
                      margin={[perfectSize(10), 0, perfectSize(10), 0]}
                      width={'50%'}
                      middle>
                      {isSelect_INCH_And_CM === 'CM' ? (
                        <>
                          <TextInput
                            style={[styles.textInputStyle, {color: colors.red}]}
                            maxLength={3}
                            keyboardType="number-pad"
                            selectTextOnFocus={true}
                            allowFontScaling={false}
                            adjustsFontSizeToFit={true}
                            keyboardAppearance="dark"
                            inputAccessoryViewID={inputAccessoryViewID}
                            numberOfLines={1}
                            onSubmitEditing={() => {
                              Keyboard.dismiss();
                              _keyboardDidHide();
                            }}
                            value={cmValue.toString()}
                            ref={textInputCM}
                            onChangeText={text => _handleKeyboardCM(text)}
                          />
                          <TouchableOpacity onPress={() => focusTextInputCM()}>
                            <Text size={30} regular color={colors.black}>
                              cm
                            </Text>
                            <Text size={18} color={colors.lightGrey} regular>
                              {'(' + height + ' in' + ')'}
                            </Text>
                          </TouchableOpacity>
                        </>
                      ) : (
                        <>
                          <TextInput
                            style={[styles.textInputStyle, {color: colors.red}]}
                            maxLength={3}
                            keyboardType="number-pad"
                            selectTextOnFocus={true}
                            allowFontScaling={false}
                            adjustsFontSizeToFit
                            keyboardAppearance="dark"
                            inputAccessoryViewID={inputAccessoryViewID}
                            numberOfLines={1}
                            onSubmitEditing={() => {
                              Keyboard.dismiss();
                              _keyboardDidHide();
                            }}
                            value={height.toString()}
                            ref={textInputCM}
                            onChangeText={text => _handleKeyboardInch(text)}
                          />
                          <TouchableOpacity onPress={() => focusTextInputCM()}>
                            <Text size={30} regular color={colors.black}>
                              in
                            </Text>
                            <Text size={18} color={colors.lightGrey} regular>
                              {'( ' + cmValue + ' cm' + ' )'}
                            </Text>
                          </TouchableOpacity>
                        </>
                      )}
                    </Block>
                  </Block>

                  <Block flex={1} row>
                    <Block flex={false} width={'30%'} center middle>
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => genderSelectionFunction()}
                        style={styles.genderView}>
                        {gender === 'male' ? (
                          <MaleIcon
                            width={perfectSize(45)}
                            height={perfectSize(45)}
                          />
                        ) : (
                          <FemaleIcon
                            width={perfectSize(45)}
                            height={perfectSize(45)}
                          />
                        )}
                        <Text
                          size={20}
                          color={
                            gender === 'male'
                              ? colors.darkBlue1
                              : colors.darkpink1
                          }
                          regular
                          weight={'600'}>
                          {gender?.toUpperCase()}
                        </Text>
                      </TouchableOpacity>
                    </Block>
                    <Block flex={false} width={'70%'} center middle>
                      <View
                        style={[
                          styles.vitals,
                          // {paddingBottom: perfectSize(10)},
                        ]}>
                        <View
                          style={[
                            styles.half,
                            {alignItems: 'center', width: '80%'},
                          ]}>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: perfectSize(10),
                            }}>
                            {IBW() ? (
                              <Text regular size={20} color={colors.black}>
                                IBW: {IBW()} kg |{' '}
                              </Text>
                            ) : null}
                            <Text regular size={20} color={colors.black}>
                              LBW: {LBW} kg |{' '}
                            </Text>
                            <Text regular size={20} color={colors.black}>
                              AjBW: {AjBW} kg
                            </Text>
                          </View>

                          <Text
                            regular
                            size={20}
                            style={{marginTop: perfectSize(10)}}
                            color={colors.black}>
                            BMI: {BMI}
                          </Text>
                          <Text
                            regular
                            size={20}
                            style={{marginTop: perfectSize(10)}}
                            color={colors.black}>
                            Habitus: {habitus}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: perfectSize(10),
                            }}
                            color={colors.black}>
                            <Text regular size={20} color={colors.black}>
                              &#8224;
                            </Text>
                            <Text regular size={20} color={colors.black}>
                              Tidal Volume: {tidalVolume} mL
                            </Text>
                          </View>
                        </View>
                      </View>
                    </Block>
                  </Block>
                </>
              ) : (
                <>
                  <View style={[styles.sliderTextContainer]}>
                    <TouchableOpacity
                      onPress={() => focusPickerRef()}
                      style={styles.sliderText}>
                      <View
                        style={[
                          styles.units,
                          {
                            display: displayAgeUnits,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                          },
                        ]}>
                        <Text
                          adjustsFontSizeToFit
                          numberOfLines={1}
                          style={[
                            styles.sliderValue,
                            {
                              color: 'red',
                              alignItems: 'center',
                              justifyContent: 'center',
                              alignSelf: 'center',
                            },
                          ]}>
                          {selectedYearAndMonValue?.main}
                        </Text>
                        <Text size={30} color={colors.black} regular>
                          {' '}
                          {selectedYearAndMonValue?.units}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <View style={[styles.sliderText]}>
                      {isSelect_LBS_And_KG_Pediatric === 'KG' ? (
                        <TextInput
                          adjustsFontSizeToFit
                          keyboardAppearance="dark"
                          inputAccessoryViewID={inputAccessoryViewID}
                          numberOfLines={1}
                          style={[
                            styles.sliderValue,
                            {color: colors.themeColorNew},
                          ]}
                          keyboardType="number-pad"
                          onSubmitEditing={() => {
                            Keyboard.dismiss();
                            _keyboardDidHide();
                          }}
                          value={pediatricKGValue.toString()}
                          onChangeText={text =>
                            _handleKeyboardKGPediatric(text)
                          }
                          maxLength={3}
                          ref={textInputKGPediatric}
                          selectTextOnFocus={true}
                        />
                      ) : (
                        <TextInput
                          adjustsFontSizeToFit
                          keyboardAppearance="dark"
                          inputAccessoryViewID={inputAccessoryViewID}
                          numberOfLines={1}
                          style={[
                            styles.sliderValue,
                            {color: colors.themeColorNew},
                          ]}
                          keyboardType="number-pad"
                          onSubmitEditing={() => {
                            Keyboard.dismiss();
                            _keyboardDidHide();
                          }}
                          value={Math.round(pediatricLBSValue).toString()}
                          onChangeText={text =>
                            _handleKeyboardLBSPediatric(text)
                          }
                          maxLength={3}
                          ref={textInputKGPediatric}
                          selectTextOnFocus={true}
                        />
                      )}

                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => focusTextInputKGPediatric()}>
                        <Text size={30} color={colors.black} regular>
                          {isSelect_LBS_And_KG_Pediatric === 'KG'
                            ? 'kg'
                            : 'lbs'}
                        </Text>
                        <Text size={18} color={colors.lightGrey} regular>
                          {isSelect_LBS_And_KG_Pediatric !== 'KG'
                            ? '( ' + pediatricKGValue.toString() + ' kg)'
                            : '( ' + pediatricLBSValue.toString() + ' lb)'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Block flex={1} width={'100%'} middle>
                    <View style={[styles.vitals]}>
                      <View style={[styles.half, {alignItems: 'center'}]}>
                        <Text
                          regular
                          size={20}
                          // style={{marginTop: perfectSize(10)}}
                          color={colors.black}>
                          HR: {hemodynamics.hr}
                        </Text>
                        <Text
                          regular
                          size={20}
                          style={{marginTop: perfectSize(8)}}
                          color={colors.black}>
                          SBP: {hemodynamics.sbp}
                        </Text>

                        <Text
                          regular
                          size={20}
                          style={{marginTop: perfectSize(5)}}
                          color={colors.black}>
                          MAP: {hemodynamics.map}
                        </Text>
                        <Text
                          regular
                          size={20}
                          style={{marginTop: perfectSize(5)}}
                          color={colors.black}>
                          RR: {hemodynamics.RR}
                        </Text>
                        <Text
                          regular
                          size={20}
                          style={{marginTop: perfectSize(5)}}
                          color={colors.black}>
                          TV: {PtidalVolume} mL
                        </Text>
                        {IBW() ? (
                          <Text
                            regular
                            size={20}
                            style={{marginTop: perfectSize(5)}}
                            color={colors.black}>
                            IBW: {IBW()} kg
                          </Text>
                        ) : null}
                      </View>
                      <View style={[styles.half, {alignItems: 'center'}]}>
                        <Text regular size={20} color={colors.black}>
                          ETT: {airwayObj.ett}
                        </Text>
                        <Text
                          regular
                          size={20}
                          style={{marginTop: perfectSize(5)}}
                          color={colors.black}>
                          ETT depth: {airwayObj.ettCM}
                        </Text>

                        <View style={{alignItems: 'center'}}>
                          <Text
                            regular
                            size={20}
                            style={{marginTop: perfectSize(5)}}
                            color={colors.black}>
                            Blade: {airwayObj.blade}
                          </Text>
                          <Text
                            regular
                            size={20}
                            style={{marginTop: perfectSize(5)}}
                            color={colors.black}>
                            Mask: {airwayObj.mask}
                          </Text>
                          <Text
                            regular
                            size={20}
                            style={{marginTop: perfectSize(5)}}
                            color={colors.black}>
                            LMA size: {airwayObj.lma}
                          </Text>
                          <Text
                            regular
                            size={20}
                            style={{marginTop: perfectSize(5)}}
                            color={colors.black}>
                            Oral Airway: {airwayObj.oralAirway}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </Block>
                </>
              )}
            </LinearGradient>
          </DropShadow>

          {/* <SegmentedControl
            values={['Adult', 'Pediatric']}
            selectedIndex={peds}
            onChange={event => {
              setIsOpenCMKeyboard(false);
              setIsOpenKGKeyboard(false);
              setIsOpenKGKeyboardPediatric(false);
              setPeds(event.nativeEvent.selectedSegmentIndex);
            }}
            style={styles.tabViewStyle}
            fontStyle={styles.fontStyle}
            activeFontStyle={styles.activeFontStyle}
            tintColor={colors.themeColor}
            backgroundColor="#DEDEE1"
          /> */}

          {/* {peds === 0 ? (
            <>
              <Block
                flex={false}
                row
                center
                margin={[perfectSize(10), 0, perfectSize(10), 0]}
                width={'100%'}
                selfcenter>
                <Block flex={false} row center width={'50%'} middle>
                  {isSelect_LBS_And_KG === 'KG' ? (
                    <>
                      <TextInput
                        style={[styles.textInputStyle, {color: colors.themeColorNew}]}
                        maxLength={3}
                        keyboardType="number-pad"
                        selectTextOnFocus={true}
                        adjustsFontSizeToFit={true}
                        inputAccessoryViewID={inputAccessoryViewID}
                        allowFontScaling={false}
                        keyboardAppearance="dark"
                        numberOfLines={1}
                        onSubmitEditing={() => {
                          Keyboard.dismiss();
                          _keyboardDidHide();
                        }}
                        value={
                          isSelect_LBS_And_KG === 'KG'
                            ? weightTranslated >= 10
                              ? Math.round(weightTranslated).toString()
                              : weightTranslated.toString()
                            : weightTranslated < 1
                            ? ''
                            : '' + weightLBS + ''
                        }
                        ref={textInputKG}
                        onChangeText={text => _handleKeyboardKGAndLBS(text)}
                      />
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => focusTextInputKG()}>
                        <Text size={25} color={colors.black} regular>
                          kg
                        </Text>
                        <Text size={13} color={colors.lightGrey} regular>
                          {weightTranslated < 1
                            ? ''
                            : '( ' + weightLBS + ' lb)'}
                        </Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <TextInput
                        style={[styles.textInputStyle, {color: colors.themeColorNew}]}
                        maxLength={3}
                        keyboardType="number-pad"
                        selectTextOnFocus={true}
                        adjustsFontSizeToFit={true}
                        inputAccessoryViewID={inputAccessoryViewID}
                        allowFontScaling={false}
                        keyboardAppearance="dark"
                        numberOfLines={1}
                        onSubmitEditing={() => {
                          Keyboard.dismiss();
                          _keyboardDidHide();
                        }}
                        value={Math.round(lbsValue).toString()}
                        ref={textInputKG}
                        onChangeText={text => _handleKeyboardLBS(text)}
                      />
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => focusTextInputKG()}>
                        <Text size={25} color={colors.black} regular>
                          lbs
                        </Text>
                        <Text size={13} color={colors.lightGrey} regular>
                          {weightTranslated >= 10
                            ? '( ' +
                              Math.round(weightTranslated).toString() +
                              ' kg)'
                            : '( ' + weightTranslated.toString() + ' kg)'}
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </Block>

                <Block
                  flex={false}
                  row
                  center
                  margin={[perfectSize(10), 0, perfectSize(10), 0]}
                  width={'50%'}
                  middle>
                  {isSelect_INCH_And_CM === 'CM' ? (
                    <>
                      <TextInput
                        style={[styles.textInputStyle, {color: colors.red}]}
                        maxLength={3}
                        keyboardType="number-pad"
                        selectTextOnFocus={true}
                        allowFontScaling={false}
                        adjustsFontSizeToFit={true}
                        keyboardAppearance="dark"
                        inputAccessoryViewID={inputAccessoryViewID}
                        numberOfLines={1}
                        onSubmitEditing={() => {
                          Keyboard.dismiss();
                          _keyboardDidHide();
                        }}
                        value={cmValue.toString()}
                        ref={textInputCM}
                        onChangeText={text => _handleKeyboardCM(text)}
                      />
                      <TouchableOpacity onPress={() => focusTextInputCM()}>
                        <Text size={25} regular color={colors.black}>
                          cm
                        </Text>
                        <Text size={13} color={colors.lightGrey} regular>
                          {'(' + height + ' in' + ')'}
                        </Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <TextInput
                        style={[styles.textInputStyle, {color: colors.red}]}
                        maxLength={3}
                        keyboardType="number-pad"
                        selectTextOnFocus={true}
                        allowFontScaling={false}
                        adjustsFontSizeToFit
                        keyboardAppearance="dark"
                        inputAccessoryViewID={inputAccessoryViewID}
                        numberOfLines={1}
                        onSubmitEditing={() => {
                          Keyboard.dismiss();
                          _keyboardDidHide();
                        }}
                        value={height.toString()}
                        ref={textInputCM}
                        onChangeText={text => _handleKeyboardInch(text)}
                      />
                      <TouchableOpacity onPress={() => focusTextInputCM()}>
                        <Text size={25} regular color={colors.black}>
                          in
                        </Text>
                        <Text size={13} color={colors.lightGrey} regular>
                          {'( ' + cmValue + ' cm' + ' )'}
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </Block>
              </Block>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => genderSelectionFunction()}
                style={styles.genderView}>
                {gender === 'male' ? (
                  <MaleIcon width={perfectSize(45)} height={perfectSize(45)} />
                ) : (
                  <FemaleIcon
                    width={perfectSize(45)}
                    height={perfectSize(45)}
                  />
                )}
                <Text
                  size={20}
                  color={
                    gender === 'male' ? colors.darkBlue1 : colors.darkpink1
                  }
                  regular
                  weight={'600'}>
                  {gender?.toUpperCase()}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={[styles.sliderTextContainer]}>
                <TouchableOpacity
                  onPress={() => focusPickerRef()}
                  style={styles.sliderText}>
                  <View
                    style={[
                      styles.units,
                      {
                        display: displayAgeUnits,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                    ]}>
                    <Text
                      adjustsFontSizeToFit
                      numberOfLines={1}
                      style={[
                        styles.sliderValue,
                        {
                          color: 'red',
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignSelf: 'center',
                        },
                      ]}>
                      {selectedYearAndMonValue?.main}
                    </Text>
                    <Text size={25} color={colors.black} regular>
                      {' '}
                      {selectedYearAndMonValue?.units}
                    </Text>
                  </View>
                </TouchableOpacity>

                <View style={[styles.sliderText]}>
                  {isSelect_LBS_And_KG_Pediatric === 'KG' ? (
                    <TextInput
                      adjustsFontSizeToFit
                      keyboardAppearance="dark"
                      inputAccessoryViewID={inputAccessoryViewID}
                      numberOfLines={1}
                      style={[styles.sliderValue, {color: colors.themeColorNew}]}
                      keyboardType="number-pad"
                      onSubmitEditing={() => {
                        Keyboard.dismiss();
                        _keyboardDidHide();
                      }}
                      value={pediatricKGValue.toString()}
                      onChangeText={text => _handleKeyboardKGPediatric(text)}
                      maxLength={3}
                      ref={textInputKGPediatric}
                      selectTextOnFocus={true}
                    />
                  ) : (
                    <TextInput
                      adjustsFontSizeToFit
                      keyboardAppearance="dark"
                      inputAccessoryViewID={inputAccessoryViewID}
                      numberOfLines={1}
                      style={[styles.sliderValue, {color: colors.themeColorNew}]}
                      keyboardType="number-pad"
                      onSubmitEditing={() => {
                        Keyboard.dismiss();
                        _keyboardDidHide();
                      }}
                      value={Math.round(pediatricLBSValue).toString()}
                      onChangeText={text => _handleKeyboardLBSPediatric(text)}
                      maxLength={3}
                      ref={textInputKGPediatric}
                      selectTextOnFocus={true}
                    />
                  )}

                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => focusTextInputKGPediatric()}>
                    <Text size={25} color={colors.black} regular>
                      {isSelect_LBS_And_KG_Pediatric === 'KG' ? 'kg' : 'lbs'}
                    </Text>
                    <Text size={13} color={colors.lightGrey} regular>
                      {isSelect_LBS_And_KG_Pediatric !== 'KG'
                        ? '( ' + pediatricKGValue.toString() + ' kg)'
                        : '( ' + pediatricLBSValue.toString() + ' lb)'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )} */}
          {/* {additionalInfo} */}
          {peds === 0 && (
            <Button
              title={' INSULIN'}
              extraButtonStyle={styles.extraButtonStyle}
              extraButtonTextStyle={styles.extraButtonTextStyle}
              onPress={() => {
                showADs(navigation, 'Insulin');
                firebaseEvent('Insulin');
              }}
              isShowIcon={
                <InsulinIcon width={perfectSize(30)} height={perfectSize(30)} />
              }
              backgroundColor={'#F28B74'}
            />
          )}

          <Button
            title={' FLUIDS'}
            extraButtonStyle={[styles.extraButtonStyle]}
            extraButtonTextStyle={styles.extraButtonTextStyle}
            isShowIcon={
              <FluidIcon width={perfectSize(30)} height={perfectSize(30)} />
            }
            onPress={() => {
              showADs(navigation, fluidsNav, {
                weight:
                  peds === 1
                    ? Math.round(pediatricKGValue)
                    : Math.round(weightTranslated),
                context: context,
                habitus: habitus,
                age: fluidsAge,
                gender: gender,
              });
              firebaseEvent('FLUIDS');
            }}
            backgroundColor={'#6AB5BD'}
          />
          <Button
            title={' DRUGS'}
            extraButtonStyle={[styles.extraButtonStyle]}
            extraButtonTextStyle={styles.extraButtonTextStyle}
            isShowIcon={
              <DrugsIcon width={perfectSize(30)} height={perfectSize(30)} />
            }
            onPress={() => {
              showADs(navigation, 'CalculationDrugs', {
                weight:
                  peds === 1
                    ? Math.round(pediatricKGValue)
                    : Math.round(weightTranslated),
                context: context,
                ibw: IBW(),
              });
              firebaseEvent('DRUGS');
            }}
            backgroundColor={'#74A6F2'}
          />
          <Button
            title={' BLOOD'}
            extraButtonStyle={[styles.extraButtonStyle]}
            extraButtonTextStyle={styles.extraButtonTextStyle}
            isShowIcon={
              <BloodIcon width={perfectSize(30)} height={perfectSize(30)} />
            }
            onPress={() => {
              showADs(navigation, 'CalculationBlood', {
                weight:
                  peds === 1
                    ? Math.round(pediatricKGValue)
                    : Math.round(weightTranslated),
                ibw: IBW(),
                context: context,
                habitus: habitus,
                age: fluidsAge,
                gender: gender,
              });
              firebaseEvent('BLOOD');
            }}
            backgroundColor={'#00BEA4'}
          />
          <Button
            title={' LOCAL'}
            extraButtonStyle={[styles.extraButtonStyle]}
            extraButtonTextStyle={styles.extraButtonTextStyle}
            isShowIcon={
              <SeizureIcon width={perfectSize(30)} height={perfectSize(30)} />
            }
            onPress={() => {
              showADs(navigation, 'CalculationLocalDecision', {
                ibw: IBW(),
              });
              firebaseEvent('LOCAL');
            }}
            backgroundColor={colors.themeColor}
          />
        </TouchableOpacity>
      </ScrollView>

      {Platform.OS === 'ios' && (
        <InputAccessoryView nativeID={inputAccessoryViewID}>
          {isOpenCMKeyboard && (
            <Block
              flex={false}
              style={{
                width: '100%',
                height: perfectSize(50),
                backgroundColor: colors.dropBackColor,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <SegmentedControl
                values={['INCH', 'CM']}
                selectedIndex={selectedInch}
                onChange={event => {
                  if (event.nativeEvent.selectedSegmentIndex == 0) {
                    setIsSelect_INCH_And_CM('INCH');
                  } else {
                    setIsSelect_INCH_And_CM('CM');
                  }
                  setSelectedInch(event.nativeEvent.selectedSegmentIndex);
                }}
                style={[styles.lbsTabViewStyle, {}]}
                fontStyle={styles.lbsfontStyle}
                activeFontStyle={styles.lbsActiveFontStyle}
                tintColor={colors.themeColor}
                backgroundColor={'#DEDEE1'}
              />
            </Block>
          )}
          {isOpenKGKeyboard && (
            <Block
              flex={false}
              style={{
                width: '100%',
                height: perfectSize(50),
                backgroundColor: colors.dropBackColor,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <SegmentedControl
                values={['KG', 'LBS']}
                selectedIndex={selectedLbs}
                onChange={event => {
                  if (event.nativeEvent.selectedSegmentIndex == 0) {
                    setIsSelect_LBS_And_KG('KG');
                  } else {
                    setIsSelect_LBS_And_KG('LBS');
                  }
                  setLbsValue(weightLBS);
                  setSelectedLbs(event.nativeEvent.selectedSegmentIndex);
                }}
                style={[styles.lbsTabViewStyle, {}]}
                fontStyle={styles.lbsfontStyle}
                activeFontStyle={styles.lbsActiveFontStyle}
                tintColor={colors.themeColor}
                backgroundColor={'#DEDEE1'}
              />
            </Block>
          )}

          {isOpenKGKeyboardPediatric && (
            <Block
              flex={false}
              style={{
                width: '100%',
                height: perfectSize(50),
                backgroundColor: colors.dropBackColor,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <SegmentedControl
                values={['LBS', 'KG']}
                selectedIndex={selectedLBSpediatric}
                onChange={event => {
                  if (event.nativeEvent.selectedSegmentIndex == 0) {
                    setIsSelect_LBS_And_KG_Pediatric('LBS');
                  } else {
                    setIsSelect_LBS_And_KG_Pediatric('KG');
                  }
                  setSelectedLBSpediatric(
                    event.nativeEvent.selectedSegmentIndex,
                  );
                }}
                style={[styles.lbsTabViewStyle, {}]}
                fontStyle={styles.lbsfontStyle}
                activeFontStyle={styles.lbsActiveFontStyle}
                tintColor={colors.themeColor}
                backgroundColor={'#DEDEE1'}
              />
            </Block>
          )}
        </InputAccessoryView>
      )}

      {Platform.OS === 'android' && (
        <>
          {isOpenCMKeyboard && (
            <Block
              flex={false}
              style={{
                width: '100%',
                height: perfectSize(50),
                backgroundColor: colors.dropBackColor,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <SegmentedControl
                values={['INCH', 'CM']}
                selectedIndex={selectedInch}
                onChange={event => {
                  if (event.nativeEvent.selectedSegmentIndex == 0) {
                    setIsSelect_INCH_And_CM('INCH');
                  } else {
                    setIsSelect_INCH_And_CM('CM');
                  }
                  setSelectedInch(event.nativeEvent.selectedSegmentIndex);
                }}
                style={[styles.lbsTabViewStyle, {}]}
                fontStyle={styles.lbsfontStyle}
                activeFontStyle={styles.lbsActiveFontStyle}
                tintColor={colors.themeColor}
                backgroundColor={'#DEDEE1'}
              />
            </Block>
          )}
          {isOpenKGKeyboard && (
            <Block
              flex={false}
              style={{
                width: '100%',
                height: perfectSize(50),
                backgroundColor: colors.dropBackColor,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <SegmentedControl
                values={['KG', 'LBS']}
                selectedIndex={selectedLbs}
                onChange={event => {
                  if (event.nativeEvent.selectedSegmentIndex == 0) {
                    setIsSelect_LBS_And_KG('KG');
                  } else {
                    setIsSelect_LBS_And_KG('LBS');
                  }
                  setLbsValue(weightLBS);
                  setSelectedLbs(event.nativeEvent.selectedSegmentIndex);
                }}
                style={[styles.lbsTabViewStyle, {}]}
                fontStyle={styles.lbsfontStyle}
                activeFontStyle={styles.lbsActiveFontStyle}
                tintColor={colors.themeColor}
                backgroundColor={'#DEDEE1'}
              />
            </Block>
          )}

          {isOpenKGKeyboardPediatric && (
            <Block
              flex={false}
              style={{
                width: '100%',
                height: perfectSize(50),
                backgroundColor: colors.dropBackColor,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <SegmentedControl
                values={['LBS', 'KG']}
                selectedIndex={selectedLBSpediatric}
                onChange={event => {
                  if (event.nativeEvent.selectedSegmentIndex == 0) {
                    setIsSelect_LBS_And_KG_Pediatric('LBS');
                  } else {
                    setIsSelect_LBS_And_KG_Pediatric('KG');
                  }
                  setSelectedLBSpediatric(
                    event.nativeEvent.selectedSegmentIndex,
                  );
                }}
                style={[styles.lbsTabViewStyle, {}]}
                fontStyle={styles.lbsfontStyle}
                activeFontStyle={styles.lbsActiveFontStyle}
                tintColor={colors.themeColor}
                backgroundColor={'#DEDEE1'}
              />
            </Block>
          )}
        </>
      )}

      <ReactNativePickerModule
        ref={pickerRef}
        value={pickerValue}
        title={'Select an age'}
        items={dataset_1}
        titleStyle={{color: 'white'}}
        itemStyle={{color: 'black'}}
        selectedColor={colors.themeColor}
        confirmButtonEnabledTextStyle={{color: 'black'}}
        confirmButtonDisabledTextStyle={{color: 'grey'}}
        cancelButtonTextStyle={{color: 'black'}}
        confirmButtonStyle={{
          backgroundColor: 'white',
        }}
        cancelButtonStyle={{
          backgroundColor: 'white',
        }}
        contentContainerStyle={{
          backgroundColor: 'white',
        }}
        onCancel={() => {
          console.log('Cancelled');
        }}
        onValueChange={value => {
          console.log('value: ', value);
          setPickerValue(value);
          ageTranslatednew(value);
        }}
      />
      <Modal
        isVisible={isModalVisible}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        transparent={true}
        onBackdropPress={() => {
          setIsModalVisible(false);
        }}
        backdropColor="rgba(0, 0, 0, 0.55)">
        <Block
          flex={false}
          color={colors.white}
          radius={perfectSize(10)}
          padding={[
            perfectSize(10),
            perfectSize(10),
            perfectSize(10),
            perfectSize(10),
          ]}
          width={'75%'}
          selfcenter>
          <Block
            flex={false}
            center
            color={colors.themeColor}
            style={[styles.imageViewStyle]}>
            <DeleteIcon width={perfectSize(55)} height={perfectSize(55)} />
          </Block>
          <Text
            size={15}
            regular
            center
            style={{marginVertical: perfectSize(10)}}
            color={colors.black}>
            {modalText}
          </Text>

          <TouchableOpacity
            style={styles.okBtnStyle}
            onPress={() => {
              setIsModalVisible(false);
            }}>
            <Text size={14} color={colors.white} medium>
              Okay
            </Text>
          </TouchableOpacity>
        </Block>
      </Modal>
    </Block>
  );
}
const styles = StyleSheet.create({
  AdultPediatricView: {
    width: '50%',
    borderRadius: perfectSize(10),
    paddingVertical: perfectSize(8),
  },
  tabViewStyle: {
    height: perfectSize(50),
  },
  fontStyle: {
    fontFamily: font.roboto_Regular,
    fontSize: sizes.header,
    color: colors.black,
  },
  activeFontStyle: {
    fontFamily: font.roboto_Medium,
    fontSize: sizes.header,
    fontWeight: '600',
    color: colors.white,
  },
  textInputStyle: {
    width: '45%',
    fontSize: responsiveScale(50),
    textAlign: 'right',
    writingDirection: 'rtl',
    marginRight: perfectSize(4),
    fontFamily: font.roboto_Regular,
  },
  mainView: {
    flex: 1,
    padding: perfectSize(10),
    backgroundColor: colors.white,
  },
  genderView: {
    alignSelf: 'center',
    marginTop: perfectSize(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  extraButtonStyle: {
    width: '100%',
    borderWidth: 1,
    borderRadius: perfectSize(50),
    paddingVertical: perfectSize(5),
    paddingHorizontal: perfectSize(5),
    borderColor: colors.gray2,
    marginTop: perfectSize(15),
  },
  extraButtonTextStyle: {
    fontSize: sizes.body,
    fontFamily: font.roboto_Regular,
    // marginLeft : 20,
    fontWeight: '900',
  },
  lbsTabViewStyle: {
    width: '85%',
    alignSelf: 'center',
    marginTop: perfectSize(10),
  },
  lbsActiveFontStyle: {
    fontFamily: font.roboto_Medium,
    fontSize: sizes.header,
    fontWeight: '600',
    color: colors.white,
  },
  lbsfontStyle: {
    color: colors.black,
    fontFamily: font.roboto_Regular,
    fontSize: sizes.header,
  },
  vitalsView: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  vitals: {
    flexDirection: 'row',
  },
  half: {
    flex: 1,
  },
  sliderTextContainer: {
    width: '100%',
    flexDirection: 'row',
    // marginTop: perfectSize(10),
    // marginBottom: perfectSize(20),
  },
  sliderText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  sliderValue: {
    fontSize: responsiveScale(60),
    textAlign: 'right',
    writingDirection: 'rtl',
    marginRight: perfectSize(4),
    fontFamily: font.roboto_Regular,
  },
  units: {
    alignItems: 'flex-start',
    flex: 1,
  },
  kg: {
    fontSize: 25,
  },
  lb: {
    color: '#1e1e1e',
    fontSize: 12,
  },
  imageViewStyle: {
    borderRadius: perfectSize(100),
    width: perfectSize(45),
    height: perfectSize(45),
    alignSelf: 'center',
    marginTop: perfectSize(-30),
    justifyContent: 'center',
  },
  okBtnStyle: {
    backgroundColor: colors.themeColor,
    borderRadius: perfectSize(10),
    marginHorizontal: perfectSize(10),
    alignItems: 'center',
    paddingVertical: perfectSize(8),
    alignSelf: 'center',
    width: '100%',
  },

  headerView: {
    overflow: 'visible',
    paddingBottom: perfectSize(5),
    borderBottomLeftRadius: perfectSize(15),
    borderBottomRightRadius: perfectSize(15),
  },

  adultAndPediatricButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#C6DCFF',
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 3,
    justifyContent: 'center',
  },

  adultAndPediatricTextColor: {
    fontSize: responsiveScale(14),
    marginLeft: 10,
    fontFamily: font.outfit,
  },

  dropShadowView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  linearGradientView: {
    height: 200,
    borderRadius: 10,
  },
});
