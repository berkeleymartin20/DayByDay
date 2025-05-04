import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, Linking } from 'react-native';
import { Moon, Sun, Monitor, Star, Mail, FileText, Heart } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/Colors';

export default function SettingsScreen() {
  const { theme, setTheme, isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;

  const handleSupport = () => {
    Linking.openURL('mailto:support@daybyday.app');
  };

  const handleTerms = () => {
    // Open terms and conditions modal
  };

  const handleDonate = () => {
    // Open donation modal/link
  };

  const handleRate = () => {
    // Open app store rating
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
        <Text style={[styles.headerSubtitle, { color: colors.subtext }]}>Customize your experience</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Theme</Text>
          <View style={styles.themeOptions}>
            <TouchableOpacity
              style={[styles.themeOption, { backgroundColor: colors.card }, theme === 'light' && styles.themeOptionActive]}
              onPress={() => setTheme('light')}>
              <Sun size={24} color={theme === 'light' ? colors.text : colors.subtext} />
              <Text style={[styles.themeText, { color: theme === 'light' ? colors.text : colors.subtext }]}>Light</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.themeOption, { backgroundColor: colors.card }, theme === 'dark' && styles.themeOptionActive]}
              onPress={() => setTheme('dark')}>
              <Moon size={24} color={theme === 'dark' ? colors.text : colors.subtext} />
              <Text style={[styles.themeText, { color: theme === 'dark' ? colors.text : colors.subtext }]}>Dark</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.themeOption, { backgroundColor: colors.card }, theme === 'system' && styles.themeOptionActive]}
              onPress={() => setTheme('system')}>
              <Monitor size={24} color={theme === 'system' ? colors.text : colors.subtext} />
              <Text style={[styles.themeText, { color: theme === 'system' ? colors.text : colors.subtext }]}>System</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>App</Text>
          <TouchableOpacity style={[styles.option, { backgroundColor: colors.card }]} onPress={handleRate}>
            <Star size={24} color={colors.subtext} />
            <Text style={[styles.optionText, { color: colors.text }]}>Rate App</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.option, { backgroundColor: colors.card }]} onPress={handleSupport}>
            <Mail size={24} color={colors.subtext} />
            <Text style={[styles.optionText, { color: colors.text }]}>Contact Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.option, { backgroundColor: colors.card }]} onPress={handleTerms}>
            <FileText size={24} color={colors.subtext} />
            <Text style={[styles.optionText, { color: colors.text }]}>Terms & Conditions</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.donateButton} onPress={handleDonate}>
          <Heart size={24} color="#EEF5DB" />
          <Text style={styles.donateText}>Support Development</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: typeof window !== 'undefined' ? 20 : 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  themeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  themeOption: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  themeOptionActive: {
    backgroundColor: '#1E90FF',
  },
  themeText: {
    marginTop: 8,
    fontSize: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 12,
  },
  donateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FE5F55',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  donateText: {
    color: '#EEF5DB',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
});