import React from "react";
import { ScrollView, StyleSheet, Image, I18nManager, View } from "react-native";
import { Text, Card, Icon } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useT } from "../context/LanguageContext";

const tiles = [
  { route: "GeneralInfo", icon: "information-outline", key: "generalInfo", color: "#4ECDC4" },
  { route: "Tutorials", icon: "play-circle-outline", key: "tutorials", color: "#4ECDC4" },
  { route: "SpiritualNeeds", icon: "hand-heart", key: "spiritualNeeds", color: "#4ECDC4" },
  { route: "HospitalInfo", icon: "hospital-building", key: "hospitalInfo", color: "#4ECDC4" },
  { route: "CaregiverSupport", icon: "account-heart-outline", key: "caregiverSupport", color: "#4ECDC4" },
  { route: "TrackYourChild", icon: "baby-face-outline", key: "trackYourChild", color: "#FFB89E" },
  { route: "AboutCHD", icon: "book-open-page-variant", key: "aboutCHD", color: "#4ECDC4" },
  { route: "Contacts", icon: "phone", key: "contacts", color: "#4ECDC4" },
];

const Home = () => {
  const navigation = useNavigation();
  const t = useT();

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      style={styles.scrollView}
      showsVerticalScrollIndicator={true}
    >
      <Image source={require("../assets/images/icon.png")} style={styles.logo} />
      <Text variant="titleLarge" style={styles.title}>{t("home_intro")}</Text>
      <View style={[styles.grid, I18nManager.isRTL && { flexDirection: "row-reverse" }]}>
        {tiles.map((tile, idx) => (
          <Card key={`${tile.route}-${idx}`} style={[styles.card, { borderColor: tile.color }]} onPress={() => navigation.navigate(tile.route)}>
            <Card.Content style={styles.cardContent}>
              <Icon source={tile.icon} size={28} color={tile.color} />
              <Text variant="titleMedium" style={styles.cardText}>{t(tile.key)}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#F4F4F4",
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 16,
    marginBottom: 16,
  },
  title: {
    textAlign: "center",
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    marginVertical: 8,
    borderRadius: 16,
    borderWidth: 2,
  },
  cardContent: {
    alignItems: "center",
  },
  cardIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  cardText: {
    textAlign: "center",
  },
});

export default Home;


