import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedButton } from 'src/components/Premium';
import { Shadows, Colors } from 'src/constants/designTokens';

const PricingScreen = () => {
  const navigation = useNavigation();
  const [isYearly, setIsYearly] = useState(false);

  const prices = useMemo(
    () => ({
      basic: isYearly ? '₹239/mo' : '₹299/mo',
      premium: isYearly ? '₹479/mo' : '₹599/mo',
      family: isYearly ? '₹799/mo' : '₹999/mo',
    }),
    [isYearly],
  );

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
            <Text style={styles.title}>Choose your plan</Text>
            <Text style={styles.subtitle}>Invest in your peace of mind</Text>
          </View>
        </View>

        <View style={styles.toggleWrap}>
          <AnimatedButton
            onPress={() => setIsYearly(false)}
            scaleValue={0.96}
          >
            <View style={[styles.toggleSegment, !isYearly && styles.toggleActive]}>
              <Text style={[styles.toggleText, !isYearly && styles.toggleTextActive]}>Monthly</Text>
            </View>
          </AnimatedButton>
          <AnimatedButton
            onPress={() => setIsYearly(true)}
            scaleValue={0.96}
          >
            <View style={[styles.toggleSegment, isYearly && styles.toggleActive]}>
              <View style={styles.yearlyRow}>
                <Text style={[styles.toggleText, isYearly && styles.toggleTextActive]}>Yearly</Text>
                <Text style={styles.discountBadge}>-20%</Text>
              </View>
            </View>
          </AnimatedButton>
        </View>

        <View style={styles.basicCard}>
          <Text style={styles.planTitle}>Basic</Text>
          <Text style={styles.planPrice}>{prices.basic}</Text>
          <Text style={styles.planFeature}>• Daily mood tracking and journal</Text>
          <Text style={styles.planFeature}>• 3 AI chats per day</Text>
          <Text style={styles.planFeature}>• Weekly wellness summary</Text>
          <AnimatedButton scaleValue={0.97}>
            <View style={styles.outlineBtn}>
              <Text style={styles.outlineBtnText}>Choose Basic</Text>
            </View>
          </AnimatedButton>
        </View>

        <LinearGradient colors={['#6A5AE0', '#4A90E2']} style={styles.premiumCard}>
          <Text style={styles.popularBadge}>★ MOST POPULAR</Text>
          <Text style={styles.premiumTitle}>Premium</Text>
          <Text style={styles.premiumPrice}>{prices.premium}</Text>
          <Text style={styles.premiumFeature}>• Everything in Basic</Text>
          <Text style={styles.premiumFeature}>• Unlimited AI chats and insights</Text>
          <Text style={styles.premiumFeature}>• Full dashboard and mood trends</Text>
          <Text style={styles.premiumFeature}>• 1 expert session/month</Text>
          <AnimatedButton scaleValue={0.97}>
            <View style={styles.whiteBtn}>
              <Text style={styles.whiteBtnText}>Start Premium</Text>
            </View>
          </AnimatedButton>
        </LinearGradient>

        <View style={styles.basicCard}>
          <Text style={styles.planTitle}>Family</Text>
          <Text style={styles.planPrice}>{prices.family}</Text>
          <Text style={styles.planFeature}>• Everything in Premium</Text>
          <Text style={styles.planFeature}>• Shared family wellness view</Text>
          <Text style={styles.planFeature}>• 2 expert sessions/month</Text>
          <AnimatedButton scaleValue={0.97}>
            <View style={styles.neutralBtn}>
              <Text style={styles.neutralBtnText}>Choose Family</Text>
            </View>
          </AnimatedButton>
        </View>

        <Text style={styles.footerText}>Cancel anytime · Prices incl. GST</Text>
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
    paddingBottom: 36,
    gap: 16,
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
    fontSize: 26,
    fontWeight: '700',
    color: '#211E37',
    letterSpacing: -0.5,
  },
  subtitle: {
    color: '#9A97AE',
    fontSize: 13.5,
    fontWeight: '600',
  },
  toggleWrap: {
    alignSelf: 'center',
    backgroundColor: '#EAE8F5',
    borderRadius: 16,
    padding: 5,
    flexDirection: 'row',
    gap: 6,
    width: 280,
  },
  toggleSegment: {
    flex: 1,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  toggleActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#3C3278',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 3,
  },
  toggleText: {
    color: '#7A7890',
    fontSize: 14,
    fontWeight: '800',
  },
  toggleTextActive: {
    color: '#211E37',
  },
  yearlyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  discountBadge: {
    backgroundColor: '#E4F6EE',
    color: '#22B573',
    fontWeight: '800',
    fontSize: 10,
    borderRadius: 12,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  basicCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 22,
    borderWidth: 1.5,
    borderColor: '#ECEAF5',
    ...Shadows.raisedCard,
  },
  planTitle: {
    color: '#211E37',
    fontSize: 18,
    fontWeight: '700',
  },
  planPrice: {
    marginTop: 8,
    color: '#211E37',
    fontSize: 30,
    fontWeight: '700',
  },
  planFeature: {
    marginTop: 8,
    color: '#4A4763',
    fontSize: 14,
    fontWeight: '600',
  },
  outlineBtn: {
    marginTop: 16,
    height: 50,
    borderRadius: 16,
    borderColor: '#6A5AE0',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineBtnText: {
    color: '#6A5AE0',
    fontSize: 16,
    fontWeight: '700',
  },
  premiumCard: {
    borderRadius: 24,
    padding: 22,
    shadowColor: '#6A5AE0',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 22 },
    shadowRadius: 46,
    elevation: 10,
  },
  popularBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    color: '#4A3AAE',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 10,
    fontWeight: '800',
  },
  premiumTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 12,
  },
  premiumPrice: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
    marginTop: 6,
  },
  premiumFeature: {
    color: '#EEF1FF',
    marginTop: 8,
    fontWeight: '600',
    fontSize: 14,
  },
  whiteBtn: {
    marginTop: 16,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteBtnText: {
    color: '#4A3AAE',
    fontWeight: '700',
    fontSize: 16,
  },
  neutralBtn: {
    marginTop: 16,
    height: 50,
    borderRadius: 16,
    borderColor: '#E4E2EE',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  neutralBtnText: {
    color: '#4A4763',
    fontSize: 16,
    fontWeight: '700',
  },
  footerText: {
    textAlign: 'center',
    color: '#A9A6BE',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 4,
  },
});

export default PricingScreen;
