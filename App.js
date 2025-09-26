import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert, Keyboard } from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  const addTask = () => {
    if (text.trim() === '') {
      Alert.alert('Task Input Empty', 'Please enter a task before adding.');
      return;
    }
    setTasks([...tasks, { id: Date.now().toString(), text, done: false }]);
    setText('');
    Keyboard.dismiss();
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id) => {
    const taskToDelete = tasks.find(t => t.id === id);
    setTasks(tasks.filter(t => t.id !== id));
    Alert.alert('Task Deleted', `"${taskToDelete.text}" has been deleted.`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.task}>
      <TouchableOpacity onPress={() => toggleTask(item.id)}>
        <Text style={styles.checkbox}>{item.done ? '☑️' : '⬜'}</Text>
      </TouchableOpacity>
      <Text
        style={[styles.text, item.done && styles.done]}
        onPress={() => toggleTask(item.id)}
      >
        {item.text}
      </Text>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.delete}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Add a task..."
          value={text}
          onChangeText={setText}
          onSubmitEditing={addTask}
        />
        <TouchableOpacity onPress={addTask} style={styles.addBtn}>
          <Text style={{ color: '#fff' }}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 100, backgroundColor: '#f9f9f9' },
  form: { flexDirection: 'row', marginBottom: 15 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 5 },
  addBtn: { marginLeft: 8, backgroundColor: '#007AFF', padding: 10, borderRadius: 5 },
  task: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  checkbox: { fontSize: 20, marginRight: 8 },
  text: { flex: 1, fontSize: 16 },
  done: { textDecorationLine: 'line-through', color: '#888' },
  delete: { fontSize: 18, marginLeft: 8 },
});
