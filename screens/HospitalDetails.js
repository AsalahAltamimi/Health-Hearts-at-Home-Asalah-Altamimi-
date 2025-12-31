import React from "react";
import { ScrollView, StyleSheet, Linking, View } from "react-native";
import { Text, Card, Button, Divider } from "react-native-paper";
import Loader from "../components/Loader";
import { useData } from "../context/DataContext";
import { useLanguage, useT } from "../context/LanguageContext";

const HospitalDetails = () => {
  const { data, loading, error } = useData("hospital");
  const { language } = useLanguage();
  const t = useT();

  if (loading) return <Loader />;
  if (error) return <ScrollView contentContainerStyle={styles.container}><Text>{String(error)}</Text></ScrollView>;

  const info = data || {};

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleMap = () => {
    if (info.map_link) {
      Linking.openURL(info.map_link);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card} mode="outlined">
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>{info.name}</Text>
          
          {info.address && (
            <>
              <Divider style={styles.divider} />
              <View style={styles.section}>
                <Text variant="titleMedium" style={styles.sectionTitle}>{t("address")}</Text>
                <Text variant="bodyMedium" style={styles.info}>{info.address}</Text>
                <Button
                  mode="outlined"
                  icon="map"
                  onPress={handleMap}
                  style={styles.button}
                  textColor="#4ECDC4"
                >
                  {t("view_on_map")}
                </Button>
              </View>
            </>
          )}

          {info.contacts && info.contacts.length > 0 && (
            <>
              <Divider style={styles.divider} />
              <View style={styles.section}>
                <Text variant="titleMedium" style={styles.sectionTitle}>{t("contact_numbers")}</Text>
                {info.contacts.map((contact, idx) => (
                  <Button
                    key={idx}
                    mode="outlined"
                    icon="phone"
                    onPress={() => handleCall(contact)}
                    style={styles.button}
                    textColor="#4ECDC4"
                  >
                    {contact}
                  </Button>
                ))}
              </View>
            </>
          )}

          {info.emergency_contacts && info.emergency_contacts.length > 0 && (
            <>
              <Divider style={styles.divider} />
              <View style={styles.section}>
                <Text variant="titleMedium" style={[styles.sectionTitle, { color: "#E74C3C" }]}>
                  {t("emergency_contacts")}
                </Text>
                {info.emergency_contacts.map((contact, idx) => (
                  <Button
                    key={idx}
                    mode="contained"
                    icon="alert"
                    onPress={() => handleCall(contact)}
                    style={[styles.button, { backgroundColor: "#E74C3C" }]}
                  >
                    {contact}
                  </Button>
                ))}
              </View>
            </>
          )}

          {info.visiting_hours && (
            <>
              <Divider style={styles.divider} />
              <View style={styles.section}>
                <Text variant="titleMedium" style={styles.sectionTitle}>{t("visiting_hours")}</Text>
                <Text variant="bodyMedium" style={styles.info}>{info.visiting_hours}</Text>
              </View>
            </>
          )}

          {info.cafeteria && (
            <>
              <Divider style={styles.divider} />
              <View style={styles.section}>
                <Text variant="titleMedium" style={styles.sectionTitle}>{t("cafeteria")}</Text>
                {info.cafeteria.name && (
                  <Text variant="bodyLarge" style={styles.cafeteriaName}>{info.cafeteria.name}</Text>
                )}
                {info.cafeteria.hours && (
                  <Text variant="bodyMedium" style={styles.info}>
                    <Text style={styles.label}>{t("hours")}: </Text>
                    {info.cafeteria.hours}
                  </Text>
                )}
                {info.cafeteria.description && (
                  <Text variant="bodyMedium" style={styles.info}>
                    {info.cafeteria.description}
                  </Text>
                )}
              </View>
            </>
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
    backgroundColor: "#F4F4F4",
  },
  card: {
    borderRadius: 12,
    elevation: 2,
    backgroundColor: "#FFFFFF",
  },
  title: {
    marginBottom: 8,
    fontWeight: "600",
    color: "#34495E",
  },
  divider: {
    marginVertical: 16,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    marginBottom: 12,
    fontWeight: "600",
    color: "#34495E",
  },
  info: {
    color: "#7F8C8D",
    lineHeight: 22,
    marginBottom: 8,
  },
  label: {
    fontWeight: "600",
    color: "#34495E",
  },
  button: {
    marginTop: 8,
    marginBottom: 4,
  },
  cafeteriaName: {
    fontWeight: "600",
    color: "#34495E",
    marginBottom: 8,
  },
});

export default HospitalDetails;
