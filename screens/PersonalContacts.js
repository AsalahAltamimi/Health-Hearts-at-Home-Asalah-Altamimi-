import React from "react";
import { ScrollView, StyleSheet, Linking } from "react-native";
import { Text, Card, IconButton, FAB } from "react-native-paper";
import Loader from "../components/Loader";
import { useData } from "../context/DataContext";
import { useT } from "../context/LanguageContext";

const PersonalContacts = () => {
  const { data, loading, error } = useData("contacts");
  const t = useT();

  if (loading) return <Loader />;
  if (error) return <ScrollView contentContainerStyle={styles.container}><Text>{String(error)}</Text></ScrollView>;

  const personal = data?.personal || [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>{t("personal_contacts_title")}</Text>
      {personal.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 32 }}>No personal contacts yet</Text>
      ) : (
        personal.map((contact, idx) => (
          <Card key={idx} style={styles.card}>
            <Card.Title title={contact.name} subtitle={contact.relationship} right={(props) => (
              <IconButton {...props} icon="phone" onPress={() => contact.phone && Linking.openURL(`tel:${contact.phone}`)} />
            )} />
          </Card>
        ))
      )}
      <FAB icon="plus" style={styles.fab} onPress={() => alert("Add contact functionality")} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
    paddingBottom: 80,
  },
  card: {
    marginBottom: 12,
    borderRadius: 12,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "#4ECDC4",
  },
});

export default PersonalContacts;

