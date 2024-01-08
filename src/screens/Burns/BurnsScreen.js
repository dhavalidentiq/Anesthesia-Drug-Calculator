import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Header from "../../components/Header";
import { colors, font, perfectSize } from "../../styles/theme";
import Text from "../../components/utilities/Text";
import Block from "../../components/utilities/Block";
import BurnsHeader from "../../components/BurnsHeader";
import { useEffect, useState } from "react";
import { responsiveScale } from "../../styles/mixins";
import {
  AdultBurns,
  ObeseAdultBurns,
  _getPediatricBurns,
} from "../../constants/mixins";
import BurnsAnteriorAndPosteriorSwitch from "../../components/BurnsAnteriorAndPosteriorSwitch";
import BurnsAnteriorAndPosterior from "../../components/BurnsAnteriorAndPosterior";
import RationalsIconNew from "../../assets/appImages/RationalsIconNew.svg";
import BurnsRationalModal from "../../components/BurnsRationalModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default BurnsScreen = ({ navigation, route }) => {
  const textColor = "#000000";
  const npoColor = colors.drugThemeColor;
  const sflColor = colors.drugRedColor;
  const backgroundColor = colors.white;
  const segmentTabBackgroundColor = colors.drugThemeColor;
  const { peds, age, weight, bmi } = route.params;
  const [isFrontSide, setIsFrontSide] = useState(true);
  const [isObesePatient, setIsObesePatient] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [hoursAgo, setHoursAgo] = useState(0);
  const [frontBodyParts, setFrontBodyParts] = useState([]);
  const [pediatricBodyParts, setPediatricBodyParts] = useState([]);
  const [pediatricBurns, setPediatricBurns] = useState({});
  const { top, bottom } = useSafeAreaInsets();

  const toggleSwitch = (context) => {
    if (context === "Anterior") {
      setIsFrontSide(true);
    } else {
      setIsFrontSide(false);
    }
  };

  const _selectFrontBodyParts = (bodyPart) => {
    // Check if the bodyPart is already selected in frontBodyParts
    if (frontBodyParts.some((item) => item?.bodypart === bodyPart)) {
      // If selected, find the item and remove it from the list
      const item = frontBodyParts.find((item) => item?.bodypart === bodyPart);
      const removeBodyPart = frontBodyParts.filter(
        (i) => i?.bodypart !== bodyPart
      );
      setFrontBodyParts([...removeBodyPart, item]);
    } else {
      // If not selected, add it to the list with a default burn percentage of 100
      const data = {
        bodypart: bodyPart,
        burnBodyPart: 100,
        initialValue: isObesePatient
          ? ObeseAdultBurns[bodyPart]
          : AdultBurns[bodyPart],
        totalBurn: isObesePatient
          ? ObeseAdultBurns[bodyPart]
          : AdultBurns[bodyPart],
      };
      setFrontBodyParts([...frontBodyParts, data]);
    }
  };

  const _adultOnValueChange = (val) => {
    const array = [...frontBodyParts];
    let totalBurn =
      (array[frontBodyParts?.length - 1]?.initialValue * val) / 100;
    array[frontBodyParts?.length - 1] = {
      ...frontBodyParts[frontBodyParts?.length - 1],
      burnBodyPart: val,
      totalBurn: parseFloat(totalBurn).toFixed(2),
    };
    setFrontBodyParts(array);
  };

  let totalSumBurns = frontBodyParts.reduce(function (prev, current) {
    return prev + parseFloat(current?.totalBurn);
  }, 0);

  const getDataOfBurnByAge = async (age) => {
    let temp = {
      head: 18,
      legs: 28,
    };
    if (age <= 2) {
      _getPediatricBurns(temp).then((res) => {
        setPediatricBurns(res);
      });
    } else if (age >= 3 && age <= 9) {
      temp = {
        head: (temp.head -= age - 2),
        legs: (temp.legs += age - 2),
      };
      _getPediatricBurns(temp).then((res) => {
        setPediatricBurns(res);
      });
    } else {
      _getPediatricBurns({ head: null, legs: null }).then((res) => {
        setPediatricBurns(res);
      });
    }
  };

  const _pediatricSelectBodyParts = (bodyPart) => {
    // Check if the bodyPart is already selected in pediatricBodyParts
    if (pediatricBodyParts.some((item) => item?.bodypart === bodyPart)) {
      // If selected, find the item and remove it from the list
      const item = pediatricBodyParts.find(
        (item) => item?.bodypart === bodyPart
      );
      const removeBodyPart = pediatricBodyParts.filter(
        (i) => i?.bodypart !== bodyPart
      );
      setPediatricBodyParts([...removeBodyPart, item]);
    } else {
      // If not selected, add it to the list with a default burn percentage of 100
      const data = {
        bodypart: bodyPart,
        burnBodyPart: 100,
        initialValue: pediatricBurns[bodyPart],
        totalBurn: pediatricBurns[bodyPart],
      };
      console.log("data =--->", data);
      setPediatricBodyParts([...pediatricBodyParts, data]);
    }
  };

  const _pediatricOnValueChange = (val) => {
    const array = [...pediatricBodyParts];
    let totalBurn =
      (array[pediatricBodyParts?.length - 1]?.initialValue * val) / 100;
    array[pediatricBodyParts?.length - 1] = {
      ...pediatricBodyParts[pediatricBodyParts?.length - 1],
      burnBodyPart: val,
      totalBurn: parseFloat(totalBurn).toFixed(2),
    };
    setPediatricBodyParts(array);
  };

  let _pediatricTotalSumBurns = pediatricBodyParts.reduce(function (
    prev,
    current
  ) {
    return prev + parseFloat(current?.totalBurn);
  },
  0);

  const calculateParklandFormula = (percentage, weight, isPediatric) => {
    const totalFluidAdult = 4 * percentage * weight;
    const totalFluidPediatric = 3 * percentage * weight;
    const fluidInFirst8HoursHalfvalue =
      (isPediatric ? totalFluidPediatric : totalFluidAdult) * 0.5;
    const fluidInFirst8Hours = fluidInFirst8HoursHalfvalue / (8 - hoursAgo);
    const fluidInLast16HoursHalfvalue =
      (isPediatric ? totalFluidPediatric : totalFluidAdult) * 0.5;
    const fluidInLast16Hours = fluidInLast16HoursHalfvalue / 16;

    return {
      totalFluidAdult,
      totalFluidPediatric,
      fluidInFirst8Hours,
      fluidInLast16Hours,
    };
  };

  let result = calculateParklandFormula(
    !peds
      ? parseFloat(totalSumBurns).toFixed(2)
      : parseFloat(_pediatricTotalSumBurns).toFixed(2),
    weight,
    peds
  );

  const _resetValue = () => {
    setHoursAgo(0);
    setFrontBodyParts([]);
    setPediatricBodyParts([]);
  };

  useEffect(() => {
    if (peds) {
      getDataOfBurnByAge(age);
    }
  }, [age]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => _resetValue()}>
          <Text
            style={{
              fontSize: responsiveScale(14),
              fontFamily: "OpenSans",
              marginRight: 20,
              color: "white",
            }}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            Reset
          </Text>
        </TouchableOpacity>
      ),
    });
    if (!peds && bmi >= 30) {
      setIsObesePatient(true);
    } else {
      setIsObesePatient(false);
    }
  }, []);

  return (
    <Block
      flex={1}
      color={colors.drugThemeColor}
      style={{ position: "relative" }}
    >
      <Header
        headerTitle={"Burns"}
        isBackIcon={true}
        _onPressBack={() => {
          navigation.goBack();
        }}
        isResetIcon={true}
        onPressReset={() => {
          _resetValue();
        }}
      />
      <Block
        flex={1}
        // center
        color={colors.white}
        style={{
          position: "absolute",
          top: "20%",
          left: 0,
          right: 0,
          bottom: 0,
          borderTopRightRadius: perfectSize(40),
          borderTopLeftRadius: perfectSize(40),
        }}
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
              alignItems: "center",
              flexDirection: "row",
              borderRadius: perfectSize(20),
              backgroundColor: "#FFFFFF",
              padding: perfectSize(10),
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
            <BurnsHeader
              textColor={textColor}
              npoColor={npoColor}
              sflColor={sflColor}
              peds={peds}
              result={result}
              totalSumBurns={totalSumBurns}
              _pediatricTotalSumBurns={_pediatricTotalSumBurns}
            />
          </View>
        </View>
        <ScrollView
          contentContainerStyle={[
            styles.scrollMainView,
            {
              // backgroundColor,
            },
          ]}
        >
          <View style={styles.disclaimerMainView}>
            {(!peds ? totalSumBurns : _pediatricTotalSumBurns) <= 20 && (
              <Text
                style={[styles.disclaimerTextView]}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                *The Parkland Formula is for greater than or equal to 20% of
                total body area burns
              </Text>
            )}
          </View>
          <BurnsAnteriorAndPosteriorSwitch
            textColor={textColor}
            segmentTabBackgroundColor={segmentTabBackgroundColor}
            backgroundColor={backgroundColor}
            isFrontSide={isFrontSide}
            toggleSwitch={(val) => toggleSwitch(val)}
          />

          {/* Burns Images */}
          <BurnsAnteriorAndPosterior
            textColor={textColor}
            peds={peds}
            frontBodyParts={frontBodyParts}
            pediatricBodyParts={pediatricBodyParts}
            hoursAgo={hoursAgo}
            result={result}
            isFrontSide={isFrontSide}
            isObesePatient={isObesePatient}
            hoursvalue={(val) => setHoursAgo(val)}
            _adultOnValueChange={(val) => _adultOnValueChange(val)}
            _pediatricOnValueChange={(val) => _pediatricOnValueChange(val)}
            _selectFrontBodyParts={(val) => _selectFrontBodyParts(val)}
            _pediatricSelectBodyParts={(val) => _pediatricSelectBodyParts(val)}
          />

          <View
            style={{
              alignItems: "center",
              // paddingBottom: perfectSize(90),
            }}
          >
            <TouchableOpacity
              onPress={() => setModalOpen(true)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: perfectSize(20),
                borderWidth: 0.5,
                padding: perfectSize(5),
                paddingHorizontal: perfectSize(20),
              }}
            >
              <RationalsIconNew
                width={perfectSize(24)}
                height={perfectSize(24)}
              />
              <Text
                style={{
                  fontFamily: font.outfit_Regular,
                  color: "#101010",
                  fontSize: responsiveScale(16),
                }}
              >
                {" "}
                Rationals
              </Text>
            </TouchableOpacity>
          </View>
          {/* Rational Modal */}
          <BurnsRationalModal
            modalOpen={modalOpen}
            textColor={textColor}
            peds={peds}
            isObesePatient={isObesePatient}
            // backgroundColor={backgroundColor}
            top={top}
            bottom={bottom}
            setModalOpen={() => setModalOpen(false)}
          />
        </ScrollView>
      </Block>
    </Block>
  );
};
const styles = StyleSheet.create({
  scrollMainView: {
    paddingBottom: perfectSize(100),
    paddingTop: perfectSize(10),
  },
  disclaimerMainView: {
    // width: "100%",
    // height: perfectSize(20),
    padding: perfectSize(5),
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
  },
  disclaimerTextView: {
    fontSize: responsiveScale(11),
    fontFamily: font.outfit_Light,
    alignItems: "center",
    color: "#101010",
  },
});
