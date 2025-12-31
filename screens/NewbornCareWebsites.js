import React from "react";
import { Linking, ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import CardItem from "../components/CardItem";
import Loader from "../components/Loader";
import { useData } from "../context/DataContext";
import { useLanguage, useT } from "../context/LanguageContext";

const NewbornCareWebsites = () => {
  const { data, loading, error } = useData("general_care");
  const { language } = useLanguage();
  const t = useT();

  if (loading) return <Loader />;
  if (error) return <ScrollView contentContainerStyle={styles.container}><Text>{String(error)}</Text></ScrollView>;

  const websites = data?.websites || [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>{t("newborn_care_websites")}</Text>
      {websites.map((site, idx) => (
        <CardItem
          key={idx}
          title={language === "ar" ? site.title_ar : site.title_en}
          description={site.url}
          icon="web"
          onPress={() => Linking.openURL(site.url)}
          rightActionIcon="open-in-new"
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

export default NewbornCareWebsites;

