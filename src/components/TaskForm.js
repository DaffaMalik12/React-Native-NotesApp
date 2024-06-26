import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";

const TaskForm = ({ fetchTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    axios
      .post("http://localhost:3000/api/tasks", { title, description })
      .then((response) => {
        fetchTasks();
        setTitle("");
        setDescription("");
      })
      .catch((error) => console.error(error));
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.title}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.description}
        multiline
      />
      <Button title="Add Task" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    height: 100,
    marginBottom: 10,
  },
});

export default TaskForm;
