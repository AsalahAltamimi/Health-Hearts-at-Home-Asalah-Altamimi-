import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import Loader from "../components/Loader";
import { useData } from "../context/DataContext";
import { useT } from "../context/LanguageContext";

const DevelopmentByAge = () => {
  const { data, loading, error } = useData("general_care");
  const t = useT();

  if (loading) return <Loader />;
  if (error) return <ScrollView contentContainerStyle={styles.container}><Text>{String(error)}</Text></ScrollView>;

  const development = data?.development_by_age || [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>{t("development_by_age")}</Text>
      {development.map((item, idx) => (
        <Card key={idx} style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">{item.age}</Text>
            <Text style={{ marginTop: 8 }}>{item.milestones_en}</Text>
          </Card.Content>
        </Card>
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
  card: {
    marginBottom: 12,
    borderRadius: 12,
  },
});

export default DevelopmentByAge;

