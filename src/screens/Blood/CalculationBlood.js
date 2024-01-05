import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Slider from "@react-native-community/slider";
import Text from "../../components/utilities/Text";
import Block from "../../components/utilities/Block";
import Header from "../../components/Header";
import { colors, font, perfectSize } from "../../styles/theme";
import Mind from "../../assets/appImages/Mind.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CloseIcon from "../../assets/appImages/CloseIcon.svg";
import HeaGAMBannerAdder from "../../components/GAMBannerAd";
import { responsiveScale } from "../../styles/mixins";
import FluidsCal_Icon from "../../assets/appImages/FluidsCal_Icon.svg";
import BloodIcon from "../../assets/appImages/BloodIcon.svg";
import RationalsIconNew from "../../assets/appImages/RationalsIconNew.svg";
import CloseIconNew from "../../assets/appImages/CloseIconNew.svg";
import MABLIconNew from "../../assets/appImages/MABLIconNew.svg";

export default CalculationBlood = ({ navigation, route }) => {
  const { weight, context, habitus, age, gender, hgb, hct } = route.params;

  const [crit, setCrit] = useState(20);
  const [critMin, setCritMin] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const insets = useSafeAreaInsets();

  const [selectedButton, setSelectedButton] = useState(null);

  const buttonData = [
    { label: "A+", color: "#02A3A3", compatible: ["A+", "A-", "O+", "O-"] },
    { label: "A-", color: "#E93B30", compatible: ["A-", "O-"] },
    { label: "B+", color: "#35A819", compatible: ["B+", "B-", "O+", "O-"] },
    { label: "B-", color: "#0E68BB", compatible: ["B-", "O-"] },
    {
      label: "AB+",
      color: "#873BE8",
      compatible: ["Compatible with all blood types"],
    },
    { label: "AB-", color: "#EE436C", compatible: ["A-", "B-", "AB-", "O-"] },
    { label: "O+", color: "#E67000", compatible: ["O+", "O-"] },
    { label: "O-", color: "#2C0089", compatible: ["O-"] },
  ];
  const handleButtonPress = (label) => {
    setSelectedButton(label === selectedButton ? null : label);
  };

  const renderCompatibleTypes = () => {
    if (selectedButton) {
      const selectedType = buttonData.find(
        (button) => button.label === selectedButton
      );
      if (selectedType) {
        return (
          <View
            style={{
              alignItems: "center",
              // padding: perfectSize(10),
            }}
          >
            <Text
              style={{
                fontFamily: font.outfit_Medium,
                fontSize: responsiveScale(18),
                color: "#000000",
              }}
            >
              {selectedType.compatible.join(", ")}
            </Text>
          </View>
        );
      }
    }
    return null;
  };

  const obese = () => {
    if (
      habitus == "Obesity class III" ||
      habitus == "Obesity class II" ||
      habitus == "Obesity class I"
    ) {
      return true;
    } else {
      return false;
    }
  };

  // const habitus = 'Obesity class III'
  // const gender = 'male'
  // const weight = 20
  // const context = 'adult' //or pediatric

  const critColor = colors.drugThemeColor;
  const critMinColor = colors.drugRedColor;

  //Adult estimates found in Butterworth. Morgan & Mikhail’s Clinical Anesthesiology. 2013.
  //Pediatric estimates found in Miller. Miller’s Anesthesia. 8th Edition. 2015.
  const EBV = () => {
    if (context == "adult") {
      if (obese()) {
        return weight * 50;
      } else {
        if (gender == "female") {
          return weight * 65;
        } else if (gender == "male") {
          return weight * 75;
        }
      }
    } else if (context == "pediatric") {
      //premature
      if (age < -132) {
        return weight * 100;
      }
      //newborn to 3 months
      else if (age >= -132 && age <= -84) {
        return weight * 90;
      }
      //up to > 3 months to 1 year old
      else if (age > -84 && age <= 24) {
        return weight * 80;
      }
      // greater than 1 years old
      else if (age > 24) {
        return weight * 70;
      }
    }
  };
  let maxAllowableBloodLoss = Math.round(EBV() * ((crit - critMin) / crit));

  return (
    <Block
      flex={1}
      color={colors.drugThemeColor}
      style={{ position: "relative" }}
    >
      <Header
        headerTitle={"Blood: " + weight + " kg"}
        isBackIcon={true}
        _onPressBack={() => {
          navigation.goBack();
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
        <Modal visible={modalOpen} animationType="slide">
          <ScrollView>
            <View
              style={{
                flex: 1,
                padding: 20,
                paddingTop:
                  insets.top > 40 ? insets.top + perfectSize(10) : insets.top,
                paddingBottom: perfectSize(5),
                backgroundColor: "white",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setModalOpen(false);
                }}
                style={{
                  //  alignItems: 'flex-end',
                  alignItems: "center",
                  marginTop: perfectSize(10),
                }}
              >
                <CloseIconNew
                  width={perfectSize(40)}
                  height={perfectSize(40)}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>
              <View style={styles.education}>
                <View style={styles.educationView}>
                  <Text
                    bold
                    style={[
                      styles.educationHeader,
                      { color: colors.drugRedColor },
                    ]}
                  >
                    Adult EBV
                  </Text>
                  <Text
                    style={styles.modalSubText}
                    // regular
                    color={colors.black}
                  >
                    Obese - 50 ml/kg
                  </Text>
                  <Text
                    style={styles.modalSubText}
                    // regular
                    color={colors.black}
                  >
                    Female - 65 ml/kg
                  </Text>
                  <Text
                    style={styles.modalSubText}
                    // regular
                    color={colors.black}
                  >
                    Male - 75 ml/kg
                  </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    width: "70%",
                    borderBottomColor: "#737373",
                    alignSelf: "center",
                    margin: perfectSize(10),
                  }}
                />
                <View style={styles.educationView}>
                  <Text
                    bold
                    style={[
                      styles.educationHeader,
                      { color: colors.drugThemeColor },
                    ]}
                    // color={colors.black}
                  >
                    Pediatric EBV
                  </Text>
                  <Text
                    style={styles.modalSubText}
                    // regular
                    color={colors.black}
                  >
                    Premature - 100 ml/kg
                  </Text>
                  <Text
                    style={styles.modalSubText}
                    // regular
                    color={colors.black}
                  >
                    0-3 months - 90 ml/kg
                  </Text>
                  <Text
                    style={styles.modalSubText}
                    // regular
                    color={colors.black}
                  >
                    4-12 months - 80 ml/kg
                  </Text>
                  <Text
                    style={styles.modalSubText}
                    // regular
                    color={colors.black}
                  >
                    greater than 12 months - 70 ml/kg
                  </Text>
                </View>

                {/* <Image
                  source={require('../../assets/appImages/MABL.png')}
                  style={[
                    {
                      width: 279,
                      height: 39,
                      alignSelf: 'center',
                      marginTop: 50,
                    },
                  ]}
                /> */}
                <MABLIconNew
                  width={perfectSize(300)}
                  height={perfectSize(120)}
                  style={{ alignSelf: "center" }}
                />
                <View>
                  <Text
                    style={{
                      fontSize: responsiveScale(16),
                      fontFamily: font.outfit_Medium,
                      textAlign: "center",
                      padding: perfectSize(5),
                    }}
                  >
                    References
                  </Text>
                  <Text
                    style={{
                      fontSize: responsiveScale(14),
                      fontFamily: font.outfit_Regular,
                      textAlign: "center",
                      color: "#888888",
                    }}
                  >
                    Butterworth. Morgan & Mikhail’s Clinical Anaesthesiology.
                    2013. Miller. Anaesthesia. 8th Edition. 2015.
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </Modal>
        <View
          style={{
            alignSelf: "center",
            width: "80%",
            marginTop: "-13%",
            marginBottom: perfectSize(20),
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
            <View style={styles.headerNPO}>
              <View style={styles.headerNPOcontent}>
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: font.outfit_Medium,
                    fontSize: responsiveScale(16),
                    color: "#000000",
                  }}
                >
                  Estimated Blood Vol (ml)
                </Text>
                <Text
                  adjustsFontSizeToFit
                  numberOfLines={1}
                  style={{
                    textAlign: "center",
                    fontSize: responsiveScale(30),
                    color: critColor,
                    fontFamily: font.outfit_Semi_Bold,
                  }}
                >
                  {EBV()}
                </Text>
              </View>
            </View>
            <View style={styles.headerImage}>
              <BloodIcon width={perfectSize(50)} height={perfectSize(50)} />
            </View>
            <View style={styles.headerValues}>
              <View style={styles.headerNPOcontent}>
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: font.outfit_Medium,
                    fontSize: responsiveScale(16),
                    color: "#000000",
                  }}
                >
                  Max Blood Loss (ml)
                </Text>
                <Text
                  adjustsFontSizeToFit
                  numberOfLines={1}
                  // bold
                  style={{
                    textAlign: "center",
                    fontSize: responsiveScale(30),
                    color: critMinColor,
                    fontFamily: font.outfit_Semi_Bold,
                  }}
                >
                  {maxAllowableBloodLoss}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            backgroundColor: colors.bgLightGray,
            // margin: perfectSize(5),
            marginVertical: perfectSize(5),
            marginHorizontal: perfectSize(20),
            padding: perfectSize(5),
            borderRadius: perfectSize(10),
          }}
        >
          <View style={{ width: "75%" }}>
            <Text
              style={{ fontFamily: font.outfit_Light }}
              size={14}
              color={colors.normalTextColor}
              center
            >
              The Patients Current Hematocrit
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              // alignItems: "center",
              width: "75%",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: font.outfit_Semi_Bold,
                marginRight: perfectSize(5),
              }}
              size={20}
              color={"#101010"}
            >
              HCT
              <Text
                style={{
                  fontSize: responsiveScale(10),
                  fontFamily: font.outfit_Semi_Bold,
                }}
              >
                cur
              </Text>
            </Text>
            <Slider
              style={{ width: "100%", height: 40 }}
              step={1}
              minimumTrackTintColor={colors.drugThemeColor}
              maximumTrackTintColor="#D8D8D8"
              thumbTintColor={colors.drugThemeColor}
              minimumValue={200}
              maximumValue={500}
              value={0}
              onValueChange={(val) => {
                setCrit(Math.round(val / 10));
                setCritMin(10);
              }}
            />
            <Text
              color={critColor}
              size={20}
              style={{
                marginLeft: perfectSize(5),
                fontSize: responsiveScale(18),
                fontFamily: font.outfit_Semi_Bold,
              }}
              center
            >
              {crit}
            </Text>
          </View>
        </View>

        <View
          style={{
            alignItems: "center",
            backgroundColor: colors.bgLightGray,
            // margin: perfectSize(5),
            marginVertical: perfectSize(5),
            marginHorizontal: perfectSize(20),
            padding: perfectSize(5),
            borderRadius: perfectSize(10),
          }}
        >
          <View
            style={{
              // width: '75%',
              marginTop: perfectSize(5),
            }}
          >
            <Text
              style={{ fontFamily: font.outfit_Light }}
              size={14}
              color={colors.lightGrayText}
              center
            >
              Lowest Allowed Hematocrit
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              // alignItems: "center",
              width: "75%",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: font.outfit_Semi_Bold,
                marginRight: perfectSize(5),
              }}
              size={20}
              color={"#101010"}
            >
              HCT
              <Text
                style={{
                  fontSize: responsiveScale(10),
                  fontFamily: font.outfit_Semi_Bold,
                }}
              >
                min
              </Text>
            </Text>

            <Slider
              style={[{ width: "100%", height: 40 }]}
              thumbTintColor={colors.drugRedColor}
              minimumTrackTintColor={colors.drugRedColor}
              maximumTrackTintColor="#D8D8D8"
              step={1}
              minimumValue={100}
              maximumValue={crit * 10}
              value={0}
              onValueChange={(val) => setCritMin(Math.round(val / 10))}
            />

            <Text
              color={critMinColor}
              style={{
                marginLeft: perfectSize(5),
                fontSize: responsiveScale(18),
                fontFamily: font.outfit_Semi_Bold,
              }}
              center
              size={20}
            >
              {critMin}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            padding: perfectSize(15),
            // backgroundColor: 'red',
          }}
        >
          {context === "adult" ? (
            <>
              <Text
                style={{
                  fontFamily: font.outfit_Semi_Bold,
                  fontSize: responsiveScale(16),
                  color: "#101010",
                }}
              >
                Normal Hgb :{" "}
                <Text style={{ color: colors.drugThemeColor }}>
                  {gender === "male" ? "14 - 18 g/dl" : "12 - 16 g/dl"}
                </Text>
              </Text>

              <Text
                style={{
                  fontFamily: font.outfit_Semi_Bold,
                  fontSize: responsiveScale(16),
                  color: "#101010",
                }}
              >
                Normal Hct :{" "}
                <Text style={{ color: colors.drugRedColor }}>
                  {gender === "male" ? "40 - 54%" : "36 - 48%"}
                </Text>
              </Text>
            </>
          ) : (
            <>
              <Text
                style={{
                  fontFamily: font.outfit_Semi_Bold,
                  fontSize: responsiveScale(16),
                  color: "#101010",
                }}
              >
                Normal Hgb :{" "}
                <Text style={{ color: colors.drugThemeColor }}>{hgb}</Text>
              </Text>

              <Text
                style={{
                  fontFamily: font.outfit_Semi_Bold,
                  fontSize: responsiveScale(16),
                  color: "#101010",
                }}
              >
                Normal Hct :{" "}
                <Text style={{ color: colors.drugRedColor }}>{hct}</Text>
              </Text>
            </>
          )}
        </View>

        <View>
          <Text
            style={{
              fontFamily: font.outfit_Semi_Bold,
              fontSize: responsiveScale(20),
              color: colors.blackNew,
              textAlign: "center",
              padding: perfectSize(10),
            }}
          >
            Compatible Blood Types
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: perfectSize(15),
          }}
        >
          {buttonData.map((button, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleButtonPress(button.label)}
              style={{
                margin: perfectSize(10),
                // padding: perfectSize(10),
                justifyContent: "center",
                alignItems: "center",
                borderRadius: perfectSize(5),
                width: perfectSize(44),
                // height: perfectSize(44),
                paddingVertical: perfectSize(10),
                backgroundColor:
                  selectedButton === button.label
                    ? colors.drugThemeColor
                    : "#FFFFFF",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
              }}
            >
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={{
                  fontSize: responsiveScale(20),
                  fontFamily: font.outfit_Semi_Bold,
                  color:
                    selectedButton === button.label ? "white" : button.color,
                }}
              >
                {button.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={{
            alignItems: "center",
            // justifyContent: "center",
            flex: 1,
            // backgroundColor: colors.drugThemeColor,
          }}
        >
          <Text>{renderCompatibleTypes()}</Text>
        </View>
        <View
          style={{
            alignItems: "center",
            paddingBottom: perfectSize(90),
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
            {/* <Mind width={perfectSize(24)} height={perfectSize(24)} /> */}
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

        <Block
          style={{ position: "absolute", bottom: 0 }}
          flex={false}
          padding={[0, 0, insets.bottom - perfectSize(20), 0]}
        >
          <HeaGAMBannerAdder />
        </Block>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginRight: 10,
    // marginLeft: 10,
    // borderWidth: 3,
    // borderColor: 'black'
    // backgroundColor: "#f7f7f7",
  },
  modalToggle: {
    marginTop: 20,
    marginBottom: 10,
    color: "#6f6f6f",
    padding: 10,
    alignSelf: "center",
  },
  modalContent: {
    justifyContent: "center",
    padding: 20,
    // borderWidth: 1
  },
  disclaimer: {
    fontSize: 14,
    marginTop: 10,
  },
  header: {
    marginTop: perfectSize(10),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    // borderColor: 'blue',
    // borderWidth: 1
  },
  headerNPO: {
    alignItems: "flex-end",
    flex: 1,
  },
  headerNPOcontent: {
    padding: perfectSize(5),
    width: 110,
  },
  headerImage: {
    alignItems: "center",
    padding: perfectSize(10),
    // borderColor: 'red',
    // borderWidth: 1,
  },
  headerValues: {
    flex: 1,
    // borderColor: 'red',
    // borderWidth: 1,
  },
  instructions: {
    // textAlign: 'center',
    color: "#101010",
    fontSize: responsiveScale(18),
    fontFamily: font.outfit_Semi_Bold,
    marginRight: perfectSize(5),
    // borderWidth: 1,
  },
  boxes: {
    marginTop: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  gender: {
    textDecorationLine: "underline",
    top: -10,
  },
  topDisplayOfNumbers: {
    flex: 1,
    width: "80%",
    // borderWidth: 3,
    // borderColor: 'purple'
  },
  sliderContainerView: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'blue',
  },
  sliderContainer: {
    backgroundColor: "#FFFFFF",
    margin: perfectSize(10),
    padding: perfectSize(10),
    borderRadius: perfectSize(10),
  },
  switchView: {
    // flex: 1,
    flexDirection: "row",
    marginTop: 10,
    // borderWidth: 1
  },
  slider: {
    alignItems: "stretch",
    justifyContent: "center",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 80,
  },
  sliderView: {
    flex: 4,
    // borderWidth: 1,
    // borderColor: 'green',
  },
  sliderTextView: {
    // flex: 1,
    // borderWidth: 1,
    // borderColor: 'red'
  },
  sliderValueView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: 'purple',
  },
  sliderValueText: {
    fontSize: 30,
  },
  sliderAndInstructions: {
    alignItems: "center",
    flexDirection: "row",
    // borderWidth: 1,
    // borderColor: 'red'
    // width: '75%',
    justifyContent: "center",
  },
  education: {
    flex: 1,
    flexDirection: "column",
  },
  educationView: {
    alignItems: "center",
  },
  educationHeader: {
    fontSize: responsiveScale(20),
    // marginTop: perfectSize(10),
    marginVertical: perfectSize(10),
    fontFamily: font.outfit_Semi_Bold,
  },
  sliderSubtext: {
    textAlign: "center",
    fontSize: responsiveScale(12),
    fontFamily: font.outfit_Light,
  },
  sliderTextContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 3,
    // borderColor: 'orange'
  },
  sliderText: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 0,
    flex: 1,
    // borderWidth: 3,
    // borderColor: 'blue'
  },
  units: {
    alignItems: "flex-start",
    flex: 1,
    // borderWidth: 3,
    // borderColor: 'green'
  },
  kg: {
    fontSize: 30,
  },
  lb: {
    color: "#1e1e1e",
    fontSize: 12,
  },
  age: {
    color: "#1e1e1e",
    fontSize: 12,
  },
  next: {
    alignSelf: "center",
    justifyContent: "flex-end",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "grey",
  },
  context: {
    fontSize: 20,
    marginLeft: 10,
  },
  half: {
    flex: 1,
  },
  toggle: {
    alignSelf: "flex-end",
  },
  vitalsView: {
    marginTop: 10,
    flex: 2,
    justifyContent: "flex-end",
    alignItems: "center",
    // borderWidth: 2
  },
  vitals: {
    flexDirection: "row",
    flex: 4,
    // borderWidth: 1,
  },
  buttons: {
    flex: 1,
    // borderWidth: 1,
    alignSelf: "stretch",
  },
  references: {
    marginTop: 60,
    flex: 1,
    alignSelf: "center",
  },
  reference: {
    fontSize: 12,
  },
  modalSubText: {
    fontFamily: font.outfit_Regular,
    fontSize: responsiveScale(16),
    padding: perfectSize(3),
  },
});
