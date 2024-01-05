// import React from "react";
// import { TouchableOpacity, View } from "react-native";
// import { StyleSheet } from "react-native";
// import Text from "./utilities/Text";
// import { colors, font, perfectSize } from "../styles/theme";
// import { responsiveScale } from "../styles/mixins";

// // type BurnsAnteriorAndPosteriorSwitch = {
// //   textColor: string,
// //   segmentTabBackgroundColor: string,
// //   backgroundColor: string,
// //   isFrontSide: boolean,
// //   toggleSwitch: (val: string) => void,
// // };

// const BurnsAnteriorAndPosteriorSwitch = (props) => {
//   const {
//     textColor,
//     segmentTabBackgroundColor,
//     isFrontSide,
//     backgroundColor,
//     toggleSwitch = () => {},
//   } = props;

//   return (
//     <View
//       style={[
//         styles.switchMainView,
//         {
//           //   backgroundColor: segmentTabBackgroundColor,
//         },
//       ]}
//     >
//       <TouchableOpacity
//         onPress={() => toggleSwitch("Anterior")}
//         style={[
//           styles.anteriorView,
//           {
//             backgroundColor: isFrontSide ? "#0068FF" : "#FFFFFF",
//           },
//         ]}
//       >
//         <Text
//           style={[
//             styles.tab,
//             { color: isFrontSide ? colors.white : colors.black },
//           ]}
//         >
//           Anterior
//         </Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={() => toggleSwitch("Posterior")}
//         style={[
//           styles.anteriorView,
//           {
//             backgroundColor: !isFrontSide ? "#0068FF" : "#FFFFFF",
//           },
//         ]}
//       >
//         <Text
//           style={[
//             styles.tab,
//             { color: !isFrontSide ? colors.white : colors.black },
//           ]}
//         >
//           Posterior
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   switchMainView: {
//     // flex: 1,
//     // width: 350,
//     // height: 35,
//     // marginVertical: 0,
//     // flexDirection: 'row',
//     // borderRadius: 8,
//     // alignSelf: 'center',
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: perfectSize(10),
//     alignItems: "center",
//     gap: perfectSize(25),
//   },
//   anteriorView: {
//     flex: 1,
//     alignItems: "center",
//     borderColor: "#C6DCFF",
//     borderWidth: 2,
//     borderRadius: perfectSize(25),
//     paddingVertical: perfectSize(7),
//     // justifyContent: 'center',
//   },
//   tab: {
//     fontSize: responsiveScale(20),
//     fontFamily: font.outfit_Medium,
//     // padding: perfectSize(5),
//   },
// });

// export default BurnsAnteriorAndPosteriorSwitch;
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import Text from "./utilities/Text";
import { colors, perfectSize } from "../styles/theme";
import { responsiveScale } from "../styles/mixins";

// type BurnsAnteriorAndPosteriorSwitch = {
//   textColor: string,
//   segmentTabBackgroundColor: string,
//   backgroundColor: string,
//   isFrontSide: boolean,
//   toggleSwitch: (val: string) => void,
// };

const BurnsAnteriorAndPosteriorSwitch = (props) => {
  const {
    textColor,
    segmentTabBackgroundColor,
    isFrontSide,
    backgroundColor,
    toggleSwitch = () => {},
  } = props;

  return (
    <View
      style={[
        styles.switchMainView,
        {
          backgroundColor: segmentTabBackgroundColor,
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => toggleSwitch("Anterior")}
        style={[
          styles.anteriorView,
          {
            backgroundColor: isFrontSide ? backgroundColor : undefined,
          },
        ]}
      >
        <Text
          regular
          style={[
            styles.tab,
            { color: isFrontSide ? colors.black : colors.white },
          ]}
        >
          Anterior
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => toggleSwitch("Posterior")}
        style={[
          styles.anteriorView,
          {
            backgroundColor: !isFrontSide ? backgroundColor : undefined,
          },
        ]}
      >
        <Text
          regular
          style={[
            styles.tab,
            { color: !isFrontSide ? colors.black : colors.white },
          ]}
        >
          Posterior
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  switchMainView: {
    width: "70%",
    height: 40,
    marginVertical: perfectSize(10),
    flexDirection: "row",
    borderRadius: perfectSize(8),
    alignSelf: "center",
  },
  anteriorView: {
    flex: 1,
    margin: perfectSize(2),
    borderRadius: perfectSize(8),
    justifyContent: "center",
    alignItems: "center",
  },
  tab: {
    fontSize: responsiveScale(20),
  },
});

export default BurnsAnteriorAndPosteriorSwitch;
