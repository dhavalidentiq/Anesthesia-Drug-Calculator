import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import Slider from "@react-native-community/slider";
import Text from "../../components/utilities/Text";
import Block from "../../components/utilities/Block";
import Header from "../../components/Header";
import { colors, font, perfectSize } from "../../styles/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaGAMBannerAdder from "../../components/GAMBannerAd";
import { responsiveScale } from "../../styles/mixins";
import AlertNewIcon from "../../assets/appImages/AlertNewIcon.svg";
import CloseIconNew from "../../assets/appImages/CloseIconNew.svg";

//https://associationofanaesthetists-publications.onlinelibrary.wiley.com/doi/full/10.1111/anae.12679
//https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6087022/
export default CalculationLocal = ({ navigation, route }) => {
  const [tox, setTox] = useState(0); //maximum toxicity (set currently at 1 - or in other words 100%)
  const insets = useSafeAreaInsets();
  const [drugAmt, setDrugAmt] = useState({
    lido2: 0,
    lido1: 0,
    bup25: 0,
    bup50: 0,
    rope2: 0,
    rope5: 0,
    pril: 0,
    mep1: 0,
    mep15: 0,
    mep2: 0,
    lido1epi: 0,
    lido2epi: 0,
    bup25epi: 0,
    bup50epi: 0,
    rope2epi: 0,
    rope5epi: 0,
    mep1epi: 0,
    mep15epi: 0,
    mep2epi: 0,
  });

  const [modalOpen, setModalOpen] = useState(false);

  const setDrugVals = (set, val) => {
    setDrugAmt({
      ...drugAmt,
      [set]: val,
    });
  };

  useEffect(() => {
    combinedCalcs();
  }, [drugAmt]);

  //The plan is to do a foreach through each of these, and calculate similar to what we did for lido.  This will output the values needed for the front end and, added together, the total toxicity
  const IBW = route.params.ibw;
  const lido2 = {
    max: 5,
    maxEpi: 7,
    perMl: 20,
  };
  const lido1 = {
    max: 5,
    maxEpi: 7,
    perMl: 10,
  };
  const mep1 = {
    max: 5,
    maxEpi: 7,
    perMl: 10,
  };
  const mep15 = {
    max: 5,
    maxEpi: 7,
    perMl: 15,
  };
  const mep2 = {
    max: 5,
    maxEpi: 7,
    perMl: 20,
  };
  const rope2 = {
    max: 3,
    maxEpi: 3,
    perMl: 2,
  };
  const rope5 = {
    max: 3,
    maxEpi: 3,
    perMl: 5,
  };
  const pril = {
    max: 6,
    maxEpi: 8,
    // perMl:
  };
  const bup25 = {
    max: 2,
    maxEpi: 3,
    perMl: 2.5,
  };
  const bup5 = {
    max: 2,
    maxEpi: 3,
    perMl: 5,
  };

  //----
  const allLocal = {
    lido1: {
      name: "1% Lidocaine",
      max: 5,
      given: drugAmt.lido1,
      maxEpi: 7,
      perML: 10,
    },
    lido2: {
      name: "2% Lidocaine",
      max: 5,
      given: drugAmt.lido2,
      maxEpi: 7,
      perML: 20,
    },
    bup25: {
      name: "0.25% Bupivacaine",
      max: 2,
      given: drugAmt.bup25,
      maxEpi: 3,
      perML: 2.5,
    },
    bup50: {
      name: "0.50% Bupivacaine",
      max: 2,
      given: drugAmt.bup50,
      maxEpi: 3,
      perML: 5.0,
    },
    rope2: {
      name: "0.2% Ropivacaine",
      max: 3,
      given: drugAmt.rope2,
      maxEpi: 3,
      perML: 2,
    },
    rope5: {
      name: "0.5% Ropivacaine",
      max: 3,
      given: drugAmt.rope5,
      maxEpi: 3,
      perML: 5,
    },
    mep1: {
      name: "1% Mepivacaine",
      max: 5,
      given: drugAmt.mep1,
      maxEpi: 7,
      perML: 10,
    },
    mep15: {
      name: "1.5% Mepivacaine",
      max: 5,
      given: drugAmt.mep15,
      maxEpi: 7,
      perML: 15,
    },
    mep2: {
      name: "2% Mepivacaine",
      max: 5,
      given: drugAmt.mep2,
      maxEpi: 7,
      perML: 20,
    },

    lido1epi: {
      name: "1% Lidocaine w/epi",
      max: 7,
      given: drugAmt.lido1epi,
      perML: 10,
    },
    lido2epi: {
      name: "2% Lidocaine w/epi",
      max: 7,
      given: drugAmt.lido2epi,
      perML: 20,
    },
    bup25epi: {
      name: "0.25% Bupivacaine w/epi",
      max: 3,
      given: drugAmt.bup25epi,
      perML: 2.5,
    },
    bup50epi: {
      name: "0.50% Bupivacaine w/epi",
      max: 3,
      given: drugAmt.bup50epi,
      perML: 5.0,
    },
    rope2epi: {
      name: "0.2% Ropivacaine w/epi",
      max: 3,
      given: drugAmt.rope2epi,
      perML: 2,
    },
    rope5epi: {
      name: "0.5% Ropivacaine w/epi",
      max: 3,
      given: drugAmt.rope5epi,
      perML: 5,
    },
    mep1epi: {
      name: "1% Mepivacaine w/epi",
      max: 7,
      given: drugAmt.mep1epi,
      perML: 10,
    },
    mep15epi: {
      name: "1.5% Mepivacaine w/epi",
      max: 7,
      given: drugAmt.mep15epi,
      perML: 15,
    },
    mep2epi: {
      name: "2% Mepivacaine w/epi",
      max: 7,
      given: drugAmt.mep2epi,
      perML: 20,
    },
  };

  const calcs = {};

  //const drugArray = ['lido1','lido2','bup50','bup25','rope5','rope2','mep1','mep15','mep2']
  const drugArray = route.params.localList;
  const toxColor = (tox) => {
    if (tox <= 0.5) {
      return colors.drugThemeColor;
    } else if (tox > 0.5 && tox <= 0.75) {
      return "#FFA500";
    } else if (tox > 0.75 && tox < 1.0) {
      return "#6444E6";
    } else {
      return colors.drugRedColor;
    }
  };

  const combinedCalcs = () => {
    console.log("IBW>>>>>", IBW);
    let totalTox = 0;
    if (IBW == 0) {
      setTox(IBW);
    } else {
      drugArray.map((drugName) => {
        //all units are in MG unless the variable specifies ML
        let drug = allLocal[drugName];
        let max = drug.max * IBW;
        let given = drug.given;
        let percent = 1 - (max - given) / max;
        totalTox = totalTox + percent;
      });

      setTox(totalTox);
    }
  };

  const renderSliders = () => {
    return drugArray.map((drugName) => {
      //all units are in MG unless the variable specifies ML
      let drug = allLocal[drugName];
      let set = drug.set;
      let name = drug.name;
      let max = drug.max * IBW;
      let given = drug.given;
      let perML = drug.perML;
      let givenML = given / perML;
      let left = (1 - tox) * max > 0 ? (1 - tox) * max : 0;
      let leftML = left / perML;
      let percent = 1 - (max - given) / max;

      const roundWithZero = (num) => {
        let rounded = Math.round(num * 10) / 10;
        if (rounded < 100 && Number.isInteger(rounded)) {
          return rounded.toString() + ".0";
        } else {
          return rounded;
        }
      };

      const {
        container,
        sliderContainer,
        sliderView,
        sliderTextView,
        topVals,
        leftVals,
        rightVals,
        units,
        bottomVals,
        sliderAndInstructions,
        drugTitleView,
        sliderSubtext,
        instructions,
        sliderValueView,
        sliderValueText,
      } = styles;

      return (
        <View style={sliderContainer}>
          <View style={drugTitleView}>
            <Text style={[sliderSubtext]}>{name}</Text>
          </View>
          <View style={sliderAndInstructions}>
            <View style={sliderTextView}>
              <View style={topVals}>
                <View style={{ flex: 3 }}>
                  <Text
                    style={leftVals}
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    color={colors.black}
                  >
                    {Math.round(given * 10) / 10}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={units}
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    color={colors.black}
                  >
                    {" "}
                    mg
                  </Text>
                </View>
              </View>
              <View style={bottomVals}>
                <View style={{ flex: 3 }}>
                  <Text
                    style={leftVals}
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    color={colors.black}
                  >
                    {roundWithZero(givenML)}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={units} color={colors.black}>
                    {" "}
                    ml
                  </Text>
                </View>
              </View>
            </View>
            <View style={sliderView}>
              <Slider
                style={[{ flex: 1 }]}
                step={1}
                minimumTrackTintColor={colors.drugThemeColor}
                maximumTrackTintColor="#D8D8D8"
                thumbTintColor={colors.drugThemeColor}
                minimumValue={0}
                maximumValue={max}
                value={0}
                onValueChange={(val) => {
                  setDrugVals(drugName, val);
                }}
              />
            </View>
            <View style={sliderTextView}>
              <View style={topVals}>
                <View>
                  <Text
                    style={rightVals}
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    color={colors.black}
                  >
                    {Math.round(left)}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={units} color={colors.black}>
                    {" "}
                    mg
                  </Text>
                </View>
              </View>
              <View style={bottomVals}>
                <View>
                  <Text
                    style={rightVals}
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    color={colors.black}
                  >
                    {roundWithZero(leftML)}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={units} color={colors.black}>
                    {" "}
                    ml
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    });
  };

  // combinedCalcs()
  //----

  const { modalToggle, modalContent, disclaimer, references, reference } =
    styles;
  return (
    <Block flex={1} color={colors.white}>
      <Header
        headerTitle={"Calculation Local"}
        isBackIcon={true}
        _onPressBack={() => {
          navigation.goBack();
        }}
      />

      <View
        style={{
          // flex: 1,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            // flex: 1,
            backgroundColor: "#FAFAFA",
            borderRadius: perfectSize(10),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "45%",
            marginVertical: perfectSize(15),
            paddingVertical: perfectSize(10),
          }}
        >
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={{
              fontSize: responsiveScale(75),
              color: toxColor(tox),
              fontFamily: font.outfit_Bold,
            }}
          >
            {Math.round(tox * 100)}
          </Text>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: toxColor(tox),
                fontSize: responsiveScale(25),
                fontFamily: font.outfit_Medium,
              }}
            >
              %
            </Text>
            <Text
              style={{
                color: toxColor(tox),
                fontSize: responsiveScale(20),
                fontFamily: font.outfit_Medium,
              }}
            >
              Tox
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: perfectSize(20),
          paddingVertical: perfectSize(10),
        }}
      >
        <Text
          style={{
            fontFamily: font.outfit_Semi_Bold,
            fontSize: responsiveScale(20),
            color: colors.drugRedColor,
          }}
        >
          Given
        </Text>
        <Text
          style={{
            fontFamily: font.outfit_Semi_Bold,
            fontSize: responsiveScale(20),
            color: colors.drugRedColor,
          }}
        >
          Left
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
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
            </View>
            <View style={modalContent}>
              <Text style={disclaimer} color={colors.black}>
                &#8224; The numbers on the right should ALWAYS be considered in
                ISOLATION. The drugs and their doses were arranged on one page
                for convenience only. Giving more than one dose without
                adjustment, or partial doses of the numbers could lead to local
                anesthetic toxicity. One dose, within the alotted amount, should
                be given and subsequent adjustment of the calculator should be
                made to know the remaining possible dosages (again, in
                isolation).
              </Text>
              <Text style={disclaimer} color={colors.black}>
                &#8225; These numbers represent starting values and do not take
                into account conditions like renal failure, liver failure,
                pregancy, comorbidities, patient drug regimine, etc. All of
                these are necessary considerations before prescribing local
                anesthetic max dosages. Local anesthetic max dosages and
                considerations of risk factors for local anesthetic toxicity are
                ultimately left to the practitioner.
              </Text>
            </View>
            <View style={references}>
              <Text
                style={{ textAlign: "center", fontFamily: font.outfit_Bold }}
                color={colors.black}
              >
                References
              </Text>
              <Text style={reference} color={colors.black}>
                El-Boghdadly. Local anesthetic systemic toxicity: current
                perspectives. Local and Regional Anesthesia. 2018.
              </Text>
              <Text style={reference} color={colors.black}>
                Williams. A nomogram for calculating the maximum dose of local
                anaesthetic. Association of Anaesthetists. 2014.
              </Text>
            </View>
          </ScrollView>
        </Modal>
        {renderSliders()}
        <View
          style={{
            alignSelf: "center",
            margin: perfectSize(20),
          }}
        >
          <TouchableOpacity
            onPress={() => setModalOpen(true)}
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <AlertNewIcon width={perfectSize(24)} height={perfectSize(24)} />
            <Text color={"#101010"} style={{ fontFamily: font.outfit_Light }}>
              {" "}
              Important Considerations
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Block flex={false} padding={[0, 0, insets.bottom - perfectSize(20), 0]}>
        <HeaGAMBannerAdder />
      </Block>
    </Block>
  );
};
const vals = {
  fontSize: responsiveScale(20),
  fontFamily: font.outfit_Bold,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sliderContainer: {
    flex: 1,

    borderRadius: perfectSize(10),
    backgroundColor: colors.bgLightGray,
    marginHorizontal: perfectSize(15),
    marginVertical: perfectSize(5),
    paddingBottom: perfectSize(15),
  },
  sliderView: {
    flex: 4,
  },
  sliderTextView: {
    flex: 1,
  },
  topVals: {
    flex: 1,
    flexDirection: "row",
  },
  bottomVals: {
    flex: 1,
    flexDirection: "row",
  },
  leftVals: {
    ...vals,
    textAlign: "right",
  },
  rightVals: {
    ...vals,
    textAlign: "left",
  },
  units: {
    textAlign: "left",
    fontSize: responsiveScale(10),
    fontFamily: font.outfit_Medium,
  },
  sliderAndInstructions: {
    flexDirection: "row",
  },
  drugTitleView: {
    bottom: -8,
  },
  sliderSubtext: {
    textAlign: "center",
    fontSize: responsiveScale(17),
    color: "#2B2B2B",
    fontFamily: font.outfit_Medium,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    fontSize: 20,
  },
  sliderValueView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderValueText: {
    fontSize: 30,
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
    padding: perfectSize(20),
  },
  disclaimer: {
    fontSize: responsiveScale(14),
    fontFamily: font.outfit_Regular,
    marginTop: perfectSize(10),
  },
  references: {
    marginTop: perfectSize(20),
    marginBottom: perfectSize(20),
  },
  reference: {
    fontSize: responsiveScale(12),
    fontFamily: font.outfit_Regular,
    marginTop: perfectSize(10),
    marginHorizontal: perfectSize(20),
  },
});
