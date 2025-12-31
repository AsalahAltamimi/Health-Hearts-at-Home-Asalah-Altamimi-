import React from "react";
import { ScrollView, StyleSheet, Linking, Alert } from "react-native";
import { Text } from "react-native-paper";
import CardItem from "../components/CardItem";
import { useLanguage, useT } from "../context/LanguageContext";

const TutorialCategory = ({ route }) => {
  const { category } = route.params;
  const { language } = useLanguage();
  const t = useT();

  const tutorials = category.tutorials || [];

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
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>
        {language === "ar" ? category.name_ar : category.name_en}
      </Text>
      {tutorials.map((tutorial) => (
        <CardItem
          key={tutorial.id}
          title={language === "ar" ? tutorial.title_ar : tutorial.title_en}
          description={language === "ar" ? tutorial.description_ar : tutorial.description_en}
          icon="play-circle-outline"
          onPress={() => openVideo(tutorial.youtubeUrl)}
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

export default TutorialCategory;

