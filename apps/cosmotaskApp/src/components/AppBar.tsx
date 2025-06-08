import React from "react";
import { Appbar, MD3Theme, useTheme } from "react-native-paper";
import { useApp } from "src/context/appContext";

export default function AppBar() {
  const { toggleTheme, isDark } = useApp();
  const { colors, dark }: MD3Theme = useTheme();

  return (
    <Appbar.Header
      style={{
        backgroundColor: dark ? colors.surface : colors.primary, // Use surface for dark mode
      }}
    >
      <Appbar.Content
        title="Cosmic Task"
        titleStyle={{
          color: dark ? colors.onSurface : colors.onPrimary, // Adjust text color
        }}
      />
      <Appbar.Action
        icon={isDark ? "white-balance-sunny" : "moon-waning-crescent"}
        color={dark ? colors.onSurface : colors.onPrimary} // Adjust icon color
        onPress={toggleTheme}
      />
    </Appbar.Header>
  );
}
