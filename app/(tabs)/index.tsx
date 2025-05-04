import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Check, X } from 'lucide-react-native';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  date: string;
  recurring?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        const allTasks: Task[] = JSON.parse(storedTasks);
        const today = new Date().toISOString().split('T')[0];
        const todaysTasks = allTasks.filter(task => task.date === today);
        setTasks(todaysTasks);
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

  const calculateProgress = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Today's Tasks</Text>
        <Text style={styles.headerSubtitle}>
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Daily progress</Text>
          <Text style={styles.progressSubtitle}>Here you can see your daily task progress</Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${calculateProgress()}%` }]} />
          </View>
          <Text style={styles.progressPercentage}>{calculateProgress()}%</Text>
        </View>

        <View style={styles.taskSection}>
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
              </View>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteTask(task.id)}>
                <X size={20} color="#FE5F55" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
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
    backgroundColor: '#1E1E1E',
    paddingTop: typeof window !== 'undefined' ? 20 : 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D2D',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#EEF5DB',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#7A9E9F',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  progressCard: {
    backgroundColor: '#2D2D2D',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },
  progressTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#EEF5DB',
    marginBottom: 10,
  },
  progressSubtitle: {
    color: '#7A9E9F',
    marginBottom: 20,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#404040',
    borderRadius: 4,
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#1E90FF',
    borderRadius: 4,
  },
  progressPercentage: {
    color: '#EEF5DB',
    fontSize: 18,
    fontWeight: '600',
  },
  taskSection: {
    marginBottom: 30,
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
});