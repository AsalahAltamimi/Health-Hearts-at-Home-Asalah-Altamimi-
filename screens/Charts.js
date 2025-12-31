import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, Card, SegmentedButtons } from "react-native-paper";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";
import { useT } from "../context/LanguageContext";
import Loader from "../components/Loader";

const Charts = () => {
  const { user } = useAuth();
  const t = useT();
  const [selectedChart, setSelectedChart] = useState("weight");
  const [weightData, setWeightData] = useState([]);
  const [feedingData, setFeedingData] = useState([]);
  const [bloodPressureData, setBloodPressureData] = useState([]);
  const [pulseOxData, setPulseOxData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadWeightData = useCallback(async () => {
    if (!user) {
      setWeightData([]);
      return;
    }
    try {
      let q;
      try {
        q = query(collection(db, "users", user.uid, "trackingweight"), orderBy("createdAt", "asc"));
        const snapshot = await getDocs(q);
        const records = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setWeightData(records);
      } catch (indexError) {
        q = query(collection(db, "users", user.uid, "trackingweight"));
        const snapshot = await getDocs(q);
        const records = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        records.sort((a, b) => {
          const aTime = new Date(a.createdAt || a.date || 0).getTime();
          const bTime = new Date(b.createdAt || b.date || 0).getTime();
          return aTime - bTime;
        });
        setWeightData(records);
      }
    } catch (error) {
      console.error("Error loading weight data:", error);
      setWeightData([]);
    }
  }, [user]);

  const loadFeedingData = useCallback(async () => {
    if (!user) {
      setFeedingData([]);
      return;
    }
    try {
      let q;
      try {
        q = query(collection(db, "users", user.uid, "trackingfeeding"), orderBy("createdAt", "asc"));
        const snapshot = await getDocs(q);
        const records = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setFeedingData(records);
      } catch (indexError) {
        q = query(collection(db, "users", user.uid, "trackingfeeding"));
        const snapshot = await getDocs(q);
        const records = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        records.sort((a, b) => {
          const aTime = new Date(a.createdAt || a.date || 0).getTime();
          const bTime = new Date(b.createdAt || b.date || 0).getTime();
          return aTime - bTime;
        });
        setFeedingData(records);
      }
    } catch (error) {
      console.error("Error loading feeding data:", error);
      setFeedingData([]);
    }
  }, [user]);

  const loadBloodPressureData = useCallback(async () => {
    if (!user) {
      setBloodPressureData([]);
      return;
    }
    try {
      let q;
      try {
        q = query(collection(db, "users", user.uid, "trackingblood"), orderBy("createdAt", "asc"));
        const snapshot = await getDocs(q);
        const records = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setBloodPressureData(records);
      } catch (indexError) {
        q = query(collection(db, "users", user.uid, "trackingblood"));
        const snapshot = await getDocs(q);
        const records = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        records.sort((a, b) => {
          const aTime = new Date(a.createdAt || a.date || 0).getTime();
          const bTime = new Date(b.createdAt || b.date || 0).getTime();
          return aTime - bTime;
        });
        setBloodPressureData(records);
      }
    } catch (error) {
      console.error("Error loading blood pressure data:", error);
      setBloodPressureData([]);
    }
  }, [user]);

  const loadPulseOxData = useCallback(async () => {
    if (!user) {
      setPulseOxData([]);
      return;
    }
    try {
      let q;
      try {
        q = query(collection(db, "users", user.uid, "trackingpulse"), orderBy("createdAt", "asc"));
        const snapshot = await getDocs(q);
        const records = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setPulseOxData(records);
      } catch (indexError) {
        q = query(collection(db, "users", user.uid, "trackingpulse"));
        const snapshot = await getDocs(q);
        const records = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        records.sort((a, b) => {
          const aTime = new Date(a.createdAt || a.date || 0).getTime();
          const bTime = new Date(b.createdAt || b.date || 0).getTime();
          return aTime - bTime;
        });
        setPulseOxData(records);
      }
    } catch (error) {
      console.error("Error loading pulse ox data:", error);
      setPulseOxData([]);
    }
  }, [user]);

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      await Promise.all([
        loadWeightData(),
        loadFeedingData(),
        loadBloodPressureData(),
        loadPulseOxData(),
      ]);
      setLoading(false);
    };
    if (user) {
      loadAllData();
    } else {
      setLoading(false);
    }
  }, [user, loadWeightData, loadFeedingData, loadBloodPressureData, loadPulseOxData]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const renderWeightChart = () => {
    const validData = weightData.filter((r) => r.weight != null);
    if (validData.length === 0) {
      return (
        <Card style={styles.chartCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.chartTitle}>{t("weight")}</Text>
            <View style={styles.emptyChart}>
              <Text style={styles.emptyText}>{t("no_data_available")}</Text>
              <Text style={styles.emptySubtext}>{t("start_tracking_to_see_chart")}</Text>
            </View>
          </Card.Content>
        </Card>
      );
    }

    const labels = validData.map((r) => formatDate(r.date || r.createdAt));
    const data = validData.map((r) => r.weight);

    return (
      <Card style={styles.chartCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.chartTitle}>{t("weight")} (kg)</Text>
          <View style={styles.dataList}>
            {validData.slice(-7).map((r, idx) => (
              <View key={idx} style={styles.dataRow}>
                <Text>{formatDate(r.date || r.createdAt)}</Text>
                <Text style={styles.dataValue}>{r.weight} kg</Text>
              </View>
            ))}
          </View>
        </Card.Content>
      </Card>
    );
  };

  const renderFeedingChart = () => {
    const validData = feedingData.filter((r) => r.amount != null);
    if (validData.length === 0) {
      return (
        <Card style={styles.chartCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.chartTitle}>{t("feeding")}</Text>
            <View style={styles.emptyChart}>
              <Text style={styles.emptyText}>{t("no_data_available")}</Text>
              <Text style={styles.emptySubtext}>{t("start_tracking_to_see_chart")}</Text>
            </View>
          </Card.Content>
        </Card>
      );
    }

    const labels = validData.map((r) => formatDate(r.date || r.createdAt));
    const data = validData.map((r) => r.amount);

    return (
      <Card style={styles.chartCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.chartTitle}>{t("feeding")} (ml)</Text>
          <View style={styles.dataList}>
            {validData.slice(-7).map((r, idx) => (
              <View key={idx} style={styles.dataRow}>
                <Text>{formatDate(r.date || r.createdAt)}</Text>
                <Text style={styles.dataValue}>{r.amount} ml</Text>
              </View>
            ))}
          </View>
        </Card.Content>
      </Card>
    );
  };

  const renderBloodPressureChart = () => {
    const validData = bloodPressureData.filter((r) => r.systolic != null || r.diastolic != null);
    if (validData.length === 0) {
      return (
        <Card style={styles.chartCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.chartTitle}>{t("blood_pressure")}</Text>
            <View style={styles.emptyChart}>
              <Text style={styles.emptyText}>{t("no_data_available")}</Text>
              <Text style={styles.emptySubtext}>{t("start_tracking_to_see_chart")}</Text>
            </View>
          </Card.Content>
        </Card>
      );
    }

    const labels = validData.map((r) => formatDate(r.date || r.createdAt));
    const systolicData = validData.map((r) => r.systolic || 0);
    const diastolicData = validData.map((r) => r.diastolic || 0);

    return (
      <Card style={styles.chartCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.chartTitle}>{t("blood_pressure")}</Text>
          <View style={styles.dataList}>
            {validData.slice(-7).map((r, idx) => (
              <View key={idx} style={styles.dataRow}>
                <Text>{formatDate(r.date || r.createdAt)}</Text>
                <Text style={styles.dataValue}>
                  {r.systolic || "-"} / {r.diastolic || "-"}
                </Text>
              </View>
            ))}
          </View>
        </Card.Content>
      </Card>
    );
  };

  const renderPulseOxChart = () => {
    const validData = pulseOxData.filter((r) => r.pulseOx != null);
    if (validData.length === 0) {
      return (
        <Card style={styles.chartCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.chartTitle}>{t("pulse_ox")}</Text>
            <View style={styles.emptyChart}>
              <Text style={styles.emptyText}>{t("no_data_available")}</Text>
              <Text style={styles.emptySubtext}>{t("start_tracking_to_see_chart")}</Text>
            </View>
          </Card.Content>
        </Card>
      );
    }

    const labels = validData.map((r) => formatDate(r.date || r.createdAt));
    const data = validData.map((r) => r.pulseOx);

    return (
      <Card style={styles.chartCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.chartTitle}>{t("pulse_ox")} (%)</Text>
          <View style={styles.dataList}>
            {validData.slice(-7).map((r, idx) => (
              <View key={idx} style={styles.dataRow}>
                <Text>{formatDate(r.date || r.createdAt)}</Text>
                <Text style={styles.dataValue}>{r.pulseOx}%</Text>
              </View>
            ))}
          </View>
        </Card.Content>
      </Card>
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>{t("charts_title")}</Text>
      
      <SegmentedButtons
        value={selectedChart}
        onValueChange={setSelectedChart}
        buttons={[
          { value: "weight", label: t("weight") },
          { value: "feeding", label: t("feeding") },
          { value: "blood_pressure", label: t("blood_pressure") },
          { value: "pulse_ox", label: t("pulse_ox") },
        ]}
        style={styles.segmentedButtons}
      />

      <View style={styles.chartContainer}>
        {selectedChart === "weight" && renderWeightChart()}
        {selectedChart === "feeding" && renderFeedingChart()}
        {selectedChart === "blood_pressure" && renderBloodPressureChart()}
        {selectedChart === "pulse_ox" && renderPulseOxChart()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: "#F4F4F4",
  },
  segmentedButtons: {
    marginBottom: 16,
  },
  chartContainer: {
    marginTop: 8,
  },
  chartCard: {
    borderRadius: 12,
    elevation: 2,
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
  },
  chartTitle: {
    marginBottom: 12,
    fontWeight: "600",
    color: "#34495E",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  emptyChart: {
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#7F8C8D",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#95A5A6",
    textAlign: "center",
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
    gap: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: "#34495E",
  },
  dataList: {
    paddingVertical: 8,
  },
  dataRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  dataValue: {
    fontWeight: "600",
    color: "#4ECDC4",
  },
});

export default Charts;
