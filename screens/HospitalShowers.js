import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text, Card } from "react-native-paper";
import Loader from "../components/Loader";
import { useData } from "../context/DataContext";
import { useLanguage, useT } from "../context/LanguageContext";

const HospitalShowers = () => {
  const { data, loading, error } = useData("hospital");
  const { language } = useLanguage();
  const t = useT();

  if (loading) return <Loader />;
  if (error) return <ScrollView contentContainerStyle={styles.container}><Text>{String(error)}</Text></ScrollView>;

  const showers = data?.showers || {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>{t("hospital_showers")}</Text>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">{t("shower_location")}</Text>
          <Text style={{ marginTop: 8 }}>{language === "ar" ? showers.location_ar : showers.location_en}</Text>
          <Text variant="titleMedium" style={{ marginTop: 16 }}>{t("shower_hours")}</Text>
          <Text style={{ marginTop: 8 }}>{showers.hours}</Text>
          <Text style={{ marginTop: 16 }}>{language === "ar" ? showers.notes_ar : showers.notes_en}</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  card: {
    borderRadius: 12,
  },
});

export default HospitalShowers;

