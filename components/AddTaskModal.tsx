import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RotateCcw, X } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/Colors';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  date: string;
  recurring?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function AddTaskModal({ visible, onClose }: AddTaskModalProps) {
  const [newTask, setNewTask] = useState('');
  const [recurringType, setRecurringType] = useState<Task['recurring']>();
  const { isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;

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
        onClose();
      } catch (error) {
        console.error('Error saving task:', error);
      }
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            <Text style={[styles.title, { color: colors.text }]}>Add New Task</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={colors.subtext} />
            </TouchableOpacity>
          </View>
          
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
            value={newTask}
            onChangeText={setNewTask}
            placeholder="What do you need to do?"
            placeholderTextColor={colors.subtext}
            multiline
          />

          <Text style={[styles.subtitle, { color: colors.text }]}>Recurring Schedule</Text>
          <View style={styles.recurringContainer}>
            {(['daily', 'weekly', 'monthly', 'yearly'] as const).map(type => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.recurringButton,
                  { backgroundColor: colors.card },
                  recurringType === type && styles.recurringButtonActive,
                ]}
                onPress={() => setRecurringType(type === recurringType ? undefined : type)}>
                <RotateCcw 
                  size={16} 
                  color={recurringType === type ? '#EEF5DB' : colors.subtext} 
                  style={styles.recurringIcon}
                />
                <Text
                  style={[
                    styles.recurringButtonText,
                    { color: recurringType === type ? '#EEF5DB' : colors.subtext },
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
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: typeof window !== 'undefined' ? 20 : 40,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  closeButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    minHeight: 100,
    textAlignVertical: 'top',
    margin: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
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
  },
  recurringButtonActive: {
    backgroundColor: '#1E90FF',
  },
  recurringIcon: {
    marginRight: 8,
  },
  recurringButtonText: {
    fontSize: 16,
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