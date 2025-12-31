import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text, Card } from "react-native-paper";
import Loader from "../components/Loader";
import { useData } from "../context/DataContext";
import { useLanguage, useT } from "../context/LanguageContext";

const CHDMedications = () => {
  const { data, loading, error } = useData("about_chd");
  const { language } = useLanguage();
  const t = useT();

  if (loading) return <Loader />;
  if (error) return <ScrollView contentContainerStyle={styles.container}><Text>{String(error)}</Text></ScrollView>;

  const medications = data?.medications || [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>{t("medications")}</Text>
      {medications.map((med) => (
        <Card key={med.id} style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">{language === "ar" ? med.name_ar : med.name_en}</Text>
            <Text style={{ marginTop: 8 }}>{t("medication_info")}: {language === "ar" ? med.purpose_ar : med.purpose_en}</Text>
          </Card.Content>
        </Card>
      ))}
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
    marginBottom: 12,
    borderRadius: 12,
  },
});

export default CHDMedications;

