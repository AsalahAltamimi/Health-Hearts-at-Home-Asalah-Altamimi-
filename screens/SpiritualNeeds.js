import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import CardItem from "../components/CardItem";
import Loader from "../components/Loader";
import { useData } from "../context/DataContext";
import { useT } from "../context/LanguageContext";

const SpiritualNeeds = () => {
  const { data, loading, error } = useData("spiritual");
  const t = useT();
  const navigation = useNavigation();

  if (loading) return <Loader />;
  if (error) return <ScrollView contentContainerStyle={styles.container}><Text>{String(error)}</Text></ScrollView>;

  const devotionals = data?.devotionals || [];
  const resources = data?.resources || [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>{t("spiritual_title")}</Text>

      <CardItem
        title={t("devotionals")}
        description={`${devotionals.length} ${t("devotionals")}`}
        icon="movie-open-play-outline"
        onPress={() => navigation.navigate("Devotionals")}
        rightActionIcon="chevron-right"
      />

      <CardItem
        title={t("resources")}
        description={`${resources.length} ${t("resources")}`}
        icon="book-open-variant"
        onPress={() => navigation.navigate("SpiritualResources")}
        rightActionIcon="chevron-right"
      />
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

export default SpiritualNeeds;
