import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import DrugList from "../../components/Drugs"; //returns a function that the weight can be passed to
import Text from "../../components/utilities/Text";
import Block from "../../components/utilities/Block";
import Header from "../../components/Header";
import { colors, font, perfectSize } from "../../styles/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaGAMBannerAdder from "../../components/GAMBannerAd";
import LinearGradient from "react-native-linear-gradient";
import { responsiveScale } from "../../styles/mixins";
import AllDrugsIconNew from "../../assets/appImages/AllDrugsIconNew.svg";
import RoutineIconNew from "../../assets/appImages/RoutineIconNew.svg";
import EmergencyIconNew from "../../assets/appImages/EmergencyIconNew.svg";
import PainIconNew from "../../assets/appImages/PainIconNew.svg";
import VasopressorsIconNew from "../../assets/appImages/VasopressorsIconNew.svg";
import PonvIconNew from "../../assets/appImages/PonvIconNew.svg";
import AntihypertensivesIconNew from "../../assets/appImages/AntihypertensivesIconNew.svg";
import TivaIconNew from "../../assets/appImages/TivaIconNew.svg";
import ReversalIconNew from "../../assets/appImages/ReversalIconNew.svg";
import PremedicationIconNew from "../../assets/appImages/PremedicationIconNew.svg";
import PolygonIcon from "../../assets/appImages/PolygonIcon.svg";
import {
  AdultDrugsCategories,
  PediatricDrugsCategories,
} from "../../constants/mixins";
//Rational is that there will ALWAYS be a low number (so if it is just a single dose number, it is entered as the item.low).  If the range is per kg, then the raw numbers are multiplied times the kg entered.  Otherwise the raw numbers are returned.
//there wont always be a high

