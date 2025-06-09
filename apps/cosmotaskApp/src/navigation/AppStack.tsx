import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import {
  DashboardScreen,
  screenOptions as dashboardScreenOptions,
} from "src/screens/dashboard";
import MyTabBar from "./TabBar";
import {
  TodoScreen,
  screenOptions as todoScreenOptions,
} from "src/screens/todo";
import {
  screenOptions as userAstroProfileScreenOptions,
  AstrologyScreen,
} from "src/screens/astrology";
import {
  screenOptions as settingScreenOptions,
  SettingsScreen,
} from "src/screens/settings";
import {
  SignoutScreen,
  screenOptions as SignoutScreenOptions,
} from "src/screens/signout";
import {
  MyHoroscopeScreen,
  screenOptions as myHoroscopeScreenOptions,
} from "src/screens/horoscope/Horoscope";
import AppBar from "src/components/AppBar";

export default function AppStack() {
  const Tab = createBottomTabNavigator();

  const tabBar = (props) => <MyTabBar {...props} />;
  return (
    <NavigationContainer>
      <AppBar />
      <Tab.Navigator initialRouteName="Dashboard" tabBar={tabBar}>
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={dashboardScreenOptions}
        />
        <Tab.Screen
          name="Todo"
          component={TodoScreen}
          options={todoScreenOptions}
        />
        <Tab.Screen
          name="Astrology"
          component={AstrologyScreen}
          options={userAstroProfileScreenOptions}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={settingScreenOptions}
        />
        <Tab.Screen
          name="Signout"
          component={SignoutScreen}
          options={SignoutScreenOptions}
        />
        <Tab.Screen
          name="MyHoroscope"
          component={MyHoroscopeScreen}
          options={myHoroscopeScreenOptions}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
