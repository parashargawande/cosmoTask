import { CommonActions } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useApp } from "../../context/appContext";
import { signOutUser } from "../../services/firebase";

export default function Signout({ navigation }) {
  const { user } = useApp();
  const theme = useTheme();
  const [loader, setLoader] = useState(false);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surfaceVariant,
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
    },
    appName: {
      fontSize: 32,
      fontWeight: "bold",
      color: "#3b3b98",
      marginBottom: 32,
      letterSpacing: 2,
    },
    card: {
      width: 320,
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 24,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
      alignItems: "center",
    },
    title: {
      fontSize: 22,
      fontWeight: "600",
      marginBottom: 16,
      color: theme.colors.onSurface,
    },
    input: {
      width: "100%",
      height: 44,
      borderColor: "#d1d8e0",
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 12,
      paddingHorizontal: 12,
      fontSize: 16,
      backgroundColor: "#f7faff",
    },
    button: {
      width: "100%",
      backgroundColor: "#3b3b98",
      paddingVertical: 12,
      borderRadius: 8,
      marginTop: 8,
      alignItems: "center",
    },
    googleButton: {
      backgroundColor: "#ea4335",
    },
    buttonText: {
      color: "#fff",
      fontWeight: "600",
      fontSize: 16,
    },
    error: {
      color: "#e74c3c",
      marginTop: 12,
      fontWeight: "500",
      textAlign: "center",
    },
    avatar: {
      width: 70,
      height: 70,
      borderRadius: 35,
      margin: 16,
      borderWidth: 2,
      borderColor: "#3b3b98",
    },
  });

  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
    setLoader(false);
  }, [user]);

  const signOutLoggedUser = async () => {
    setLoader(true);
    const success = await signOutUser();
    if (success) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    }
    setLoader(false);
  };
  if (!user || loader) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome, {user.displayName}</Text>
        {user.photoURL && (
          <Image source={{ uri: user.photoURL }} style={styles.avatar} />
        )}
        <TouchableOpacity style={styles.button} onPress={signOutLoggedUser}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const screenOptions = {
  tabBarLabel: "",
  headerShown: false,
};
export { screenOptions, Signout as SignoutScreen };

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
