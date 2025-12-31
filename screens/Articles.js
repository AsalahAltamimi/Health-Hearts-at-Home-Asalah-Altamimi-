import React from "react";
import { ScrollView, StyleSheet, Linking } from "react-native";
import { Text, Card, Button, IconButton } from "react-native-paper";
import Loader from "../components/Loader";
import { useData } from "../context/DataContext";
import { useLanguage, useT } from "../context/LanguageContext";

const Articles = () => {
  const { data, loading, error } = useData("caregivers");
  const { language } = useLanguage();
  const t = useT();

  if (loading) return <Loader />;
  if (error) return <ScrollView contentContainerStyle={styles.container}><Text>{String(error)}</Text></ScrollView>;

  const articles = data?.articles || [];

  const handleReadArticle = (url) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>{t("articles")}</Text>
      
      {articles.length === 0 ? (
        <Card style={styles.emptyCard}>
          <Card.Content>
            <Text style={styles.emptyText}>{t("no_articles")}</Text>
          </Card.Content>
        </Card>
      ) : (
        articles.map((article) => (
          <Card key={article.id} style={styles.card} mode="outlined">
            <Card.Content>
              <Text variant="titleLarge" style={styles.title}>
                {language === "ar" ? article.title_ar : article.title_en}
              </Text>
              <Text variant="bodyMedium" style={styles.description}>
                {language === "ar" ? article.description_ar : article.description_en}
              </Text>
              <Button
                mode="contained"
                icon="open-in-new"
                onPress={() => handleReadArticle(article.url)}
                style={styles.readButton}
                buttonColor="#4ECDC4"
              >
                {t("read_article")}
              </Button>
            </Card.Content>
          </Card>
        ))
      )}
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
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  title: {
    marginBottom: 8,
    fontWeight: "600",
    color: "#34495E",
  },
  description: {
    marginBottom: 16,
    color: "#7F8C8D",
    lineHeight: 22,
  },
  readButton: {
    marginTop: 8,
  },
  emptyCard: {
    marginTop: 32,
    borderRadius: 12,
  },
  emptyText: {
    textAlign: "center",
    color: "#95A5A6",
    fontSize: 16,
  },
});

export default Articles;
