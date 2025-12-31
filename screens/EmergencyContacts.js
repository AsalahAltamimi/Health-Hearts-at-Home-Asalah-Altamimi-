import React from "react";
import { ScrollView, StyleSheet, Linking } from "react-native";
import { Text, Card, IconButton } from "react-native-paper";
import Loader from "../components/Loader";
import { useData } from "../context/DataContext";
import { useT } from "../context/LanguageContext";

const EmergencyContacts = () => {
  const { data, loading, error } = useData("contacts");
  const t = useT();

  if (loading) return <Loader />;
  if (error) return <ScrollView contentContainerStyle={styles.container}><Text>{String(error)}</Text></ScrollView>;

  const emergency = data?.emergency || [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>{t("emergency_contacts_title")}</Text>
      {emergency.map((contact, idx) => (
        <Card key={idx} style={[styles.card, { borderColor: "#FFE66D", borderWidth: 2 }]}>
          <Card.Title title={contact.name} subtitle={contact.description} left={() => <IconButton icon="alert" iconColor="#FFE66D" />} right={(props) => (
            <IconButton {...props} icon="phone" iconColor="#FFE66D" onPress={() => Linking.openURL(`tel:${contact.phone}`)} />
          )} />
        </Card>
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
  card: {
    marginBottom: 12,
    borderRadius: 12,
  },
});

export default EmergencyContacts;

