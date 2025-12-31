import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import Loader from "../components/Loader";
import { useData } from "../context/DataContext";
import { useLanguage, useT } from "../context/LanguageContext";

const FormulaMixes = () => {
  const { data, loading, error } = useData("general_care");
  const { language } = useLanguage();
  const t = useT();

  if (loading) return <Loader />;
  if (error) return <ScrollView contentContainerStyle={styles.container}><Text>{String(error)}</Text></ScrollView>;

  const formulas = data?.formula_mixes || [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>{t("formula_mixes")}</Text>
      {formulas.map((formula, idx) => (
        <Card key={idx} style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">{formula.kcal} {t("formula_22kcal").replace("22", formula.kcal.toString())}</Text>
            <Text style={{ marginTop: 8 }}>{language === "ar" ? formula.instructions_ar : formula.instructions_en}</Text>
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

export default FormulaMixes;

