import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Card, useTheme } from "react-native-paper";

export default function VedicDate() {
  const theme = useTheme();
  const indianDate = "Vaisakha 21, 1947 (Vikram Samvat)";

  return (
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
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 8,
    borderRadius: 12,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
    marginTop: 4,
  },
});
