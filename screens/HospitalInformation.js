import React from "react";
import { ScrollView, StyleSheet, Linking } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import CardItem from "../components/CardItem";
import Loader from "../components/Loader";
import { useData } from "../context/DataContext";
import { useLanguage, useT } from "../context/LanguageContext";

const HospitalInformation = () => {
  const { data, loading, error } = useData("hospital");
  const { language } = useLanguage();
  const t = useT();
  const navigation = useNavigation();

  if (loading) return <Loader />;
  if (error) return <ScrollView contentContainerStyle={styles.container}><Text>{String(error)}</Text></ScrollView>;

  const info = data || {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>{t("hospital_title")}</Text>

      <CardItem
        title={t("weblinks")}
        description={`${info.weblinks?.length || 0} links`}
        icon="web"
        onPress={() => navigation.navigate("HospitalWeblinks")}
        rightActionIcon="chevron-right"
      />

      <CardItem
        title={t("area_map")}
        description="Hospital campus map"
        icon="map"
        onPress={() => Linking.openURL(info.map_link)}
        rightActionIcon="open-in-new"
      />

      <CardItem
        title={t("hospital_showers")}
        description={info.showers?.location_en || "Shower facilities"}
        icon="shower"
        onPress={() => navigation.navigate("HospitalShowers")}
        rightActionIcon="chevron-right"
      />

      <CardItem
        title={t("cafeteria_menu")}
        description={info.cafeteria?.hours || info.cafeteria_hours}
        icon="food"
        onPress={() => navigation.navigate("CafeteriaMenu")}
        rightActionIcon="chevron-right"
      />

      <CardItem
        title={t("follow_ups")}
        description={t("schedule_appointments")}
        icon="calendar"
        onPress={() => navigation.navigate("FollowUps")}
        rightActionIcon="chevron-right"
      />

      <CardItem
        title={t("hospital_details")}
        description={t("view_full_details")}
        icon="information"
        onPress={() => navigation.navigate("HospitalDetails")}
        rightActionIcon="chevron-right"
      />

      <CardItem title={info.name} description={`${t("contact_numbers")}: ${(info.contacts || []).join(", ")}`} icon="hospital-building" />
      <CardItem title={t("emergency_contacts")} description={(info.emergency_contacts || []).join(", ")} icon="alert" />
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

export default HospitalInformation;
