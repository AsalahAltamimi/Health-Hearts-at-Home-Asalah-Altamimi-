import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text, Card } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { useLanguage, useT } from "../context/LanguageContext";

const GeneralCareDetail = () => {
  const route = useRoute();
  const { section } = route.params || {};
  const { language } = useLanguage();
  const t = useT();

  if (!section) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text>{t("section_not_found")}</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card} mode="outlined">
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            {language === "ar" ? section.title_ar : section.title_en}
          </Text>
          <Text variant="bodyLarge" style={styles.content}>
            {language === "ar" ? section.content_ar : section.content_en}
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: "#F4F4F4",
  },
  card: {
    borderRadius: 12,
    elevation: 2,
    backgroundColor: "#FFFFFF",
  },
  title: {
    marginBottom: 16,
    fontWeight: "600",
    color: "#34495E",
  },
  content: {
    color: "#7F8C8D",
    lineHeight: 24,
  },
});

export default GeneralCareDetail;
