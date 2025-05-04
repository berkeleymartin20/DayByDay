import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Dimensions, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

const CURRENT_VERSION = '1.0.0'; // Update this when making major changes

interface OnboardingStep {
  title: string;
  description: string;
  image: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    title: 'Welcome to Day by Day',
    description: 'Your personal task manager for daily productivity and organization.',
    image: 'https://images.pexels.com/photos/3243/pen-calendar-to-do-checklist.jpg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Track Your Progress',
    description: 'Monitor your daily achievements and stay motivated with visual progress tracking.',
    image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Recurring Tasks',
    description: 'Set up daily, weekly, monthly, or yearly recurring tasks to maintain consistency.',
    image: 'https://images.pexels.com/photos/1059078/pexels-photo-1059078.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export default function Onboarding() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const lastVersion = await AsyncStorage.getItem('lastVersion');
      const hasCompletedOnboarding = await AsyncStorage.getItem('hasCompletedOnboarding');
      
      if (!hasCompletedOnboarding || lastVersion !== CURRENT_VERSION) {
        setShowOnboarding(true);
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
      await AsyncStorage.setItem('lastVersion', CURRENT_VERSION);
      setShowOnboarding(false);
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  if (!showOnboarding) return null;

  return (
    <Modal visible={showOnboarding} animationType="fade">
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Image
          source={{ uri: onboardingSteps[currentStep].image }}
          style={styles.image}
        />
        
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>
            {onboardingSteps[currentStep].title}
          </Text>
          <Text style={[styles.description, { color: colors.subtext }]}>
            {onboardingSteps[currentStep].description}
          </Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.indicators}>
            {onboardingSteps.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  { backgroundColor: colors.subtext },
                  currentStep === index && styles.indicatorActive,
                ]}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>
              {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: typeof window !== 'undefined' ? 40 : 60,
    paddingBottom: typeof window !== 'undefined' ? 20 : 40,
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 20,
  },
  content: {
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 40,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    opacity: 0.4,
  },
  indicatorActive: {
    backgroundColor: '#1E90FF',
    opacity: 1,
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#EEF5DB',
    fontSize: 18,
    fontWeight: '600',
  },
});