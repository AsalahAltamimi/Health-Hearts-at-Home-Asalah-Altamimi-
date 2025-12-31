import React from "react";
import { ScrollView, StyleSheet, Linking, View } from "react-native";
import { Text, Card, Button } from "react-native-paper";
import Loader from "../components/Loader";
import { useData } from "../context/DataContext";
import { useLanguage, useT } from "../context/LanguageContext";

const CafeteriaMenu = () => {
  const { data, loading, error } = useData("hospital");
  const t = useT();

  if (loading) return <Loader />;
  if (error) return <ScrollView contentContainerStyle={styles.container}><Text>{String(error)}</Text></ScrollView>;

  const cafeteria = data?.cafeteria || {};
  const { language } = useLanguage();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>{t("cafeteria_menu")}</Text>
      
      {cafeteria.name && (
        <Card style={styles.card} mode="outlined">
          <Card.Content>
            <Text variant="titleLarge" style={styles.cafeteriaName}>{cafeteria.name}</Text>
            {cafeteria.hours && (
              <Text variant="bodyMedium" style={styles.hours}>
                <Text style={styles.label}>{t("hours")}: </Text>
                {cafeteria.hours}
              </Text>
            )}
            {cafeteria.description && (
              <Text variant="bodyMedium" style={styles.description}>
                {cafeteria.description}
              </Text>
            )}
          </Card.Content>
        </Card>
      )}

      {cafeteria.sample_menu && (
        <Card style={styles.card} mode="outlined">
          <Card.Content>
            <Text variant="titleMedium" style={styles.menuTitle}>{t("sample_menu")}</Text>
            {cafeteria.sample_menu.breakfast && (
              <View style={styles.menuItem}>
                <Text variant="titleSmall" style={styles.menuLabel}>{t("breakfast")}</Text>
                <Text variant="bodyMedium" style={styles.menuText}>{cafeteria.sample_menu.breakfast}</Text>
              </View>
            )}
            {cafeteria.sample_menu.lunch && (
              <View style={styles.menuItem}>
                <Text variant="titleSmall" style={styles.menuLabel}>{t("lunch")}</Text>
                <Text variant="bodyMedium" style={styles.menuText}>{cafeteria.sample_menu.lunch}</Text>
              </View>
            )}
            {cafeteria.sample_menu.dinner && (
              <View style={styles.menuItem}>
                <Text variant="titleSmall" style={styles.menuLabel}>{t("dinner")}</Text>
                <Text variant="bodyMedium" style={styles.menuText}>{cafeteria.sample_menu.dinner}</Text>
              </View>
            )}
          </Card.Content>
        </Card>
      )}

      {cafeteria.menu_link && (
        <Card style={styles.card} mode="outlined">
          <Card.Content>
            <Button 
              mode="contained" 
              style={styles.menuButton} 
              onPress={() => Linking.openURL(cafeteria.menu_link)}
              icon="web"
              buttonColor="#4ECDC4"
            >
              {t("view_full_menu")}
            </Button>
          </Card.Content>
        </Card>
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
  card: {
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    backgroundColor: "#FFFFFF",
  },
  cafeteriaName: {
    marginBottom: 8,
    fontWeight: "600",
    color: "#34495E",
  },
  hours: {
    marginBottom: 8,
    color: "#7F8C8D",
  },
  label: {
    fontWeight: "600",
    color: "#34495E",
  },
  description: {
    marginTop: 8,
    color: "#7F8C8D",
    lineHeight: 22,
  },
  menuTitle: {
    marginBottom: 16,
    fontWeight: "600",
    color: "#34495E",
  },
  menuItem: {
    marginBottom: 16,
  },
  menuLabel: {
    marginBottom: 4,
    fontWeight: "600",
    color: "#34495E",
  },
  menuText: {
    color: "#7F8C8D",
    lineHeight: 20,
  },
  menuButton: {
    marginTop: 8,
  },
});

export default CafeteriaMenu;

