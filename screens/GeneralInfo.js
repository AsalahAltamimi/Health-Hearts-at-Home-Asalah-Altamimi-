import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import CardItem from "../components/CardItem";
import Loader from "../components/Loader";
import { useData } from "../context/DataContext";
import { useLanguage, useT } from "../context/LanguageContext";

const GeneralInfo = () => {
  const { data, loading, error } = useData("general_care");
  const { language } = useLanguage();
  const t = useT();
  const navigation = useNavigation();

  if (loading) return <Loader />;
  if (error) return <ScrollView contentContainerStyle={styles.container}><Text>{String(error)}</Text></ScrollView>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>{t("general_care_title")}</Text>

      <CardItem
        title={t("library_of_info")}
        description={t("age_range")}
        icon="book-open-page-variant"
        onPress={() => navigation.navigate("LibraryOfInfo")}
        rightActionIcon="chevron-right"
      />

      <CardItem
        title={t("development_by_age")}
        description={t("growth_development")}
        icon="chart-line"
        onPress={() => navigation.navigate("DevelopmentByAge")}
        rightActionIcon="chevron-right"
      />

      <CardItem
        title={t("vaccines_info")}
        description={t("vaccination_schedules")}
        icon="needle"
        onPress={() => navigation.navigate("VaccinesInfo")}
        rightActionIcon="chevron-right"
      />

      <CardItem
        title={t("formula_mixes")}
        description="22, 24, 27 kcal"
        icon="baby-bottle"
        onPress={() => navigation.navigate("FormulaMixes")}
        rightActionIcon="chevron-right"
      />

      <CardItem
        title={t("newborn_care_websites")}
        description={t("external_resources")}
        icon="web"
        onPress={() => navigation.navigate("NewbornCareWebsites")}
        rightActionIcon="chevron-right"
      />

      {(data?.sections || []).map((section) => (
        <CardItem
          key={section.id}
          title={language === "ar" ? section.title_ar : section.title_en}
          description={language === "ar" ? section.content_ar : section.content_en}
          icon="information-outline"
          onPress={() => navigation.navigate("GeneralCareDetail", { section })}
          rightActionIcon="chevron-right"
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

export default GeneralInfo;
