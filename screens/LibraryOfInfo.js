import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import CardItem from "../components/CardItem";
import Loader from "../components/Loader";
import { useData } from "../context/DataContext";
import { useLanguage, useT } from "../context/LanguageContext";

const LibraryOfInfo = () => {
  const { data, loading, error } = useData("general_care");
  const { language } = useLanguage();
  const t = useT();

  if (loading) return <Loader />;
  if (error) return <ScrollView contentContainerStyle={styles.container}><Text>{String(error)}</Text></ScrollView>;

  const library = data?.library || [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>{t("library_of_info")}</Text>
      {library.map((item) => (
        <CardItem
          key={item.id}
          title={language === "ar" ? item.title_ar : item.title_en}
          description={`${t("age_range")}: ${language === "ar" ? item.age_range_ar : item.age_range_en}`}
          icon="book-open-page-variant"
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: "#FFFFFF",
  },
});

export default LibraryOfInfo;

