import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { RotateCcw, X } from 'lucide-react-native';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  date: string;
  recurring?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export default function AddTaskModal() {
  const [newTask, setNewTask] = useState('');
  const [recurringType, setRecurringType] = useState<Task['recurring']>();
  const router = useRouter();

  const addTask = async () => {
    if (newTask.trim()) {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        const tasks = storedTasks ? JSON.parse(storedTasks) : [];
        
        const newTaskItem: Task = {
          id: Date.now().toString(),
          text: newTask,
          completed: false,
          date: new Date().toISOString().split('T')[0],
          recurring: recurringType,
        };
        
        const updatedTasks = [...tasks, newTaskItem];
        await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
        
        setNewTask('');
        setRecurringType(undefined);
        router.back();
      } catch (error) {
        console.error('Error saving task:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add New Task</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <X size={24} color="#7A9E9F" />
        </TouchableOpacity>
      </View>
      
      <TextInput
        style={styles.input}
        value={newTask}
        onChangeText={setNewTask}
        placeholder="What do you need to do?"
        placeholderTextColor="#7A9E9F"
        multiline
      />

      <Text style={styles.subtitle}>Recurring Schedule</Text>
      <View style={styles.recurringContainer}>
        {(['daily', 'weekly', 'monthly', 'yearly'] as const).map(type => (
          <TouchableOpacity
            key={type}
            style={[
              styles.recurringButton,
              recurringType === type && styles.recurringButtonActive,
            ]}
            onPress={() => setRecurringType(type === recurringType ? undefined : type)}>
            <RotateCcw 
              size={16} 
              color={recurringType === type ? '#EEF5DB' : '#7A9E9F'} 
              style={styles.recurringIcon}
            />
            <Text
              style={[
                styles.recurringButtonText,
                recurringType === type && styles.recurringButtonTextActive,
              ]}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity 
        style={[styles.addButton, !newTask.trim() && styles.addButtonDisabled]} 
        onPress={addTask}
        disabled={!newTask.trim()}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    paddingTop: typeof window !== 'undefined' ? 20 : 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  closeButton: {
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#EEF5DB',
  },
  input: {
    backgroundColor: '#2D2D2D',
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    color: '#EEF5DB',
    minHeight: 100,
    textAlignVertical: 'top',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#EEF5DB',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  recurringContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  recurringButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#2D2D2D',
  },
  recurringButtonActive: {
    backgroundColor: '#1E90FF',
  },
  recurringIcon: {
    marginRight: 8,
  },
  recurringButtonText: {
    color: '#7A9E9F',
    fontSize: 16,
  },
  recurringButtonTextActive: {
    color: '#EEF5DB',
  },
  addButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  addButtonDisabled: {
    backgroundColor: '#2D2D2D',
  },
  addButtonText: {
    color: '#EEF5DB',
    fontSize: 18,
    fontWeight: '600',
  },
});