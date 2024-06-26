import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    axios
      .get("http://localhost:3000/api/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notes-App React</Text>
      <TaskForm fetchTasks={fetchTasks} />
      <ScrollView>
        <TaskList tasks={tasks} fetchTasks={fetchTasks} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default App;
