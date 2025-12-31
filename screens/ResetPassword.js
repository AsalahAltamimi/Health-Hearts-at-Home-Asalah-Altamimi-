import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert, Image } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { useT } from "../context/LanguageContext";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const t = useT();
  const navigation = useNavigation();

  const handleReset = async () => {
    if (!email) {
      Alert.alert("Error", t("validation_error"));
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email);
      Alert.alert("Success", t("password_reset_sent"));
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require("../assets/images/icon.png")} style={styles.logo} />
      <Text variant="headlineMedium" style={styles.title}>{t("reset_password")}</Text>
      <Text style={styles.description}>Enter your email address and we'll send you a link to reset your password.</Text>
      <TextInput label={t("email")} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" style={styles.input} mode="outlined" />
      <Button mode="contained" onPress={handleReset} style={styles.button} disabled={loading}>
        {loading ? "Loading..." : t("reset_password")}
      </Button>
      <Button mode="text" onPress={() => navigation.navigate("Login")} style={styles.link}>Back to Login</Button>
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
  description: {
    marginBottom: 16,
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

export default ResetPassword;

