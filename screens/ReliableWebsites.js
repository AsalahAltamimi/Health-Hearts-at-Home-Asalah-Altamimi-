import React from "react";
import { ScrollView, StyleSheet, Linking } from "react-native";
import { Text } from "react-native-paper";
import CardItem from "../components/CardItem";
import Loader from "../components/Loader";
import { useData } from "../context/DataContext";
import { useLanguage, useT } from "../context/LanguageContext";

const ReliableWebsites = () => {
  const { data, loading, error } = useData("about_chd");
  const { language } = useLanguage();
  const t = useT();

  if (loading) return <Loader />;
  if (error) return <ScrollView contentContainerStyle={styles.container}><Text>{String(error)}</Text></ScrollView>;

  const websites = data?.reliable_websites || [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>{t("reliable_websites")}</Text>
      {websites.map((site) => (
        <CardItem
          key={site.id}
          title={language === "ar" ? site.title_ar : site.title_en}
          description={language === "ar" ? site.description_ar : site.description_en}
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
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
});

export default ReliableWebsites;

