import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Check, X, RotateCcw } from 'lucide-react-native';
import { useFocusEffect } from '@react-navigation/native';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  date: string;
  recurring?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export default function RecurringTasksModal() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        const allTasks: Task[] = JSON.parse(storedTasks);
        const recurringTasks = allTasks.filter(task => task.recurring);
        setTasks(recurringTasks);
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const toggleTask = async (id: string) => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        const allTasks: Task[] = JSON.parse(storedTasks);
        const updatedTasks = allTasks.map(task =>
          task.id === id ? { ...task, completed: !task.completed } : task
        );
        await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
        loadTasks();
      }
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        const allTasks: Task[] = JSON.parse(storedTasks);
        const updatedTasks = allTasks.filter(task => task.id !== id);
        await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
        loadTasks();
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recurring Tasks</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <X size={24} color="#7A9E9F" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {tasks.map(task => (
          <View key={task.id} style={styles.taskItem}>
            <TouchableOpacity
              style={styles.taskCheckbox}
              onPress={() => toggleTask(task.id)}>
              {task.completed ? (
                <Check size={20} color="#7A9E9F" />
              ) : (
                <View style={styles.emptyCheckbox} />
              )}
            </TouchableOpacity>
            
            <View style={styles.taskContent}>
              <Text style={[styles.taskText, task.completed && styles.taskTextCompleted]}>
                {task.text}
              </Text>
              <View style={styles.recurringBadge}>
                <RotateCcw size={12} color="#EEF5DB" />
                <Text style={styles.recurringBadgeText}>{task.recurring}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTask(task.id)}>
              <X size={20} color="#FE5F55" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: typeof window !== 'undefined' ? 20 : 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D2D',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#EEF5DB',
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D2D2D',
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
  },
  taskCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#7A9E9F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCheckbox: {
    width: 24,
    height: 24,
  },
  taskContent: {
    flex: 1,
    marginLeft: 12,
  },
  taskText: {
    fontSize: 16,
    color: '#EEF5DB',
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#7A9E9F',
  },
  deleteButton: {
    padding: 4,
  },
  recurringBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E90FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  recurringBadgeText: {
    color: '#EEF5DB',
    fontSize: 12,
    marginLeft: 4,
  },
});