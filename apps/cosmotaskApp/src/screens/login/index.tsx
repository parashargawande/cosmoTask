import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { CommonActions, NavigationProp } from "@react-navigation/native";

import auth from "@react-native-firebase/auth";

import { useApp } from "src/context/appContext";
import { loginWithGoogle } from "src/services/firebase";
interface LoginFormProps {
  readonly email: string;
  readonly setEmail: (email: string) => void;
  readonly password: string;
  readonly setPassword: (password: string) => void;
  readonly onEmailSignIn: () => void;
  readonly onGoogleSignIn: () => void;
  readonly error: string;
  readonly loading: boolean;
  readonly setError: (error: string) => void;
}
interface LoginProps {
  readonly navigation: NavigationProp<any>;
}
function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  onEmailSignIn,
  onGoogleSignIn,
  error,
  loading,
  setError,
}: LoginFormProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setError("");
        }}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={onEmailSignIn}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Signing in..." : "Sign in with Email"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.googleButton]}
        onPress={onGoogleSignIn}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}
export default function Login({ navigation }: LoginProps) {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user } = useApp();

  useEffect(() => {
    if (user) {
      navigation.navigate("RegisterUser");
    }
    setLoading(false);
  }, [user, navigation]);

  const googleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle();
      setLoading(false);
    } catch (error) {
      setError(error.message || "Email Sign-In failed");
      setLoading(false);
    }
  };

  const signInWithEmail = async () => {
    setError("");
    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      setLoading(false);
    } catch (error) {
      setError(error.message || "Email Sign-In failed");
      setPassword("");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>CosmicTask</Text>
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onEmailSignIn={signInWithEmail}
        onGoogleSignIn={googleLogin}
        error={error}
        loading={loading}
        setError={setError}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
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
    backgroundColor: "#fff",
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
    color: "#222f3e",
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
