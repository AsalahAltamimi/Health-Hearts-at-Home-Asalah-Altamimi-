import React from "react";
import { ScrollView, StyleSheet, Image, Linking } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import CardItem from "../components/CardItem";
import Loader from "../components/Loader";
import { useData } from "../context/DataContext";
import { useLanguage, useT } from "../context/LanguageContext";

const AboutCHD = () => {
  const { data, loading, error } = useData("about_chd");
  const { language } = useLanguage();
  const t = useT();
  const navigation = useNavigation();

  if (loading) return <Loader />;
  if (error) return <ScrollView contentContainerStyle={styles.container}><Text>{String(error)}</Text></ScrollView>;

  const content = data || {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>{t("about_chd_title")}</Text>

      <CardItem
        title={t("reliable_websites")}
        description={`${content.reliable_websites?.length || 0} websites`}
        icon="web"
        onPress={() => navigation.navigate("ReliableWebsites")}
        rightActionIcon="chevron-right"
      />

      <CardItem
        title={t("videos_defects")}
        description={`${content.videos?.length || 0} videos`}
        icon="play-circle-outline"
        onPress={() => navigation.navigate("CHDVideos")}
        rightActionIcon="chevron-right"
      />

      <CardItem
        title={t("library_defects")}
        description={`${content.library?.length || 0} defects`}
        icon="book-open-page-variant"
        onPress={() => navigation.navigate("LibraryDefects")}
        rightActionIcon="chevron-right"
      />

      <CardItem
        title={t("medications")}
        description={`${content.medications?.length || 0} medications`}
        icon="pill"
        onPress={() => navigation.navigate("CHDMedications")}
        rightActionIcon="chevron-right"
      />

      {(content.sections || []).map((sec) => (
        <React.Fragment key={sec.id}>
          <Text variant="titleMedium" style={{ marginTop: 12 }}>
            {language === "ar" ? sec.title_ar : sec.title_en}
          </Text>
          {sec.image && (
            <Image source={{ uri: sec.image }} style={{ width: "100%", height: 160, marginTop: 8, borderRadius: 8 }} />
          )}
          <Text style={{ marginTop: 8 }}>
            {language === "ar" ? sec.content_ar : sec.content_en}
          </Text>
        </React.Fragment>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
});

export default AboutCHD;
