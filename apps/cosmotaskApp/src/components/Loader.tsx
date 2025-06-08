import { StyleSheet, View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";

export default function Loader() {
  const theme = useTheme();
  return (
    <View style={[styles.container]}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
