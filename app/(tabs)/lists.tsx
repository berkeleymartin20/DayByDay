import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { RotateCcw, Clock } from 'lucide-react-native';

export default function TaskListsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Task Lists</Text>
        <Text style={styles.headerSubtitle}>View your recurring and missed tasks</Text>
      </View>

      <ScrollView style={styles.content}>
        <TouchableOpacity 
          style={[styles.categoryCard, { backgroundColor: '#1E90FF' }]}
          onPress={() => router.push('/recurring')}>
          <RotateCcw color="#EEF5DB" size={24} />
          <View style={styles.categoryContent}>
            <Text style={styles.categoryName}>Recurring Tasks</Text>
            <Text style={styles.categoryDescription}>View and manage your recurring tasks</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.categoryCard, { backgroundColor: '#FE5F55' }]}
          onPress={() => router.push('/missed')}>
          <Clock color="#EEF5DB" size={24} />
          <View style={styles.categoryContent}>
            <Text style={styles.categoryName}>Missed Tasks</Text>
            <Text style={styles.categoryDescription}>Review and complete overdue tasks</Text>
          </View>
        </TouchableOpacity>
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
  categoryCard: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  categoryContent: {
    marginTop: 30,
  },
  categoryName: {
    color: '#EEF5DB',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  categoryDescription: {
    color: '#EEF5DB',
    opacity: 0.8,
    fontSize: 16,
  },
});