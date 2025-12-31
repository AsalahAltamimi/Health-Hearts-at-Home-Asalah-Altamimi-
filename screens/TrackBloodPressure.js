import DateTimePicker from "@react-native-community/datetimepicker";
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, IconButton, Text, TextInput } from "react-native-paper";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";
import { useT } from "../context/LanguageContext";

const TrackBloodPressure = () => {
  const { user } = useAuth();
  const t = useT();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [records, setRecords] = useState([]);
  const [showList, setShowList] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const loadRecords = useCallback(async () => {
    if (!user) {
      setRecords([]);
      return;
    }
    try {
      let q;
      try {
        q = query(collection(db, "users", user.uid, "trackingblood"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        setRecords(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (indexError) {
        // If index doesn't exist, use simple query and sort manually
        q = query(collection(db, "users", user.uid, "trackingblood"));
        const snapshot = await getDocs(q);
        const loadedRecords = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        loadedRecords.sort((a, b) => {
          const aTime = new Date(a.createdAt || a.date || 0).getTime();
          const bTime = new Date(b.createdAt || b.date || 0).getTime();
          return bTime - aTime;
        });
        setRecords(loadedRecords);
      }
    } catch (error) {
      console.error("Error loading blood pressure records:", error);
      Alert.alert("Error", `Failed to load records: ${error.message || error.code || "Unknown error"}`);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadRecords();
    } else {
      setRecords([]);
    }
  }, [user, loadRecords]);

  const save = useCallback(async () => {
    if (!user) {
      Alert.alert("Error", "Please login to save records");
      return;
    }
    try {
      const recordData = {
        date: date.toISOString(),
        createdAt: new Date().toISOString(),
      };
      
      // Only add fields that have values
      if (systolic && systolic.trim()) {
        const sys = parseFloat(systolic);
        if (!Number.isNaN(sys)) {
          recordData.systolic = sys;
        }
      }
      if (diastolic && diastolic.trim()) {
        const dia = parseFloat(diastolic);
        if (!Number.isNaN(dia)) {
          recordData.diastolic = dia;
        }
      }
      
      await addDoc(collection(db, "users", user.uid, "trackingblood"), recordData);
      setSystolic("");
      setDiastolic("");
      setShowList(true);
      setSaveSuccess(true);
      await loadRecords();
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving blood pressure record:", error);
      Alert.alert("Error", `Failed to save: ${error.message || error.code || "Unknown error"}`);
    }
  }, [date, systolic, diastolic, user, loadRecords]);

  const remove = async (id) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, "users", user.uid, "trackingblood", id));
      await loadRecords();
      Alert.alert("Success", "Record deleted successfully");
    } catch (error) {
      console.error("Error deleting blood pressure record:", error);
      Alert.alert("Error", `Failed to delete: ${error.message || error.code || "Unknown error"}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={{ marginBottom: 8 }}>{t("blood_pressure")}</Text>

      <Button mode="outlined" onPress={() => setShowDatePicker(true)} style={styles.input}>
        Date: {date.toDateString()}
      </Button>
      {showDatePicker && (
        <DateTimePicker value={date} mode="date" onChange={(e, selected) => { setShowDatePicker(false); if (selected) setDate(selected); }} />
      )}

      <TextInput label={t("systolic")} value={systolic} onChangeText={setSystolic} keyboardType="numeric" style={styles.input} mode="outlined" />
      <TextInput label={t("diastolic")} value={diastolic} onChangeText={setDiastolic} keyboardType="numeric" style={styles.input} mode="outlined" />

      {saveSuccess && (
        <Card style={[styles.card, { backgroundColor: "#4ECDC4", marginBottom: 12 }]}>
          <Card.Content>
            <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>✓ Record saved successfully!</Text>
          </Card.Content>
        </Card>
      )}

      <View style={styles.row}>
        <Button mode="contained" onPress={save} style={styles.flex} icon={saveSuccess ? "check" : "content-save"}>{t("save_record")}</Button>
        <View style={{ width: 8 }} />
        <Button mode="outlined" onPress={() => { setShowList(true); loadRecords(); }} style={styles.flex}>{t("view_records")}</Button>
      </View>

      {showList && (
        <View style={{ marginTop: 16 }}>
          {records.length === 0 ? (
            <Text>{t("no_records")}</Text>
          ) : (
            records.map((r) => (
              <Card key={r.id} style={{ marginBottom: 10, borderRadius: 12 }}>
                <Card.Title title={`${new Date(r.date).toDateString()}`} subtitle={`${t("systolic")}: ${r.systolic} / ${t("diastolic")}: ${r.diastolic}`} right={(props) => (
                  <IconButton {...props} icon="delete" onPress={() => remove(r.id)} />
                )} />
              </Card>
            ))
          )}
        </View>
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
  input: {
    marginTop: 8,
  },
  row: {
    flexDirection: "row",
    marginTop: 12,
  },
  flex: {
    flex: 1,
  },
  card: {
    borderRadius: 12,
  },
});

export default TrackBloodPressure;

