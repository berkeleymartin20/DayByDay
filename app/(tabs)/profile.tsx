import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Settings, Grid2x2 as Grid, BookMarked, Heart } from 'lucide-react-native';

type TabType = 'posts' | 'saved' | 'liked';

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('posts');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.bio}>Software Developer | Coffee Enthusiast</Text>
        
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>245</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>14.3K</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>892</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'posts' && styles.activeTab]}
            onPress={() => setActiveTab('posts')}>
            <Grid size={20} color={activeTab === 'posts' ? '#1E90FF' : '#7A9E9F'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'saved' && styles.activeTab]}
            onPress={() => setActiveTab('saved')}>
            <BookMarked size={20} color={activeTab === 'saved' ? '#1E90FF' : '#7A9E9F'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'liked' && styles.activeTab]}
            onPress={() => setActiveTab('liked')}>
            <Heart size={20} color={activeTab === 'liked' ? '#1E90FF' : '#7A9E9F'} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.grid}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <View key={item} style={styles.gridItem}>
              <Image
                source={{ uri: `https://images.pexels.com/photos/${574071 + item}/pexels-photo-${574071 + item}.jpeg` }}
                style={styles.gridImage}
              />
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
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D2D',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EEF5DB',
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    color: '#7A9E9F',
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EEF5DB',
  },
  statLabel: {
    fontSize: 14,
    color: '#7A9E9F',
  },
  tabs: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#2D2D2D',
    width: '100%',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#1E90FF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
  },
  gridItem: {
    width: '32.5%',
    aspectRatio: 1,
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
});