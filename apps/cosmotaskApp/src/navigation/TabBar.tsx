import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { MD3Theme, useTheme } from "react-native-paper";

export default function MyTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { colors, dark }: MD3Theme = useTheme();

  return (
    <View
      style={[
        styles.tabBar,
        {
          backgroundColor: dark ? colors.surface : colors.background,
        },
      ]}
    >
      {state.routes
        .map((route, index) => {
          const { options } = descriptors[route.key];

          if (options.tabBarLabel === "") return null;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };
          const color = isFocused ? colors.primary : colors.secondary;
          const size = 24;

          const label =
            typeof options.tabBarLabel === "function"
              ? options.tabBarLabel({
                  focused: isFocused,
                  color,
                  position: "below-icon",
                  children: route.name,
                })
              : options.tabBarLabel ?? options.title ?? route.name;
          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabItem}
              android_ripple={{ color: colors.primary }}
            >
              {options.tabBarIcon?.({ focused: isFocused, color, size })}
              <Text
                style={{ color: isFocused ? colors.primary : colors.secondary }}
              >
                {String(label)}
              </Text>
            </Pressable>
          );
        })
        .filter(Boolean)}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    height: 60,
    elevation: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
