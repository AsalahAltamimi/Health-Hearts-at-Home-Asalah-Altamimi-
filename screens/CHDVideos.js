import React from "react";
import { ScrollView, StyleSheet, Linking, Alert } from "react-native";
import { Text } from "react-native-paper";
import CardItem from "../components/CardItem";
import Loader from "../components/Loader";
import { useData } from "../context/DataContext";
import { useLanguage, useT } from "../context/LanguageContext";

const CHDVideos = () => {
  const { data, loading, error } = useData("about_chd");
  const { language } = useLanguage();
  const t = useT();

  if (loading) return <Loader />;
  if (error) return <ScrollView contentContainerStyle={styles.container}><Text>{String(error)}</Text></ScrollView>;

  const videos = data?.videos || [];

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
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>{t("videos_defects")}</Text>
      {videos.map((video) => (
        <CardItem
          key={video.id}
          title={language === "ar" ? video.title_ar : video.title_en}
          description={language === "ar" ? video.description_ar : video.description_en}
          icon="play-circle-outline"
          onPress={() => openVideo(video.youtubeUrl)}
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

export default CHDVideos;

