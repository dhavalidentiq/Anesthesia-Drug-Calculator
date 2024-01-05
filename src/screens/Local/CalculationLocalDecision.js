import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { Button } from "react-native-paper";
import { inArray, removeFromArray } from "../../utils/CommonMethods";
import Block from "../../components/utilities/Block";
import Header from "../../components/Header";
import { colors, font, perfectSize } from "../../styles/theme";
import Text from "../../components/utilities/Text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaGAMBannerAdder from "../../components/GAMBannerAd";
import { showADs } from "../../components/IntertitialAd";
import { responsiveScale } from "../../styles/mixins";

export default CalculationLocalDecision = ({ navigation, route }) => {
  const [localList, setLocalList] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const insets = useSafeAreaInsets();

  const windowWidth = Dimensions.get("window").width;
  const buttonWidth = windowWidth / 2 - 40;

  const toggle = (drug) => {
    setIsEnabled((previousState) => !previousState);

    let tempArray = localList;
    if (inArray(drug, tempArray)) {
      removeFromArray(drug, tempArray);
    } else {
      tempArray.push(drug);
    }
    setLocalList(tempArray);

    // const newArray = localList
    // newArray.push(drug)
    // setLocalList(newArray)
  };

  const allLocal = [
    {
      title: "LIDOCAINE",
      options: [
        {
          button: "1% Plain",
          buttonVal: "lido1",
        },
        {
          button: "1% W/Epi",
          buttonVal: "lido1epi",
        },
        {
          button: "2% Plain",
          buttonVal: "lido2",
        },
        {
          button: "2% w/epi",
          buttonVal: "lido2epi",
        },
      ],
    },
    {
      title: "BUPIVACAINE",
      options: [
        {
          button: "0.25% Plain",
          buttonVal: "bup25",
        },
        {
          button: "0.25% W/Epi",
          buttonVal: "bup25epi",
        },
        {
          button: "0.5% Plain",
          buttonVal: "bup50",
        },
        {
          button: "0.5% w/epi",
          buttonVal: "bup50epi",
        },
      ],
    },
    {
      title: "ROPIVACAINE",
      options: [
        {
          button: "0.2% Plain",
          buttonVal: "rope2",
        },
        {
          button: "0.2% W/epi",
          buttonVal: "rope2epi",
        },
        {
          button: "0.5% Plain",
          buttonVal: "rope5",
        },
        {
          button: "0.5% w/epi",
          buttonVal: "rope5epi",
        },
      ],
    },
    {
      title: "MEPIVACAINE",
      options: [
        {
          button: "1% Plain",
          buttonVal: "mep1",
        },
        {
          button: "1% W/epi",
          buttonVal: "mep1epi",
        },
        {
          button: "1.5% Plain",
          buttonVal: "mep15",
        },
        {
          button: "1.5% w/epi",
          buttonVal: "mep15epi",
        },
        {
          button: "2% Plain",
          buttonVal: "mep2",
        },
        {
          button: "2% w/epi",
          buttonVal: "mep2epi",
        },
      ],
    },
  ];

  const renderLocalOptions = () => {
    const { title, drugCat } = styles;
    return allLocal.map((drug) => {
      return (
        <View style={drugCat}>
          <View>
            <Text
              style={{
                fontFamily: font.outfit_Semi_Bold,
                fontSize: responsiveScale(25),
                textTransform: "capitalize",
                textAlign: "center",
                paddingVertical: perfectSize(10),
              }}
              color={colors.drugRedColor}
              // {
              //   drug.title === "LIDOCAINE"
              //     ? "#EA473B"
              //     : drug.title === "BUPIVACAINE"
              //     ? "#49AD30"
              //     : drug.title === "ROPIVACAINE"
              //     ? "#873CE8"
              //     : drug.title === "MEPIVACAINE"
              //     ? "#2387E4"
              //     : ""
              // }
            >
              {drug.title}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {drug.options.map((option) => {
              return (
                <View>
                  <Button
                    mode="outlined"
                    // mode={
                    //   inArray(option.buttonVal, localList)
                    //     ? "contained"
                    //     : "elevated"
                    // }
                    buttonColor={
                      inArray(option.buttonVal, localList)
                        ? colors.drugThemeColor
                        : "#FFFFFF"
                    }
                    style={{
                      marginVertical: perfectSize(7),
                      marginHorizontal: perfectSize(10),
                      width: buttonWidth,
                      borderRadius: perfectSize(20),
                      borderWidth: 0.2,
                      // padding: perfectSize(2),
                    }}
                    onPress={() => {
                      toggle(option.buttonVal);
                    }}
                    labelStyle={{
                      fontFamily: font.outfit_Medium,
                      fontSize: responsiveScale(16),
                      color: inArray(option.buttonVal, localList)
                        ? "#FFFFFF"
                        : "#535353",
                    }}
                  >
                    {option.button}
                  </Button>
                </View>
              );
            })}
          </View>
        </View>
      );
    });
  };

  const { container, title } = styles;
  const localListEmpty = localList.length == 0 ? true : false;
  return (
    <Block flex={1} color={colors.white}>
      <Header
        headerTitle={"Local"}
        isBackIcon={true}
        _onPressBack={() => {
          navigation.goBack();
        }}
      />

      <View style={container}>
        <View
          style={{
            padding: perfectSize(20),
            marginVertical: perfectSize(10),
            marginHorizontal: perfectSize(15),
            backgroundColor: colors.bgLightGray,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            // borderBottomWidth: 1,
            // borderBottomColor: "#d2d2d2",
            borderRadius: perfectSize(10),
          }}
        >
          <View>
            <Text
              style={{
                fontSize: responsiveScale(20),
                color: "#000000",
                fontFamily: font.outfit_Bold,
              }}
            >
              Choose Your Drugs
            </Text>
            <Text
              style={{
                fontSize: responsiveScale(15),
                color: colors.blackNew,
                fontFamily: font.outfit_Regular,
              }}
            >
              LA Toxicity is based on IBW:{" "}
              <Text
                style={{
                  color: colors.drugRedColor,
                  fontFamily: font.outfit_Regular,
                  fontSize: responsiveScale(15),
                }}
              >
                {route.params.ibw} kg
              </Text>
            </Text>
          </View>
          <View>
            <Button
              mode="contained"
              disabled={localListEmpty}
              // textColor={true ? 'green' : ''}
              // textColor="#FFFFFF"
              labelStyle={{
                color: "#FFFFFF",
                fontFamily: font.outfit_Bold,
                fontSize: responsiveScale(18),
              }}
              style={{
                backgroundColor: localListEmpty
                  ? "#C9C9C9"
                  : colors.drugThemeColor,
                borderRadius: perfectSize(20),
              }}
              onPress={() => {
                showADs(navigation, "CalculationLocal", {
                  localList: localList.sort(),
                  ibw: route.params.ibw,
                });
              }}
            >
              Go
            </Button>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          // contentContainerStyle={{ paddingBottom: 60, paddingTop: 20 }}
        >
          {renderLocalOptions()}
        </ScrollView>
      </View>

      <Block flex={false} padding={[0, 0, insets.bottom - perfectSize(20), 0]}>
        <HeaGAMBannerAdder />
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // borderWidth: 1,
    // borderColor: 'red'
    // backgroundColor: "#f7f7f7",
  },
  title: {
    color: "purple",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  drugCat: {
    // marginBottom: perfectSize(10),
    // flex: 1,
    // justifyContent: 'center',
    // backgroundColor: 'red',
    paddingBottom: perfectSize(15),
    borderBottomColor: "#EAEAEA",
    borderBottomWidth: 0.5,
  },
});
