import DateTimePicker from "@react-native-community/datetimepicker";
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, IconButton, SegmentedButtons, Text, TextInput } from "react-native-paper";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";
import { useT } from "../context/LanguageContext";

const TrackFeeding = () => {
  const { user } = useAuth();
  const t = useT();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("breast");
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
        q = query(collection(db, "users", user.uid, "trackingfeeding"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        setRecords(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (indexError) {
        // If index doesn't exist, use simple query and sort manually
        q = query(collection(db, "users", user.uid, "trackingfeeding"));
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
      console.error("Error loading feeding records:", error);
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
        type,
        createdAt: new Date().toISOString(),
      };
      
      // Only add fields that have values
      if (time && time.trim()) {
        recordData.time = time.trim();
      }
      if (amount && amount.trim()) {
        const amt = parseFloat(amount);
        if (!Number.isNaN(amt)) {
          recordData.amount = amt;
        }
      }
      
      await addDoc(collection(db, "users", user.uid, "trackingfeeding"), recordData);
      setTime("");
      setAmount("");
      setShowList(true);
      setSaveSuccess(true);
      await loadRecords();
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving feeding record:", error);
      Alert.alert("Error", `Failed to save: ${error.message || error.code || "Unknown error"}`);
    }
  }, [date, time, amount, type, user, loadRecords]);

  const remove = async (id) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, "users", user.uid, "trackingfeeding", id));
      await loadRecords();
      Alert.alert("Success", "Record deleted successfully");
    } catch (error) {
      console.error("Error deleting feeding record:", error);
      Alert.alert("Error", `Failed to delete: ${error.message || error.code || "Unknown error"}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={{ marginBottom: 8 }}>{t("feeding")}</Text>

      <Button mode="outlined" onPress={() => setShowDatePicker(true)} style={styles.input}>
        Date: {date.toDateString()}
      </Button>
      {showDatePicker && (
        <DateTimePicker value={date} mode="date" onChange={(e, selected) => { setShowDatePicker(false); if (selected) setDate(selected); }} />
      )}

      <TextInput label={t("feeding_time")} value={time} onChangeText={setTime} placeholder="e.g., 10:30" style={styles.input} mode="outlined" />
      <TextInput label={t("feeding_amount")} value={amount} onChangeText={setAmount} keyboardType="numeric" style={styles.input} mode="outlined" />

      <Text style={{ marginTop: 8 }}>{t("feeding_type")}</Text>
      <SegmentedButtons
        style={{ marginTop: 8 }}
        value={type}
        onValueChange={setType}
        buttons={[
          { value: "breast", label: t("feeding_breast") },
          { value: "bottle", label: t("feeding_bottle") },
        ]}
      />

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
                <Card.Title title={`${new Date(r.date).toDateString()} ${r.time}`} subtitle={`${t("feeding_amount")}: ${r.amount}ml | ${t("feeding_type")}: ${r.type}`} right={(props) => (
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

export default TrackFeeding;

