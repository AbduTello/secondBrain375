import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  ScrollView,
} from "react-native";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";

export default function AddTask() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("School");
  const [priority, setPriority] = useState<string>("!");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const categories = ["School", "Work", "Gym", "Personal", "Hobbies", "Social"];
  const priorities = ["!", "!!", "!!!"];

  const handleAddTask = async () => {
    try {
      await addDoc(collection(firestore, "tasks"), {
        title,
        description,
        category,
        priority,
        startDate: startDate ? Timestamp.fromDate(startDate) : null,
        endDate: endDate ? Timestamp.fromDate(endDate) : null,
        completed: false,
      });
      console.log("Task added successfully!");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add Task</Text>
      </View>

      <View style={styles.dateRow}>
        <TouchableOpacity style={styles.dateInput}>
          <Text>{startDate ? startDate.toDateString() : "Start Date"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dateInput}>
          <Text>{endDate ? endDate.toDateString() : "End Date"}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Category</Text>
      <View style={styles.buttonRow}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryButton,
              category === cat && styles.selectedCategory,
            ]}
            onPress={() => setCategory(cat)}
          >
            <Text style={styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Priority</Text>
      <View style={styles.buttonRow}>
        {priorities.map((prio) => (
          <TouchableOpacity
            key={prio}
            style={[
              styles.priorityButton,
              priority === prio && styles.selectedPriority,
            ]}
            onPress={() => setPriority(prio)}
          >
            <Text style={styles.priorityText}>{prio}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Add a description..."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dateInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#ddd",
    marginRight: 10,
    marginBottom: 10,
  },
  selectedCategory: {
    backgroundColor: "#006ee9",
  },
  categoryText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addCategoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#7BB662",
    justifyContent: "center",
    alignItems: "center",
  },
  addCategoryText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  priorityButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#ddd",
    marginRight: 10,
    marginBottom: 10,
  },
  selectedPriority: {
    backgroundColor: "#28a745",
  },
  priorityText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#006ee9",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
