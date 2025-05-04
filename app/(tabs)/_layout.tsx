import { Tabs } from 'expo-router';
import { Newspaper, ChartBar as BarChart, Plus, ListTodo, User } from 'lucide-react-native';
import { View, StyleSheet, Platform } from 'react-native';
import { useState } from 'react';
import AddTaskModal from '@/components/AddTaskModal';

export default function TabLayout() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#1E1E1E',
            borderTopWidth: 0,
            height: Platform.OS === 'ios' ? 85 : 65,
            paddingBottom: Platform.OS === 'ios' ? 30 : 10,
            paddingTop: 10,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: -4,
            },
            shadowOpacity: 0.1,
            shadowRadius: 8,
          },
          tabBarActiveTintColor: '#1E90FF',
          tabBarInactiveTintColor: '#7A9E9F',
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: -4,
          },
        }}>
        <Tabs.Screen
          name="feed"
          options={{
            title: "Feed",
            tabBarIcon: ({ size, color }) => (
              <View style={styles.tabIconContainer}>
                <Newspaper size={size} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="stats"
          options={{
            title: 'Stats',
            tabBarIcon: ({ size, color }) => (
              <View style={styles.tabIconContainer}>
                <BarChart size={size} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="new"
          options={{
            title: '',
            tabBarIcon: () => (
              <View style={styles.addButtonContainer}>
                <View style={styles.addButton}>
                  <Plus size={28} color="#EEF5DB" />
                </View>
              </View>
            ),
          }}
          listeners={() => ({
            tabPress: (e) => {
              e.preventDefault();
              setIsModalVisible(true);
            },
          })}
        />
        <Tabs.Screen
          name="lists"
          options={{
            title: "Lists",
            tabBarIcon: ({ size, color }) => (
              <View style={styles.tabIconContainer}>
                <ListTodo size={size} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ size, color }) => (
              <View style={styles.tabIconContainer}>
                <User size={size} color={color} />
              </View>
            ),
          }}
        />
      </Tabs>
      <AddTaskModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 28,
  },
  addButtonContainer: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 16 : 2,
  },
  addButton: {
    backgroundColor: '#1E90FF',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1E90FF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});