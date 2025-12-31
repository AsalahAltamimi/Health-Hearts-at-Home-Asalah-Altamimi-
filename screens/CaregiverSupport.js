import React from "react";
import { ScrollView, StyleSheet, Linking, Alert } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import CardItem from "../components/CardItem";
import Loader from "../components/Loader";
import { useData } from "../context/DataContext";
import { useLanguage, useT } from "../context/LanguageContext";

const CaregiverSupport = () => {
  const { data, loading, error } = useData("caregivers");
  const { language } = useLanguage();
  const t = useT();
  const navigation = useNavigation();

  if (loading) return <Loader />;
  if (error) return <ScrollView contentContainerStyle={styles.container}><Text>{String(error)}</Text></ScrollView>;

  const info = data || {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>{t("caregiver_title")}</Text>

      <CardItem
        title={t("support_groups")}
        description={`${info.support_groups?.length || 0} groups`}
        icon="account-group"
        onPress={() => navigation.navigate("SupportGroups")}
        rightActionIcon="chevron-right"
      />

      <CardItem
        title={t("emergency_contacts_title")}
        description={t("emergency_numbers")}
        icon="alert"
        onPress={() => navigation.navigate("EmergencyContacts")}
        rightActionIcon="chevron-right"
      />

      <CardItem
        title={t("articles")}
        description={`${info.articles?.length || 0} articles`}
        icon="book-open-page-variant"
        onPress={() => navigation.navigate("Articles")}
        rightActionIcon="chevron-right"
      />

      <CardItem
        title={t("patient_stories")}
        description={`${info.stories?.length || 0} stories`}
        icon="book-open-variant"
        onPress={() => navigation.navigate("PatientStories")}
        rightActionIcon="chevron-right"
      />

      {info.extra_hand && (
        <CardItem
          title={t("extra_hand")}
          description={language === "ar" ? info.extra_hand.info_ar : info.extra_hand.info_en}
          icon="hand-heart"
          onPress={() => info.extra_hand.contact && Linking.openURL(`tel:${info.extra_hand.contact}`)}
          rightActionIcon={info.extra_hand.contact ? "phone" : undefined}
        />
      )}

      {info.short_break && (
        <CardItem
          title={t("short_break")}
          description={language === "ar" ? info.short_break.info_ar : info.short_break.info_en}
          icon="clock-outline"
          onPress={() => info.short_break.contact && Linking.openURL(`tel:${info.short_break.contact}`)}
          rightActionIcon={info.short_break.contact ? "phone" : undefined}
        />
      )}

      {info.hotline && (
        <CardItem title={t("hotline")} description={info.hotline} icon="phone" onPress={() => Linking.openURL(`tel:${info.hotline}`)} />
      )}

      {info.community && (
        <CardItem 
          title={t("community")} 
          description={t("join_community")} 
          icon="account-group-outline" 
          onPress={() => Linking.openURL(info.community)} 
          rightActionIcon="open-in-new"
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F4F4F4",
  },
});

export default CaregiverSupport;
