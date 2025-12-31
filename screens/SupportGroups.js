import React from "react";
import { ScrollView, StyleSheet, Linking } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import CardItem from "../components/CardItem";
import Loader from "../components/Loader";
import { useData } from "../context/DataContext";
import { useLanguage, useT } from "../context/LanguageContext";

const SupportGroups = () => {
  const { data, loading, error } = useData("caregivers");
  const { language } = useLanguage();
  const t = useT();
  const navigation = useNavigation();

  if (loading) return <Loader />;
  if (error) return <ScrollView contentContainerStyle={styles.container}><Text>{String(error)}</Text></ScrollView>;

  const groups = data?.support_groups || [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>{t("support_groups")}</Text>
      {groups.map((group) => (
        <CardItem
          key={group.id}
          title={language === "ar" ? group.name_ar : group.name_en}
          description={language === "ar" ? group.meeting_info_ar : group.meeting_info_en}
          icon="account-group"
          onPress={() => navigation.navigate("SupportGroupDetail", { group })}
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

export default SupportGroups;

