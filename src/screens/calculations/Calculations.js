import {
  InputAccessoryView,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Block from "../../components/utilities/Block";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import Text from "../../components/utilities/Text";
import Button from "../../components/Button";
import FemaleIcon from "../../assets/appImages/FemaleIcon.svg";
import MaleIcon from "../../assets/appImages/MaleIcon.svg";
import { Airway, Hemodynamics, Obesity } from "../../utils/CommonMethods";
import GraphIcon from "../../assets/appImages/GraphIcon.svg";
import AirIcon from "../../assets/appImages/AirIcon.svg";
import ReactNativePickerModule from "react-native-picker-module";
import Modal from "react-native-modal";
import DeleteIcon from "../../assets/appImages/DeleteIcon.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { showADs } from "../../components/IntertitialAd";
import { firebase_Analytics_Events } from "../../utils/FirebaseEvents";
import {
  colors,
  deviceWidth,
  font,
  perfectSize,
  sizes,
} from "../../styles/theme";
import { responsiveScale } from "../../styles/mixins";
import InsulinNewIcon from "../../assets/appImages/InsulinNewIcon.svg";
import FluidsNewIcon from "../../assets/appImages/FluidsNewIcon.svg";
import DrugsNewIcon from "../../assets/appImages/DrugsNewIcon.svg";
import BloodNewIcon from "../../assets/appImages/BloodNewIcon.svg";
import LocalNewIcon from "../../assets/appImages/LocalNewIcon";
import BurnsNewIcon from "../../assets/appImages/BurnsNewIcon.svg";
import { getTabHeight } from "../helpers/auth";

export default function Calculations({ navigation, isSubscribed }) {
  const [tabBar_Height, setTab_Height] = useState(0);
  const [weight, setWeight] = useState(40);
  const [height, setHeight] = useState(58);
  const [gender, setGender] = useState("male");
  const [displayAgeUnits, setDisplayAgeUnits] = useState("flex");
  const [peds, setPeds] = useState(0);
  const [isSelect_LBS_And_KG, setIsSelect_LBS_And_KG] = useState("KG");
  const [isSelect_INCH_And_CM, setIsSelect_INCH_And_CM] = useState("CM");
  const [lbsValue, setLbsValue] = useState(88);
  const [cmValue, setCmValue] = useState(147);
  const [pickerValue, setPickerValue] = useState("2 yrs");
  const [isSelect_LBS_And_KG_Pediatric, setIsSelect_LBS_And_KG_Pediatric] =
    useState("KG");
  const [pediatricKGValue, setPediatricKGValue] = useState("0");
  const [pediatricLBSValue, setPediatricLBSValue] = useState("0");
  const [selectedYearAndMonValue, setSelectedYearAndMonValue] = useState({});
  const [isOpenKGKeyboard, setIsOpenKGKeyboard] = useState(false);
  const [isOpenCMKeyboard, setIsOpenCMKeyboard] = useState(false);
  const [isOpenKGKeyboardPediatric, setIsOpenKGKeyboardPediatric] =
    useState(false);
  const [selectedLbs, setSelectedLbs] = useState(0);
  const [selectedInch, setSelectedInch] = useState(1);
  const [selectedLBSpediatric, setSelectedLBSpediatric] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");
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
    textInputKG?.current?.focus();
    setIsOpenKGKeyboard(true);
  };

  const focusTextInputCM = () => {
    textInputCM?.current?.focus();
    setIsOpenCMKeyboard(true);
  };

  const focusPickerRef = () => {
    pickerRef.current?.show();
    Keyboard.dismiss();
  };

  const gettingTabBar = async () => {
    let tab_height = await getTabHeight();
    let totalCount = parseInt(tab_height);
    setTab_Height(totalCount);
  };
  useEffect(() => {
    gettingTabBar();
  }, []);

  useEffect(() => {
    ageTranslatednew(pickerValue);
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      _keyboardDidShow
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      _keyboardDidHide
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [weight, lbsValue, cmValue, pediatricKGValue]);

  const _keyboardDidShow = (e) => {
    // this.focusPickerRefHide()
  };

  const _keyboardDidHide = () => {
    setIsOpenCMKeyboard(false);
    setIsOpenKGKeyboard(false);
    setIsOpenKGKeyboardPediatric(false);

    if (isSelect_LBS_And_KG_Pediatric === "KG") {
      if (
        Math.round(pediatricKGValue) <
        Math.round(selectedYearAndMonValue?.lowWeight / 10)
      ) {
        setIsModalVisible(true);
        setModalText(
          `Lower limit is ${Math.round(
            selectedYearAndMonValue?.lowWeight / 10
          )}` + " kg"
        );

        setPediatricKGValue(
          Math.round(selectedYearAndMonValue?.lowWeight / 10)
        );
        setPediatricLBSValue(
          Math.round((selectedYearAndMonValue?.lowWeight / 10) * 2.2)
        );
      }

      if (
        Math.round(pediatricKGValue) >
        Math.round(selectedYearAndMonValue?.highWeight / 10)
      ) {
        setIsModalVisible(true);
        setModalText(
          `Upper limit is ${Math.round(
            selectedYearAndMonValue?.highWeight / 10
          )}` + " kg"
        );
        setPediatricKGValue(
          Math.round(selectedYearAndMonValue?.highWeight / 10)
        );
        setPediatricLBSValue(
          Math.round((selectedYearAndMonValue?.highWeight / 10) * 2.2)
        );
      }
    }

    if (isSelect_LBS_And_KG_Pediatric === "LBS") {
      if (
        Math.round(pediatricLBSValue) <
        Math.round((selectedYearAndMonValue?.lowWeight / 10) * 2.2)
      ) {
        setIsModalVisible(true);
        setModalText(
          `Lower limit is ${Math.round(
            (selectedYearAndMonValue?.lowWeight / 10) * 2.2
          )}` + " lbs"
        );
        setPediatricKGValue(
          Math.round(selectedYearAndMonValue?.lowWeight / 10)
        );
        setPediatricLBSValue(
          Math.round((selectedYearAndMonValue?.lowWeight / 10) * 2.2)
        );
      }

      if (
        Math.round(pediatricLBSValue) >
        Math.round((selectedYearAndMonValue?.highWeight / 10) * 2.2)
      ) {
        setIsModalVisible(true);
        setModalText(
          `Upper limit is ${Math.round(
            (selectedYearAndMonValue?.highWeight / 10) * 2.2
          )}` + " lbs"
        );

        setPediatricKGValue(
          Math.round(selectedYearAndMonValue?.highWeight / 10)
        );
        setPediatricLBSValue(
          Math.round((selectedYearAndMonValue?.highWeight / 10) * 2.2)
        );
      }
    }

    if (isSelect_LBS_And_KG === "KG") {
      if (weight < 40) {
        setIsModalVisible(true);
        setModalText("Lower limit is 40kg");

        setWeight(40);
        setLbsValue(88);
      }
      if (weight > 150) {
        setIsModalVisible(true);
        setModalText("Upper limit is 150kg");

        setWeight(150);
        setLbsValue(330);
      }
    }

    if (isSelect_LBS_And_KG === "LBS") {
      if (lbsValue < 88) {
        setIsModalVisible(true);
        setModalText("Lower limit is 88 lbs");

        setLbsValue(88);
        setWeight(40);
      }
      if (lbsValue > 330) {
        setIsModalVisible(true);
        setModalText("Upper limit is 330 lbs");

        setLbsValue(330);
        setWeight(150);
      }
    }

    if (isSelect_INCH_And_CM === "CM") {
      if (cmValue < 147) {
        setIsModalVisible(true);
        setModalText("Lower limit is 147 cm");

        setCmValue(147);
        setHeight(58);
      } else if (cmValue > 213) {
        setIsModalVisible(true);
        setModalText("Upper limit is 213 cm");
        setCmValue(213);
        setHeight(84);
      }
    }

    if (isSelect_INCH_And_CM === "INCH") {
      if (height < 58) {
        setIsModalVisible(true);
        setModalText("Upper limit is 58 in");

        setCmValue(147);
        setHeight(58);
      } else if (height > 84) {
        setIsModalVisible(true);
        setModalText("Upper limit is 84 in");

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
    if (data === "PRE") {
      translated.main = "PRE";
      translated.units = null;
      translated.highWeight = 30;
      translated.lowWeight = 5;
      translated.age = -133;
    } else if (data === "NBRN") {
      translated.main = "NBRN";
      translated.units = null;
      translated.highWeight = 41;
      translated.lowWeight = 23;
      translated.age = -120;
    } else if (data === "1 mos") {
      translated.main = 1;
      translated.units = "mos";
      translated.highWeight = 50;
      translated.lowWeight = 32;
      translated.age = -108;
    } else if (data === "2 mos") {
      translated.main = 2;
      translated.units = "mos";
      translated.highWeight = 64;
      translated.lowWeight = 42;
      translated.age = -96;
    } else if (data === "3 mos") {
      translated.main = 3;
      translated.units = "mos";
      translated.highWeight = 73;
      translated.lowWeight = 48;
      translated.age = -84;
    } else if (data === "4 mos") {
      translated.main = 4;
      translated.units = "mos";
      translated.highWeight = 83;
      translated.lowWeight = 55;
      translated.age = -72;
    } else if (data === "5 mos") {
      translated.main = 5;
      translated.units = "mos";
      translated.highWeight = 89;
      translated.lowWeight = 60;
      translated.age = -60;
    } else if (data === "6 mos") {
      translated.main = 6;
      translated.units = "mos";
      translated.highWeight = 96;
      translated.lowWeight = 65;
      translated.age = -48;
    } else if (data === "7 mos") {
      translated.main = 7;
      translated.units = "mos";
      translated.highWeight = 101;
      translated.lowWeight = 69;
      translated.age = -36;
    } else if (data === "8 mos") {
      translated.main = 8;
      translated.units = "mos";
      translated.highWeight = 107;
      translated.lowWeight = 74;
      translated.age = -24;
    } else if (data === "9 mos") {
      translated.main = 9;
      translated.units = "mos";
      translated.highWeight = 112;
      translated.lowWeight = 77;
      translated.age = -12;
    } else if (data === "10 mos") {
      translated.main = 10;
      translated.units = "mos";
      translated.highWeight = 116;
      translated.lowWeight = 80;
      translated.age = 0;
    } else if (data === "11 mos") {
      translated.main = 11;
      translated.units = "mos";
      translated.highWeight = 120;
      translated.lowWeight = 83;
      translated.age = 12;
    } else if (data === "1 yrs") {
      translated.main = 1;
      translated.units = "yrs";
      translated.highWeight = 152;
      translated.lowWeight = 86;
      translated.age = 24;
    } else if (data === "2 yrs") {
      console.log("====Trueeeeee");
      translated.main = 2;
      translated.units = "yrs";
      translated.highWeight = 174;
      translated.lowWeight = 106;
      translated.age = 36;
    } else if (data === "3 yrs") {
      translated.main = 3;
      translated.units = "yrs";
      translated.highWeight = 200;
      translated.lowWeight = 120;
      translated.age = 48;
    } else if (data === "4 yrs") {
      translated.main = 4;
      translated.units = "yrs";
      translated.highWeight = 230;
      translated.lowWeight = 140;
      translated.age = 60;
    } else if (data === "5 yrs") {
      translated.main = 5;
      translated.units = "yrs";
      translated.highWeight = 270;
      translated.lowWeight = 150;
      translated.age = 72;
    } else if (data === "6 yrs") {
      translated.main = 6;
      translated.units = "yrs";
      translated.highWeight = 310;
      translated.lowWeight = 170;
      translated.age = 84;
    } else if (data === "7 yrs") {
      translated.main = 7;
      translated.units = "yrs";
      translated.highWeight = 350;
      translated.lowWeight = 180;
      translated.age = 96;
    } else if (data === "8 yrs") {
      translated.main = 8;
      translated.units = "yrs";
      translated.highWeight = 400;
      translated.lowWeight = 200;
      translated.age = 108;
    } else if (data === "9 yrs") {
      translated.main = 9;
      translated.units = "yrs";
      translated.highWeight = 460;
      translated.lowWeight = 220;
      translated.age = 120;
    } else if (data === "10 yrs") {
      translated.main = 10;
      translated.units = "yrs";
      translated.highWeight = 530;
      translated.lowWeight = 240;
      translated.age = 132;
    } else if (data === "11 yrs") {
      translated.main = 11;
      translated.units = "yrs";
      translated.highWeight = 590;
      translated.lowWeight = 270;
      translated.age = 144;
    } else if (data === "12 yrs") {
      translated.main = 12;
      translated.units = "yrs";
      translated.highWeight = 660;
      translated.lowWeight = 300;
      translated.age = 156;
    } else if (data === "13 yrs") {
      translated.main = 13;
      translated.units = "yrs";
      translated.highWeight = 730;
      translated.lowWeight = 330;
      translated.age = 168;
    } else if (data === "14 yrs") {
      translated.main = 14;
      translated.units = "yrs";
      translated.highWeight = 790;
      translated.lowWeight = 380;
      translated.age = 180;
    } else if (data === "15 yrs") {
      translated.main = 15;
      translated.units = "yrs";
      translated.highWeight = 850;
      translated.lowWeight = 420;
      translated.age = 192;
    } else if (data === "16 yrs") {
      translated.main = 16;
      translated.units = "yrs";
      translated.highWeight = 890;
      translated.lowWeight = 470;
      translated.age = 204;
    } else if (data === "17 yrs") {
      translated.main = 17;
      translated.units = "yrs";
      translated.highWeight = 920;
      translated.lowWeight = 500;
      translated.age = 205;
    }
    setSelectedYearAndMonValue(translated);
    setPediatricKGValue(Math.round(translated?.lowWeight / 10));
    setPediatricLBSValue(Math.round((translated?.lowWeight / 10) * 2.2));
  };

  const weightTranslated = weight;

  const inputAccessoryViewID = "uniqueID";

  const genderSelectionFunction = () => {
    if (gender === "male") {
      setGender("female");
    } else {
      setGender("male");
    }
  };

  const fluidsAge = peds === 1 ? selectedYearAndMonValue?.age : null;
  const fluidsNav = peds === 1 ? "CalculationFluid" : "FluidsAdult";

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
      return gender == "male" ? IBWm : IBWf;
    }
  };

  const BMI = Math.round(weightTranslated / mHeight ** 2);

  const LBW =
    gender == "male"
      ? Math.round((9270 * weightTranslated) / (6680 + 216 * BMI))
      : Math.round((9270 * weightTranslated) / (8780 + 244 * BMI));

  const AjBW = Math.round(IBW() + 0.4 * (Math.round(weightTranslated) - IBW()));

  const habitus = Obesity(BMI);
  const context = peds === 1 ? "pediatric" : "adult";
  const UCcontext = context.charAt(0).toUpperCase() + context.slice(1);
  const weightLBS = Math.round(weightTranslated * 2.2);
  const airwayObj = Airway(pediatricKGValue, selectedYearAndMonValue?.age);
  const hemodynamics = Hemodynamics(selectedYearAndMonValue?.age);

  const MtidalVolume = Math.round(IBWm * 6) + " - " + Math.round(IBWm * 8);
  const FtidalVolume = Math.round(IBWf * 6) + " - " + Math.round(IBWf * 8);
  const tidalVolume = gender == "male" ? MtidalVolume : FtidalVolume;

  const PtidalVolume =
    Math.round(pediatricKGValue * 6) + " - " + Math.round(pediatricKGValue * 8);

  const dataset_1 = [
    "PRE",
    "NBRN",
    "1 mos",
    "2 mos",
    "3 mos",
    "4 mos",
    "5 mos",
    "6 mos",
    "7 mos",
    "8 mos",
    "9 mos",
    "10 mos",
    "11 mos",
    "1 yrs",
    "2 yrs",
    "3 yrs",
    "4 yrs",
    "5 yrs",
    "6 yrs",
    "7 yrs",
    "8 yrs",
    "9 yrs",
    "10 yrs",
    "11 yrs",
    "12 yrs",
    "13 yrs",
    "14 yrs",
    "15 yrs",
    "16 yrs",
    "17 yrs",
  ];

  const additionalInfo =
    peds === 1 ? (
      <View
        style={[
          styles.vitals,
          {
            paddingBottom: perfectSize(10),
          },
        ]}
      >
        <View style={[styles.half, { alignItems: "center" }]}>
          <GraphIcon width={perfectSize(40)} height={perfectSize(40)} />
          <Text
            regular
            size={15}
            style={{ marginTop: perfectSize(10) }}
            color={colors.black}
          >
            HR: {hemodynamics.hr}
          </Text>
          <Text
            regular
            size={15}
            style={{ marginTop: perfectSize(8) }}
            color={colors.black}
          >
            SBP: {hemodynamics.sbp}
          </Text>

          <Text
            regular
            size={15}
            style={{ marginTop: perfectSize(5) }}
            color={colors.black}
          >
            MAP: {hemodynamics.map}
          </Text>
          <Text
            regular
            size={15}
            style={{ marginTop: perfectSize(5) }}
            color={colors.black}
          >
            RR: {hemodynamics.RR}
          </Text>
          <Text
            regular
            size={15}
            style={{ marginTop: perfectSize(5) }}
            color={colors.black}
          >
            TV: {PtidalVolume} mL
          </Text>
          {IBW() ? (
            <Text
              regular
              size={15}
              style={{ marginTop: perfectSize(5) }}
              color={colors.black}
            >
              IBW: {IBW()} kg
            </Text>
          ) : null}
        </View>
        <View
          style={[
            styles.half,
            { alignItems: "center", marginTop: perfectSize(10) },
          ]}
        >
          <AirIcon width={perfectSize(40)} height={perfectSize(40)} />
          <Text regular size={15} color={colors.black}>
            ETT: {airwayObj.ett}
          </Text>
          <Text regular size={15} color={colors.black}>
            ETT depth: {airwayObj.ettCM}
          </Text>

          <View style={{ paddingVertical: 5, alignItems: "center" }}>
            <Text
              regular
              size={15}
              style={{ marginTop: perfectSize(5) }}
              color={colors.black}
            >
              Blade: {airwayObj.blade}
            </Text>
            <Text
              regular
              size={15}
              style={{ marginTop: perfectSize(5) }}
              color={colors.black}
            >
              Mask: {airwayObj.mask}
            </Text>
            <Text
              regular
              size={15}
              style={{ marginTop: perfectSize(5) }}
              color={colors.black}
            >
              LMA size: {airwayObj.lma}
            </Text>
            <Text
              regular
              size={15}
              style={{ marginTop: perfectSize(5) }}
              color={colors.black}
            >
              Oral Airway: {airwayObj.oralAirway}
            </Text>
          </View>
        </View>
      </View>
    ) : (
      <View style={[styles.vitals, { paddingBottom: perfectSize(10) }]}>
        <View style={[styles.half, { alignItems: "center", width: "80%" }]}>
          <View style={{ flexDirection: "row", marginTop: perfectSize(10) }}>
            {IBW() ? (
              <Text regular size={15} color={colors.black}>
                IBW: {IBW()} kg |{" "}
              </Text>
            ) : null}
            <Text regular size={15} color={colors.black}>
              LBW: {LBW} kg |{" "}
            </Text>
            <Text regular size={15} color={colors.black}>
              AjBW: {AjBW} kg
            </Text>
          </View>

          <Text
            regular
            size={15}
            style={{ marginTop: perfectSize(10) }}
            color={colors.black}
          >
            BMI: {BMI}
          </Text>
          <Text
            regular
            size={15}
            style={{ marginTop: perfectSize(10) }}
            color={colors.black}
          >
            Habitus: {habitus}
          </Text>
          <View
            style={{ flexDirection: "row", marginTop: perfectSize(10) }}
            color={colors.black}
          >
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

  const _handleKeyboardKGAndLBS = (text) => {
    if (isSelect_LBS_And_KG === "KG") {
      const parsedQty = Number.parseInt(text);
      setWeight(isNaN(parsedQty) ? 0 : parsedQty);
    }
  };

  const _handleKeyboardLBS = (text) => {
    const parsedLbsValue = Number.parseInt(text);
    setLbsValue(isNaN(parsedLbsValue) ? 0 : parsedLbsValue);
    setWeight(isNaN(parsedLbsValue) ? 0 : Math.round(parsedLbsValue / 2.2));
  };

  const _handleKeyboardCM = (text) => {
    const parsedCMValue = Number.parseInt(text);
    setCmValue(isNaN(parsedCMValue) ? 0 : parsedCMValue);
    setHeight(isNaN(parsedCMValue) ? 0 : Math.round(parsedCMValue / 2.54));
  };

  const _handleKeyboardInch = (text) => {
    const parsedCMValue = Number.parseInt(text);
    setHeight(isNaN(parsedCMValue) ? 0 : Math.round(parsedCMValue));
    setCmValue(isNaN(parsedCMValue) ? 0 : Math.round(parsedCMValue * 2.54));
  };

  const _handleKeyboardKGPediatric = (text) => {
    const valueKGPediatric = Number.parseInt(text);
    setPediatricKGValue(isNaN(valueKGPediatric) ? 0 : valueKGPediatric);
    setPediatricLBSValue(
      isNaN(valueKGPediatric) ? 0 : Math.round(valueKGPediatric * 2.2)
    );
  };

  const _handleKeyboardLBSPediatric = (text) => {
    const parsedLbsValue = Number.parseInt(text);
    setPediatricLBSValue(
      isNaN(parsedLbsValue) ? 0 : Math.round(parsedLbsValue)
    );
    setPediatricKGValue(
      isNaN(parsedLbsValue) ? 0 : Math.round(parsedLbsValue / 2.2)
    );
  };

  const firebaseEvent = (name) => {
    firebase_Analytics_Events({
      eventName: "onclick_calculation",
      params: {
        type: peds === 0 ? "Adult" : "Pediatric",
        name: name,
      },
    });
  };

  return (
    <Block
      flex={1}
      color={colors.drugThemeColor}
      style={{ position: "relatives" }}
    >
      <Block
        flex={false}
        width={deviceWidth}
        style={styles.headerView}
        padding={[insets.top > 40 ? insets.top : insets.top, 0, 0, 0]}
      >
        <SegmentedControl
          values={["Adult", "Pediatric"]}
          selectedIndex={peds}
          onChange={(event) => {
            setIsOpenCMKeyboard(false);
            setIsOpenKGKeyboard(false);
            setIsOpenKGKeyboardPediatric(false);
            setPeds(event.nativeEvent.selectedSegmentIndex);
          }}
          style={styles.tabViewStyle}
          fontStyle={styles.fontStyle}
          activeFontStyle={styles.activeFontStyle}
          tintColor={colors.white}
          backgroundColor={colors.drugThemeColor}
        />
      </Block>
      <Block
        flex={1}
        color={colors.white}
        style={{
          position: "absolute",
          top: "25%",
          left: 0,
          right: 0,
          bottom: 0,
          borderTopRightRadius: perfectSize(40),
          borderTopLeftRadius: perfectSize(40),
        }}
      >
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            _keyboardDidHide();
          }}
          activeOpacity={1}
        >
          <View
            style={{
              alignSelf: "center",
              width: "80%",
              marginTop: "-13%",
              marginBottom: perfectSize(10),
            }}
          >
            <View
              style={{
                borderRadius: perfectSize(20),
                backgroundColor: "#FFFFFF",
                padding: perfectSize(5),
                shadowColor: "#28C2C2",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,
              }}
            >
              {peds === 0 ? (
                <>
                  <Block flex={false} row center>
                    <Block flex={false} center width={"30%"}>
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => genderSelectionFunction()}
                        style={styles.genderView}
                      >
                        {gender === "male" ? (
                          <MaleIcon
                            width={perfectSize(75)}
                            height={perfectSize(75)}
                          />
                        ) : (
                          <FemaleIcon
                            width={perfectSize(75)}
                            height={perfectSize(75)}
                          />
                        )}
                        <Text
                          header
                          color={colors.drugThemeColor}
                          center
                          regular
                          style={{ textTransform: "capitalize" }}
                          weight={"600"}
                        >
                          {gender}
                        </Text>
                      </TouchableOpacity>
                    </Block>
                    <Block flex={false} width={"70%"} row>
                      <Block flex={false} margin={perfectSize(10)}>
                        <Text
                          style={{
                            fontWeight: "600",
                            fontSize: responsiveScale(15),
                          }}
                        >
                          Height
                        </Text>
                        <View
                          style={{
                            marginVertical: perfectSize(5),
                          }}
                        >
                          <SegmentedControl
                            values={["INCH", "CM"]}
                            selectedIndex={selectedInch}
                            onChange={(event) => {
                              if (event.nativeEvent.selectedSegmentIndex == 0) {
                                setIsSelect_INCH_And_CM("INCH");
                              } else {
                                setIsSelect_INCH_And_CM("CM");
                              }
                              setSelectedInch(
                                event.nativeEvent.selectedSegmentIndex
                              );
                            }}
                            style={[styles.lbsTabSegmentViewStyle]}
                            fontStyle={styles.lbsfontStyle}
                            activeFontStyle={styles.lbsActiveFontStyle}
                            tintColor={colors.drugThemeColor}
                            backgroundColor={colors.white}
                          />
                        </View>
                        <Block
                          flex={false}
                          center
                          radius={8}
                          style={{
                            backgroundColor: "#F7F7F7",
                            paddingVertical: perfectSize(5),
                            marginVertical: perfectSize(5),
                          }}
                        >
                          {isSelect_INCH_And_CM === "CM" ? (
                            <>
                              <Block
                                flex={false}
                                row
                                style={{
                                  // alignItems: "baseline",
                                  alignItems: "flex-end",
                                }}
                              >
                                <TextInput
                                  style={[styles.textInputStyle]}
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
                                  onChangeText={(text) =>
                                    _handleKeyboardCM(text)
                                  }
                                  onFocus={() => focusTextInputCM()}
                                />
                                <Block
                                  flex={false}
                                  row
                                  style={{
                                    marginBottom: perfectSize(3),
                                    alignItems: "baseline",
                                  }}
                                >
                                  <Text
                                    small
                                    regular
                                    color={colors.txtColorNew}
                                  >
                                    cm{" "}
                                    <Text bold color={colors.black}>
                                      /
                                    </Text>
                                  </Text>
                                  <Text
                                    small
                                    color={colors.txtColorNew}
                                    regular
                                  >
                                    {"(" + height + " in" + ")"}
                                  </Text>
                                </Block>
                              </Block>
                            </>
                          ) : (
                            <>
                              <Block
                                flex={false}
                                row
                                style={{
                                  // alignItems: "baseline",
                                  alignItems: "flex-end",
                                }}
                              >
                                <TextInput
                                  style={[styles.textInputStyle]}
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
                                  onChangeText={(text) =>
                                    _handleKeyboardInch(text)
                                  }
                                  onFocus={() => focusTextInputCM()}
                                />
                                <Block
                                  flex={false}
                                  row
                                  style={{
                                    marginBottom: perfectSize(3),
                                    alignItems: "baseline",
                                  }}
                                >
                                  <Text
                                    small
                                    regular
                                    color={colors.txtColorNew}
                                  >
                                    in{" "}
                                    <Text bold color={colors.black}>
                                      /
                                    </Text>
                                  </Text>
                                  <Text
                                    small
                                    color={colors.txtColorNew}
                                    regular
                                  >
                                    {"( " + cmValue + " cm" + " )"}
                                  </Text>
                                </Block>
                              </Block>
                            </>
                          )}
                        </Block>
                      </Block>
                      <Block flex={false} margin={perfectSize(10)}>
                        <Text
                          style={{
                            fontWeight: "600",
                            fontSize: responsiveScale(15),
                          }}
                        >
                          Weight
                        </Text>
                        <View
                          style={{
                            marginVertical: perfectSize(5),
                          }}
                        >
                          <SegmentedControl
                            values={["KG", "LBS"]}
                            selectedIndex={selectedLbs}
                            onChange={(event) => {
                              if (event.nativeEvent.selectedSegmentIndex == 0) {
                                setIsSelect_LBS_And_KG("KG");
                              } else {
                                setIsSelect_LBS_And_KG("LBS");
                              }
                              setLbsValue(weightLBS);
                              setSelectedLbs(
                                event.nativeEvent.selectedSegmentIndex
                              );
                            }}
                            style={[styles.lbsTabSegmentViewStyle, {}]}
                            fontStyle={styles.lbsfontStyle}
                            activeFontStyle={styles.lbsActiveFontStyle}
                            tintColor={colors.drugThemeColor}
                            backgroundColor={colors.white}
                          />
                        </View>
                        <Block
                          flex={false}
                          center
                          radius={8}
                          style={{
                            backgroundColor: "#F7F7F7",
                            paddingVertical: perfectSize(5),
                            marginVertical: perfectSize(5),
                          }}
                        >
                          {isSelect_LBS_And_KG === "KG" ? (
                            <>
                              <Block
                                flex={false}
                                row
                                style={{
                                  // alignItems: "baseline",
                                  alignItems: "flex-end",
                                }}
                              >
                                <TextInput
                                  style={[styles.textInputStyle]}
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
                                    isSelect_LBS_And_KG === "KG"
                                      ? weightTranslated >= 10
                                        ? Math.round(
                                            weightTranslated
                                          ).toString()
                                        : weightTranslated.toString()
                                      : weightTranslated < 1
                                      ? ""
                                      : "" + weightLBS + ""
                                  }
                                  ref={textInputKG}
                                  onChangeText={(text) =>
                                    _handleKeyboardKGAndLBS(text)
                                  }
                                  onFocus={() => focusTextInputKG()}
                                />
                                <Block
                                  flex={false}
                                  row
                                  style={{
                                    marginBottom: perfectSize(3),
                                    alignItems: "baseline",
                                  }}
                                >
                                  <Text
                                    small
                                    color={colors.txtColorNew}
                                    regular
                                  >
                                    Kg{" "}
                                    <Text bold color={colors.black}>
                                      /
                                    </Text>
                                  </Text>
                                  <Text
                                    small
                                    color={colors.txtColorNew}
                                    regular
                                  >
                                    {weightTranslated < 1
                                      ? ""
                                      : "( " + weightLBS + " lb)"}
                                  </Text>
                                </Block>
                              </Block>
                            </>
                          ) : (
                            <>
                              <Block
                                flex={false}
                                row
                                style={{
                                  // alignItems: "baseline",
                                  alignItems: "flex-end",
                                }}
                              >
                                <TextInput
                                  style={[styles.textInputStyle]}
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
                                  onChangeText={(text) =>
                                    _handleKeyboardLBS(text)
                                  }
                                  onFocus={() => focusTextInputKG()}
                                />
                                <Block
                                  flex={false}
                                  row
                                  style={{
                                    marginBottom: perfectSize(3),
                                    alignItems: "baseline",
                                  }}
                                >
                                  <Text
                                    small
                                    color={colors.txtColorNew}
                                    regular
                                  >
                                    lbs{" "}
                                    <Text bold color={colors.black}>
                                      /
                                    </Text>
                                  </Text>
                                  <Text
                                    small
                                    color={colors.txtColorNew}
                                    regular
                                  >
                                    {weightTranslated >= 10
                                      ? "( " +
                                        Math.round(
                                          weightTranslated
                                        ).toString() +
                                        " kg)"
                                      : "( " +
                                        weightTranslated.toString() +
                                        " kg)"}
                                  </Text>
                                </Block>
                              </Block>
                            </>
                          )}
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </>
              ) : (
                <>
                  <Block flex={false} width={"100%"} row evenly>
                    <Block flex={false} margin={perfectSize(10)}>
                      <Text
                        style={{
                          fontWeight: "600",
                          fontSize: responsiveScale(15),
                        }}
                      >
                        Age
                      </Text>
                      <View
                        style={{
                          marginVertical: perfectSize(5),
                        }}
                      >
                        <Block
                          flex={false}
                          radius={8}
                          color={colors.drugThemeColor}
                          style={{
                            paddingVertical: perfectSize(7),
                            paddingHorizontal: perfectSize(5),
                          }}
                        >
                          <Text color={colors.white}>selecte an age </Text>
                        </Block>
                      </View>
                      <Block
                        flex={false}
                        center
                        width={85}
                        radius={8}
                        style={{
                          backgroundColor: "#F7F7F7",
                          paddingVertical: perfectSize(5),
                          marginVertical: perfectSize(5),
                        }}
                      >
                        <TouchableOpacity onPress={() => focusPickerRef()}>
                          <View
                            style={[
                              {
                                flexDirection: "row",
                                alignItems: "baseline",
                                // alignItems: "flex-end",
                              },
                            ]}
                          >
                            <Text style={[styles.sliderValue]}>
                              {selectedYearAndMonValue?.main}
                            </Text>
                            <Text small color={colors.txtColorNew} regular>
                              {" "}
                              {selectedYearAndMonValue?.units}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </Block>
                    </Block>
                    <Block flex={false} margin={perfectSize(10)}>
                      <Text
                        style={{
                          fontWeight: "600",
                          fontSize: responsiveScale(15),
                        }}
                      >
                        Weight
                      </Text>
                      <View
                        style={{
                          marginVertical: perfectSize(5),
                        }}
                      >
                        <SegmentedControl
                          values={["LBS", "KG"]}
                          selectedIndex={selectedLBSpediatric}
                          onChange={(event) => {
                            if (event.nativeEvent.selectedSegmentIndex == 0) {
                              setIsSelect_LBS_And_KG_Pediatric("LBS");
                            } else {
                              setIsSelect_LBS_And_KG_Pediatric("KG");
                            }
                            setSelectedLBSpediatric(
                              event.nativeEvent.selectedSegmentIndex
                            );
                          }}
                          style={[styles.lbsTabSegmentViewStyle, {}]}
                          fontStyle={styles.lbsfontStyle}
                          activeFontStyle={styles.lbsActiveFontStyle}
                          tintColor={colors.drugThemeColor}
                          backgroundColor={colors.white}
                        />
                      </View>
                      <Block
                        flex={false}
                        center
                        radius={8}
                        style={{
                          backgroundColor: "#F7F7F7",
                          paddingVertical: perfectSize(5),
                          marginVertical: perfectSize(5),
                        }}
                      >
                        <Block
                          flex={false}
                          row
                          style={{
                            // alignItems: "baseline",
                            alignItems: "flex-end",
                          }}
                        >
                          {isSelect_LBS_And_KG_Pediatric === "KG" ? (
                            <TextInput
                              adjustsFontSizeToFit
                              keyboardAppearance="dark"
                              inputAccessoryViewID={inputAccessoryViewID}
                              numberOfLines={1}
                              style={[styles.sliderValue]}
                              keyboardType="number-pad"
                              onSubmitEditing={() => {
                                Keyboard.dismiss();
                                _keyboardDidHide();
                              }}
                              value={pediatricKGValue.toString()}
                              onChangeText={(text) =>
                                _handleKeyboardKGPediatric(text)
                              }
                              maxLength={3}
                              ref={textInputKGPediatric}
                              selectTextOnFocus={true}
                              onFocus={() => focusTextInputKGPediatric()}
                            />
                          ) : (
                            <TextInput
                              adjustsFontSizeToFit
                              keyboardAppearance="dark"
                              inputAccessoryViewID={inputAccessoryViewID}
                              numberOfLines={1}
                              style={[styles.sliderValue]}
                              keyboardType="number-pad"
                              onSubmitEditing={() => {
                                Keyboard.dismiss();
                                _keyboardDidHide();
                              }}
                              value={Math.round(pediatricLBSValue).toString()}
                              onChangeText={(text) =>
                                _handleKeyboardLBSPediatric(text)
                              }
                              maxLength={3}
                              ref={textInputKGPediatric}
                              selectTextOnFocus={true}
                              onFocus={() => focusTextInputKGPediatric()}
                            />
                          )}
                          <Block
                            flex={false}
                            row
                            style={{
                              marginBottom: perfectSize(3),
                              alignItems: "baseline",
                            }}
                          >
                            <Text small color={colors.txtColorNew} regular>
                              {isSelect_LBS_And_KG_Pediatric === "KG"
                                ? "kg"
                                : "lbs"}{" "}
                              <Text bold color={colors.black}>
                                /
                              </Text>
                            </Text>
                            <Text small color={colors.txtColorNew} regular>
                              {isSelect_LBS_And_KG_Pediatric !== "KG"
                                ? "( " + pediatricKGValue.toString() + " kg)"
                                : "( " + pediatricLBSValue.toString() + " lb)"}
                            </Text>
                          </Block>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </>
              )}
            </View>
          </View>
          <ScrollView>
            {peds === 0 ? (
              <>
                <Block flex={false} center margin={perfectSize(15)}>
                  <Text allowFontScaling={false}>
                    {IBW() ? (
                      <Text regular header color={colors.drugTextColorNew}>
                        IBW: {IBW()} kg |{" "}
                      </Text>
                    ) : null}
                    <Text regular header color={colors.drugTextColorNew}>
                      LBW: {LBW} kg |{" "}
                    </Text>
                    <Text regular header color={colors.drugTextColorNew}>
                      AjBW: {AjBW} kg
                    </Text>
                  </Text>

                  <Text
                    header
                    regular
                    style={{ marginTop: perfectSize(5) }}
                    color={colors.drugTextColorNew}
                  >
                    BMI: {BMI}
                  </Text>
                  <Text
                    regular
                    header
                    style={{
                      marginTop: perfectSize(5),
                      textTransform: "capitalize",
                    }}
                    color={colors.drugTextColorNew}
                  >
                    Habitus: {habitus}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: perfectSize(5),
                    }}
                  >
                    <Text regular header color={colors.drugTextColorNew}>
                      Tridal Volume: {tidalVolume} ml
                    </Text>
                  </View>
                </Block>
              </>
            ) : (
              <>
                <Block flex={false} margin={perfectSize(15)}>
                  <View style={[styles.vitals]}>
                    <View style={[styles.half, {}]}>
                      <View
                        style={{
                          alignSelf: "center",
                        }}
                      >
                        <Text regular body color={colors.txtColorNew}>
                          HR: {hemodynamics.hr}
                        </Text>
                        <Text
                          regular
                          body
                          style={{ marginTop: perfectSize(0) }}
                          color={colors.txtColorNew}
                        >
                          SBP: {hemodynamics.sbp}
                        </Text>

                        <Text
                          regular
                          body
                          style={{ marginTop: perfectSize(0) }}
                          color={colors.txtColorNew}
                        >
                          MAP: {hemodynamics.map}
                        </Text>
                        <Text
                          regular
                          body
                          style={{ marginTop: perfectSize(0) }}
                          color={colors.txtColorNew}
                        >
                          RR: {hemodynamics.RR}
                        </Text>
                        <Text
                          regular
                          body
                          style={{ marginTop: perfectSize(0) }}
                          color={colors.txtColorNew}
                        >
                          TV: {PtidalVolume} mL
                        </Text>
                        {IBW() ? (
                          <Text
                            regular
                            body
                            style={{ marginTop: perfectSize(0) }}
                            color={colors.txtColorNew}
                          >
                            IBW: {IBW()} kg
                          </Text>
                        ) : null}
                      </View>
                    </View>
                    <View style={[styles.half, {}]}>
                      <View
                        style={{
                          alignSelf: "center",
                        }}
                      >
                        <Text regular body color={colors.txtColorNew}>
                          ETT: {airwayObj.ett}
                        </Text>
                        <Text
                          regular
                          body
                          style={{ marginTop: perfectSize(0) }}
                          color={colors.txtColorNew}
                        >
                          ETT depth: {airwayObj.ettCM}
                        </Text>

                        <Text
                          regular
                          body
                          style={{ marginTop: perfectSize(0) }}
                          color={colors.txtColorNew}
                        >
                          Blade: {airwayObj.blade}
                        </Text>
                        <Text
                          regular
                          body
                          style={{ marginTop: perfectSize(0) }}
                          color={colors.txtColorNew}
                        >
                          Mask: {airwayObj.mask}
                        </Text>
                        <Text
                          regular
                          body
                          style={{ marginTop: perfectSize(0) }}
                          color={colors.txtColorNew}
                        >
                          LMA size: {airwayObj.lma}
                        </Text>
                        <Text
                          regular
                          body
                          style={{ marginTop: perfectSize(0) }}
                          color={colors.txtColorNew}
                        >
                          Oral Airway: {airwayObj.oralAirway}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Block>
              </>
            )}
            <Block flex={false} row wrap>
              {peds === 0 && (
                <Button
                  title={" Insulin"}
                  extraButtonStyle={styles.extraButtonStyle}
                  extraButtonTextStyle={styles.extraButtonTextStyle}
                  onPress={() => {
                    showADs(navigation, "Insulin");
                    firebaseEvent("Insulin");
                  }}
                  isShowIcon={
                    <InsulinNewIcon
                      width={perfectSize(40)}
                      height={perfectSize(40)}
                    />
                  }
                />
              )}

              <Button
                title={" Fluids"}
                extraButtonStyle={[styles.extraButtonStyle]}
                extraButtonTextStyle={styles.extraButtonTextStyle}
                isShowIcon={
                  <FluidsNewIcon
                    width={perfectSize(40)}
                    height={perfectSize(40)}
                  />
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
                  firebaseEvent("FLUIDS");
                }}
              />
              <Button
                title={" Drugs"}
                extraButtonStyle={[styles.extraButtonStyle]}
                extraButtonTextStyle={styles.extraButtonTextStyle}
                isShowIcon={
                  <DrugsNewIcon
                    height={perfectSize(40)}
                    width={perfectSize(40)}
                  />
                }
                onPress={() => {
                  showADs(navigation, "CalculationDrugs", {
                    weight:
                      peds === 1
                        ? Math.round(pediatricKGValue)
                        : Math.round(weightTranslated),
                    context: context,
                    ibw: IBW(),
                  });
                  firebaseEvent("DRUGS");
                }}
              />
              <Button
                title={" Blood"}
                extraButtonStyle={[styles.extraButtonStyle]}
                extraButtonTextStyle={styles.extraButtonTextStyle}
                isShowIcon={
                  <BloodNewIcon
                    height={perfectSize(40)}
                    width={perfectSize(40)}
                  />
                }
                onPress={() => {
                  showADs(navigation, "CalculationBlood", {
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
                  firebaseEvent("BLOOD");
                }}
              />
              <Button
                title={" Local"}
                extraButtonStyle={[styles.extraButtonStyle]}
                extraButtonTextStyle={styles.extraButtonTextStyle}
                isShowIcon={
                  <LocalNewIcon
                    height={perfectSize(40)}
                    width={perfectSize(40)}
                  />
                }
                onPress={() => {
                  showADs(navigation, "CalculationLocalDecision", {
                    ibw: IBW(),
                  });
                  firebaseEvent("LOCAL");
                }}
              />

              <Button
                title={" Burns"}
                extraButtonStyle={[styles.extraButtonStyle]}
                extraButtonTextStyle={styles.extraButtonTextStyle}
                isShowIcon={
                  <BurnsNewIcon
                    height={perfectSize(40)}
                    width={perfectSize(40)}
                  />
                }
                onPress={() => {
                  showADs(navigation, "BurnsScreen", {
                    peds: peds,
                    age: Math.floor(selectedYearAndMonValue?.age / 12),
                    weight: peds ? pediatricKGValue : weightTranslated,
                    bmi: BMI,
                  });
                  firebaseEvent("Burns");
                }}
              />
            </Block>
          </ScrollView>
        </TouchableOpacity>
        {/* <Block
              flex={false}
              color={"gold"}
              padding={[0, 0, insets.bottom - perfectSize(20), 0]}
            >
              <HeaGAMBannerAdder />
            </Block> */}
        {/* <Block flex={false} color={"red"} height={tabBar_Height} /> */}
      </Block>

      {Platform.OS === "ios" && (
        <InputAccessoryView nativeID={inputAccessoryViewID}>
          {isOpenCMKeyboard && (
            <Block
              flex={false}
              style={{
                width: "100%",
                height: perfectSize(50),
                backgroundColor: colors.dropBackColor,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SegmentedControl
                values={["INCH", "CM"]}
                selectedIndex={selectedInch}
                onChange={(event) => {
                  if (event.nativeEvent.selectedSegmentIndex == 0) {
                    setIsSelect_INCH_And_CM("INCH");
                  } else {
                    setIsSelect_INCH_And_CM("CM");
                  }
                  setSelectedInch(event.nativeEvent.selectedSegmentIndex);
                }}
                style={[styles.lbsTabViewStyle, {}]}
                fontStyle={styles.lbsfontStyle}
                activeFontStyle={styles.lbsActiveFontStyle}
                tintColor={colors.drugThemeColor}
                backgroundColor={colors.white}
              />
            </Block>
          )}
          {isOpenKGKeyboard && (
            <Block
              flex={false}
              style={{
                width: "100%",
                height: perfectSize(50),
                backgroundColor: colors.dropBackColor,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SegmentedControl
                values={["KG", "LBS"]}
                selectedIndex={selectedLbs}
                onChange={(event) => {
                  if (event.nativeEvent.selectedSegmentIndex == 0) {
                    setIsSelect_LBS_And_KG("KG");
                  } else {
                    setIsSelect_LBS_And_KG("LBS");
                  }
                  setLbsValue(weightLBS);
                  setSelectedLbs(event.nativeEvent.selectedSegmentIndex);
                }}
                style={[styles.lbsTabViewStyle, {}]}
                fontStyle={styles.lbsfontStyle}
                activeFontStyle={styles.lbsActiveFontStyle}
                tintColor={colors.drugThemeColor}
                backgroundColor={colors.white}
              />
            </Block>
          )}

          {isOpenKGKeyboardPediatric && (
            <Block
              flex={false}
              style={{
                width: "100%",
                height: perfectSize(50),
                backgroundColor: colors.dropBackColor,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SegmentedControl
                values={["LBS", "KG"]}
                selectedIndex={selectedLBSpediatric}
                onChange={(event) => {
                  if (event.nativeEvent.selectedSegmentIndex == 0) {
                    setIsSelect_LBS_And_KG_Pediatric("LBS");
                  } else {
                    setIsSelect_LBS_And_KG_Pediatric("KG");
                  }
                  setSelectedLBSpediatric(
                    event.nativeEvent.selectedSegmentIndex
                  );
                }}
                style={[styles.lbsTabViewStyle, {}]}
                fontStyle={styles.lbsfontStyle}
                activeFontStyle={styles.lbsActiveFontStyle}
                tintColor={colors.drugThemeColor}
                backgroundColor={colors.white}
              />
            </Block>
          )}
        </InputAccessoryView>
      )}

      {Platform.OS === "android" && (
        <>
          {isOpenCMKeyboard && (
            <Block
              flex={false}
              style={{
                width: "100%",
                height: perfectSize(50),
                backgroundColor: colors.dropBackColor,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SegmentedControl
                values={["INCH", "CM"]}
                selectedIndex={selectedInch}
                onChange={(event) => {
                  if (event.nativeEvent.selectedSegmentIndex == 0) {
                    setIsSelect_INCH_And_CM("INCH");
                  } else {
                    setIsSelect_INCH_And_CM("CM");
                  }
                  setSelectedInch(event.nativeEvent.selectedSegmentIndex);
                }}
                style={[styles.lbsTabViewStyle, {}]}
                fontStyle={styles.lbsfontStyle}
                activeFontStyle={styles.lbsActiveFontStyle}
                tintColor={colors.drugThemeColor}
                backgroundColor={colors.white}
              />
            </Block>
          )}
          {isOpenKGKeyboard && (
            <Block
              flex={false}
              style={{
                width: "100%",
                height: perfectSize(50),
                backgroundColor: colors.dropBackColor,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SegmentedControl
                values={["KG", "LBS"]}
                selectedIndex={selectedLbs}
                onChange={(event) => {
                  if (event.nativeEvent.selectedSegmentIndex == 0) {
                    setIsSelect_LBS_And_KG("KG");
                  } else {
                    setIsSelect_LBS_And_KG("LBS");
                  }
                  setLbsValue(weightLBS);
                  setSelectedLbs(event.nativeEvent.selectedSegmentIndex);
                }}
                style={[styles.lbsTabViewStyle, {}]}
                fontStyle={styles.lbsfontStyle}
                activeFontStyle={styles.lbsActiveFontStyle}
                tintColor={colors.drugThemeColor}
                backgroundColor={colors.white}
              />
            </Block>
          )}

          {isOpenKGKeyboardPediatric && (
            <Block
              flex={false}
              style={{
                width: "100%",
                height: perfectSize(50),
                backgroundColor: colors.dropBackColor,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SegmentedControl
                values={["LBS", "KG"]}
                selectedIndex={selectedLBSpediatric}
                onChange={(event) => {
                  if (event.nativeEvent.selectedSegmentIndex == 0) {
                    setIsSelect_LBS_And_KG_Pediatric("LBS");
                  } else {
                    setIsSelect_LBS_And_KG_Pediatric("KG");
                  }
                  setSelectedLBSpediatric(
                    event.nativeEvent.selectedSegmentIndex
                  );
                }}
                style={[styles.lbsTabViewStyle, {}]}
                fontStyle={styles.lbsfontStyle}
                activeFontStyle={styles.lbsActiveFontStyle}
                tintColor={colors.drugThemeColor}
                backgroundColor={colors.white}
              />
            </Block>
          )}
        </>
      )}

      <ReactNativePickerModule
        ref={pickerRef}
        value={pickerValue}
        title={"Select an age"}
        items={dataset_1}
        titleStyle={{ color: "#000000" }}
        itemStyle={{ color: "#000000" }}
        tintColor="#000000"
        selectedColor={colors.drugThemeColor}
        confirmButtonEnabledTextStyle={{ color: "black" }}
        confirmButtonDisabledTextStyle={{ color: "grey" }}
        cancelButtonTextStyle={{ color: "black" }}
        confirmButtonStyle={{
          backgroundColor: "white",
        }}
        cancelButtonStyle={{
          backgroundColor: "white",
        }}
        contentContainerStyle={{
          backgroundColor: "white",
        }}
        onCancel={() => {
          console.log("Cancelled");
        }}
        onValueChange={(value) => {
          console.log("value: ", value);
          setPickerValue(value);
          ageTranslatednew(value);
        }}
      />
      <Modal
        isVisible={isModalVisible}
        animationIn={"slideInUp"}
        animationOut={"slideOutDown"}
        transparent={true}
        onBackdropPress={() => {
          setIsModalVisible(false);
        }}
        backdropColor="rgba(0, 0, 0, 0.55)"
      >
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
          width={"75%"}
          selfcenter
        >
          <Block
            flex={false}
            center
            color={colors.drugThemeColor}
            style={[styles.imageViewStyle]}
          >
            <DeleteIcon width={perfectSize(55)} height={perfectSize(55)} />
          </Block>
          <Text
            size={15}
            center
            style={{
              marginVertical: perfectSize(10),
              fontFamily: font.outfit_Regular,
            }}
            color={colors.black}
          >
            {modalText}
          </Text>

          <TouchableOpacity
            style={styles.okBtnStyle}
            onPress={() => {
              setIsModalVisible(false);
            }}
          >
            <Text
              size={14}
              color={colors.white}
              style={{ fontFamily: font.outfit_Medium }}
            >
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
    width: "50%",
    borderRadius: perfectSize(10),
    paddingVertical: perfectSize(8),
  },
  tabViewStyle: {
    height: perfectSize(50),
    borderRadius: perfectSize(10),
    borderWidth: 2,
    borderColor: colors.white,
    margin: perfectSize(30),
  },
  fontStyle: {
    fontFamily: font.roboto_Medium,
    fontSize: sizes.h3,
    color: colors.white,
    fontWeight: "600",
  },
  activeFontStyle: {
    fontFamily: font.roboto_Medium,
    fontSize: sizes.h3,
    fontWeight: "600",
    color: colors.drugThemeColor,
  },
  textInputStyle: {
    // width: '45%',
    padding: perfectSize(0),
    fontSize: responsiveScale(20),
    textAlign: "right",
    writingDirection: "rtl",
    // marginRight: perfectSize(4),
    fontFamily: font.roboto_Regular,
    color: "#000000",
  },
  mainView: {
    flex: 1,
    // padding: perfectSize(15),
    // backgroundColor: colors.white,
  },
  genderView: {
    // alignSelf: 'center',
    // marginTop: perfectSize(5),
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  extraButtonStyle: {
    width: (deviceWidth - 3 * perfectSize(20)) / 2,
    borderRadius: perfectSize(10),
    borderWidth: 2,
    borderColor: colors.drugThemeColor,
    marginBottom: perfectSize(15),
    marginLeft: perfectSize(20),
    padding: perfectSize(3),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    flexDirection: "row",
  },

  extraButtonTextStyle: {
    fontSize: sizes.h3,
    fontFamily: font.outfit_Semi_Bold,
    // marginLeft : 20,
    fontWeight: "500",
    margin: perfectSize(10),
  },
  lbsTabViewStyle: {
    width: "85%",
    // width: perfectSize(80),
    borderWidth: 1,
    borderColor: colors.drugThemeColor,
    // borderRadius: perfectSize(20),
    // alignSelf: 'center',
    // marginTop: perfectSize(10),
  },
  lbsTabSegmentViewStyle: {
    width: perfectSize(80),
    borderWidth: 1,
    borderColor: colors.drugThemeColor,
  },
  lbsActiveFontStyle: {
    fontFamily: font.roboto_Regular,
    fontSize: sizes.small,
    fontWeight: "600",
    color: colors.white,
  },
  lbsfontStyle: {
    color: colors.black,
    fontFamily: font.roboto_Regular,
    fontSize: sizes.small,
    fontWeight: "600",
  },
  vitalsView: {
    flex: 3,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  vitals: {
    flexDirection: "row",
  },
  half: {
    flex: 1,
  },
  sliderTextContainer: {
    width: "100%",
    flexDirection: "row",
    padding: perfectSize(5),
    marginTop: perfectSize(10),
    // marginBottom: perfectSize(20),
  },
  sliderText: {
    // flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  sliderValue: {
    fontSize: responsiveScale(20),
    textAlign: "right",
    writingDirection: "rtl",
    // marginRight: perfectSize(4),
    fontFamily: font.outfit_Regular,
    padding: perfectSize(0),
    color: "#000000",
  },
  units: {
    // alignItems: 'flex-start',
    flex: 1,
  },
  kg: {
    fontSize: 25,
  },
  lb: {
    color: "#1e1e1e",
    fontSize: 12,
  },
  imageViewStyle: {
    borderRadius: perfectSize(100),
    width: perfectSize(45),
    height: perfectSize(45),
    alignSelf: "center",
    marginTop: perfectSize(-30),
    justifyContent: "center",
  },
  okBtnStyle: {
    backgroundColor: colors.drugThemeColor,
    borderRadius: perfectSize(10),
    marginHorizontal: perfectSize(10),
    alignItems: "center",
    paddingVertical: perfectSize(8),
    alignSelf: "center",
    width: "100%",
  },

  headerView: {
    // overflow: 'visible',
    // paddingBottom: perfectSize(10),
    // borderBottomLeftRadius: perfectSize(20),
    // borderBottomRightRadius: perfectSize(20),
    // height: '30%',
    flex: 1,
    // backgroundColor: 'red',
  },

  adultAndPediatricButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#C6DCFF",
    borderWidth: 2,
    borderRadius: 50,
    paddingVertical: 7,
    justifyContent: "center",
  },

  adultAndPediatricTextColor: {
    fontSize: responsiveScale(18),
    marginLeft: 10,
    fontFamily: font.outfit_Regular,
  },

  dropShadowView: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },

  linearGradientView: {
    // height: perfectSize(200),
    height: 230,
    borderRadius: 10,
    marginHorizontal: perfectSize(15),
    marginVertical: perfectSize(20),
    marginBottom: perfectSize(30),
  },

  vaccineIconStyle: {
    height: perfectSize(150),
    position: "absolute",
    right: 5,
    top: "20%",
    width: perfectSize(150),
  },
});
