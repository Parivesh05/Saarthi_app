import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Shadows, Radii } from 'src/constants/designTokens';

const ExpertConsultationScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'psychologist' | 'counselor' | 'coach'>('all');
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All', icon: 'grid-outline' },
    { id: 'psychologist', label: 'Psychologist', icon: 'person-outline' },
    { id: 'counselor', label: 'Counselor', icon: 'people-outline' },
    { id: 'coach', label: 'Life Coach', icon: 'star-outline' },
  ];

  const experts = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      title: 'Clinical Psychologist',
      category: 'psychologist',
      rating: 4.9,
      reviews: 324,
      hourly_rate: 2000,
      availability: 'Available today',
      bio: 'Specializes in anxiety, depression, and trauma-focused therapy',
      experience: '12 years',
      languages: ['English', 'Hindi'],
      verified: true,
    },
    {
      id: '2',
      name: 'Ms. Priya Sharma',
      title: 'Licensed Counselor',
      category: 'counselor',
      rating: 4.8,
      reviews: 287,
      hourly_rate: 1500,
      availability: 'Available in 2 hours',
      bio: 'Relationship, career, and life transition counseling',
      experience: '8 years',
      languages: ['English', 'Hindi', 'Marathi'],
      verified: true,
    },
    {
      id: '3',
      name: 'Mr. Amit Patel',
      title: 'Certified Life Coach',
      category: 'coach',
      rating: 4.7,
      reviews: 156,
      hourly_rate: 1200,
      availability: 'Available now',
      bio: 'Career growth, confidence building, productivity coaching',
      experience: '6 years',
      languages: ['English', 'Gujarati'],
      verified: true,
    },
    {
      id: '4',
      name: 'Dr. Meera Nair',
      title: 'Clinical Psychologist',
      category: 'psychologist',
      rating: 4.9,
      reviews: 412,
      hourly_rate: 2500,
      availability: 'Available tomorrow',
      bio: 'Specialist in cognitive behavioral therapy and mindfulness',
      experience: '15 years',
      languages: ['English', 'Malayalam'],
      verified: true,
    },
  ];

  const filteredExperts = selectedCategory === 'all'
    ? experts
    : experts.filter(e => e.category === selectedCategory);

  const ExpertCard = ({ expert }: { expert: typeof experts[0] }) => (
    <TouchableOpacity
      style={[styles.expertCard, selectedExpert === expert.id && styles.expertCardActive]}
      activeOpacity={0.8}
      onPress={() => setSelectedExpert(expert.id)}
    >
      <View style={styles.expertHeader}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{expert.name.charAt(0)}</Text>
          </View>
          {expert.verified && (
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#22B573" />
            </View>
          )}
        </View>
        <View style={styles.expertInfo}>
          <Text style={styles.expertName}>{expert.name}</Text>
          <Text style={styles.expertTitle}>{expert.title}</Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={12} color="#F5A623" />
            <Text style={styles.rating}>{expert.rating}</Text>
            <Text style={styles.reviews}>({expert.reviews} reviews)</Text>
          </View>
        </View>
      </View>

      <Text style={styles.bio}>{expert.bio}</Text>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Ionicons name="briefcase-outline" size={14} color={Colors.purple} />
          <Text style={styles.metaText}>{expert.experience}</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="language-outline" size={14} color={Colors.purple} />
          <Text style={styles.metaText}>{expert.languages.length} languages</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="time-outline" size={14} color={Colors.purple} />
          <Text style={styles.metaText}>{expert.availability}</Text>
        </View>
      </View>

      <View style={styles.footerRow}>
        <View>
          <Text style={styles.priceLabel}>Hourly rate</Text>
          <Text style={styles.price}>₹{expert.hourly_rate}</Text>
        </View>
        <TouchableOpacity style={styles.bookBtn}>
          <Text style={styles.bookBtnText}>Book Session</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

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
        <View>
          <Text style={styles.headerTitle}>Connect with Expert</Text>
          <Text style={styles.headerSub}>1-on-1 professional support</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Hero card */}
        <View style={styles.heroCard}>
          <Ionicons name="people-circle-outline" size={28} color={Colors.purple} />
          <Text style={styles.heroTitle}>Book a session with a licensed professional</Text>
          <Text style={styles.heroSub}>Get personalized guidance from qualified experts</Text>
        </View>

        {/* Category filter */}
        <View style={styles.filterRow}>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.filterBtn, selectedCategory === cat.id && styles.filterBtnActive]}
              onPress={() => setSelectedCategory(cat.id as any)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={cat.icon as any}
                size={16}
                color={selectedCategory === cat.id ? '#fff' : Colors.purple}
              />
              <Text style={[styles.filterText, selectedCategory === cat.id && styles.filterTextActive]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Experts list */}
        {filteredExperts.length > 0 ? (
          <View style={styles.expertsList}>
            {filteredExperts.map(expert => (
              <ExpertCard key={expert.id} expert={expert} />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color={Colors.faint} />
            <Text style={styles.emptyTitle}>No experts found</Text>
            <Text style={styles.emptySub}>Try adjusting your filters</Text>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 20,
    paddingTop: 54,
    paddingBottom: 14,
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
  headerSub: {
    fontSize: 12,
    color: Colors.muted,
    fontWeight: '500',
    marginTop: 2,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.cardLg,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    ...Shadows.softCard,
  },
  heroTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.ink,
    textAlign: 'center',
    marginTop: 10,
  },
  heroSub: {
    fontSize: 13,
    color: Colors.muted,
    textAlign: 'center',
    marginTop: 6,
    fontWeight: '500',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: Radii.pill,
    backgroundColor: Colors.card,
    borderWidth: 1.5,
    borderColor: Colors.purple,
    ...Shadows.softCard,
  },
  filterBtnActive: {
    backgroundColor: Colors.purple,
    borderColor: Colors.purple,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.purple,
  },
  filterTextActive: {
    color: '#fff',
  },
  expertsList: {
    gap: 14,
  },
  expertCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.cardLg,
    padding: 18,
    ...Shadows.raisedCard,
  },
  expertCardActive: {
    borderWidth: 2,
    borderColor: Colors.purple,
  },
  expertHeader: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: Colors.pillBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.purple,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 2,
  },
  expertInfo: {
    flex: 1,
  },
  expertName: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.ink,
  },
  expertTitle: {
    fontSize: 12,
    color: Colors.purple,
    fontWeight: '700',
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  rating: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.ink,
  },
  reviews: {
    fontSize: 11,
    color: Colors.muted,
    fontWeight: '500',
  },
  bio: {
    fontSize: 13,
    color: Colors.ink2,
    fontWeight: '500',
    lineHeight: 19,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.hairline,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  metaText: {
    fontSize: 12,
    color: Colors.ink2,
    fontWeight: '600',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceLabel: {
    fontSize: 11,
    color: Colors.muted,
    fontWeight: '600',
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.purple,
    marginTop: 2,
  },
  bookBtn: {
    backgroundColor: Colors.purple,
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: Radii.button,
  },
  bookBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '800',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.ink,
    marginTop: 14,
  },
  emptySub: {
    fontSize: 13,
    color: Colors.muted,
    fontWeight: '500',
    marginTop: 4,
  },
});

export default ExpertConsultationScreen;
