import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  date: string;
}

interface DayStats {
  completed: number;
  total: number;
}

interface CalendarDay {
  date: string;
  stats: DayStats;
}

export default function StatsScreen() {
  const [calendar, setCalendar] = useState<CalendarDay[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const loadStats = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        const tasks: Task[] = JSON.parse(storedTasks);
        const statsMap = new Map<string, DayStats>();

        tasks.forEach(task => {
          const stats = statsMap.get(task.date) || { completed: 0, total: 0 };
          stats.total++;
          if (task.completed) {
            stats.completed++;
          }
          statsMap.set(task.date, stats);
        });

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const calendarDays: CalendarDay[] = [];
        
        for (let date = new Date(firstDay); date <= lastDay; date.setDate(date.getDate() + 1)) {
          const dateStr = date.toISOString().split('T')[0];
          const stats = statsMap.get(dateStr) || { completed: 0, total: 0 };
          calendarDays.push({ date: dateStr, stats });
        }

        setCalendar(calendarDays);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadStats();
    }, [currentDate])
  );

  const getCompletionColor = (completed: number, total: number) => {
    if (total === 0) return '#EEF5DB';
    const rate = completed / total;
    return `rgba(${255 * (1 - rate)}, ${255 * rate}, 85, 0.8)`;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const emptyDays = Array(firstDayOfMonth).fill(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Task Calendar</Text>
        <View style={styles.monthSelector}>
          <ChevronLeft
            size={24}
            color="#4F6367"
            onPress={() => navigateMonth('prev')}
            style={styles.navigationIcon}
          />
          <Text style={styles.monthYear}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </Text>
          <ChevronRight
            size={24}
            color="#4F6367"
            onPress={() => navigateMonth('next')}
            style={styles.navigationIcon}
          />
        </View>
      </View>
      
      <View style={styles.calendar}>
        <View style={styles.weekDays}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <Text key={day} style={styles.weekDay}>{day}</Text>
          ))}
        </View>

        <View style={styles.calendarGrid}>
          {emptyDays.map((_, index) => (
            <View key={`empty-${index}`} style={styles.emptyDay} />
          ))}
          {calendar.map((day, index) => (
            <View
              key={day.date}
              style={[
                styles.calendarDay,
                {
                  backgroundColor: getCompletionColor(
                    day.stats.completed,
                    day.stats.total
                  ),
                },
              ]}>
              <Text style={styles.dayNumber}>
                {new Date(day.date).getDate()}
              </Text>
              {day.stats.total > 0 && (
                <Text style={styles.dayStats}>
                  {day.stats.completed}/{day.stats.total}
                </Text>
              )}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B8D8D8',
    paddingTop: Platform.OS === 'web' ? 20 : 60,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4F6367',
    marginBottom: 10,
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  navigationIcon: {
    padding: 10,
  },
  monthYear: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4F6367',
    marginHorizontal: 20,
  },
  calendar: {
    padding: 20,
    backgroundColor: '#EEF5DB',
    margin: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#7A9E9F',
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  weekDay: {
    color: '#4F6367',
    fontSize: 14,
    fontWeight: '500',
    width: 40,
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  emptyDay: {
    width: 40,
    height: 40,
    margin: 4,
  },
  calendarDay: {
    width: 40,
    height: 40,
    margin: 4,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#7A9E9F',
  },
  dayNumber: {
    color: '#4F6367',
    fontSize: 12,
    fontWeight: '600',
  },
  dayStats: {
    color: '#4F6367',
    fontSize: 10,
    fontWeight: '500',
  },
});