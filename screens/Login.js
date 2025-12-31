import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert, Image } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { useT } from "../context/LanguageContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const t = useT();
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", t("validation_error"));
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      Alert.alert("Error", error.message || t("login_error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require("../assets/images/icon.png")} style={styles.logo} />
      <Text variant="headlineMedium" style={styles.title}>{t("login")}</Text>
      <TextInput label={t("email")} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" style={styles.input} mode="outlined" />
      <TextInput label={t("password")} value={password} onChangeText={setPassword} secureTextEntry style={styles.input} mode="outlined" />
      <Button mode="text" onPress={() => navigation.navigate("ResetPassword")} style={styles.forgot}>{t("forgot_password")}</Button>
      <Button mode="contained" onPress={handleLogin} style={styles.button} disabled={loading}>
        {loading ? "Loading..." : t("login")}
      </Button>
      <Button mode="text" onPress={() => navigation.navigate("Signup")} style={styles.link}>{t("no_account")} {t("signup")}</Button>
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
  forgot: {
    alignSelf: "flex-end",
    marginBottom: 8,
  },
  link: {
    marginTop: 16,
  },
});

export default Login;

