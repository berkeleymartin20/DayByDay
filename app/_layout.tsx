import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { ThemeProvider } from '@/context/ThemeContext';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Chrome as Home, Settings } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/Colors';
import Onboarding from '@/components/Onboarding';

export default function RootLayout() {
  useFrameworkReady();
  const router = useRouter();
  const { isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;

  return (
    <ThemeProvider>
      <View style={[styles.topBar, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <TouchableOpacity 
          style={styles.topBarButton} 
          onPress={() => router.push('/')}>
          <Home size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.topBarButton} 
          onPress={() => router.push('/settings')}>
          <Settings size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="modal" 
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }} 
        />
        <Stack.Screen 
          name="recurring" 
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }} 
        />
        <Stack.Screen 
          name="missed" 
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }} 
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      <Onboarding />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: typeof window !== 'undefined' ? 20 : 60,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  topBarButton: {
    padding: 8,
  },
});