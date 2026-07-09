import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { PremiumInput } from '@components/Premium';
import { Colors, Shadows, Radii } from 'src/constants/designTokens';

const deleteSchema = Yup.object().shape({
  password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  confirmation: Yup.string()
    .oneOf(['DELETE'], 'Please type DELETE to confirm')
    .required('Confirmation is required'),
});

const RiskRow = ({ icon, text }: { icon: string; text: string }) => (
  <View style={styles.riskRow}>
    <Ionicons name={icon as any} size={16} color={Colors.danger} />
    <Text style={styles.riskText}>{text}</Text>
  </View>
);

const AccountDeletionScreen = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingValues, setPendingValues] = useState<{ password: string; confirmation: string } | null>(null);

  const handleDeleteRequest = (values: { password: string; confirmation: string }) => {
    setPendingValues(values);
    setShowConfirmModal(true);
  };

  const handleFinalDelete = () => {
    setShowConfirmModal(false);
    // TODO: API - DELETE /user/account { password }
    // On success: clear auth store, navigate to WelcomeScreen
    Alert.alert(
      'Request Submitted',
      'Your account deletion request has been submitted. Your account will be deleted within 30 days.',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
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
        <Text style={styles.headerTitle}>Delete Account</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        {/* Warning Hero */}
        <View style={styles.warningCard}>
          <View style={styles.warningIconWrap}>
            <Ionicons name="warning" size={36} color={Colors.danger} />
          </View>
          <Text style={styles.warningTitle}>Delete Your Account</Text>
          <Text style={styles.warningSubtitle}>
            This action is permanent and cannot be undone. Please read carefully before proceeding.
          </Text>
        </View>

        {/* What will be deleted */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>What will be permanently deleted:</Text>
          <RiskRow icon="person-remove-outline" text="Your profile and account information" />
          <RiskRow icon="happy-outline" text="All mood logs and wellness history" />
          <RiskRow icon="journal-outline" text="All journal entries" />
          <RiskRow icon="chatbubbles-outline" text="All chat history with the AI" />
          <RiskRow icon="analytics-outline" text="Your wellness streaks and achievements" />
          <RiskRow icon="card-outline" text="Your active subscription (no refunds)" />
        </View>

        {/* Alternative options */}
        <View style={styles.alternativeCard}>
          <Ionicons name="bulb-outline" size={20} color="#E0902C" />
          <View style={styles.alternativeContent}>
            <Text style={styles.alternativeTitle}>Consider these alternatives</Text>
            <Text style={styles.alternativeText}>
              You can pause notifications, change your email, or simply log out instead of deleting your account.
            </Text>
          </View>
        </View>

        {/* Deletion form */}
        <Formik
          initialValues={{ password: '', confirmation: '' }}
          validationSchema={deleteSchema}
          onSubmit={handleDeleteRequest}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.formCard}>
              <Text style={styles.formTitle}>Confirm Deletion</Text>
              <Text style={styles.formSubtitle}>
                Enter your password and type <Text style={styles.deleteWord}>DELETE</Text> to confirm.
              </Text>

              <PremiumInput
                label="Current Password"
                placeholder="Enter your password"
                icon="lock-closed-outline"
                rightIcon={showPassword ? 'eye-off-outline' : 'eye-outline'}
                onRightIconPress={() => setShowPassword(!showPassword)}
                secureTextEntry={!showPassword}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={touched.password && errors.password ? errors.password : undefined}
              />

              <PremiumInput
                label="Type DELETE to confirm"
                placeholder="Type DELETE"
                icon="text-outline"
                autoCapitalize="characters"
                value={values.confirmation}
                onChangeText={handleChange('confirmation')}
                onBlur={handleBlur('confirmation')}
                error={
                  touched.confirmation && errors.confirmation
                    ? errors.confirmation
                    : undefined
                }
              />

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => handleSubmit()}
                style={styles.deleteBtn}
              >
                <Ionicons name="trash-outline" size={20} color="#fff" />
                <Text style={styles.deleteBtnText}>Delete My Account</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelBtn}
                activeOpacity={0.7}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.cancelBtnText}>Cancel — Keep My Account</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>

      {/* Final confirmation modal */}
      <Modal
        visible={showConfirmModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIcon}>
              <Ionicons name="warning" size={40} color={Colors.danger} />
            </View>
            <Text style={styles.modalTitle}>Last Chance</Text>
            <Text style={styles.modalText}>
              Are you absolutely sure? Your account and all data will be permanently deleted. This cannot be reversed.
            </Text>
            <TouchableOpacity
              style={styles.modalDeleteBtn}
              activeOpacity={0.9}
              onPress={handleFinalDelete}
            >
              <Text style={styles.modalDeleteText}>Yes, Delete Forever</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCancelBtn}
              activeOpacity={0.8}
              onPress={() => setShowConfirmModal(false)}
            >
              <Text style={styles.modalCancelText}>No, Keep My Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  warningCard: {
    backgroundColor: Colors.dangerBg,
    borderRadius: Radii.cardLg,
    padding: 24,
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: '#F5C6C6',
    ...Shadows.softCard,
  },
  warningIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    ...Shadows.softCard,
  },
  warningTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.danger,
    marginBottom: 8,
    textAlign: 'center',
  },
  warningSubtitle: {
    fontSize: 14,
    color: '#C0302C',
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '500',
  },
  infoCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    padding: 20,
    marginBottom: 14,
    ...Shadows.softCard,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.ink,
    marginBottom: 14,
  },
  riskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.hairline,
  },
  riskText: {
    fontSize: 14,
    color: Colors.ink2,
    fontWeight: '500',
    flex: 1,
  },
  alternativeCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#FFFBF2',
    borderRadius: Radii.card,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: '#F5D28A',
  },
  alternativeContent: { flex: 1 },
  alternativeTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#8A5A00',
    marginBottom: 4,
  },
  alternativeText: {
    fontSize: 13,
    color: '#6B4800',
    lineHeight: 19,
    fontWeight: '500',
  },
  formCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.cardLg,
    padding: 22,
    ...Shadows.raisedCard,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.ink,
    marginBottom: 6,
  },
  formSubtitle: {
    fontSize: 14,
    color: Colors.muted,
    lineHeight: 20,
    fontWeight: '500',
    marginBottom: 18,
  },
  deleteWord: {
    color: Colors.danger,
    fontWeight: '800',
  },
  deleteBtn: {
    marginTop: 18,
    height: 56,
    borderRadius: 18,
    backgroundColor: Colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    ...Shadows.softCard,
  },
  deleteBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  cancelBtn: {
    marginTop: 12,
    height: 52,
    borderRadius: 18,
    backgroundColor: Colors.pillBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    color: Colors.purple,
    fontSize: 15,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalContent: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: 28,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    ...Shadows.deepElevation,
  },
  modalIcon: { marginBottom: 16 },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.ink,
    marginBottom: 12,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 14,
    color: Colors.ink2,
    textAlign: 'center',
    lineHeight: 21,
    fontWeight: '500',
    marginBottom: 24,
  },
  modalDeleteBtn: {
    width: '100%',
    height: 52,
    borderRadius: 16,
    backgroundColor: Colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  modalDeleteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  modalCancelBtn: {
    width: '100%',
    height: 52,
    borderRadius: 16,
    backgroundColor: Colors.pillBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCancelText: {
    color: Colors.purple,
    fontSize: 15,
    fontWeight: '700',
  },
});

export default AccountDeletionScreen;
