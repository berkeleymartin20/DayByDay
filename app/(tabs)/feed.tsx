import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { Image as ImageIcon, SquarePen as PenSquare, ChartBar as BarChart2 } from 'lucide-react-native';

type PostType = 'text' | 'image' | 'poll';

export default function FeedScreen() {
  const [postType, setPostType] = useState<PostType>('text');
  const [postText, setPostText] = useState('');

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.createPost}>
          <View style={styles.postTypeSelector}>
            <TouchableOpacity
              style={[styles.typeButton, postType === 'text' && styles.typeButtonActive]}
              onPress={() => setPostType('text')}>
              <PenSquare size={20} color={postType === 'text' ? '#EEF5DB' : '#7A9E9F'} />
              <Text style={[styles.typeButtonText, postType === 'text' && styles.typeButtonTextActive]}>Text</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.typeButton, postType === 'image' && styles.typeButtonActive]}
              onPress={() => setPostType('image')}>
              <ImageIcon size={20} color={postType === 'image' ? '#EEF5DB' : '#7A9E9F'} />
              <Text style={[styles.typeButtonText, postType === 'image' && styles.typeButtonTextActive]}>Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.typeButton, postType === 'poll' && styles.typeButtonActive]}
              onPress={() => setPostType('poll')}>
              <BarChart2 size={20} color={postType === 'poll' ? '#EEF5DB' : '#7A9E9F'} />
              <Text style={[styles.typeButtonText, postType === 'poll' && styles.typeButtonTextActive]}>Poll</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.postInput}
            placeholder="What's on your mind?"
            placeholderTextColor="#7A9E9F"
            multiline
            value={postText}
            onChangeText={setPostText}
          />

          <TouchableOpacity style={styles.postButton}>
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>

        {/* Example posts */}
        <View style={styles.post}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg' }}
            style={styles.profileImage}
          />
          <View style={styles.postContent}>
            <Text style={styles.username}>John Doe</Text>
            <Text style={styles.postText}>Just launched my new project! 🚀</Text>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg' }}
              style={styles.postImage}
            />
          </View>
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
  content: {
    flex: 1,
    padding: 20,
  },
  createPost: {
    backgroundColor: '#2D2D2D',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  postTypeSelector: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 10,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E1E1E',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  typeButtonActive: {
    backgroundColor: '#1E90FF',
  },
  typeButtonText: {
    color: '#7A9E9F',
    fontSize: 14,
  },
  typeButtonTextActive: {
    color: '#EEF5DB',
  },
  postInput: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 12,
    color: '#EEF5DB',
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  postButton: {
    backgroundColor: '#1E90FF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#EEF5DB',
    fontSize: 16,
    fontWeight: '600',
  },
  post: {
    backgroundColor: '#2D2D2D',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postContent: {
    flex: 1,
  },
  username: {
    color: '#EEF5DB',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  postText: {
    color: '#EEF5DB',
    fontSize: 14,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
});