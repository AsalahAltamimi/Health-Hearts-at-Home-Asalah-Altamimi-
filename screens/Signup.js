import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert, Image } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { useT } from "../context/LanguageContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const t = useT();
  const navigation = useNavigation();

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", t("validation_error"));
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", t("password_too_short"));
      return;
    }

    setLoading(true);
    try {
      await signup(email, password);
    } catch (error) {
      Alert.alert("Error", error.message || t("signup_error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require("../assets/images/icon.png")} style={styles.logo} />
      <Text variant="headlineMedium" style={styles.title}>{t("signup")}</Text>
      <TextInput label={t("email")} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" style={styles.input} mode="outlined" />
      <TextInput label={t("password")} value={password} onChangeText={setPassword} secureTextEntry style={styles.input} mode="outlined" />
      <TextInput label={t("confirm_password")} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry style={styles.input} mode="outlined" />
      <Button mode="contained" onPress={handleSignup} style={styles.button} disabled={loading}>
        {loading ? "Loading..." : t("signup")}
      </Button>
      <Button mode="text" onPress={() => navigation.navigate("Login")} style={styles.link}>{t("have_account")} {t("login")}</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    backgroundColor: "#F4F4F4",
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 24,
  },
  title: {
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 8,
  },
  link: {
    marginTop: 16,
  },
});

export default Signup;

