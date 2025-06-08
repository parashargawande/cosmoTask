import { StyleSheet } from "react-native";
import { MD3Theme } from "react-native-paper";

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
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
    card: {
      marginBottom: 16,
      borderRadius: 12,
      elevation: 3,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 8,
      textAlign: "center",
      color: theme.colors.primary,
    },
    text: {
      fontSize: 16,
      textAlign: "center",
      color: theme.colors.onSurface,
    },
    listItemContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%",
      paddingHorizontal: 16,
    },
    listItemText: {
      flex: 1,
      textDecorationLine: "none",
      textAlign: "left",
      color: theme.colors.onSurface,
    },
    label: {
      fontSize: 14,
      fontWeight: "bold",
      color: theme.colors.primary,
      marginRight: 8,
    },
    value: {
      fontSize: 14,
      color: theme.colors.onSurface,
    },
    location: {
      fontSize: 12,
      color: theme.colors.onSurfaceVariant,
      marginTop: 8,
      textAlign: "center",
    },
  });
