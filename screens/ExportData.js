import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Share, StyleSheet } from "react-native";
import { ActivityIndicator, Button, Card, Text } from "react-native-paper";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";
import { useT } from "../context/LanguageContext";

const ExportData = () => {
  const t = useT();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [dataSummary, setDataSummary] = useState({
    feeding: 0,
    weight: 0,
    bloodPressure: 0,
    pulseOx: 0,
  });

  useEffect(() => {
    if (user) {
      loadDataSummary();
    }
  }, [user]);

  const loadDataSummary = async () => {
    if (!user) return;
    try {
      const [feedingSnap, weightSnap, bloodSnap, pulseSnap] = await Promise.all([
        getDocs(query(collection(db, "users", user.uid, "trackingfeeding"))),
        getDocs(query(collection(db, "users", user.uid, "trackingweight"))),
        getDocs(query(collection(db, "users", user.uid, "trackingblood"))),
        getDocs(query(collection(db, "users", user.uid, "trackingpulse"))),
      ]);

      setDataSummary({
        feeding: feedingSnap.size,
        weight: weightSnap.size,
        bloodPressure: bloodSnap.size,
        pulseOx: pulseSnap.size,
      });
    } catch (error) {
      console.error("Error loading data summary:", error);
    }
  };

  const exportCSV = async () => {
    if (!user) {
      Alert.alert("Error", "Please login to export data");
      return;
    }

    setLoading(true);
    try {
      const [feedingSnap, weightSnap, bloodSnap, pulseSnap] = await Promise.all([
        getDocs(query(collection(db, "users", user.uid, "trackingfeeding"))),
        getDocs(query(collection(db, "users", user.uid, "trackingweight"))),
        getDocs(query(collection(db, "users", user.uid, "trackingblood"))),
        getDocs(query(collection(db, "users", user.uid, "trackingpulse"))),
      ]);

      let csvContent = "Type,Date,Time,Value1,Value2,Type/Notes\n";

      // Feeding records
      feedingSnap.docs.forEach((doc) => {
        const data = doc.data();
        csvContent += `Feeding,${data.date || ""},${data.time || ""},${data.amount || ""},,${data.type || ""}\n`;
      });

      // Weight records
      weightSnap.docs.forEach((doc) => {
        const data = doc.data();
        csvContent += `Weight,${data.date || ""},,${data.weight || ""},,\n`;
      });

      // Blood Pressure records
      bloodSnap.docs.forEach((doc) => {
        const data = doc.data();
        csvContent += `Blood Pressure,${data.date || ""},,${data.systolic || ""},${data.diastolic || ""},\n`;
      });

      // Pulse Ox records
      pulseSnap.docs.forEach((doc) => {
        const data = doc.data();
        csvContent += `Pulse Ox,${data.date || ""},,${data.pulseOx || ""},,\n`;
      });

      
      const result = await Share.share({
        message: csvContent,
        title: "Child Health Data Export",
      });

      if (result.action === Share.sharedAction) {
        Alert.alert("Success", "Data exported successfully!");
      }
    } catch (error) {
      console.error("Error exporting CSV:", error);
      Alert.alert("Error", `Failed to export: ${error.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  const exportPDF = async () => {
    if (!user) {
      Alert.alert("Error", "Please login to export data");
      return;
    }

    setLoading(true);
    try {
      const [feedingSnap, weightSnap, bloodSnap, pulseSnap] = await Promise.all([
        getDocs(query(collection(db, "users", user.uid, "trackingfeeding"))),
        getDocs(query(collection(db, "users", user.uid, "trackingweight"))),
        getDocs(query(collection(db, "users", user.uid, "trackingblood"))),
        getDocs(query(collection(db, "users", user.uid, "trackingpulse"))),
      ]);

      let pdfContent = "CHILD HEALTH DATA EXPORT\n";
      pdfContent += "========================\n\n";

      pdfContent += `FEEDING RECORDS (${feedingSnap.size})\n`;
      pdfContent += "----------------------------\n";
      feedingSnap.docs.forEach((doc) => {
        const data = doc.data();
        pdfContent += `Date: ${data.date ? new Date(data.date).toDateString() : "N/A"}\n`;
        pdfContent += `Time: ${data.time || "N/A"}\n`;
        pdfContent += `Amount: ${data.amount || "N/A"}ml\n`;
        pdfContent += `Type: ${data.type || "N/A"}\n\n`;
      });

      pdfContent += `WEIGHT RECORDS (${weightSnap.size})\n`;
      pdfContent += "----------------------------\n";
      weightSnap.docs.forEach((doc) => {
        const data = doc.data();
        pdfContent += `Date: ${data.date ? new Date(data.date).toDateString() : "N/A"}\n`;
        pdfContent += `Weight: ${data.weight || "N/A"}kg\n\n`;
      });

      pdfContent += `BLOOD PRESSURE RECORDS (${bloodSnap.size})\n`;
      pdfContent += "----------------------------\n";
      bloodSnap.docs.forEach((doc) => {
        const data = doc.data();
        pdfContent += `Date: ${data.date ? new Date(data.date).toDateString() : "N/A"}\n`;
        pdfContent += `Systolic: ${data.systolic || "N/A"} / Diastolic: ${data.diastolic || "N/A"}\n\n`;
      });

      pdfContent += `PULSE OX RECORDS (${pulseSnap.size})\n`;
      pdfContent += "----------------------------\n";
      pulseSnap.docs.forEach((doc) => {
        const data = doc.data();
        pdfContent += `Date: ${data.date ? new Date(data.date).toDateString() : "N/A"}\n`;
        pdfContent += `Pulse Ox: ${data.pulseOx || "N/A"}%\n\n`;
      });

      pdfContent += `\nExported on: ${new Date().toLocaleString()}\n`;

      // Share the PDF content (as text for now)
      const result = await Share.share({
        message: pdfContent,
        title: "Child Health Data Export (PDF)",
      });

      if (result.action === Share.sharedAction) {
        Alert.alert("Success", "Data exported successfully!");
      }
    } catch (error) {
      console.error("Error exporting PDF:", error);
      Alert.alert("Error", `Failed to export: ${error.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>{t("export_title")}</Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: 12 }}>Data Summary</Text>
          <Text>Feeding Records: {dataSummary.feeding}</Text>
          <Text>Weight Records: {dataSummary.weight}</Text>
          <Text>Blood Pressure Records: {dataSummary.bloodPressure}</Text>
          <Text>Pulse Ox Records: {dataSummary.pulseOx}</Text>
        </Card.Content>
      </Card>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : (
        <>
          <Button 
            mode="contained" 
            onPress={exportCSV} 
            style={styles.button}
            icon="file-export"
            disabled={!user}
          >
            {t("export_csv")}
          </Button>
          <Button 
            mode="contained" 
            onPress={exportPDF} 
            style={styles.button}
            icon="file-pdf-box"
            disabled={!user}
          >
            {t("export_pdf")}
          </Button>
        </>
      )}

      {!user && (
        <Text style={{ marginTop: 16, textAlign: "center", color: "#666" }}>
          Please login to export your data
        </Text>
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
  button: {
    marginTop: 12,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
  },
});

export default ExportData;

