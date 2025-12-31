import React from "react";
import { ScrollView, StyleSheet, Linking, View } from "react-native";
import { Text, Card, Button, Divider } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { useLanguage, useT } from "../context/LanguageContext";

const SupportGroupDetail = () => {
  const route = useRoute();
  const { group } = route.params || {};
  const { language } = useLanguage();
  const t = useT();

  if (!group) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text>{t("group_not_found")}</Text>
      </ScrollView>
    );
  }

  const handleAction = (type, value) => {
    if (!value) return;
    
    switch (type) {
      case "phone":
        Linking.openURL(`tel:${value}`);
        break;
      case "email":
        Linking.openURL(`mailto:${value}`);
        break;
      case "website":
        Linking.openURL(value);
        break;
      case "zoom":
        Linking.openURL(value);
        break;
      case "facebook":
        Linking.openURL(value);
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card} mode="outlined">
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            {language === "ar" ? group.name_ar : group.name_en}
          </Text>
          
          <Divider style={styles.divider} />
          
          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              {t("meeting_information")}
            </Text>
            <Text variant="bodyMedium" style={styles.info}>
              {language === "ar" ? group.meeting_info_ar : group.meeting_info_en}
            </Text>
          </View>

          <View style={styles.actionsContainer}>
            {group.phone && (
              <Button
                mode="outlined"
                icon="phone"
                onPress={() => handleAction("phone", group.phone)}
                style={styles.actionButton}
                textColor="#4ECDC4"
              >
                {t("call")}
              </Button>
            )}
            
            {group.email && (
              <Button
                mode="outlined"
                icon="email"
                onPress={() => handleAction("email", group.email)}
                style={styles.actionButton}
                textColor="#4ECDC4"
              >
                {t("email")}
              </Button>
            )}
            
            {group.website && (
              <Button
                mode="contained"
                icon="web"
                onPress={() => handleAction("website", group.website)}
                style={styles.actionButton}
                buttonColor="#4ECDC4"
              >
                {t("visit_website")}
              </Button>
            )}
            
            {group.zoom_link && (
              <Button
                mode="contained"
                icon="video"
                onPress={() => handleAction("zoom", group.zoom_link)}
                style={styles.actionButton}
                buttonColor="#4ECDC4"
              >
                {t("join_zoom")}
              </Button>
            )}
            
            {group.facebook && (
              <Button
                mode="outlined"
                icon="facebook"
                onPress={() => handleAction("facebook", group.facebook)}
                style={styles.actionButton}
                textColor="#4ECDC4"
              >
                {t("facebook_group")}
              </Button>
            )}
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F4F4F4",
  },
  card: {
    borderRadius: 12,
    elevation: 2,
    backgroundColor: "#FFFFFF",
  },
  title: {
    marginBottom: 16,
    fontWeight: "600",
    color: "#34495E",
  },
  divider: {
    marginVertical: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 8,
    fontWeight: "600",
    color: "#34495E",
  },
  info: {
    color: "#7F8C8D",
    lineHeight: 22,
  },
  actionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    minWidth: "45%",
    marginBottom: 8,
  },
});

export default SupportGroupDetail;
