import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Card, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

export function UserAstroProfile() {
  const theme = useTheme();
  const horoscope =
    "Today is a great day to focus on personal growth and relationships.";
  const westernDate = "May 11, 2025";
  const indianDate = "Vaisakha 21, 1947 (Vikram Samvat)";

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={{ paddingBottom: 16 }}
    >
      <Card style={styles.card}>
        <Card.Content>
          <Text style={[styles.label, { color: theme.colors.onSurface }]}>
            Tithi (Vedic Date)
          </Text>
          <Text
            style={[styles.value, { color: theme.colors.onSurfaceVariant }]}
          >
            {indianDate}
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 3,
  },
  cardContentRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTextContainer: {
    marginLeft: 16,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  horoscopeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  horoscopeText: {
    fontSize: 16,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  location: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    marginTop: 4,
  },
  modalContainer: {
    // backgroundColor: "white",
    opacity: 1,
    padding: 20,
    margin: 20,
    borderRadius: 12,
  },
});

const screenOptions = {
  headerShown: false,
  tabBarIcon: ({ color, size }) => (
    <Icon name={"auto-awesome"} size={size} color={color} />
  ),
};

export { screenOptions, UserAstroProfile as UserAstroProfileScreen };
