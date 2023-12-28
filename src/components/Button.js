import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Text from "./utilities/Text";
import Block from "./utilities/Block";
import { colors, perfectSize } from "../styles/theme";
import Side from "../assets/appImages/Side.svg";

export default function Button({
  title,
  extraButtonStyle,
  extraButtonTextStyle,
  isShowIcon,
  onPress,
  backgroundColor,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonViewStyle,
        extraButtonStyle,
        {
          // backgroundColor: "#FFFFFF",
          // justifyContent: "space-between",
        },
      ]}
    >
      <View style={{}}>
        {isShowIcon ? (
          <View
            style={{
              width: 60,
              height: 60,
              // borderRadius: 30,
              // backgroundColor: 'white',
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Block flex={false}>{isShowIcon}</Block>
          </View>
        ) : null}
      </View>

      <View style={{}}>
        <Text style={[extraButtonTextStyle]} color={"#000000"}>
          {title}
        </Text>
      </View>

      {/* <View
        style={{
          width: 60,
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Side width={perfectSize(14)} height={perfectSize(14)} />
      </View> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonViewStyle: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    // flexDirection: 'row',
    // justifyContent: "center",
  },
});