export default CalculationDrugs = ({ navigation, route }) => {
  const weight = route.params.weight;
  const age = route.params.age;
  const context = route.params.context; //this is pediatric or adult
  const Drugs = DrugList(weight);
  const drugs = Drugs[context]; //populate the pediatric or adult drugs
  const IBW = route.params.ibw; //ideal body weight
  const insets = useSafeAreaInsets();
  const roundToNearest = (number, decimal) => {
    return Math.round(decimal * number) / decimal;
  };

  useEffect(() => {
    _filterDrugsByCategory({ id: 1, name: "All" });
    // navigation.setOptions({
    //   title: 'Dosages',
    //   headerRight: () => (
    //     <View style={{ flexDirection: 'row' }}>
    //       <TouchableOpacity
    //         onPress={() => {
    //           showFeedBackModal();
    //         }}>
    //         <MaterialCommunityIcons
    //           name="comment-plus-outline"
    //           size={26}
    //           color="yellow"
    //           style={{ marginRight: 20 }}
    //         />
    //       </TouchableOpacity>
    //     </View>
    //   ),
    // });
  }, []);

  const DrugsCategories =
    route.params.context === "adult"
      ? AdultDrugsCategories
      : PediatricDrugsCategories;

  const [selectedIcon, setSelectedIcon] = useState({
    id: 1,
    name: "All",
    image: <></>,
  });

  const [filterDrugsData, setFilterDrugsData] = useState(drugs || []);

  const outputUses = (Uses, textColor) => {
    //destructure styles
    const { usesText, notesStyle } = styles;

    //map through the uses of each drug
    return Uses.map((item, i) => {
      //constants
      const low = item.perIBW
        ? roundToNearest(item.low * route.params.ibw, 10)
        : item.perKg
        ? roundToNearest(item.low * weight, 10)
        : item.low;
      const high = item.perIBW
        ? roundToNearest(item.high * route.params.ibw, 10)
        : item.perKg
        ? roundToNearest(item.high * weight, 10)
        : item.high;
      // const high = item.perKg ? (roundToNearest(item.high * weight,10)) : (item.high)
      const notes = item.topNotes ? (
        <Text style={[notesStyle, { color: textColor }]}>*{item.topNotes}</Text>
      ) : null;
      const perKgRange = (item) => {
        if (item.perKg) {
          if (item.high) {
            return (
              <Text
                // regular
                style={[usesText, { color: textColor }]}
              >{`(${item.low} - ${item.high} ${item.unitsKg}${item.weightUnits}${item.infusionUnits})`}</Text>
            );
          } else {
            return (
              <Text
                // regular
                style={[usesText, { color: textColor }]}
              >{`(${item.low} ${item.unitsKg}${item.weightUnits}${item.infusionUnits})`}</Text>
            );
          }
        } else {
        }
      };
      // const perKgRange = item.perKg ? `(${item.low} - ${item.high} ${item.unitsKg}${item.weightUnits}${item.infusionUnits})` : null
      const mgRange = (item) => {
        if (item.high && item.max != null && high > item.max) {
          //checks to make sure the high or low is not > the max
          if (low > item.max) {
            return (
              <View style={{ flexDirection: "row" }}>
                <Text
                  // regular
                  style={[
                    usesText,
                    { color: textColor, position: "absolute", left: -7 },
                  ]}
                >
                  {item.perIBW ? String.fromCodePoint(parseInt(8224)) : null}
                </Text>
                <Text
                  // regular
                  style={[usesText, { color: textColor }]}
                >
                  {item.max} {item.unitsKg}{" "}
                </Text>
              </View>
            );
          } else {
            return (
              <View style={{ flexDirection: "row" }}>
                <Text
                  // regular
                  style={[
                    usesText,
                    { color: textColor, position: "absolute", left: -7 },
                  ]}
                >
                  {item.perIBW ? String.fromCodePoint(parseInt(8224)) : null}
                </Text>
                <Text
                  //  regular
                  style={[usesText, { color: textColor }]}
                >
                  {low} - {item.max} {item.unitsKg}{" "}
                </Text>
              </View>
            );
          }
        } else if (item.high) {
          return (
            <View style={{ flexDirection: "row" }}>
              <Text
                // regular
                style={[
                  usesText,
                  { color: textColor, position: "absolute", left: -7 },
                ]}
              >
                {item.perIBW ? String.fromCodePoint(parseInt(8224)) : null}
              </Text>
              <Text
                // regular
                style={[usesText, { color: textColor }]}
              >
                {low} - {high} {item.unitsKg}{" "}
              </Text>
            </View>
          );
        } else {
          return (
            <Text
              // regular
              style={[usesText, { color: textColor }]}
            >
              {low} {item.unitsKg}{" "}
            </Text>
          );
        }
      };
      const mlRange = (item) => {
        if (item.supplied) {
          if (item.high && item.max != null && high > item.max) {
            //checks to make sure the high is not > the max
            // return <Text style={{color: textColor}}>{roundToNearest((low)/item.supplied, 100)} - {roundToNearest((item.max)/item.supplied, 10)} mL ({item.supplied} {item.unitsKg}/mL)</Text>
            if (low > item.max) {
              return (
                <Text
                  // regular
                  style={[usesText, { color: textColor }]}
                >
                  {roundToNearest(item.max / item.supplied, 100)} mL (
                  {item.supplied} {item.unitsKg}/mL)
                </Text>
              );
            } else {
              return (
                <Text
                  // regular
                  style={[usesText, { color: textColor }]}
                >
                  {roundToNearest(low / item.supplied, 100)} -{" "}
                  {roundToNearest(item.max / item.supplied, 10)} mL (
                  {item.supplied} {item.unitsKg}/mL)
                </Text>
              );
            }
          } else if (item.high) {
            return (
              <Text
                // regular
                style={[usesText, { color: textColor }]}
              >
                {roundToNearest(low / item.supplied, 100)} -{" "}
                {roundToNearest(high / item.supplied, 10)} mL ({item.supplied}{" "}
                {item.unitsKg}/mL)
              </Text>
            );
          } else {
            return (
              <Text
                // regular
                style={[usesText, { color: textColor }]}
              >
                {roundToNearest(low / item.supplied, 100)} mL ({item.supplied}{" "}
                {item.unitsKg}/mL)
              </Text>
            );
          }
        }
      };

      // const mLs = item.supplied ?

      //only take the topLevel items
      if (item.topLevel) {
        if (item.method === "infusion") {
          return (
            <View key={i}>
              <Text key={i} style={[usesText, { color: textColor }]}>
                {item.perIBW ? String.fromCodePoint(parseInt(8224)) : null}
                {perKgRange(item)}
              </Text>
              {notes}
            </View>
          );
        } else {
          return (
            <View key={i}>
              <View style={styles.mg}>
                {mgRange(item)}
                {perKgRange(item)}
              </View>
              <View>{mlRange(item)}</View>
              <View>{notes}</View>
            </View>
          );
        }
      }
    });
  };

  const calculateDosages = (Drugs) => {
    const {
      drugContainer,
      titleContainer,
      drugName,
      drugPrimaryPurpose,
      usesContainer,
    } = styles;

    return Drugs.map((item, i) => {
      // const label = item.label;
      const label = colors.white;
      // const textColor = item.textColor;
      const textColor = "black";
      const border = item.border ? item.border : { borderWidth: 0.2 }; //default border if not specified in the drug object
      // const primaryPurposeUC =
      //   item.primaryPurpose.charAt(0).toUpperCase() +
      //   item.primaryPurpose.slice(1); //upper case the fisrt letter of the primary purpose

      const renderMethod = () => {
        if (item?.uses?.[0]?.method === "bolus") {
          return "IV Bolus";
        } else if (item?.uses?.[0]?.method === "infusion") {
          return "IV Infusion";
        } else if (item?.uses?.[0]?.method === "intramuscular") {
          return "IM Dose";
        } else if (item?.uses?.[0]?.method === "spinal") {
          return "Spinal Dose";
        } else if (item?.uses?.[0]?.method === "epidural") {
          return "Epidural Dose";
        } else if (item?.uses?.[0]?.method === "in") {
          return "Intranasal Dose";
        } else if (item?.uses?.[0]?.method === "rect") {
          return "Rectal Dose";
        } else if (item?.uses?.[0]?.method === "po") {
          return "Oral Dose";
        } else if (item?.uses?.[0]?.method === "im") {
          return "Intramuscular Dose";
        } else if (item?.uses?.[0]?.method === "ett") {
          return "Endotracheal Dose";
        } else if (item?.uses?.[0]?.method === "sq") {
          return "Subcutaneous Dose";
        }
      };

      const title = item.useTradeName
        ? item.tradeName.toUpperCase()
        : item.genericName.toUpperCase(); //select the most used drug name

      // Determine the colors for the LinearGradient
      const gradientColors =
        label === "#F8F4F3" ? [label, "#CBC5C2"] : [label, "#FFFFFF"];

      // Define the shadow styles
      const shadowStyles = {
        // backgroundColor: 'white',
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5, // for Android
      };

      return (
        <View
          key={i}
          // style={shadowStyles}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Purpose", {
                Item: item,
                IBW: IBW,
                Weight: weight,
                age: age,
                context: context,
              });
            }}
          >
            {/* <LinearGradient
              // colors={[label, '#FFFFFF']} // You can adjust the colors as needed
              colors={gradientColors}
              start={{ x: 0.4, y: 0 }}
              end={{ x: 1.5, y: 3 }}
              style={styles.drugContainer}
            > */}
            <View
              key={i}
              // style={[drugContainer, border, { backgroundColor: label }]}
              style={drugContainer}
            >
              <View style={titleContainer}>
                <Text
                  // bold
                  style={[drugName, { color: textColor }]}
                  adjustsFontSizeToFit
                  numberOfLines={1}
                >
                  {title}
                </Text>
                <Text
                  // regular
                  style={[drugPrimaryPurpose, { color: textColor }]}
                >
                  {/* {primaryPurposeUC} */}
                  {item?.uses?.[0]?.purpose} {renderMethod()}
                </Text>
              </View>
              <View style={usesContainer}>{outputUses(item.uses)}</View>
            </View>
            {/* </LinearGradient> */}
          </TouchableOpacity>
        </View>
      );
    });
  };

  const drugsTypeArrAdult = [
    {
      id: 1,
      name: "All",
      image: (
        <AllDrugsIconNew
          width={"70%"}
          height={"70%"}
          fill={selectedIcon?.id === 1 ? "white" : "#0051C6"}
        />
      ),
    },
    {
      id: 9,
      name: "Routine",
      image: (
        <RoutineIconNew
          width={"70%"}
          height={"70%"}
          fill={selectedIcon?.id === 9 ? "white" : "#3C8917"}
        />
      ),
    },
    {
      id: 2,
      name: "Emergency",
      image: (
        <EmergencyIconNew
          width={"70%"}
          height={"70%"}
          fill={selectedIcon?.id === 2 ? "white" : "#DF3A3A"}
        />
      ),
    },
    {
      id: 3,
      name: "pain",
      image: (
        <PainIconNew
          width={"70%"}
          height={"70%"}
          fill={selectedIcon?.id === 3 ? "white" : "#7756BE"}
        />
      ),
    },
    {
      id: 4,
      name: "Vasopressors",
      image: (
        <VasopressorsIconNew
          width={"100%"}
          height={"100%"}
          fill={selectedIcon?.id === 4 ? "white" : "#E9770D"}
        />
      ),
    },
    {
      id: 5,
      name: "Ponv",
      image: (
        <PonvIconNew
          width={"70%"}
          height={"70%"}
          fill={selectedIcon?.id === 5 ? "white" : "#278AE4"}
        />
      ),
    },
    {
      id: 6,
      name: "Antihypertensives",
      image: (
        <AntihypertensivesIconNew
          width={"100%"}
          height={"100%"}
          fill={selectedIcon?.id === 6 ? "white" : "#EE436C"}
        />
      ),
    },
    {
      id: 7,
      name: "Tiva",
      image: (
        <TivaIconNew
          width={"70%"}
          height={"70%"}
          fill={selectedIcon?.id === 7 ? "white" : "#D81B1B"}
        />
      ),
    },
    {
      id: 8,
      name: "Reversal",
      image: (
        <ReversalIconNew
          width={"70%"}
          height={"70%"}
          fill={selectedIcon?.id === 8 ? "white" : "#3C8917"}
        />
      ),
    },
  ];

  const drugsTypeArrPediatric = [
    {
      id: 1,
      name: "All",
      image: (
        <AllDrugsIconNew
          width={"70%"}
          height={"70%"}
          fill={selectedIcon?.id === 1 ? "white" : "#0051C6"}
        />
      ),
    },
    {
      id: 9,
      name: "Routine",
      image: (
        <RoutineIconNew
          width={"70%"}
          height={"70%"}
          fill={selectedIcon?.id === 9 ? "white" : "#3C8917"}
        />
      ),
    },
    {
      id: 2,
      name: "Emergency",
      image: (
        <EmergencyIconNew
          width={"70%"}
          height={"70%"}
          fill={selectedIcon?.id === 2 ? "white" : "#DF3A3A"}
        />
      ),
    },
    {
      id: 3,
      name: "pain",
      image: (
        <PainIconNew
          width={"70%"}
          height={"70%"}
          fill={selectedIcon?.id === 3 ? "white" : "#7756BE"}
        />
      ),
    },
    {
      id: 5,
      name: "Ponv",
      image: (
        <PonvIconNew
          width={"70%"}
          height={"70%"}
          fill={selectedIcon?.id === 5 ? "white" : "#278AE4"}
        />
      ),
    },

    {
      id: 8,
      name: "Reversal",
      image: (
        <ReversalIconNew
          width={"70%"}
          height={"70%"}
          fill={selectedIcon?.id === 8 ? "white" : "#3C8917"}
        />
      ),
    },
    {
      id: 10,
      name: "Premedication",
      image: (
        <PremedicationIconNew
          width={"80%"}
          height={"80%"}
          fill={selectedIcon?.id === 10 ? "white" : "#7756BE"}
        />
      ),
    },
  ];

  const onPressIcon = (item) => {
    if (item?.id === selectedIcon?.id) {
      setSelectedIcon({
        id: 1,
        name: "All",
        image: <></>,
      });
      _filterDrugsByCategory({ id: 1, name: "All" });
    } else if (item?.id === 1) {
      setFilterDrugsData(drugs);
      setSelectedIcon(item);
      _filterDrugsByCategory(item);
    } else {
      setSelectedIcon(item);
      _filterDrugsByCategory(item);
    }
  };

  // Drugs_By_Category_filter
  function _filterDrugsByCategory(category) {
    return new Promise((resolve, reject) => {
      const filteredDrugs = [];
      if (category?.name.toLowerCase() === "all") {
        filteredDrugs.push(...drugs);
      } else {
        DrugsCategories[category?.name.toLowerCase()]?.map((i) => {
          drugs.map((drug) => {
            const usesData = [];
            drug?.uses?.map((use) => {
              if (use?.uid === i) {
                usesData.push({ ...use, topLevel: true });
              }
            });
            if (usesData?.length > 0) {
              const drugData = {
                tradeName: drug?.tradeName,
                useTradeName: drug?.useTradeName,
                genericName: drug?.genericName,
                label: drug?.label,
                textColor: drug?.textColor,
                appLink: drug?.appLink,
                uses: [...usesData],
              };
              filteredDrugs.push(drugData);
            }
          });
        });
      }
      if (filteredDrugs.length > 0) {
        // Create an object to store merged data
        const mergedData = {};
        // Loop through your data
        filteredDrugs.forEach((drug) => {
          const { genericName, uses } = drug;
          if (!mergedData[genericName]) {
            // If the genericName is not in mergedData, create a new entry
            mergedData[genericName] = {
              ...drug,
            };
          } else {
            // If the genericName is already in mergedData, merge the uses
            mergedData[genericName].uses = [
              ...mergedData[genericName].uses,
              ...uses.map((use) => ({ ...use, topLevel: false })),
            ];
          }
        });
        const mergedArray = Object.values(mergedData);
        setFilterDrugsData(mergedArray);
        resolve(mergedArray);
      } else {
        reject(new Error("No drugs found for the specified category"));
      }
    });
  }

  let drugsTypeFilterr =
    context === "adult" ? drugsTypeArrAdult : drugsTypeArrPediatric;

  return (
    <Block flex={1} color={colors.white}>
      <Header
        headerTitle={"Dosages"}
        isBackIcon={true}
        _onPressBack={() => {
          navigation.goBack();
        }}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerContentStyle}
      >
        {drugsTypeFilterr?.map((item, index) => {
          return (
            <View
              key={item?.id}
              style={[
                {
                  marginVertical: perfectSize(10),
                  marginRight: perfectSize(10),
                },
              ]}
            >
              <TouchableOpacity
                key={index}
                style={{
                  height: perfectSize(35),
                  paddingHorizontal: perfectSize(8),
                  paddingVertical: perfectSize(5),
                }}
                onPress={() => {
                  onPressIcon(item);
                }}
              >
                <Text
                  style={{
                    fontSize: responsiveScale(20),
                    textTransform: "capitalize",
                    color:
                      selectedIcon?.id === item?.id
                        ? colors.drugThemeColor
                        : "black",
                  }}
                >
                  {item?.name}
                </Text>
                {selectedIcon?.id === item?.id ? (
                  <View style={{ alignItems: "center" }}>
                    <PolygonIcon
                      height={perfectSize(25)}
                      width={perfectSize(25)}
                    />
                  </View>
                ) : null}
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      <View
        style={{
          borderBottomColor: "#CACACA",
          borderBottomWidth: 1,
          marginBottom: perfectSize(10),
        }}
      />

      {/* <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerContentStyle}
      >
        {drugsTypeFilterr?.map((item, index) => {
          return (
            <View
              key={item?.id}
              style={[
                {
                  marginVertical: perfectSize(10),
                  marginRight: perfectSize(10),
                },
              ]}
            >
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  // padding: perfectSize(5),
                  paddingHorizontal: perfectSize(8),
                  paddingVertical: perfectSize(5),
                  borderRadius: perfectSize(7),
                  borderWidth: perfectSize(0.5),
                  borderColor: "#D2D2D2",
                  backgroundColor:
                    selectedIcon?.id === item?.id ? "#0051C6" : "white",
                }}
                onPress={() => {
                  onPressIcon(item);
                }}
              >
                <View style={styles.drgsTypeImageView}>{item.image}</View>
                <Text
                  style={{
                    ...styles.drugsTypeTitle,
                    color:
                      selectedIcon?.id === item?.id
                        ? "white"
                        : item?.id === 1
                        ? "#0051C6"
                        : item?.id === 9
                        ? "#3C8917"
                        : item?.id === 2
                        ? "#DF3A3A"
                        : item?.id === 3
                        ? "#7756BE"
                        : item.id === 4
                        ? "#E9770D"
                        : item.id === 5
                        ? "#278AE4"
                        : item?.id === 6
                        ? "#EE436C"
                        : item?.id === 7
                        ? "#D81B1B"
                        : item?.id === 8
                        ? "#3C8917"
                        : item?.id === 10
                        ? "#7756BE"
                        : "",
                  }}
                >
                  {item?.name}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView> */}

      <FlatList
        data={filterDrugsData}
        renderItem={({ item, index }) => calculateDosages([item])}
        keyExtractor={(item, index) => index.toString()} // Provide a unique key for each item
        // Other FlatList props as needed
        style={{ height: "100%" }}
      />

      <Block flex={false} padding={[0, 0, insets.bottom - perfectSize(20), 0]}>
        <HeaGAMBannerAdder />
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
    flex: 1,
    paddingRight: 20,
  },
  drugName: {
    fontSize: responsiveScale(22),
    fontFamily: font.outfit_Bold,
  },
  drugPrimaryPurpose: {
    top: -5,
    fontSize: responsiveScale(12),
    fontFamily: font.outfit_Regular,
  },
  drugContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // marginBottom: 5,
    // paddingHorizontal: 10,
    borderRadius: perfectSize(7),
    marginHorizontal: perfectSize(20),
    marginTop: perfectSize(7),
    // paddingBottom: perfectSize(3),
    borderColor: colors.drugThemeColor,
    borderWidth: 2,
    padding: perfectSize(10),
  },
  usesContainer: {
    flex: 1.4,
    flexShrink: 1,
  },
  usesText: {
    fontSize: responsiveScale(12),
    fontFamily: font.outfit_Regular,
  },
  notesStyle: {
    fontSize: responsiveScale(10),
    fontFamily: font.outfit_Regular,
  },
  mg: {
    flexDirection: "row",
  },
  containerContentStyle: {
    paddingLeft: perfectSize(15),
    paddingBottom: perfectSize(20),
    // borderBottomColor: "#CACACA",
    // borderBottomWidth: 0.5,
    // marginVertical: perfectSize(5),
  },
  drgsTypeImageView: {
    width: Dimensions.get("screen").width / 6 - 34,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  drugsTypeTitle: {
    fontSize: responsiveScale(16),
    fontFamily: font.outfit_Regular,
    // fontFamily: 'OpenSans',
    // color: 'black',
    // paddingVertical: perfectSize(5),
    textTransform: "capitalize",
    paddingLeft: perfectSize(2),
  },
  titleText: {
    textAlign: "center",
    fontSize: responsiveScale(22),
    marginVertical: perfectSize(3),
    fontFamily: font.outfit_Bold,
    textTransform: "uppercase",
  },
  next: {
    flexDirection: "row",
    alignSelf: "center",
    borderWidth: 1,
    padding: perfectSize(10),
    borderRadius: perfectSize(10),
    marginTop: perfectSize(30),
    borderColor: "grey",
  },
  suggestionText: {
    fontSize: responsiveScale(14),
    fontFamily: font.outfit_Regular,
    // marginTop: 3,
    // marginLeft: 5,
  },
  suggestionTextStyle: {
    textAlign: "center",
    width: "80%",
    alignSelf: "center",
    fontFamily: font.outfit_Medium,
    marginTop: 30,
    fontSize: responsiveScale(16),
  },
});
