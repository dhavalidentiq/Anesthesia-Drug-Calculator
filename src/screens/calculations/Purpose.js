import { useState } from "react";
import Header from "../../components/Header";
import Block from "../../components/utilities/Block";
import { colors, font, perfectSize } from "../../styles/theme";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "../../components/utilities/Text";
import PurposeItemView from "../../components/PurposeItemView";

const _spacing = 20;

const Purpose = ({ navigation, route }) => {
  const [usesData, setUsesData] = useState(route.params.Item);
  let TopTitleName = usesData?.genericName;
  let UnderTitleName =
    usesData?.tradeName?.charAt(0)?.toUpperCase() +
    usesData?.tradeName?.slice(1)?.toLowerCase();
  let IBW = route.params.IBW;
  let Weight = route.params.Weight;
  let age = route.params?.age;
  let context = route?.params?.context;

  return (
    <Block flex={1} color={colors.white}>
      <Header
        headerTitle={"Purpose"}
        isBackIcon={true}
        _onPressBack={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 30,
          paddingBottom: _spacing,
          // backgroundColor: backgroundColor,
        }}
      >
        <View style={styles.title_view}>
          <Text style={[styles.title]} numberOfLines={1} adjustsFontSizeToFit>
            {TopTitleName}
          </Text>
          <Text style={[styles.underTitleName]}>{`(${UnderTitleName})`}</Text>
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 30,
          }}
        ></View>

        {usesData?.uses.map((item, index) => {
          if (!item?.minAge || age < item.minAge) {
            return (
              <PurposeItemView
                item={item}
                key={index}
                index={index}
                length={usesData?.uses.length}
                IBW={IBW}
                Weight={Weight}
                bgColor={usesData?.label}
                textColor={usesData?.textColor}
                title={usesData?.primaryPurpose}
              />
            );
          } else {
            return null;
          }
        })}
      </ScrollView>
    </Block>
  );
};
export default Purpose;
const styles = StyleSheet.create({
  title_view: {
    alignItems: "center",
    justifyContent: "center",
    // marginBottom: 0,
    marginTop: _spacing,
  },
  title: {
    fontWeight: "700",
    fontSize: perfectSize(35),
    fontFamily: font.outfit_Bold,
    textTransform: "capitalize",
    color: "#000000",
  },
  underTitleName: {
    fontSize: perfectSize(22),
    fontFamily: font.outfit_Regular,
    color: "#949494",
  },
});
