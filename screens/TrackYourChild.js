import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import CardItem from "../components/CardItem";
import { useT } from "../context/LanguageContext";

const TrackYourChild = () => {
  const navigation = useNavigation();
  const t = useT();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>{t("track_child_title")}</Text>

      <CardItem
        title={t("feeding")}
        description={t("track_feeding_description")}
        icon="baby-bottle"
        onPress={() => navigation.navigate("TrackFeeding")}
        rightActionIcon="chevron-right"
      />

      <CardItem
        title={t("weight")}
        description={t("track_weight_description")}
        icon="scale-bathroom"
        onPress={() => navigation.navigate("TrackWeight")}
        rightActionIcon="chevron-right"
      />

      <CardItem
        title={t("blood_pressure")}
        description={t("track_blood_pressure_description")}
        icon="heart-pulse"
        onPress={() => navigation.navigate("TrackBloodPressure")}
        rightActionIcon="chevron-right"
      />

      <CardItem
        title={t("pulse_ox")}
        description={t("track_pulse_ox_description")}
        icon="pulse"
        onPress={() => navigation.navigate("TrackPulseOx")}
        rightActionIcon="chevron-right"
      />

      <CardItem
        title={t("view_charts")}
        description={t("view_charts_description")}
        icon="chart-line"
        onPress={() => navigation.navigate("Charts")}
        rightActionIcon="chevron-right"
      />

      <CardItem
        title={t("export_data")}
        description={t("export_data_description")}
        icon="download"
        onPress={() => navigation.navigate("ExportData")}
        rightActionIcon="chevron-right"
      />
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

export default TrackYourChild;
