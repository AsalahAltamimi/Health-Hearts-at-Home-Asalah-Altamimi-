import React, { useState } from "react";
import { ScrollView, StyleSheet, Linking, View } from "react-native";
import { Text, Card, IconButton, Button, FAB } from "react-native-paper";
import CardItem from "../components/CardItem";
import Loader from "../components/Loader";
import { useData } from "../context/DataContext";
import { useLanguage, useT } from "../context/LanguageContext";

const Contacts = () => {
  const { data, loading, error } = useData("contacts");
  const { language } = useLanguage();
  const t = useT();
  const [showAddContact, setShowAddContact] = useState(false);

  if (loading) return <Loader />;
  if (error) return <ScrollView contentContainerStyle={styles.container}><Text>{String(error)}</Text></ScrollView>;

  const contacts = data || {};

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmail = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>{t("contacts_title")}</Text>

      {contacts.llu && contacts.llu.length > 0 && (
        <>
          <Text variant="titleMedium" style={styles.sectionTitle}>{t("llu_contacts")}</Text>
          {contacts.llu.map((contact, idx) => (
            <Card key={`llu-${idx}`} style={styles.card}>
              <Card.Title title={contact.name} subtitle={contact.department} left={() => <IconButton icon="hospital-building" />} right={() => (
                <View style={styles.actions}>
                  {contact.phone && <IconButton icon="phone" onPress={() => handleCall(contact.phone)} />}
                  {contact.email && <IconButton icon="email" onPress={() => handleEmail(contact.email)} />}
                </View>
              )} />
            </Card>
          ))}
        </>
      )}

      {contacts.local_resources && contacts.local_resources.length > 0 && (
        <>
          <Text variant="titleMedium" style={styles.sectionTitle}>{t("local_resources")}</Text>
          {contacts.local_resources.map((contact, idx) => (
            <Card key={`local-${idx}`} style={styles.card}>
              <Card.Title title={contact.name} subtitle={contact.description} left={() => <IconButton icon="map-marker" />} right={() => (
                <View style={styles.actions}>
                  {contact.phone && <IconButton icon="phone" onPress={() => handleCall(contact.phone)} />}
                  {contact.email && <IconButton icon="email" onPress={() => handleEmail(contact.email)} />}
                  {contact.website && <IconButton icon="web" onPress={() => Linking.openURL(contact.website)} />}
                </View>
              )} />
            </Card>
          ))}
        </>
      )}

      {contacts.personal && contacts.personal.length > 0 && (
        <>
          <Text variant="titleMedium" style={styles.sectionTitle}>{t("personal_contacts_title")}</Text>
          {contacts.personal.map((contact, idx) => (
            <Card key={`personal-${idx}`} style={styles.card}>
              <Card.Title title={contact.name} subtitle={contact.relationship} left={() => <IconButton icon="account" />} right={() => (
                <View style={styles.actions}>
                  {contact.phone && <IconButton icon="phone" onPress={() => handleCall(contact.phone)} />}
                  {contact.email && <IconButton icon="email" onPress={() => handleEmail(contact.email)} />}
                </View>
              )} />
            </Card>
          ))}
        </>
      )}

      {contacts.emergency && contacts.emergency.length > 0 && (
        <>
          <Text variant="titleMedium" style={styles.sectionTitle}>{t("emergency_contacts_title")}</Text>
          {contacts.emergency.map((contact, idx) => (
            <Card key={`emergency-${idx}`} style={[styles.card, { borderColor: "#FFE66D", borderWidth: 2 }]}>
              <Card.Title title={contact.name} subtitle={contact.description} left={() => <IconButton icon="alert" iconColor="#FFE66D" />} right={() => (
                <IconButton icon="phone" iconColor="#FFE66D" onPress={() => handleCall(contact.phone)} />
              )} />
            </Card>
          ))}
        </>
      )}

      <FAB icon="plus" style={styles.fab} onPress={() => setShowAddContact(true)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    paddingBottom: 80,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  card: {
    marginBottom: 8,
    borderRadius: 12,
  },
  actions: {
    flexDirection: "row",
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "#4ECDC4",
  },
});

export default Contacts;

