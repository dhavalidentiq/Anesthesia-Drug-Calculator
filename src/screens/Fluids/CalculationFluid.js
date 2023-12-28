import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Slider from "@react-native-community/slider";
import { DataTable } from "react-native-paper";
import Text from "../../components/utilities/Text";
import Block from "../../components/utilities/Block";
import Header from "../../components/Header";
import { colors, font, perfectSize } from "../../styles/theme";
import AlertIcon from "../../assets/appImages/AlertIcon.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CloseIcon from "../../assets/appImages/CloseIcon.svg";
import HeaGAMBannerAdder from "../../components/GAMBannerAd";
import { responsiveScale } from "../../styles/mixins";
import FluidsIcon from "../../assets/appImages/FluidsIcon.svg";
import LinearGradient from "react-native-linear-gradient";
import DropShadow from "react-native-drop-shadow";
import AlertNewIcon from "../../assets/appImages/AlertNewIcon.svg";
import CloseIconNew from "../../assets/appImages/CloseIconNew.svg";

export default CalculationFluid = ({ navigation, route }) => {
  const { weight, context, habitus, age, gender } = route.params;
  const [npo, setNPO] = useState(0);
  const [surgicalFluid, setSurgicalFluid] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const insets = useSafeAreaInsets();

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

  const hourlyNeeds = (weight) => {
    if (weight <= 10) {
      return weight * 4;
    } else if (weight > 10 && weight <= 20) {
      return (weight - 10) * 2 + 40;
    } else if (weight > 20) {
      return weight - 20 + 60;
    }
  };
  const surgicalNeeds = weight * surgicalFluid;
  const npoTotalNeeds = npo * hourlyNeeds(weight);
  const npoFirstHour = Math.round(npoTotalNeeds / 2);
  const npoSecondAndThirdHour = Math.round(npoTotalNeeds / 4);
  const firstHourTotal = npoFirstHour + hourlyNeeds(weight) + surgicalNeeds;
  const otherHourTotal =
    npoSecondAndThirdHour + hourlyNeeds(weight) + surgicalNeeds;
  const npoColor = colors.drugThemeColor;
  const sflColor = colors.drugRedColor;
  const EBV = () => {
    if (context == "adult") {
      if (obese()) {
        return weight * 50;
      } else {
        if (gender == "female") {
          return weight * 60;
        } else if (gender == "male") {
          return weight * 70;
        }
      }
    } else if (context == "pediatric") {
      //premature
      if (age < -132) {
        return weight * 90;
      }
      //newborn
      else if (age >= -132 && age <= -120) {
        return weight * 90;
      }
      //up to 3 years old
      else if (age > -120 && age <= 36) {
        return weight * 80;
      }
      // greater than 3 years old
      else if (age > 36) {
        return weight * 75;
      }
    }
  };

  const {
    container,
    modalToggle,
    modalContent,
    header,
    headerNPO,
    headerNPOcontent,
    headerImage,
    headerValues,
    tableCellHeading,
    sliderContainer,
    sliderView,
    sliderTextView,
    sliderAndInstructions,
    sliderSubtext,
    instructions,
    sliderValueView,
    sliderValueText,
    table,
    boxes,
    boxView,
    boxTitleText,
    boxText,
    boxTitleView,
    boxTextView,
    disclaimer,
  } = styles;
  const data = [1, 2, 3, 4, 5];
  return (
    <Block
      flex={1}
      color={colors.drugThemeColor}
      style={{ position: "relative" }}
    >
      <Header
        headerTitle={"Fluids: " + weight + " kg"}
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
                style={{ alignItems: "center", marginTop: perfectSize(10) }}
              >
                <CloseIconNew
                  width={perfectSize(40)}
                  height={perfectSize(40)}
                />
              </TouchableOpacity>

              <Text style={disclaimer} color={colors.black}>
                * This approach to fluid replacement is called a 'fixed-volume
                approach' or the '4-2-1 approach' . You'll notice that,
                depending on the weight and hours NPO, there can be very large
                sums of fluid prescribed. For this reason, this approach is NO
                LONGER recommended for ADULT patients. These large volumes can
                lead to increased edema and other postoperative complications.
                The practitioner should also consider these possibilities in the
                pediatric patient.
              </Text>
              <Text style={disclaimer} color={colors.black}>
                &#8224; The numbers represent milliliters (ml) and the patient
                weight is assumed to be the weight you entered ({weight} kg).
                Fluids are assumed to be isotonic crystalloid.
              </Text>
              <Text style={disclaimer} color={colors.black}>
                &#8225; These numbers represent starting values and do not take
                into account conditions like heart failure, drug regimen, blood
                loss, etc which are necessary considerations before prescribing
                fluid totals. The totals and accompanying comorbidities, drug
                regimine, etc are considerations left to the practitioner.
              </Text>
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
            <View style={headerNPO}>
              <View style={headerNPOcontent}>
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: font.outfit_Medium,
                    fontSize: responsiveScale(16),
                    color: "#000000",
                  }}
                >
                  NPO Deficit (ml)
                </Text>
                <Text
                  adjustsFontSizeToFit
                  numberOfLines={1}
                  style={{
                    textAlign: "center",
                    fontSize: responsiveScale(30),
                    color: npoColor,
                    fontFamily: font.outfit_Semi_Bold,
                  }}
                >
                  {npoTotalNeeds}
                </Text>
              </View>
            </View>
            <View style={headerImage}>
              <FluidsIcon width={perfectSize(50)} height={perfectSize(50)} />
            </View>
            <View style={headerValues}>
              <View style={headerNPOcontent}>
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: font.outfit_Medium,
                    fontSize: responsiveScale(16),
                    color: "#000000",
                  }}
                >
                  Surgical Loss (ml/hr)
                </Text>
                <Text
                  adjustsFontSizeToFit
                  numberOfLines={1}
                  style={{
                    textAlign: "center",
                    fontSize: responsiveScale(30),
                    color: sflColor,
                    fontFamily: font.outfit_Semi_Bold,
                  }}
                >
                  {surgicalNeeds}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: insets.bottom + perfectSize(85),
          }}
          showsVerticalScrollIndicator={false}
        >
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
                Hours the patient has been NPO
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
                  // fontSize: responsiveScale(20),
                }}
                size={20}
                color={colors.normalTextColor}
              >
                NPO
              </Text>
              <Slider
                style={{ width: "100%", height: 40 }}
                step={1}
                minimumTrackTintColor={colors.drugThemeColor}
                maximumTrackTintColor="#D8D8D8"
                thumbTintColor={colors.drugThemeColor}
                // thumbStyle={{ height: 20, width: 20 }}
                minimumValue={0}
                maximumValue={240}
                value={0}
                onValueChange={(val) => setNPO(Math.round(val / 10))}
              />
              <Text
                color={npoColor}
                size={20}
                style={{
                  marginLeft: perfectSize(5),
                }}
                center
              >
                {npo}
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
            <View style={{ width: "75%" }}>
              <Text
                style={{ fontFamily: font.outfit_Light }}
                size={14}
                color={colors.normalTextColor}
                center
              >
                Anticipated surgical fluid loss (ml/kg/hr)
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
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
                color={colors.normalTextColor}
              >
                SFL{" "}
              </Text>

              <Slider
                style={[{ width: "100%", height: 40 }]}
                thumbTintColor={colors.drugRedColor}
                minimumTrackTintColor={colors.drugRedColor}
                maximumTrackTintColor="#D8D8D8"
                step={1}
                minimumValue={0}
                maximumValue={800}
                value={0}
                onValueChange={(val) => setSurgicalFluid(Math.round(val / 100))}
              />

              <Text
                color={sflColor}
                style={{
                  marginLeft: perfectSize(5),
                }}
                center
                size={20}
              >
                {surgicalFluid}
              </Text>
            </View>
          </View>

          <View style={table}>
            <DataTable>
              <DataTable.Header style={styles.tableRowStyle}>
                <DataTable.Title></DataTable.Title>
                <DataTable.Title style={styles.innerTableStyle} numeric>
                  1st Hour
                </DataTable.Title>
                <DataTable.Title style={styles.innerTableStyle} numeric>
                  2nd Hour
                </DataTable.Title>
                <DataTable.Title style={styles.innerTableStyle} numeric>
                  3rd Hour
                </DataTable.Title>
              </DataTable.Header>

              <DataTable.Row style={styles.tableRowStyle}>
                <DataTable.Cell>NPO</DataTable.Cell>
                <DataTable.Cell style={styles.innerTableStyle} numeric>
                  {npoFirstHour}
                </DataTable.Cell>
                <DataTable.Cell style={styles.innerTableStyle} numeric>
                  {npoSecondAndThirdHour}
                </DataTable.Cell>
                <DataTable.Cell style={styles.innerTableStyle} numeric>
                  {npoSecondAndThirdHour}
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row style={styles.tableRowStyle}>
                <DataTable.Cell>Hourly</DataTable.Cell>
                <DataTable.Cell style={styles.innerTableStyle} numeric>
                  {hourlyNeeds(weight)}
                </DataTable.Cell>
                <DataTable.Cell style={styles.innerTableStyle} numeric>
                  {hourlyNeeds(weight)}
                </DataTable.Cell>
                <DataTable.Cell style={styles.innerTableStyle} numeric>
                  {hourlyNeeds(weight)}
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row style={styles.tableRowStyle}>
                <DataTable.Cell>Surgical</DataTable.Cell>
                <DataTable.Cell style={styles.innerTableStyle} numeric>
                  {surgicalNeeds}
                </DataTable.Cell>
                <DataTable.Cell style={styles.innerTableStyle} numeric>
                  {surgicalNeeds}
                </DataTable.Cell>
                <DataTable.Cell style={styles.innerTableStyle} numeric>
                  {surgicalNeeds}
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row style={styles.tableRowStyle}>
                <DataTable.Cell>Total</DataTable.Cell>
                <DataTable.Cell style={styles.innerTableStyle} numeric>
                  {firstHourTotal}
                </DataTable.Cell>
                <DataTable.Cell style={styles.innerTableStyle} numeric>
                  {otherHourTotal}
                </DataTable.Cell>
                <DataTable.Cell style={styles.innerTableStyle} numeric>
                  {otherHourTotal}
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row style={{ borderBottomWidth: 0 }}>
                <DataTable.Cell>Running Total</DataTable.Cell>
                <DataTable.Cell style={styles.innerTableStyle} numeric>
                  {firstHourTotal}
                </DataTable.Cell>
                <DataTable.Cell style={styles.innerTableStyle} numeric>
                  {firstHourTotal + otherHourTotal}
                </DataTable.Cell>
                <DataTable.Cell style={styles.innerTableStyle} numeric>
                  {firstHourTotal + otherHourTotal + otherHourTotal}
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </View>

          <View style={{ flex: 1, marginTop: perfectSize(10) }}>
            <TouchableOpacity
              onPress={() => setModalOpen(true)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AlertNewIcon width={perfectSize(24)} height={perfectSize(24)} />
              <Text style={{ fontFamily: font.outfit_Light }} color={"#101010"}>
                {" "}
                Important Considerations
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

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
    padding: perfectSize(20),
  },
  disclaimer: {
    fontSize: responsiveScale(14),
    fontFamily: font.outfit_Regular,
    marginTop: perfectSize(20),
  },
  header: {
    marginTop: perfectSize(10),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
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
  },
  headerValues: {
    flex: 1,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    fontSize: 20,
  },
  table: {
    borderRadius: perfectSize(10),
    borderWidth: 2,
    borderColor: colors.drugThemeColor,
    margin: perfectSize(20),
    // marginHorizontal: perfectSize(20),
    // marginVertical: perfectSize(10),
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
  },
  sliderContainerView: {
    flex: 1,
  },
  sliderContainer: {
    flex: 1,
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
  },
  sliderTextView: {
    flex: 1,
  },
  sliderValueView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderValueText: {
    fontSize: 30,
  },
  sliderAndInstructions: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  sliderSubtext: {
    textAlign: "center",
    fontSize: 12,
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

  tableRowStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#DCDCDC",
    borderRadius: perfectSize(10),
  },
  innerTableStyle: {
    justifyContent: "center",
    borderLeftColor: "#DCDCDC",
    borderLeftWidth: 0.5,
  },
});
