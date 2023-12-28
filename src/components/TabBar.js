import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Block from "./utilities/Block";
import { BarButton } from "./BarButton";
import { colors, perfectSize } from "../styles/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaGAMBannerAdder from "./GAMBannerAd";
import { setTabHeight } from "../screens/helpers/auth";

export default function TabBar({ state, descriptors, navigation }) {
  const totalWidth = Dimensions.get("window").width;
  const tabWidth = totalWidth / state.routes.length;
  const [translateValue] = useState(new Animated.Value(0));
  const { bottom } = useSafeAreaInsets();

  const handleLayout = async (event) => {
    const { height } = event.nativeEvent.layout;
    await setTabHeight(height);
  };
  return (
    <Block
      flex={false}
      style={{ position: "absolute", bottom: 0 }}
      onLayout={handleLayout}
    >
      <HeaGAMBannerAdder />
      <Block
        flex={false}
        style={[
          styles.tabContainer,
          {
            width: totalWidth,
            height: perfectSize(75),
            paddingBottom: bottom > 0 ? bottom - perfectSize(20) : bottom,
          },
        ]}
      >
        <Block flex={false} style={{ flexDirection: "row" }}>
          <Animated.View
            style={[
              styles.slider,
              {
                transform: [{ translateX: translateValue }],
                width: tabWidth - perfectSize(20),
              },
            ]}
          />
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const onPress = () => {
              Animated.spring(translateValue, {
                toValue: index * tabWidth,
                velocity: 10,
                useNativeDriver: true,
              }).start();

              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };

            const renderIcon = () => {
              return <BarButton isCurrent={isFocused} options={options} />;
            };
            return (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityStates={isFocused ? ["selected"] : []}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{ flex: 1 }}
                key={index}
              >
                {renderIcon()}
              </TouchableOpacity>
            );
          })}
        </Block>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.0,
    backgroundColor: colors.drugThemeColor,
    // borderTopRightRadius: perfectSize(20),
    // borderTopLeftRadius: perfectSize(20),
    elevation: 10,
    position: "absolute",
    bottom: 0,
  },
  slider: {
    height: 5,
    position: "absolute",
    top: 0,
    left: 10,
    backgroundColor: colors.headerThemeColor,
    borderRadius: perfectSize(20),
    width: perfectSize(50),
  },
});
