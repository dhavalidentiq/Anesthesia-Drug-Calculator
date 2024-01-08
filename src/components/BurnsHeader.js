import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import BurnsIconNew from "../assets/appImages/BurnsIconNew.svg";
import Text from "./utilities/Text";
import { responsiveScale } from "../styles/mixins";
import { font, perfectSize } from "../styles/theme";

const BurnsHeader = (props) => {
  const {
    textColor,
    npoColor,
    sflColor,
    peds,
    result,
    totalSumBurns,
    _pediatricTotalSumBurns,
  } = props;

  return (
    <View style={styles.header}>
      <View style={styles.estimatedMainView}>
        <Text
          style={[
            styles.estimatedTextView,
            {
              color: textColor,
            },
          ]}
        >
          Estimated 24 hour {"\n"} Total (ml)
        </Text>
        <Text
          style={[
            styles.estimatedTextValue,
            {
              color: npoColor,
            },
          ]}
        >
          {!peds
            ? Math.round(result.totalFluidAdult)
            : Math.round(result.totalFluidPediatric)}
        </Text>
      </View>

      <View style={styles.burnsIconMainView}>
        <BurnsIconNew height={perfectSize(55)} width={perfectSize(55)} />
      </View>

      <View style={styles.tbsaMainView}>
        <Text
          style={[
            styles.estimatedTextView,
            {
              color: textColor,
            },
          ]}
        >
          Estimated TBSA {"\n"} Burned (%)
        </Text>
        <Text
          style={[
            styles.estimatedTextValue,
            {
              color: sflColor,
            },
          ]}
        >
          {!peds
            ? parseFloat(totalSumBurns).toFixed(1)
            : parseFloat(_pediatricTotalSumBurns).toFixed(1)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: perfectSize(10),
  },
  estimatedMainView: {
    // flex: 1.3,
    alignItems: "center",
  },
  estimatedTextView: {
    fontSize: responsiveScale(15),
    fontFamily: font.outfit_Medium,
    textAlign: "center",
  },
  estimatedTextValue: {
    fontSize: responsiveScale(20),
    fontFamily: font.outfit_Semi_Bold,
  },
  burnsIconMainView: {
    // flex: 0.6,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: 'red',
  },
  burnsIconChildView: {
    width: perfectSize(70),
    aspectRatio: 1,
  },
  tbsaMainView: {
    // flex: 1.3,
    alignItems: "center",
  },
});

export default BurnsHeader;
