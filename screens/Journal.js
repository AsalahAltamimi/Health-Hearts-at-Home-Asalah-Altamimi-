import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Alert } from "react-native";
import { Text, TextInput, Button, Card, IconButton, FAB } from "react-native-paper";
import { collection, addDoc, query, getDocs, deleteDoc, doc, orderBy } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";
import { useT } from "../context/LanguageContext";

const Journal = () => {
  const { user } = useAuth();
  const t = useT();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [stories, setStories] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (user) loadStories();
  }, [user]);

  const loadStories = async () => {
    try {
      const q = query(collection(db, "users", user.uid, "journal"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      setStories(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error("Error loading stories:", error);
    }
  };

  const saveStory = async () => {
    if (!title || !content) {
      Alert.alert("Error", t("validation_error"));
      return;
    }
    try {
      await addDoc(collection(db, "users", user.uid, "journal"), {
        title,
        content,
        createdAt: new Date().toISOString(),
      });
      setTitle("");
      setContent("");
      setShowForm(false);
      loadStories();
    } catch (error) {
      Alert.alert("Error", "Failed to save story");
    }
  };

  const deleteStory = async (id) => {
    try {
      await deleteDoc(doc(db, "users", user.uid, "journal", id));
      loadStories();
    } catch (error) {
      Alert.alert("Error", "Failed to delete story");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>{t("journal_title")}</Text>

      {showForm ? (
        <>
          <TextInput label={t("story_title")} value={title} onChangeText={setTitle} style={styles.input} mode="outlined" />
          <TextInput label={t("story_content")} value={content} onChangeText={setContent} multiline numberOfLines={10} style={styles.input} mode="outlined" />
          <Button mode="contained" onPress={saveStory} style={styles.button}>{t("save_story")}</Button>
          <Button mode="outlined" onPress={() => setShowForm(false)} style={styles.button}>Cancel</Button>
        </>
      ) : (
        <>
          {stories.length === 0 ? (
            <Text style={{ textAlign: "center", marginTop: 32 }}>{t("no_records")}</Text>
          ) : (
            stories.map((story) => (
              <Card key={story.id} style={styles.card}>
                <Card.Title title={story.title} subtitle={new Date(story.createdAt).toDateString()} right={(props) => (
                  <IconButton {...props} icon="delete" onPress={() => deleteStory(story.id)} />
                )} />
                <Card.Content>
                  <Text>{story.content}</Text>
                </Card.Content>
              </Card>
            ))
          )}
          <FAB icon="plus" style={styles.fab} onPress={() => setShowForm(true)} />
        </>
      )}
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
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 8,
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

export default Journal;

