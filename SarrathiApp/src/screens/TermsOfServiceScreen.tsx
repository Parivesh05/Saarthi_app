import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Shadows, Radii } from 'src/constants/designTokens';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const Para = ({ text }: { text: string }) => (
  <Text style={styles.para}>{text}</Text>
);

const BulletItem = ({ text }: { text: string }) => (
  <View style={styles.bulletRow}>
    <View style={styles.bullet} />
    <Text style={styles.bulletText}>{text}</Text>
  </View>
);

const TermsOfServiceScreen = () => {
  const navigation = useNavigation();

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
        <Text style={styles.headerTitle}>Terms of Service</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Hero card */}
        <View style={styles.heroCard}>
          <View style={styles.iconWrap}>
            <Ionicons name="document-text" size={36} color={Colors.purple} />
          </View>
          <Text style={styles.heroTitle}>Terms of Service</Text>
          <Text style={styles.heroSub}>
            By using uBudy, you agree to these terms. Please read them carefully before creating an account.
          </Text>
          <View style={styles.effectivePill}>
            <Ionicons name="calendar-outline" size={13} color={Colors.purple} />
            <Text style={styles.effectiveText}>Effective: July 1, 2025</Text>
          </View>
        </View>

        {/* Important disclaimer */}
        <View style={styles.disclaimerCard}>
          <View style={styles.disclaimerHeader}>
            <Ionicons name="warning-outline" size={20} color="#E0902C" />
            <Text style={styles.disclaimerTitle}>Important Health Disclaimer</Text>
          </View>
          <Text style={styles.disclaimerText}>
            uBudy is a wellness companion app and is NOT a substitute for professional medical or psychiatric care. If you are experiencing a mental health crisis or emergency, please contact emergency services or a crisis helpline immediately.
          </Text>
          <View style={styles.crisisBox}>
            <Ionicons name="call" size={14} color="#EF5B5B" />
            <Text style={styles.crisisText}>Crisis Helpline: +91 8840209873 (iCall)</Text>
          </View>
        </View>

        {/* Content card */}
        <View style={styles.contentCard}>

          <Section title="1. Acceptance of Terms">
            <Para text="By downloading, installing, or using the uBudy application ('Service'), you agree to be bound by these Terms of Service ('Terms'). If you do not agree to these Terms, do not use the Service." />
          </Section>

          <Section title="2. Eligibility">
            <Para text="You must be at least 13 years of age to use uBudy. By using this Service, you represent and warrant that you meet this requirement. Users between 13 and 18 must have parental or guardian consent." />
          </Section>

          <Section title="3. Account Responsibilities">
            <Para text="When you create an account with us, you must provide accurate and complete information. You are responsible for:" />
            <BulletItem text="Maintaining the confidentiality of your account credentials" />
            <BulletItem text="All activities that occur under your account" />
            <BulletItem text="Notifying us immediately of any unauthorized use" />
            <BulletItem text="Providing accurate personal information" />
          </Section>

          <Section title="4. Permitted Use">
            <Para text="uBudy is provided for personal, non-commercial wellness and mental health support use only. You agree not to:" />
            <BulletItem text="Use the Service for any unlawful purpose" />
            <BulletItem text="Share your account with others" />
            <BulletItem text="Attempt to reverse engineer or copy the application" />
            <BulletItem text="Upload harmful, offensive, or illegal content" />
            <BulletItem text="Use the Service to harass or harm others" />
          </Section>

          <Section title="5. Mental Health & Medical Disclaimer">
            <Para text="uBudy provides general wellness information and AI-powered support tools. This Service:" />
            <BulletItem text="Is NOT a licensed medical or mental health service" />
            <BulletItem text="Does NOT provide medical diagnosis or treatment" />
            <BulletItem text="Cannot replace a licensed therapist, psychiatrist, or doctor" />
            <BulletItem text="Should NOT be used in place of emergency mental health services" />
            <Para text="Always seek the advice of a qualified mental health professional for any questions regarding a mental health condition." />
          </Section>

          <Section title="6. Subscription & Payments">
            <Para text="uBudy offers free and premium subscription tiers. By subscribing to a premium plan:" />
            <BulletItem text="Payments are processed through Apple App Store or Google Play Store" />
            <BulletItem text="Subscriptions automatically renew unless cancelled 24 hours before the renewal date" />
            <BulletItem text="Refunds are governed by the respective app store's refund policy" />
            <BulletItem text="We reserve the right to change pricing with 30-day notice" />
          </Section>

          <Section title="7. Intellectual Property">
            <Para text="All content, features, and functionality of uBudy, including but not limited to text, graphics, logos, and software, are the exclusive property of uBudy and are protected by applicable intellectual property laws." />
          </Section>

          <Section title="8. Privacy">
            <Para text="Your use of uBudy is also governed by our Privacy Policy, which is incorporated by reference into these Terms. Please review our Privacy Policy to understand our practices." />
          </Section>

          <Section title="9. Termination">
            <Para text="We may terminate or suspend your account at any time for violations of these Terms. You may delete your account at any time through the app settings. Upon termination, your right to use the Service ceases immediately." />
          </Section>

          <Section title="10. Limitation of Liability">
            <Para text="To the maximum extent permitted by law, uBudy shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service. Our total liability shall not exceed the amount you paid for the Service in the past 12 months." />
          </Section>

          <Section title="11. Changes to Terms">
            <Para text="We reserve the right to modify these Terms at any time. We will notify you of significant changes via the app or email. Continued use after changes constitutes your acceptance of the updated Terms." />
          </Section>

          <Section title="12. Contact Us">
            <Para text="For questions about these Terms, contact us at:" />
            <View style={styles.contactCard}>
              <Ionicons name="mail-outline" size={18} color={Colors.purple} />
              <Text style={styles.contactText}>legal@ubudyapp.com</Text>
            </View>
            <View style={styles.contactCard}>
              <Ionicons name="globe-outline" size={18} color={Colors.purple} />
              <Text style={styles.contactText}>www.ubudyapp.com/terms</Text>
            </View>
          </Section>

        </View>

        <Text style={styles.footer}>
          © 2025 uBudy. All rights reserved.
        </Text>
      </ScrollView>
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
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.cardLg,
    padding: 24,
    alignItems: 'center',
    marginBottom: 14,
    ...Shadows.raisedCard,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: Colors.pillBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.ink,
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSub: {
    fontSize: 14,
    color: Colors.muted,
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '500',
  },
  effectivePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.pillBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radii.pill,
    marginTop: 14,
  },
  effectiveText: {
    fontSize: 12,
    color: Colors.purple,
    fontWeight: '700',
  },
  disclaimerCard: {
    backgroundColor: '#FFFBF2',
    borderRadius: Radii.card,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: '#F5D28A',
    ...Shadows.softCard,
  },
  disclaimerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  disclaimerTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#8A5A00',
  },
  disclaimerText: {
    fontSize: 13.5,
    color: '#6B4800',
    lineHeight: 20,
    fontWeight: '500',
    marginBottom: 12,
  },
  crisisBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FCE7E7',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  crisisText: {
    fontSize: 13,
    color: Colors.danger,
    fontWeight: '700',
  },
  contentCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.cardLg,
    padding: 24,
    ...Shadows.raisedCard,
    marginBottom: 16,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.ink,
    marginBottom: 10,
  },
  para: {
    fontSize: 14,
    color: Colors.ink2,
    lineHeight: 21,
    fontWeight: '500',
    marginBottom: 8,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
    paddingLeft: 4,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.purple,
    marginTop: 7,
    marginRight: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: Colors.ink2,
    lineHeight: 20,
    fontWeight: '500',
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.pillBg,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 8,
  },
  contactText: {
    fontSize: 14,
    color: Colors.purple,
    fontWeight: '700',
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.faint,
    marginTop: 4,
    marginBottom: 8,
  },
});

export default TermsOfServiceScreen;
