import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/interface/Navigation/navigation.interface';
import { NAVIGATION } from 'src/constants/Navigation/navigation.constant';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'src/constants/designTokens';

const CHART_WIDTH = 320;

const DashboardScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <LinearGradient
      colors={[Colors.appBgGradientStart, Colors.appBgGradientEnd]}
      style={styles.screen}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Dashboard</Text>

        {!isLoading && (
          <>
            <LinearGradient colors={['#6A5AE0', '#5B7CE4', '#4A90E2']} style={styles.heroCard}>
              <View style={styles.heroContent}>
                <View style={styles.heroLeft}>
                  <Text style={styles.heroLabel}>Wellness Score</Text>
                  <View style={styles.scoreRow}>
                    <Text style={styles.scoreNumber}>89</Text>
                    <Text style={styles.scorePercent}>%</Text>
                  </View>
                  <View style={styles.trendRow}>
                    <Ionicons name="trending-up" size={14} color="#FFFFFF" />
                    <Text style={styles.trendText}>+6% vs last week</Text>
                  </View>
                </View>
                <View style={styles.heroRight}>
                  <View style={styles.greatBadge}>
                    <Text style={styles.greatText}>GREAT</Text>
                    <Text style={styles.monthText}>MONTH</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>

            <View style={styles.statsRow}>
              <View style={styles.streakCard}>
                <Text style={styles.streakEmoji}>🔥</Text>
                <Text style={styles.streakNumber}>12</Text>
                <Text style={styles.streakLabel}>Day check-in streak</Text>
                <View style={styles.dotsRow}>
                  {[1,2,3,4,5,6,7].map((i) => (
                    <View key={i} style={styles.streakDot} />
                  ))}
                </View>
              </View>
              <View style={styles.goalCard}>
                <View style={styles.goalCircle}>
                  <Text style={styles.goalNumber}>5/7</Text>
                </View>
                <Text style={styles.goalTitle}>Weekly goal</Text>
                <Text style={styles.goalSub}>2 sessions to go</Text>
              </View>
            </View>

            <View style={styles.habitsCard}>
              <Text style={styles.habitsTitle}>Habits this week</Text>

              <View style={styles.habitItem}>
                <View style={styles.habitLeft}>
                  <View style={[styles.habitIcon, { backgroundColor: '#F0EDFC' }]}>
                    <Ionicons name="fitness-outline" size={20} color="#6A5AE0" />
                  </View>
                  <Text style={styles.habitName}>Meditate</Text>
                </View>
                <Text style={styles.habitScore}>6/7</Text>
              </View>
              <View style={[styles.habitProgress, { width: '86%', backgroundColor: '#6A5AE0' }]} />

              <View style={styles.habitItem}>
                <View style={styles.habitLeft}>
                  <View style={[styles.habitIcon, { backgroundColor: '#EBF3FC' }]}>
                    <Ionicons name="book-outline" size={20} color="#3E8BEE" />
                  </View>
                  <Text style={styles.habitName}>Journal</Text>
                </View>
                <Text style={styles.habitScore}>4/7</Text>
              </View>
              <View style={[styles.habitProgress, { width: '57%', backgroundColor: '#3E8BEE' }]} />

              <View style={styles.habitItem}>
                <View style={styles.habitLeft}>
                  <View style={[styles.habitIcon, { backgroundColor: '#E8F5EE' }]}>
                    <Ionicons name="leaf-outline" size={20} color="#22B573" />
                  </View>
                  <Text style={styles.habitName}>Breathe</Text>
                </View>
                <View style={styles.habitRight}>
                  <Text style={styles.habitScore}>7/7</Text>
                  <Ionicons name="checkmark-circle" size={18} color="#22B573" />
                </View>
              </View>
              <View style={[styles.habitProgress, { width: '100%', backgroundColor: '#22B573' }]} />

              <View style={styles.habitItem}>
                <View style={styles.habitLeft}>
                  <View style={[styles.habitIcon, { backgroundColor: '#F0EDFC' }]}>
                    <Ionicons name="moon-outline" size={20} color="#8B7BF0" />
                  </View>
                  <Text style={styles.habitName}>Sleep 7h+</Text>
                </View>
                <Text style={styles.habitScore}>5/7</Text>
              </View>
              <View style={[styles.habitProgress, { width: '71%', backgroundColor: '#8B7BF0' }]} />
            </View>

            <View style={styles.checkInSection}>
              <Text style={styles.checkInTitle}>Today's check-in</Text>
              <View style={styles.checkInRow}>
                <View style={styles.checkInCard}>
                  <View style={[styles.checkInIcon, { backgroundColor: '#EBF3FC' }]}>
                    <Ionicons name="happy-outline" size={24} color="#3E8BEE" />
                  </View>
                  <Text style={styles.checkInValue}>Good</Text>
                  <Text style={styles.checkInLabel}>Mood</Text>
                </View>
                <View style={styles.checkInCard}>
                  <View style={[styles.checkInIcon, { backgroundColor: '#FEF5E7' }]}>
                    <Ionicons name="flash" size={24} color="#F5A623" />
                  </View>
                  <Text style={styles.checkInValue}>78%</Text>
                  <Text style={styles.checkInLabel}>Energy</Text>
                </View>
                <View style={styles.checkInCard}>
                  <View style={[styles.checkInIcon, { backgroundColor: '#F0EDFC' }]}>
                    <Ionicons name="moon" size={24} color="#8B7BF0" />
                  </View>
                  <Text style={styles.checkInValue}>7.2h</Text>
                  <Text style={styles.checkInLabel}>Sleep</Text>
                </View>
              </View>
            </View>

            <LinearGradient colors={['#1C2541', '#2A3A66', '#374A7A']} style={styles.aiCard}>
              <View style={styles.aiHeaderRow}>
                <View style={styles.sparkleTile}>
                  <Ionicons name="sparkles" size={18} color="#FFFFFF" />
                </View>
              </View>
              <Text style={styles.aiTitle}>uBudy noticed</Text>
              <Text style={styles.aiBody}>
                Your stress spikes on weekday evenings. A 5-minute wind-down reminder can help.
              </Text>
              <View style={styles.aiActions}>
                <TouchableOpacity style={styles.aiPrimaryBtn} activeOpacity={0.8}>
                  <Text style={styles.aiPrimaryText}>Set reminder</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.aiSecondaryBtn} activeOpacity={0.8}>
                  <Text style={styles.aiSecondaryText}>Not now</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Weekly mood trend</Text>
              <LineChart
                width={CHART_WIDTH}
                height={180}
                yAxisInterval={1}
                fromZero
                withHorizontalLabels
                withVerticalLines={false}
                withInnerLines
                data={{
                  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                  datasets: [{ data: [2, 3, 4, 3, 5, 3, 4] }],
                }}
                chartConfig={{
                  backgroundColor: '#FFFFFF',
                  backgroundGradientFrom: '#FFFFFF',
                  backgroundGradientTo: '#FFFFFF',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(106, 90, 224, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(138, 138, 160, ${opacity})`,
                  propsForDots: {
                    r: '4',
                    strokeWidth: '2',
                    stroke: '#6A5AE0',
                  },
                  propsForBackgroundLines: {
                    strokeDasharray: '5,5',
                    stroke: '#EFEDF7',
                  },
                }}
                bezier
                style={styles.chart}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate(NAVIGATION.MOOD_SCREEN)}
                activeOpacity={0.7}
              >
                <View style={styles.moodBtnWrapper}>
                  <LinearGradient
                    colors={['#6A5AE0', '#4A90E2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.moodBtn}
                  >
                    <Text style={styles.moodBtnText}>Track mood</Text>
                    <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Upgrade for expert support</Text>
              <Text style={styles.cardBody}>
                Premium plans unlock expert sessions, deeper insights, and family wellness tools.
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate(NAVIGATION.PRICING_SCREEN)}
                activeOpacity={0.7}
              >
                <View style={styles.outlineBtn}>
                  <Text style={styles.outlineBtnText}>See plans</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
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
    paddingVertical: 12,
    gap: 18,
    paddingBottom: 120,
  },
  pageTitle: {
    fontSize: 27,
    fontWeight: '800',
    color: '#1A2340',
  },
  heroCard: {
    borderRadius: 26,
    padding: 22,
    shadowColor: '#6A5AE0',
    shadowOpacity: 0.34,
    shadowOffset: { width: 0, height: 20 },
    shadowRadius: 44,
    elevation: 12,
  },
  heroContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroLeft: {
    flex: 1,
  },
  heroRight: {
    marginLeft: 16,
  },
  heroLabel: {
    color: '#EEEBFA',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 4,
  },
  scoreNumber: {
    color: '#FFFFFF',
    fontSize: 50,
    lineHeight: 56,
    fontWeight: '800',
  },
  scorePercent: {
    color: '#FFFFFF',
    fontSize: 22,
    marginBottom: 9,
    marginLeft: 4,
    fontWeight: '700',
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  trendText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  greatBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  greatText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  monthText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  streakCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#3C3278',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 4,
  },
  streakEmoji: {
    fontSize: 24,
  },
  streakNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1A2340',
    marginTop: 4,
  },
  streakLabel: {
    fontSize: 12,
    color: '#8A8AA0',
    fontWeight: '600',
    marginTop: 4,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 12,
  },
  streakDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF8C42',
  },
  goalCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#3C3278',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 4,
  },
  goalCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: '#6A5AE0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0EDFC',
  },
  goalNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: '#6A5AE0',
  },
  goalTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1A2340',
    marginTop: 10,
  },
  goalSub: {
    fontSize: 11,
    color: '#8A8AA0',
    fontWeight: '600',
    marginTop: 2,
  },
  habitsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    shadowColor: '#3C3278',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 24,
    elevation: 5,
  },
  habitsTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A2340',
    marginBottom: 16,
  },
  habitItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  habitLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  habitIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  habitName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A2340',
  },
  habitRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  habitScore: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8A8AA0',
  },
  habitProgress: {
    height: 6,
    borderRadius: 3,
    marginTop: 8,
  },
  checkInSection: {
    marginTop: 6,
  },
  checkInTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A2340',
    marginBottom: 14,
  },
  checkInRow: {
    flexDirection: 'row',
    gap: 12,
  },
  checkInCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#3C3278',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 16,
    elevation: 3,
  },
  checkInIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkInValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A2340',
    marginTop: 10,
  },
  checkInLabel: {
    fontSize: 12,
    color: '#8A8AA0',
    fontWeight: '600',
    marginTop: 3,
  },
  aiCard: {
    borderRadius: 24,
    padding: 20,
    shadowColor: '#121A36',
    shadowOpacity: 0.44,
    shadowOffset: { width: 0, height: 16 },
    shadowRadius: 34,
    elevation: 11,
  },
  aiHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 4,
  },
  aiPill: {
    color: '#C7BEF7',
    backgroundColor: 'rgba(139,123,240,0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    fontWeight: '700',
    fontSize: 11,
  },
  sparkleTile: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6A5AE0',
  },
  aiTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    marginTop: 10,
    fontWeight: '700',
  },
  aiBody: {
    color: '#E7EBFF',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8,
    fontWeight: '600',
  },
  aiActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  aiPrimaryBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiPrimaryText: {
    color: '#182140',
    fontWeight: '700',
    fontSize: 13,
  },
  aiSecondaryBtn: {
    borderRadius: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.45)',
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiSecondaryText: {
    color: '#E9ECFF',
    fontWeight: '700',
    fontSize: 13,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 22,
    padding: 18,
    shadowColor: '#3C3278',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 16 },
    shadowRadius: 32,
    elevation: 7,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  cardTitle: {
    color: '#1A2340',
    fontSize: 18,
    fontWeight: '800',
  },
  cardBody: {
    color: '#4A4763',
    marginTop: 8,
    fontWeight: '600',
    lineHeight: 21,
  },
  chart: {
    marginTop: 12,
    borderRadius: 16,
    marginLeft: -10,
  },
  moodBtnWrapper: {
    marginTop: 14,
    borderRadius: 16,
    shadowColor: '#6A5AE0',
    shadowOpacity: 0.34,
    shadowOffset: { width: 0, height: 16 },
    shadowRadius: 32,
    elevation: 8,
  },
  moodBtn: {
    borderRadius: 16,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  moodBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  outlineBtn: {
    marginTop: 14,
    borderWidth: 1.5,
    borderColor: '#6A5AE0',
    borderRadius: 16,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outlineBtnText: {
    color: '#6A5AE0',
    fontWeight: '700',
    fontSize: 15,
  },
});

export default DashboardScreen;
