import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";

const TaskList = ({ tasks, fetchTasks }) => {
  const [editableTaskId, setEditableTaskId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/tasks/${id}`)
      .then((response) => fetchTasks())
      .catch((error) => console.error(error));
  };

  const handleEdit = (task) => {
    setEditableTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description);
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:3000/api/tasks/${editableTaskId}`, {
        title,
        description,
      })
      .then((response) => {
        fetchTasks();
        setEditableTaskId(null);
        setTitle("");
        setDescription("");
      })
      .catch((error) => console.error(error));
  };

  return (
    <View style={styles.container}>
      {tasks.map((task) => (
        <View key={task.id} style={styles.card}>
          {editableTaskId === task.id ? (
            <>
              <TextInput
                style={styles.titleInput}
                value={title}
                onChangeText={setTitle}
                placeholder="Title"
              />
              <TextInput
                style={styles.descriptionInput}
                value={description}
                onChangeText={setDescription}
                placeholder="Description"
                multiline
              />
              <Button title="Update" onPress={handleUpdate} />
            </>
          ) : (
            <>
              <Text style={styles.title}>{task.title}</Text>
              <Text style={styles.description}>{task.description}</Text>
              <View style={styles.buttonContainer}>
                <Button title="Edit" onPress={() => handleEdit(task)} />
                <View style={styles.space} />
                <Button
                  title="Delete"
                  color="red"
                  onPress={() => handleDelete(task.id)}
                />
              </View>
            </>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  titleInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
  descriptionInput: {
    height: 80, // Lebih tinggi untuk input deskripsi
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlignVertical: "top", // Agar teks dimulai dari atas
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  space: {
    width: 10,
  },
});

export default TaskList;
