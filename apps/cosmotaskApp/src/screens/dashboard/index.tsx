import React, { useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import KaalTiming from "./kaalTiming/KaalTiming";
import TodayTasks from "./todayTasks/TodayTasks";

interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
}

const DashboardScreen: React.FC = () => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={styles.pageContainer}
    >
      <View style={styles.container}>
        {/* <TodaysHoroscope /> */}
        <TodayTasks />
        <KaalTiming />
      </View>
    </ScrollView>
  );
};

const createStyles = (theme: any) => StyleSheet.create({
  pageContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

const screenOptions = {
  headerShown: false,
  tabBarIcon: ({ focused, color, size }: TabBarIconProps) => (
    <Icon name="home" size={size} color={color} />
  ),
};

export { DashboardScreen, screenOptions };

