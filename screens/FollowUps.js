import React from "react";
import { ScrollView, StyleSheet, Linking } from "react-native";
import { Text, Card, Button } from "react-native-paper";
import Loader from "../components/Loader";
import { useData } from "../context/DataContext";
import { useLanguage, useT } from "../context/LanguageContext";

const FollowUps = () => {
  const { data, loading, error } = useData("hospital");
  const { language } = useLanguage();
  const t = useT();

  if (loading) return <Loader />;
  if (error) return <ScrollView contentContainerStyle={styles.container}><Text>{String(error)}</Text></ScrollView>;

  const followUps = data?.follow_ups || {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>{t("follow_ups")}</Text>
      <Card style={styles.card}>
        <Card.Content>
          <Text>{language === "ar" ? followUps.info_ar : followUps.info_en}</Text>
          {followUps.calendar_link && (
            <Button mode="contained" style={{ marginTop: 16 }} onPress={() => Linking.openURL(followUps.calendar_link)}>
              Open Calendar
            </Button>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  card: {
    borderRadius: 12,
  },
});

export default FollowUps;

