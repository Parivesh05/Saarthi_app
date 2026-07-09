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
import { Colors, Shadows, Radii, Typography } from 'src/constants/designTokens';

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

const PrivacyPolicyScreen = () => {
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
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Hero card */}
        <View style={styles.heroCard}>
          <View style={styles.shieldWrap}>
            <Ionicons name="shield-checkmark" size={36} color={Colors.purple} />
          </View>
          <Text style={styles.heroTitle}>Your Privacy Matters</Text>
          <Text style={styles.heroSub}>
            uBudy is committed to protecting your personal health information.
            Read how we collect, use, and safeguard your data.
          </Text>
          <View style={styles.effectivePill}>
            <Ionicons name="calendar-outline" size={13} color={Colors.purple} />
            <Text style={styles.effectiveText}>Effective: July 1, 2025</Text>
          </View>
        </View>

        {/* Content card */}
        <View style={styles.contentCard}>

          <Section title="1. Information We Collect">
            <Para text="We collect information you provide directly to us when you create an account, use our services, or communicate with us." />
            <BulletItem text="Account info: name, email address, phone number" />
            <BulletItem text="Health data: mood logs, journal entries, wellness scores" />
            <BulletItem text="Usage data: screens visited, features used, session duration" />
            <BulletItem text="Device info: device model, OS version, app version" />
          </Section>

          <Section title="2. How We Use Your Information">
            <Para text="We use the information we collect to provide, maintain, and improve our services." />
            <BulletItem text="Personalize your wellness experience and AI responses" />
            <BulletItem text="Track your mental health progress over time" />
            <BulletItem text="Send you relevant wellness tips and reminders" />
            <BulletItem text="Improve our AI and app features" />
            <BulletItem text="Comply with legal obligations" />
          </Section>

          <Section title="3. Mental Health Data">
            <View style={styles.alertBox}>
              <Ionicons name="heart" size={16} color="#E84B8A" />
              <Text style={styles.alertText}>
                Your mental health data is treated with the highest level of confidentiality. We never sell your health data to third parties.
              </Text>
            </View>
            <Para text="Mood logs, journal entries, and AI chat conversations are encrypted and stored securely. This data is used solely to improve your personal experience and is never shared with employers, insurers, or other third parties without your explicit consent." />
          </Section>

          <Section title="4. Data Sharing">
            <Para text="We do not sell, trade, or rent your personal information. We may share your information only in these limited circumstances:" />
            <BulletItem text="With your explicit consent" />
            <BulletItem text="With service providers who assist in our operations (under strict agreements)" />
            <BulletItem text="When required by law or to protect safety" />
            <BulletItem text="In connection with a business transfer (you will be notified)" />
          </Section>

          <Section title="5. Data Retention">
            <Para text="We retain your personal data for as long as your account is active or as needed to provide services. You may request deletion of your account and data at any time through the app settings." />
            <Para text="After account deletion, we may retain anonymized, aggregated data for research purposes." />
          </Section>

          <Section title="6. Your Rights">
            <Para text="Depending on your location, you may have the following rights:" />
            <BulletItem text="Access: Request a copy of your personal data" />
            <BulletItem text="Correction: Update inaccurate information" />
            <BulletItem text="Deletion: Request deletion of your account and data" />
            <BulletItem text="Portability: Export your data in a machine-readable format" />
            <BulletItem text="Objection: Opt out of certain data processing activities" />
          </Section>

          <Section title="7. Security">
            <Para text="We implement industry-standard security measures including encryption in transit (TLS 1.3), encryption at rest (AES-256), regular security audits, and access controls to protect your information." />
          </Section>

          <Section title="8. Children's Privacy">
            <Para text="uBudy is not intended for users under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, contact us immediately." />
          </Section>

          <Section title="9. Changes to This Policy">
            <Para text="We may update this Privacy Policy from time to time. We will notify you of significant changes via the app or email. Continued use of uBudy after changes constitutes your acceptance of the updated policy." />
          </Section>

          <Section title="10. Contact Us">
            <Para text="If you have questions about this Privacy Policy or wish to exercise your rights, contact us at:" />
            <View style={styles.contactCard}>
              <Ionicons name="mail-outline" size={18} color={Colors.purple} />
              <Text style={styles.contactText}>privacy@ubudyapp.com</Text>
            </View>
            <View style={styles.contactCard}>
              <Ionicons name="globe-outline" size={18} color={Colors.purple} />
              <Text style={styles.contactText}>www.ubudyapp.com/privacy</Text>
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
    marginBottom: 16,
    ...Shadows.raisedCard,
  },
  shieldWrap: {
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
  alertBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#FBE7F0',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  alertText: {
    flex: 1,
    fontSize: 13,
    color: '#B03070',
    lineHeight: 19,
    fontWeight: '600',
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

export default PrivacyPolicyScreen;
