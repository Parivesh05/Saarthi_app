import React, { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NAVIGATION } from "src/constants/Navigation/navigation.constant";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "src/interface/Navigation/navigation.interface";
import { ActivityIndicator, Image, StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView } from "react-native";
import { Images } from "src/assets/images";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { fetchUserProfile, logoutUser } from "src/store/slices/authSlice";
import { Shadows, Colors } from "src/constants/designTokens";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from 'react-i18next';
import { useLanguage } from 'src/hooks/useLanguage';

const ProfileScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const dispatch = useAppDispatch();
    const authUser = useAppSelector((state) => state.auth.user);
    const isProfileLoading = useAppSelector((state) => state.auth.isProfileLoading);
    const { t, i18n } = useTranslation();
    const { changeLanguage } = useLanguage();
    const [showLanguageModal, setShowLanguageModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        if (!authUser) {
            dispatch(fetchUserProfile());
        }
    }, [authUser, dispatch]);

    const handleLogout = async () => {
        setShowLogoutModal(false);
        await dispatch(logoutUser());
        navigation.replace(NAVIGATION.LOGIN_SCREEN);
    };

    const handleLanguageChange = async (lang: string) => {
        await changeLanguage(lang);
        setShowLanguageModal(false);
    };

    const getLanguageName = () => {
        return i18n.language === 'hi' ? 'हिंदी' : 'English';
    };

    const rows = [
        { label: t('profile.name'), value: authUser?.name ?? '-', icon: 'person-outline' },
        { label: t('profile.email'), value: authUser?.email ?? '-', icon: 'mail-outline' },
        { label: t('profile.role'), value: authUser?.role ?? 'USER', icon: 'shield-checkmark-outline' },
        {
            label: 'Language',
            value: getLanguageName(),
            icon: 'language-outline',
            onPress: () => setShowLanguageModal(true),
        },
        {
            label: t('profile.subscription'),
            value: t('profile.viewPlans'),
            icon: 'card-outline',
            onPress: () => navigation.navigate(NAVIGATION.PRICING_SCREEN),
        },
        {
            label: t('profile.aboutUbudy'),
            value: t('profile.meetTheTeam'),
            icon: 'information-circle-outline',
            onPress: () => navigation.navigate(NAVIGATION.ABOUT_US_SCREEN),
        },
        {
            label: 'Privacy Policy',
            value: 'View',
            icon: 'shield-outline',
            onPress: () => navigation.navigate(NAVIGATION.PRIVACY_POLICY_SCREEN),
        },
        {
            label: 'Terms of Service',
            value: 'View',
            icon: 'document-text-outline',
            onPress: () => navigation.navigate(NAVIGATION.TERMS_OF_SERVICE_SCREEN),
        },
        {
            label: 'Delete Account',
            value: '',
            icon: 'trash-outline',
            onPress: () => navigation.navigate(NAVIGATION.ACCOUNT_DELETION_SCREEN),
            isDanger: true,
        },
    ];

    return (
        <LinearGradient
            colors={[Colors.appBgGradientStart, Colors.appBgGradientEnd]}
            style={styles.container}
        >
            <Text style={styles.headerText}>{t('profile.title')}</Text>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
            <View style={styles.profileCard}>
                <Image
                    style={styles.logo}
                    source={Images.U_LOGO}
                />
                <Text style={styles.nameText}>{authUser?.name ?? 'User'}</Text>
                <View style={styles.ratingRow}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Ionicons key={star} name="star" size={16} color="#F5A623" />
                    ))}
                </View>
                <Text style={styles.emailText}>{authUser?.email ?? 'No email available'}</Text>
            </View>

            {isProfileLoading && (
                <ActivityIndicator size="small" color="#6A5AE0" style={{ marginTop: 12 }} />
            )}

            <View style={styles.listCard}>
                {rows.map((item, index) => (
                    <TouchableOpacity
                        key={item.label}
                        onPress={item.onPress}
                        disabled={!item.onPress}
                        activeOpacity={0.7}
                    >
                        <View style={[styles.row, index === rows.length - 1 && styles.rowLast]}>
                            <View style={styles.leftRow}>
                                <View style={[styles.iconTile, (item as any).isDanger && styles.iconTileDanger]}>
                                    <Ionicons
                                        name={item.icon as any}
                                        size={20}
                                        color={(item as any).isDanger ? '#EF5B5B' : '#6A5AE0'}
                                    />
                                </View>
                                <Text style={[styles.rowLabel, (item as any).isDanger && styles.rowLabelDanger]}>
                                    {item.label}
                                </Text>
                            </View>
                            <View style={styles.rightRow}>
                                {item.value ? <Text style={styles.rowValue}>{item.value}</Text> : null}
                                {item.onPress && (
                                    <Ionicons
                                        name="chevron-forward"
                                        size={18}
                                        color={(item as any).isDanger ? '#EF5B5B' : '#A6A6BC'}
                                    />
                                )}
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity
                onPress={() => setShowLogoutModal(true)}
                activeOpacity={0.7}
            >
                <View style={styles.logoutButton}>
                    <Ionicons name="log-out-outline" size={20} color="#EF5B5B" />
                    <Text style={styles.logoutText}>{t('profile.logout')}</Text>
                </View>
            </TouchableOpacity>
            </ScrollView>

            {/* Language Selection Modal */}
            <Modal
                visible={showLanguageModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowLanguageModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Language</Text>
                        <TouchableOpacity
                            style={[styles.langOption, i18n.language === 'en' && styles.langOptionActive]}
                            onPress={() => handleLanguageChange('en')}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.langText, i18n.language === 'en' && styles.langTextActive]}>
                                English
                            </Text>
                            {i18n.language === 'en' && (
                                <Ionicons name="checkmark-circle" size={22} color="#6A5AE0" />
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.langOption, i18n.language === 'hi' && styles.langOptionActive]}
                            onPress={() => handleLanguageChange('hi')}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.langText, i18n.language === 'hi' && styles.langTextActive]}>
                                हिंदी (Hindi)
                            </Text>
                            {i18n.language === 'hi' && (
                                <Ionicons name="checkmark-circle" size={22} color="#6A5AE0" />
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelBtn}
                            onPress={() => setShowLanguageModal(false)}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Logout Confirmation Modal */}
            <Modal
                visible={showLogoutModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowLogoutModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.logoutModalIcon}>
                            <Ionicons name="log-out-outline" size={32} color="#EF5B5B" />
                        </View>
                        <Text style={styles.modalTitle}>Log Out?</Text>
                        <Text style={styles.logoutModalDesc}>
                            Are you sure you want to log out of your uBudy account?
                        </Text>
                        <TouchableOpacity
                            style={styles.logoutConfirmBtn}
                            onPress={handleLogout}
                            activeOpacity={0.9}
                        >
                            <Ionicons name="log-out-outline" size={18} color="#fff" />
                            <Text style={styles.logoutConfirmText}>Yes, Log Out</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelBtn}
                            onPress={() => setShowLogoutModal(false)}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.cancelText}>Cancel — Stay Logged In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 22,
        paddingTop: 12,
    },
    scrollContent: {
        paddingBottom: 24,
    },
    headerText: {
        color: '#1A2340',
        fontSize: 28,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    profileCard: {
        marginTop: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 24,
        padding: 24,
        alignItems: 'center',
        ...Shadows.raisedCard,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.6)',
    },
    logo: {
        width: 88,
        height: 88,
        borderRadius: 16,
    },
    nameText: {
        marginTop: 14,
        color: '#1A2340',
        fontSize: 23,
        fontWeight: '800',
        letterSpacing: -0.3,
    },
    ratingRow: {
        flexDirection: 'row',
        gap: 4,
        marginTop: 6,
    },
    emailText: {
        marginTop: 5,
        color: '#8A8AA0',
        fontWeight: '600',
        fontSize: 14,
    },
    listCard: {
        marginTop: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 24,
        paddingHorizontal: 16,
        ...Shadows.raisedCard,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.6)',
    },
    row: {
        height: 68,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#F0EEF7',
    },
    rowLast: {
        borderBottomWidth: 0,
    },
    leftRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconTile: {
        width: 40,
        height: 40,
        borderRadius: 13,
        backgroundColor: '#EEEBFA',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconTileDanger: {
        backgroundColor: '#FCE7E7',
    },
    rowLabel: {
        color: '#1A2340',
        fontSize: 15,
        fontWeight: '800',
    },
    rowLabelDanger: {
        color: '#EF5B5B',
    },
    rightRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    rowValue: {
        color: '#8A8AA0',
        fontSize: 13.5,
        fontWeight: '700',
    },
    logoutButton: {
        marginTop: 20,
        backgroundColor: '#FCE7E7',
        height: 56,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
        ...Shadows.softCard,
    },
    logoutText: {
        color: '#EF5B5B',
        fontSize: 16,
        fontWeight: '700',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 24,
        width: '100%',
        maxWidth: 340,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 20 },
        shadowRadius: 40,
        elevation: 15,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#1A2340',
        marginBottom: 20,
        textAlign: 'center',
    },
    langOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderRadius: 14,
        backgroundColor: '#F5F5F7',
        marginBottom: 12,
    },
    langOptionActive: {
        backgroundColor: '#F0EDFC',
        borderWidth: 2,
        borderColor: '#6A5AE0',
    },
    langText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4A4763',
    },
    langTextActive: {
        color: '#6A5AE0',
        fontWeight: '800',
    },
    cancelBtn: {
        marginTop: 8,
        padding: 16,
        borderRadius: 14,
        backgroundColor: '#F5F5F7',
        alignItems: 'center',
    },
    cancelText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#8A8AA0',
    },
    logoutModalIcon: {
        width: 68,
        height: 68,
        borderRadius: 22,
        backgroundColor: '#FCE7E7',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 14,
    },
    logoutModalDesc: {
        fontSize: 14,
        color: '#4A4763',
        textAlign: 'center',
        lineHeight: 21,
        fontWeight: '500',
        marginBottom: 20,
    },
    logoutConfirmBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: '#EF5B5B',
        height: 52,
        borderRadius: 16,
        marginBottom: 0,
    },
    logoutConfirmText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '800',
    },
});

export default ProfileScreen;
