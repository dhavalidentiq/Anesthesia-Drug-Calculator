import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Text from "../../components/utilities/Text";
import Block from "../../components/utilities/Block";
import Header from "../../components/Header";
import { colors, font, perfectSize } from "../../styles/theme";
import { responsiveScale } from "../../styles/mixins";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaGAMBannerAdder from "../../components/GAMBannerAd";
import { showADs } from "../../components/IntertitialAd";

export default FluidsAdult = ({ navigation, route }) => {
  const { container, decisionButton, buttonText } = styles;
  const { weight, context, habitus, age, gender } = route.params;
  const insets = useSafeAreaInsets();

  return (
    <Block flex={1} color={colors.white}>
      <Header
        headerTitle={"Fluids"}
        isBackIcon={true}
        _onPressBack={() => {
          navigation.goBack();
        }}
      />

      <View style={container}>
        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: responsiveScale(25),
              fontFamily: font.outfit_Regular,
            }}
            color={colors.black}
          >
            Is your patient anticiptated to lose more than{" "}
            <Text
              style={{ fontFamily: font.outfit_Semi_Bold }}
              size={responsiveScale(25)}
              color={colors.drugRedColor}
            >
              500 ml
            </Text>{" "}
            of blood or have major fluid shifts?
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              showADs(navigation, "FluidDecision", {
                decision: "yes",
                weight: weight,
                context: context,
                habitus: habitus,
                age: age,
                gender: gender,
              });
            }}
            style={[decisionButton, { backgroundColor: colors.drugThemeColor }]}
          >
            <Text style={buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              showADs(navigation, "FluidDecision", {
                decision: "no",
                weight: weight,
                context: context,
                habitus: habitus,
                age: age,
                gender: gender,
              });
            }}
            style={[decisionButton, { backgroundColor: colors.drugRedColor }]}
          >
            <Text style={buttonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Block
        style={{ position: "absolute", bottom: 0 }}
        flex={false}
        padding={[0, 0, insets.bottom - perfectSize(20), 0]}
      >
        <HeaGAMBannerAdder />
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  decisionButton: {
    padding: perfectSize(10),
    borderRadius: perfectSize(10),
    width: "40%",
    margin: perfectSize(10),
    marginTop: perfectSize(20),
  },
  buttonText: {
    textAlign: "center",
    color: colors.white,
    fontSize: responsiveScale(25),
    fontFamily: font.outfit_Semi_Bold,
  },
});
