import React from "react";
import { ScrollView, StyleSheet, Linking, Alert } from "react-native";
import { Text } from "react-native-paper";
import CardItem from "../components/CardItem";
import Loader from "../components/Loader";
import { useData } from "../context/DataContext";
import { useLanguage, useT } from "../context/LanguageContext";

const PatientStories = () => {
  const { data, loading, error } = useData("caregivers");
  const { language } = useLanguage();
  const t = useT();

  if (loading) return <Loader />;
  if (error) return <ScrollView contentContainerStyle={styles.container}><Text>{String(error)}</Text></ScrollView>;

  const stories = data?.stories || [];

  const openVideo = async (url) => {
    if (!url) {
      Alert.alert(t("error"), t("video_url_not_available"));
      return;
    }

    try {
      // Ensure URL is properly formatted
      let videoUrl = url.trim();
      
      // If it's just a video ID, convert to full YouTube URL
      if (/^[a-zA-Z0-9_-]{11}$/.test(videoUrl)) {
        videoUrl = `https://www.youtube.com/watch?v=${videoUrl}`;
      }
      
      // Check if URL can be opened
      const canOpen = await Linking.canOpenURL(videoUrl);
      if (canOpen) {
        await Linking.openURL(videoUrl);
      } else {
        Alert.alert(t("error"), t("video_url_not_available"));
      }
    } catch (error) {
      console.error("Error opening video:", error);
      Alert.alert(t("error"), t("video_error_message"));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>{t("patient_stories")}</Text>
      {stories.map((story) => (
        <CardItem
          key={story.id}
          title={language === "ar" ? story.title_ar : story.title_en}
          description={language === "ar" ? story.description_ar : story.description_en}
          icon="play-circle-outline"
          onPress={() => openVideo(story.youtubeUrl)}
          rightActionIcon="play"
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

export default PatientStories;

