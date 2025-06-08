import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 48,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  label: {
    marginTop: 10,
    marginBottom: 4,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
  pickerButton: {
    padding: 12,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    alignItems: "center",
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
  button: {
    marginTop: 20,
  },
});
