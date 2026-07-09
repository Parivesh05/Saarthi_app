import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedButton } from 'src/components/Premium';
import { Shadows, Colors } from 'src/constants/designTokens';
import { Images } from 'src/assets/images';

const AboutUsScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={[Colors.appBgGradientStart, Colors.appBgGradientEnd]}
      style={styles.screen}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <AnimatedButton onPress={() => navigation.goBack()} scaleValue={0.92}>
            <View style={styles.backButton}>
              <Ionicons name="arrow-back" size={22} color="#211E37" />
            </View>
          </AnimatedButton>
          <View>
            <Text style={styles.title}>About uBudy</Text>
            <Text style={styles.subtitle}>The people behind your calm</Text>
          </View>
        </View>

        <LinearGradient colors={['#141D39', '#1E2A4E', '#2A3A66']} style={styles.missionCard}>
          <Text style={styles.missionLabel}>OUR MISSION</Text>
          <Text style={styles.missionText}>
            Close India&apos;s mental-health access gap - one mindful moment at a time.
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>50k+</Text>
              <Text style={styles.statLabel}>People supported</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4.8★</Text>
              <Text style={styles.statLabel}>App rating</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>24/7</Text>
              <Text style={styles.statLabel}>Companion</Text>
            </View>
          </View>
        </LinearGradient>

        <Text style={styles.sectionTitle}>Meet the team</Text>

        <View style={styles.teamCard}>
          <Image style={styles.memberImage} source={Images.DHAIRYA} />
          <Text style={styles.memberName}>Dhairya Anand Gupta</Text>
          <Text style={styles.memberRole}>FOUNDER & CEO</Text>
          <Text style={styles.memberBio}>
            A mission-driven founder focused on building accessible and ethical mental wellness solutions for India and beyond. Dhairya started Ubudy with the vision of creating a 24/7 AI-powered emotional support ecosystem that combines technology, empathy, and multilingual accessibility to make mental wellness support more affordable and scalable.
            {'\n\n'}
            Focused on solving emotional isolation and mental health accessibility challenges through AI, voice technology, and human-centered design.
          </Text>
        </View>

        <View style={styles.teamCard}>
          <Image style={styles.memberImage} source={Images.RAJA} />
          <Text style={styles.memberName}>Raja R Choudhary</Text>
          <Text style={styles.memberRole}>MENTOR & ADVISOR</Text>
          <Text style={styles.memberBio} numberOfLines={20}>
            Holder of dual doctoral degrees in Economics & Psychology, certified by Harvard and Yale University. Exponent in disruptive and critical thinking with 36 years of relevant experience in business and technology consulting, performance management, executive coaching and mentoring.
            {'\n\n'}
            Possesses diverse experience consulting across industry verticals including IT, Telecom, Banking, Insurance, Healthcare and Behavioral Health. Managed large engagements across India, Australia, Africa & South Asia.
            {'\n\n'}
            22+ years of experience building and leading practices. Distinguished Faculty at SPJIMR, Visiting Professor at IIM Mumbai (NITIE), Ex Chief Happiness Officer at IIT Madras. Currently Group Director at Dnyaan Prasad Global University and runs 3rd Eye Knowledge Foundation covering mental health and well-being services.
          </Text>
        </View>

        <Text style={styles.footerText}>Made with care in India · uBudy © 2026</Text>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 40,
    gap: 18,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.softCard,
  },
  title: {
    color: '#211E37',
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  subtitle: {
    color: '#9A97AE',
    fontSize: 13.5,
    fontWeight: '600',
  },
  missionCard: {
    borderRadius: 26,
    padding: 26,
    ...Shadows.deepElevation,
  },
  missionLabel: {
    color: '#E0902C',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  missionText: {
    color: '#FFFFFF',
    fontSize: 20,
    lineHeight: 30,
    marginTop: 10,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  statItem: {
    width: '31%',
  },
  statNumber: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 4,
  },
  sectionTitle: {
    color: '#211E37',
    fontSize: 18,
    fontWeight: '600',
  },
  teamCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 24,
    ...Shadows.raisedCard,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  initialsCircle: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: '#1A2340',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: '#E0902C',
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 1,
  },
  memberImage: {
    width: 120,
    height: 120,
    borderRadius: 20,
    alignSelf: 'center',
  },
  memberName: {
    marginTop: 16,
    color: '#1A2340',
    fontSize: 21,
    fontWeight: '700',
  },
  memberRole: {
    marginTop: 5,
    color: '#E0902C',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  memberBio: {
    marginTop: 12,
    color: '#7B7B92',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
  },
  footerText: {
    textAlign: 'center',
    color: '#A9A6BE',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 6,
  },
});

export default AboutUsScreen;
