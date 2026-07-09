import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Shadows, Radii } from 'src/constants/designTokens';

const JournalWritingScreen = () => {
  const navigation = useNavigation();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const todayPrompt = "What are you grateful for today? Sometimes, acknowledging the small wins can shift our perspective.";

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Empty Entry', 'Please add a title and some content before saving.');
      return;
    }

    setIsSaving(true);
    // TODO: API - POST /journal/entries { title, content, date }
    setTimeout(() => {
      setIsSaving(false);
      Alert.alert('Saved!', 'Your journal entry has been saved successfully.', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    }, 800);
  };

  return (
    <LinearGradient
      colors={[Colors.appBgGradientStart, Colors.appBgGradientEnd]}
      style={styles.screen}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color={Colors.ink} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Journal Entry</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Prompt card */}
        <View style={styles.promptCard}>
          <View style={styles.promptIcon}>
            <Ionicons name="sparkles" size={20} color={Colors.purple} />
          </View>
          <View>
            <Text style={styles.promptLabel}>Today's Reflection</Text>
            <Text style={styles.promptText}>{todayPrompt}</Text>
          </View>
        </View>

        {/* Title input */}
        <View>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="Name your entry (e.g., 'A day of growth')"
            placeholderTextColor={Colors.faint}
            value={title}
            onChangeText={setTitle}
            maxLength={60}
          />
          <Text style={styles.charCount}>{title.length}/60</Text>
        </View>

        {/* Content input */}
        <View>
          <Text style={styles.label}>Your Thoughts</Text>
          <TextInput
            style={styles.contentInput}
            placeholder="Write freely... There's no judgment here. Share what's on your mind."
            placeholderTextColor={Colors.faint}
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
            maxLength={2000}
          />
          <Text style={styles.charCount}>{content.length}/2000</Text>
        </View>

        {/* Mood selector */}
        <View>
          <Text style={styles.label}>How are you feeling?</Text>
          <View style={styles.moodGrid}>
            {[
              { emoji: '😍', label: 'Great', id: 'great' },
              { emoji: '😊', label: 'Good', id: 'good' },
              { emoji: '😐', label: 'Okay', id: 'okay' },
              { emoji: '😟', label: 'Bad', id: 'bad' },
              { emoji: '😢', label: 'Awful', id: 'awful' },
            ].map(mood => (
              <TouchableOpacity key={mood.id} style={styles.moodTile} activeOpacity={0.7}>
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                <Text style={styles.moodLabel}>{mood.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Tips */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Journaling Tips</Text>
          <Text style={styles.tipItem}>• Write without editing - let your thoughts flow freely</Text>
          <Text style={styles.tipItem}>• Be honest and authentic</Text>
          <Text style={styles.tipItem}>• Revisit past entries to track your growth</Text>
          <Text style={styles.tipItem}>• Use this space for processing emotions</Text>
        </View>
      </ScrollView>

      {/* Save button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.saveBtn}
          activeOpacity={0.9}
          onPress={handleSave}
          disabled={isSaving}
        >
          <LinearGradient colors={['#6A5AE0', '#4A90E2']} style={styles.saveBtnGradient}>
            {isSaving ? (
              <Ionicons name="hourglass-outline" size={20} color="#fff" />
            ) : (
              <Ionicons name="checkmark" size={20} color="#fff" />
            )}
            <Text style={styles.saveBtnText}>{isSaving ? 'Saving...' : 'Save Entry'}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 54,
    paddingBottom: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.softCard,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.ink,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100,
  },
  promptCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: Colors.pillBg,
    borderRadius: Radii.card,
    padding: 16,
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  promptIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  promptLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.purple,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  promptText: {
    fontSize: 14,
    color: Colors.ink2,
    fontWeight: '500',
    lineHeight: 20,
    marginTop: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.ink,
    marginBottom: 8,
  },
  titleInput: {
    backgroundColor: Colors.card,
    borderRadius: Radii.button,
    borderWidth: 1.5,
    borderColor: Colors.hairline,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    fontWeight: '600',
    color: Colors.ink,
    marginBottom: 6,
    ...Shadows.softCard,
  },
  contentInput: {
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    borderWidth: 1.5,
    borderColor: Colors.hairline,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.ink,
    minHeight: 180,
    marginBottom: 6,
    ...Shadows.softCard,
  },
  charCount: {
    fontSize: 11,
    color: Colors.faint,
    fontWeight: '600',
    textAlign: 'right',
    marginBottom: 18,
  },
  moodGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  moodTile: {
    width: '18%',
    alignItems: 'center',
    padding: 10,
    borderRadius: Radii.chip,
    backgroundColor: Colors.card,
    ...Shadows.softCard,
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.ink2,
  },
  tipsCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    padding: 16,
    ...Shadows.softCard,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.ink,
    marginBottom: 10,
  },
  tipItem: {
    fontSize: 12,
    color: Colors.ink2,
    fontWeight: '500',
    lineHeight: 18,
    marginBottom: 6,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.card,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    ...Shadows.frame,
  },
  saveBtn: {
    overflow: 'hidden',
    borderRadius: 18,
  },
  saveBtnGradient: {
    height: 54,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
});

export default JournalWritingScreen;
