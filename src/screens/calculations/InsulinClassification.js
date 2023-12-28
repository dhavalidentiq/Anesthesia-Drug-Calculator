import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import Text from "../../components/utilities/Text";
import Header from "../../components/Header";
import Block from "../../components/utilities/Block";
import CloseIcon from "../../assets/appImages/CloseIcon.svg";
import AlertIcon from "../../assets/appImages/AlertIcon.svg";
import { colors, font, perfectSize } from "../../styles/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaGAMBannerAdder from "../../components/GAMBannerAd";
import { showADs } from "../../components/IntertitialAd";
import { responsiveScale } from "../../styles/mixins";
import AlertNewIcon from "../../assets/appImages/AlertNewIcon.svg";
import CloseIconNew from "../../assets/appImages/CloseIconNew.svg";

export default InsulinClassification = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState({
    age: false,
    gfr: false,
    diagnosis: false,
    bmi: false,
    tdd: false,
    prednisone: false,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const insets = useSafeAreaInsets();

  const toggleSwitch = (k) =>
    setIsEnabled({
      ...isEnabled,
      [k]: !isEnabled[k],
    });

  const diabeticClass = () => {
    const { age, gfr, diagnosis, bmi, tdd, prednisone } = isEnabled;
    if (age || gfr || diagnosis) {
      return { class: "sensitive", color: "#6444E6" };
    } else if (bmi || tdd || prednisone) {
      return { class: "resistant", color: "#E24E4E" };
    } else {
      return { class: "standard", color: "#1CB534" };
    }
  };

  const {
    container,
    userSummary,
    headerTitle,
    next,
    modalToggle,
    modalContent,
    disclaimer,
    reference,
    userImage,
    userDetails,
    userName,
    subText,
    userStats,
    stat,
    statNum,
    statText,
    switches,
    switchIconAndCategory,
    switchIcon,
    switchRow,
    switchView,
    switchCategoryText,
    switchItself,
    chooseColorRow,
    chooseColor,
  } = styles;

  return (
    <Block flex={1} color={"white"}>
      <Header
        headerTitle={"Insulin Sensitivity"}
        isBackIcon={true}
        _onPressBack={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View style={container}>
          <View style={userSummary}>
            <View>
              <Text
                bold
                style={headerTitle}
                adjustsFontSizeToFit
                numberOfLines={1}
                color={colors.blackNew}
              >
                Insulin Sensitivity
              </Text>
              <Text regular color={colors.drugTextColorNew}>
                Select all that apply to your patient
              </Text>
              <View
                style={{
                  backgroundColor: diabeticClass().color,
                  marginTop: perfectSize(20),
                  // margin: perfectSize(10),
                  padding: perfectSize(10),
                  borderRadius: perfectSize(10),
                  width: "70%",
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: responsiveScale(22),
                    fontWeight: "700",
                    color: colors.white,
                    // color: diabeticClass().color,
                    textAlign: "center",
                    textTransform: "capitalize",
                  }}
                  adjustsFontSizeToFit
                  numberOfLines={1}
                >
                  {diabeticClass().class}
                </Text>
              </View>
            </View>
          </View>
          <View style={switches}>
            <View style={switchRow}>
              <View style={switchIconAndCategory}>
                <Text
                  regular
                  style={switchCategoryText}
                  color={colors.normalTextColor}
                >
                  Age {">"} 70 years
                </Text>
              </View>
              <View style={switchView}>
                <Switch
                  thumbColor={"white"}
                  style={switchItself}
                  trackColor={{ false: "#767577", true: colors.drugThemeColor }}
                  ios_backgroundColor="#929292"
                  onValueChange={() => toggleSwitch("age")}
                  value={isEnabled.age}
                />
              </View>
            </View>
            <View style={switchRow}>
              <View style={switchIconAndCategory}>
                <Text
                  regular
                  style={switchCategoryText}
                  color={colors.normalTextColor}
                >
                  GFR {"<"} 45 ml/min
                </Text>
              </View>
              <View style={switchView}>
                <Switch
                  thumbColor={"white"}
                  style={switchItself}
                  trackColor={{ false: "#767577", true: colors.drugThemeColor }}
                  ios_backgroundColor="#929292"
                  onValueChange={() => toggleSwitch("gfr")}
                  value={isEnabled.gfr}
                />
              </View>
            </View>
            <View style={switchRow}>
              <View style={switchIconAndCategory}>
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      regular
                      style={switchCategoryText}
                      color={colors.normalTextColor}
                    >
                      Suspected Diabetic
                    </Text>
                    <Text
                      regular
                      style={{ fontSize: responsiveScale(12) }}
                      color={colors.normalTextColor}
                    >
                      &#8224;
                    </Text>
                  </View>
                  <Text
                    regular
                    style={{ fontSize: responsiveScale(14) }}
                    color={colors.normalTextColor}
                  >
                    No diagnosis. Symptomology and Labs
                  </Text>
                </View>
              </View>
              <View style={switchView}>
                <Switch
                  thumbColor={"white"}
                  style={switchItself}
                  trackColor={{ false: "#767577", true: colors.drugThemeColor }}
                  ios_backgroundColor="#929292"
                  onValueChange={() => toggleSwitch("diagnosis")}
                  value={isEnabled.diagnosis}
                />
              </View>
            </View>
            <View style={switchRow}>
              <View style={switchIconAndCategory}>
                <Text
                  regular
                  style={switchCategoryText}
                  color={colors.normalTextColor}
                >
                  BMI {">"} 35
                </Text>
              </View>
              <View style={switchView}>
                <Switch
                  thumbColor={"white"}
                  style={switchItself}
                  trackColor={{ false: "#767577", true: colors.drugThemeColor }}
                  ios_backgroundColor="#929292"
                  onValueChange={() => toggleSwitch("bmi")}
                  value={isEnabled.bmi}
                />
              </View>
            </View>
            <View style={switchRow}>
              <View style={switchIconAndCategory}>
                <Text
                  regular
                  style={switchCategoryText}
                  color={colors.normalTextColor}
                >
                  TDD {">"} 80 Units
                </Text>
              </View>
              <View style={switchView}>
                <Switch
                  thumbColor={"white"}
                  style={switchItself}
                  trackColor={{ false: "#767577", true: colors.drugThemeColor }}
                  ios_backgroundColor="#929292"
                  onValueChange={() => toggleSwitch("tdd")}
                  value={isEnabled.tdd}
                />
              </View>
            </View>
            <View style={switchRow}>
              <View style={switchIconAndCategory}>
                <Text
                  regular
                  style={switchCategoryText}
                  color={colors.normalTextColor}
                >
                  Daily prednisone {">"} than 20 mg
                </Text>
              </View>
              <View style={switchView}>
                <Switch
                  thumbColor={"white"}
                  style={switchItself}
                  trackColor={{ false: "#767577", true: colors.drugThemeColor }}
                  ios_backgroundColor="#929292"
                  onValueChange={() => toggleSwitch("prednisone")}
                  value={isEnabled.prednisone}
                />
              </View>
            </View>
          </View>

          <View style={{ width: "45%" }}>
            <TouchableOpacity
              style={next}
              onPress={() => {
                showADs(navigation, "InsulinSubq", {
                  classification: diabeticClass().class,
                });
              }}
            >
              <Text
                style={{
                  fontSize: responsiveScale(25),
                  fontWeight: "700",
                  // color: diabeticClass().color,
                  color: colors.white,
                }}
              >
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal visible={modalOpen} animationType="slide">
          <View
            style={{
              flex: 1,
              padding: perfectSize(20),
              paddingTop:
                insets.top > 40 ? insets.top + perfectSize(10) : insets.top,
              paddingBottom: perfectSize(5),
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setModalOpen(false);
              }}
              style={{ alignItems: "center", marginTop: perfectSize(10) }}
            >
              <CloseIconNew width={perfectSize(40)} height={perfectSize(40)} />
            </TouchableOpacity>
            <View style={modalContent}>
              <Text regular style={disclaimer} color={colors.normalTextColor}>
                &#8224; Diabetes may not have been diagnosed. However, the
                patient may exhibit an elevated A1C ({">"} 6.5) along with other
                tests, symptomology, and/or labs that indicate a strong
                possibility of undiagnosed diabetes. These patients should be
                marked as 'Suspected Diabetic'.
              </Text>
              <Text
                semibold
                style={{
                  textAlign: "center",
                  marginTop: perfectSize(20),
                  fontSize: responsiveScale(15),
                }}
                color={colors.normalTextColor}
              >
                References
              </Text>
              <Text regular style={reference} color={colors.normalTextColor}>
                Duggan. Perioperative hyperglycemia management: An update. 2017.
              </Text>
            </View>
          </View>
        </Modal>
        <View>
          <View
            style={{
              justifyContent: "flex-end",
              marginVertical: perfectSize(20),
            }}
          >
            <TouchableOpacity
              onPress={() => setModalOpen(true)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AlertNewIcon width={perfectSize(24)} height={perfectSize(24)} />
              <Text
                style={{ fontFamily: font.outfit_Light }}
                center
                size={responsiveScale(15)}
                color={"#101010"}
              >
                {" "}
                Important Considerations
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Block flex={false} padding={[0, 0, insets.bottom - perfectSize(20), 0]}>
        <HeaGAMBannerAdder />
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  next: {
    alignItems: "center",
    backgroundColor: colors.drugThemeColor,
    margin: perfectSize(10),
    marginTop: perfectSize(20),
    padding: perfectSize(10),
    borderRadius: perfectSize(10),
    // width: "45%",
    // alignSelf: "center",
  },
  reference: {
    fontSize: responsiveScale(14),
    marginTop: perfectSize(10),
  },
  headerTitle: {
    fontSize: responsiveScale(24),
    textAlign: "center",
    fontWeight: "500",
  },
  userSummary: {
    flexDirection: "row",
    marginTop: perfectSize(40),
  },
  userImage: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
  },
  userDetails: {
    justifyContent: "center",
    marginLeft: 5,
  },
  userName: {
    fontSize: 29,
  },
  subText: {
    fontSize: 10,
  },
  userStats: {
    minHeight: 60,
    backgroundColor: "#eeeeee",
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  stat: {
    alignItems: "center",
  },
  statNum: {
    fontSize: 25,
  },
  statText: {
    fontSize: 12,
    color: "#4f4f50",
  },
  switches: {
    alignSelf: "stretch",
    marginTop: perfectSize(20),
  },
  switchRow: {
    flexDirection: "row",
    padding: perfectSize(10),
    marginRight: perfectSize(20),
    marginLeft: perfectSize(20),
    borderRadius: perfectSize(10),
    marginVertical: perfectSize(3),
    backgroundColor: colors.bgLightGray,
  },
  switchIconAndCategory: {
    flex: 3,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  switchIcon: {
    marginRight: 5,
  },
  switchCategoryText: {
    fontSize: responsiveScale(19),
  },
  switchView: {
    flex: 1,
  },
  switchItself: {
    alignSelf: "flex-end",
    marginRight: perfectSize(10),
  },
  chooseColorRow: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  chooseColor: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  modalToggle: {
    marginTop: 40,
    marginBottom: 10,
    color: "#6f6f6f",
    padding: 10,
    alignSelf: "center",
  },
  modalContent: {
    justifyContent: "center",
    padding: perfectSize(10),
  },
  disclaimer: {
    fontSize: responsiveScale(16),
    marginTop: perfectSize(10),
  },
});
