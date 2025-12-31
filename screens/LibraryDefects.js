import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text, Card } from "react-native-paper";
import Loader from "../components/Loader";
import { useData } from "../context/DataContext";
import { useLanguage, useT } from "../context/LanguageContext";

const LibraryDefects = () => {
  const { data, loading, error } = useData("about_chd");
  const { language } = useLanguage();
  const t = useT();

  if (loading) return <Loader />;
  if (error) return <ScrollView contentContainerStyle={styles.container}><Text>{String(error)}</Text></ScrollView>;

  const library = data?.library || [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>{t("library_defects")}</Text>
      {library.map((item) => (
        <Card key={item.id} style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">{language === "ar" ? item.defect_ar : item.defect_en}</Text>
            <Text style={{ marginTop: 8 }}>{language === "ar" ? item.description_ar : item.description_en}</Text>
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

export default LibraryDefects;

