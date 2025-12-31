import React from "react";
import { ScrollView, StyleSheet, Linking } from "react-native";
import { Text } from "react-native-paper";
import CardItem from "../components/CardItem";
import Loader from "../components/Loader";
import { useData } from "../context/DataContext";
import { useLanguage, useT } from "../context/LanguageContext";

const HospitalWeblinks = () => {
  const { data, loading, error } = useData("hospital");
  const { language } = useLanguage();
  const t = useT();

  if (loading) return <Loader />;
  if (error) return <ScrollView contentContainerStyle={styles.container}><Text>{String(error)}</Text></ScrollView>;

  const weblinks = data?.weblinks || [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>{t("weblinks")}</Text>
      {weblinks.map((link, idx) => (
        <CardItem
          key={idx}
          title={language === "ar" ? link.title_ar : link.title_en}
          description={link.url}
          icon="web"
          onPress={() => Linking.openURL(link.url)}
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

export default HospitalWeblinks;

