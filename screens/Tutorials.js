import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import CardItem from "../components/CardItem";
import Loader from "../components/Loader";
import { useData } from "../context/DataContext";
import { useLanguage, useT } from "../context/LanguageContext";

const Tutorials = () => {
  const { data, loading, error } = useData("tutorials");
  const { language } = useLanguage();
  const t = useT();
  const navigation = useNavigation();

  if (loading) return <Loader />;
  if (error) return <ScrollView contentContainerStyle={styles.container}><Text>{String(error)}</Text></ScrollView>;

  const categories = data?.categories || [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>{t("tutorials_title")}</Text>
      {categories.map((category) => (
        <CardItem
          key={category.id}
          title={language === "ar" ? category.name_ar : category.name_en}
          description={`${category.tutorials?.length || 0} ${t("tutorials")}`}
          icon="play-circle-outline"
          onPress={() => navigation.navigate("TutorialCategory", { categoryId: category.id, category })}
          rightActionIcon="chevron-right"
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

export default Tutorials;
