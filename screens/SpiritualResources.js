import React from "react";
import { ScrollView, StyleSheet, Linking } from "react-native";
import { Text, Card } from "react-native-paper";
import CardItem from "../components/CardItem";
import Loader from "../components/Loader";
import { useData } from "../context/DataContext";
import { useLanguage, useT } from "../context/LanguageContext";

const SpiritualResources = () => {
  const { data, loading, error } = useData("spiritual");
  const { language } = useLanguage();
  const t = useT();

  if (loading) return <Loader />;
  if (error) return <ScrollView contentContainerStyle={styles.container}><Text>{String(error)}</Text></ScrollView>;

  const resources = data?.resources || [];
  const chaplain = data?.chaplain;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>{t("resources")}</Text>
      {resources.map((item) => (
        <Card key={item.id} style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">{language === "ar" ? item.title_ar : item.title_en}</Text>
            <Text style={{ marginTop: 8 }}>{language === "ar" ? item.content_ar : item.content_en}</Text>
            {item.url && (
              <CardItem
                title={t("visit_website")}
                icon="web"
                onPress={() => Linking.openURL(item.url)}
                rightActionIcon="open-in-new"
              />
            )}
          </Card.Content>
        </Card>
      ))}
      {chaplain && (
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">{t("chaplain_services")}</Text>
            {chaplain.email && (
              <CardItem
                title={t("email_chaplain")}
                description={chaplain.email}
                icon="email"
                onPress={() => Linking.openURL(`mailto:${chaplain.email}`)}
              />
            )}
            {chaplain.website && (
              <CardItem
                title={t("chaplain_website")}
                icon="web"
                onPress={() => Linking.openURL(chaplain.website)}
                rightActionIcon="open-in-new"
              />
            )}
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: "#FFFFFF",
  },
  card: {
    marginBottom: 12,
    borderRadius: 12,
  },
});

export default SpiritualResources;

