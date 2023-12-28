import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Calculations from "../../screens/calculations/Calculations";
import Insulin from "../../screens/calculations/Insulin";
import InsulinInfusion from "../../screens/calculations/InsulinInfusion";
import InsulinClassification from "../../screens/calculations/InsulinClassification";
import InsulinSubq from "../../screens/calculations/InsulinSubq";
import FluidsAdult from "../../screens/Fluids/FluidsAdult";
import FluidDecision from "../../screens/Fluids/FluidDecision";
import CalculationFluid from "../../screens/Fluids/CalculationFluid";
import CalculationDrugs from "../../screens/Drugs/CalculationDrugs";
import CalculationBlood from "../../screens/Blood/CalculationBlood";
import CalculationLocalDecision from "../../screens/Local/CalculationLocalDecision";
import CalculationLocal from "../../screens/Local/CalculationLocal";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "../../components/TabBar";
import { colors, perfectSize } from "../../styles/theme";
import CalculationSelected from "../../assets/appImages/CalculationSelected.svg";
import Calculation from "../../assets/appImages/Calculation.svg";
import Privacy from "../../assets/appImages/Privacy.svg";
import PrivacySelected from "../../assets/appImages/PrivacySelected.svg";
import PrivacyPolicy from "../../screens/privacyPolicy/PrivacyPolicy.js";
import { Keyboard, Platform } from "react-native";
import Purpose from "../../screens/calculations/Purpose";
import BurnsScreen from "../../screens/Burns/BurnsScreen";

const AppStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <AppStack.Navigator initialRouteName={"Calculations"}>
        <AppStack.Screen
          name="HomeScreen"
          component={BottomTabNavigation}
          options={{ headerShown: false }}
        />
        <AppStack.Screen
          name="Insulin"
          component={Insulin}
          options={{ headerShown: false }}
        />

        <AppStack.Screen
          name="InsulinInfusion"
          component={InsulinInfusion}
          options={{ headerShown: false }}
        />

        <AppStack.Screen
          name="InsulinClassification"
          component={InsulinClassification}
          options={{ headerShown: false }}
        />

        <AppStack.Screen
          name="InsulinSubq"
          component={InsulinSubq}
          options={{ headerShown: false }}
        />

        <AppStack.Screen
          name="FluidsAdult"
          component={FluidsAdult}
          options={{ headerShown: false }}
        />

        <AppStack.Screen
          name="FluidDecision"
          component={FluidDecision}
          options={{ headerShown: false }}
        />

        <AppStack.Screen
          name="CalculationFluid"
          component={CalculationFluid}
          options={{ headerShown: false }}
        />

        <AppStack.Screen
          name="CalculationDrugs"
          component={CalculationDrugs}
          options={{ headerShown: false }}
        />

        <AppStack.Screen
          name="CalculationBlood"
          component={CalculationBlood}
          options={{ headerShown: false }}
        />

        <AppStack.Screen
          name="CalculationLocalDecision"
          component={CalculationLocalDecision}
          options={{ headerShown: false }}
        />

        <AppStack.Screen
          name="CalculationLocal"
          component={CalculationLocal}
          options={{ headerShown: false }}
        />

        <AppStack.Screen
          name="Purpose"
          component={Purpose}
          options={{ headerShown: false }}
        />
        <AppStack.Screen
          name="BurnsScreen"
          component={BurnsScreen}
          options={{ headerShown: false }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

const BottomTabNavigation = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (Platform.OS === "android") {
      const keyboardDidShowListener = Keyboard.addListener(
        "keyboardDidShow",
        () => setVisible(false)
      );
      const keyboardDidHideListener = Keyboard.addListener(
        "keyboardDidHide",
        () => setVisible(true)
      );

      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }
  }, []);
  return (
    <Tab.Navigator
      backgroundColor={colors.white}
      initialRouteName="Calculations"
      screenOptions={{
        tabBarActiveBackgroundColor: colors.white,
        tabBarInactiveBackgroundColor: colors.white,
        tabBarStyle: {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,

          elevation: 24,
        },
      }}
      tabBar={(props) => (visible ? <TabBar {...props} /> : null)}
    >
      <Tab.Screen
        name="Calculations"
        component={Calculations}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <>
                {focused ? (
                  <CalculationSelected
                    width={perfectSize(40)}
                    height={perfectSize(40)}
                  />
                ) : (
                  <Calculation
                    width={perfectSize(40)}
                    height={perfectSize(40)}
                  />
                )}
              </>
            );
          },
          tabBarLabel: "Calculations",
        }}
      />
      <Tab.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <>
                {focused ? (
                  <PrivacySelected
                    width={perfectSize(40)}
                    height={perfectSize(40)}
                  />
                ) : (
                  <Privacy width={perfectSize(40)} height={perfectSize(40)} />
                )}
              </>
            );
          },
          tabBarLabel: "PrivacyPolicy",
        }}
      />
    </Tab.Navigator>
  );
};
