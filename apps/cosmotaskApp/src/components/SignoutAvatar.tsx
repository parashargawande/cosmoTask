import { Image, StyleSheet } from "react-native";
import { useApp } from "src/context/appContext";

function SignoutAvatar() {
  const { user } = useApp();
  return (
    <Image
      source={{
        uri: user?.photoURL || "https://via.placeholder.com/40", // fallback image
      }}
      style={[styles.avatar, { width: 24, height: 24, borderRadius: 24 / 2 }]}
    />
  );
}

const styles = StyleSheet.create({
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
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "#eee",
  },
});

export default SignoutAvatar;
