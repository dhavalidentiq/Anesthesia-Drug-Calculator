import React from "react";
import { View, StyleSheet } from "react-native";
// import Slider from '@react-native-community/slider';
import ObeseBodyImage from "./ObeseBodyImage";
import BodyImage from "./BodyImage";
import ObeseBackBodyImage from "./ObeseBackBodyImage";
import BackBodyImage from "./BackBodyImage";
import PediatricAnterior from "./PediatricAnterior";
import PediatricPosterior from "./PediatricPosterior";
import { colors, font, perfectSize } from "../styles/theme";
import Text from "./utilities/Text";
import { responsiveScale } from "../styles/mixins";
import Slider from "@react-native-community/slider";

const BurnsAnteriorAndPosterior = (props) => {
  const {
    peds,
    frontBodyParts,
    pediatricBodyParts,
    textColor,
    hoursAgo,
    result,
    isFrontSide,
    isObesePatient,
    hoursvalue = () => {},
    _adultOnValueChange = () => {},
    _pediatricOnValueChange = () => {},
    _selectFrontBodyParts = () => {},
    _pediatricSelectBodyParts = () => {},
  } = props;

  let data = !peds ? frontBodyParts : pediatricBodyParts;

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          // margin: perfectSize(10),
          padding: perfectSize(10),
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text>
            <Text
              style={{
                color: colors.drugRedColor,
                fontSize: responsiveScale(20),
                fontFamily: font.outfit_Medium,
              }}
              numberOfLines={1}
              adjustsFontSizeToFit
            >{`1st rate:`}</Text>
            <Text
              style={{
                fontSize: responsiveScale(17),
                fontFamily: font.outfit_Regular,
                color: "#000000",
              }}
              numberOfLines={1}
              adjustsFontSizeToFit
            >{` ${Math.round(result.fluidInFirst8Hours)} ml/hr`}</Text>
            {/* {`1st rate: ${Math.round(result.fluidInFirst8Hours)} mL/hr`} */}
          </Text>
          <Text
            style={{
              fontSize: responsiveScale(17),
              fontFamily: font.outfit_Regular,
              color: "#000000",
            }}
          >
            {`For: ${8 - hoursAgo} hrs`}
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text>
            <Text
              style={{
                color: colors.drugRedColor,
                fontSize: responsiveScale(20),
                fontFamily: font.outfit_Medium,
              }}
              numberOfLines={1}
              adjustsFontSizeToFit
            >{`2nd rate:`}</Text>
            <Text
              style={{
                fontSize: responsiveScale(17),
                fontFamily: font.outfit_Regular,
                color: "#000000",
              }}
              numberOfLines={1}
              adjustsFontSizeToFit
            >{` ${Math.round(result.fluidInLast16Hours)} ml/hr`}</Text>
            {/* {`2nd rate: ${Math.round(result.fluidInLast16Hours)} mL/hr`} */}
          </Text>
          <Text
            style={{
              fontSize: responsiveScale(17),
              fontFamily: font.outfit_Regular,
              color: "#000000",
            }}
          >
            For: 16 hrs
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: colors.bgLightGray,
          borderRadius: perfectSize(10),
          marginHorizontal: perfectSize(20),
          marginVertical: perfectSize(10),
          paddingHorizontal: perfectSize(10),
          // paddingVertical: perfectSize(5),
        }}
      >
        {data[data?.length - 1]?.burnBodyPart !== undefined && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // paddingVertical: perfectSize(5),
              paddingTop: perfectSize(10),
              paddingHorizontal: perfectSize(10),
            }}
          >
            <Text style={styles.bodyPartSelectedText}>Hours Ago</Text>

            <View style={styles.percentageMainView}>
              <Text style={styles.percentageNumberText}>
                {hoursAgo} <Text style={styles.percentageNumberText}>hrs</Text>
              </Text>
            </View>
          </View>
        )}
        {data[data?.length - 1]?.burnBodyPart !== undefined && (
          <View
            style={{
              // backgroundColor: "yellow",
              paddingHorizontal: perfectSize(10),
            }}
          >
            <Slider
              step={1}
              minimumTrackTintColor={colors.drugThemeColor}
              maximumTrackTintColor="#CACACA"
              thumbTintColor={colors.drugThemeColor}
              minimumValue={0}
              maximumValue={5}
              onValueChange={(val) => hoursvalue(val)}
              onResponderGrant={() => true}
            />
          </View>
        )}
      </View>
      <View
        style={{
          backgroundColor: colors.bgLightGray,
          borderRadius: perfectSize(10),
          marginHorizontal: perfectSize(20),
          marginVertical: perfectSize(10),
          paddingHorizontal: perfectSize(10),
          // paddingVertical: perfectSize(5),
        }}
      >
        {data[data?.length - 1]?.burnBodyPart !== undefined && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // backgroundColor: "gold",
              // paddingVertical: perfectSize(5),
              paddingTop: perfectSize(10),
              paddingHorizontal: perfectSize(10),
            }}
          >
            <Text
              style={[styles.bodyPartSelectedText, { color: textColor }]}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {data[data?.length - 1]?.bodypart.split("_").join(" ")}
            </Text>

            <View style={styles.percentageMainView}>
              <Text style={styles.percentageNumberText}>
                {data[data?.length - 1]?.burnBodyPart}
              </Text>
              <Text style={styles.percentageNumberText}>%</Text>
            </View>
          </View>
        )}
        {data[data?.length - 1]?.burnBodyPart !== undefined && (
          <View
            style={{
              // backgroundColor: "yellow",
              paddingHorizontal: perfectSize(10),
            }}
          >
            <Slider
              step={1}
              minimumTrackTintColor={colors.drugThemeColor}
              maximumTrackTintColor="#CACACA"
              thumbTintColor={colors.drugThemeColor}
              minimumValue={0}
              maximumValue={100}
              value={data[data?.length - 1]?.burnBodyPart}
              onValueChange={(val) =>
                !peds ? _adultOnValueChange(val) : _pediatricOnValueChange(val)
              }
              onResponderGrant={() => true}
            />
          </View>
        )}
      </View>

      {/* <View
        style={{
          width: "30%",
          position: "absolute",
          zIndex: 99,
          top: "11%",
          right: "68%",
        }}
      >
        {data[data?.length - 1]?.burnBodyPart !== undefined && (
          <View
            style={{
              // flex: 1,
              alignItems: "center",
            }}
          >
            <Text
              style={styles.bodyPartSelectedText}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              Hours Ago
            </Text>

            <View style={styles.percentageMainView}>
              <Text style={styles.percentageNumberText}>
                {hoursAgo} <Text style={styles.percentageNumberText}>hrs</Text>
              </Text>
            </View>
          </View>
        )}
      </View> */}
      {/* {data[data?.length - 1]?.burnBodyPart !== undefined && (
        <View
          style={{
            width: "80%",
            position: "absolute",
            transform: [{ rotate: "-90deg" }],
            zIndex: 99,
            top: "50%",
            right: "43%",
            // marginTop: perfectSize(15),
          }}
        >
          <Slider
            step={1}
            minimumTrackTintColor="#0051C6"
            maximumTrackTintColor="#CACACA"
            thumbTintColor="#0051C6"
            minimumValue={0}
            maximumValue={5}
            onValueChange={(val) => hoursvalue(val)}
            onResponderGrant={() => true}
          />
        </View>
      )} */}
      {/* 
      <View
        style={{
          width: "30%",
          position: "absolute",
          zIndex: 99,
          top: "11%",
          left: "68%",
        }}
      >
        {data[data?.length - 1]?.burnBodyPart !== undefined && (
          <View
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            <Text
              style={[styles.bodyPartSelectedText, { color: textColor }]}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {data[data?.length - 1]?.bodypart.split("_").join(" ")}
            </Text>

            <View style={styles.percentageMainView}>
              <Text style={styles.percentageNumberText}>
                {data[data?.length - 1]?.burnBodyPart}
              </Text>
              <Text style={styles.percentageNumberText}>%</Text>
            </View>
          </View>
        )}
      </View> */}
      {/* {data[data?.length - 1]?.burnBodyPart !== undefined && (
        <View
          style={{
            width: "80%",
            position: "absolute",
            transform: [{ rotate: "-90deg" }],
            zIndex: 99,
            top: "50%",
            left: "43%",
            // marginTop: perfectSize(15),
          }}
        >
          <Slider
            step={1}
            minimumTrackTintColor="#EA473B"
            maximumTrackTintColor="#CACACA"
            thumbTintColor="#EA473B"
            minimumValue={0}
            maximumValue={100}
            value={data[data?.length - 1]?.burnBodyPart}
            onValueChange={(val) =>
              !peds ? _adultOnValueChange(val) : _pediatricOnValueChange(val)
            }
            onResponderGrant={() => true}
          />
        </View>
      )} */}

      {!peds ? (
        <View
          style={{
            height: perfectSize(500),
          }}
        >
          {isFrontSide ? (
            <View style={styles.container}>
              {isObesePatient ? (
                <ObeseBodyImage
                  width={"100%"}
                  height={"100%"}
                  strokeWidth={1}
                  frontBodyParts={frontBodyParts}
                  textColor={textColor}
                  valuePass={(text) => _selectFrontBodyParts(text)}
                />
              ) : (
                <BodyImage
                  strokeWidth={1}
                  frontBodyParts={frontBodyParts}
                  textColor={textColor}
                  valuePass={(text) => _selectFrontBodyParts(text)}
                />
              )}
            </View>
          ) : (
            <View style={[styles.container]}>
              {isObesePatient ? (
                <ObeseBackBodyImage
                  width={"100%"}
                  height={"100%"}
                  strokeWidth={1}
                  frontBodyParts={frontBodyParts}
                  textColor={textColor}
                  valuePass={(text) => _selectFrontBodyParts(text)}
                />
              ) : (
                <BackBodyImage
                  width={"100%"}
                  height={"100%"}
                  strokeWidth={1}
                  frontBodyParts={frontBodyParts}
                  textColor={textColor}
                  valuePass={(text) => _selectFrontBodyParts(text)}
                />
              )}
            </View>
          )}
        </View>
      ) : (
        <View
          style={{
            height: perfectSize(500),
          }}
        >
          {isFrontSide ? (
            <View style={[styles.container]}>
              <PediatricAnterior
                width={"100%"}
                height={"100%"}
                strokeWidth={1.5}
                pediatricBodyParts={pediatricBodyParts}
                textColor={textColor}
                valuePass={(text) => _pediatricSelectBodyParts(text)}
              />
            </View>
          ) : (
            <View style={[styles.container]}>
              <PediatricPosterior
                width={"100%"}
                height={"100%"}
                strokeWidth={1.5}
                pediatricBodyParts={pediatricBodyParts}
                textColor={textColor}
                valuePass={(text) => _pediatricSelectBodyParts(text)}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bodyPartSelectedText: {
    fontSize: responsiveScale(17),
    fontFamily: font.outfit_Semi_Bold,
    color: "#000000",
  },
  percentageMainView: {
    flexDirection: "row",
    // alignItems: "center",
  },
  percentageNumberText: {
    fontSize: responsiveScale(17),
    fontFamily: font.outfit_Medium,
    color: colors.drugRedColor,
  },
  percentageSign: {
    fontSize: responsiveScale(13),
    fontFamily: "OpenSansSemiBold",
  },
});

export default BurnsAnteriorAndPosterior;
