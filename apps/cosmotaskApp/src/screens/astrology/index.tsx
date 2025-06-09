import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import TodaysHoroscope from "./TodaysHoroscope";
import VedicDate from "./VedicDate";

export function Astrology() {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: theme.colors.background,
      }}
    >
      <VedicDate />
      <TodaysHoroscope />
    </View>
  );
}

interface TabBarIconProps {
  color: string;
  size: number;
}

const screenOptions = {
  headerShown: false,
  tabBarIcon: ({ color, size }: TabBarIconProps) => (
    <Icon name="auto-awesome" size={size} color={color} />
  ),
};

export { Astrology as AstrologyScreen, screenOptions };
