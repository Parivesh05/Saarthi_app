import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { Images } from "src/assets/images";
import { NAVIGATION } from "src/constants/Navigation/navigation.constant";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { fetchUserProfile } from "src/store/slices/authSlice";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Shadows, Colors } from "src/constants/designTokens";

const HomeScreen = () => {
    const navigation = useNavigation<any>();
    const dispatch = useAppDispatch();
    const authUser = useAppSelector((state) => state.auth.user);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [showComingSoon, setShowComingSoon] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            if (!authUser?.name) {
                await dispatch(fetchUserProfile());
            }
            // Simulate minimum loading time for smooth UX
            setTimeout(() => setIsLoading(false), 800);
        };
        loadData();
    }, [authUser?.name, dispatch]);

    const onRefresh = async () => {
        setRefreshing(true);
        await dispatch(fetchUserProfile());
        // Simulate refresh
        setTimeout(() => setRefreshing(false), 1200);
    };

    const moods = [
        { name: 'Great', icon: '😍', color: '#22B573', bg: '#E8F5EE' },
        { name: 'Good', icon: '😊', color: '#3E8BEE', bg: '#EBF3FC' },
        { name: 'Okay', icon: '😐', color: '#F5A623', bg: '#FEF5E7' },
        { name: 'Bad', icon: '😟', color: '#EF5B5B', bg: '#FDECEC' },
        { name: 'Awful', icon: '😢', color: '#E84B8A', bg: '#FDEBF3' },
    ];

    const quickActions = [
        { title: 'Track mood', icon: 'happy-outline', bg: '#EBF3FC', iconColor: '#3E8BEE', onPress: () => navigation.navigate(NAVIGATION.MOOD_SCREEN) },
        { title: 'Start a chat', icon: 'chatbubble-ellipses-outline', bg: '#F0EDFC', iconColor: '#6A5AE0', onPress: () => navigation.navigate(NAVIGATION.CHAT_TAB) },
        { title: 'Journal', icon: 'book-outline', bg: '#FEF5E7', iconColor: '#F5A623', onPress: () => navigation.navigate(NAVIGATION.JOURNAL_TAB) },
        { title: 'Connect with Expert', icon: 'people-outline', bg: '#E8F5EE', iconColor: '#22B573', onPress: () => setShowComingSoon(true) },
    ];

    return (
        <LinearGradient
            colors={[Colors.appBgGradientStart, Colors.appBgGradientEnd]}
            style={styles.container}
        >
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {!isLoading && (
                    <>
                        <View style={styles.headerContainer}>
                            <View>
                                <Text style={styles.gmText}>Good Morning</Text>
                                <Text style={styles.nameText}>Hello, {authUser?.name ?? 'uBudy'}</Text>
                            </View>
                            <View style={styles.avatarWrap}>
                                <Image
                                    style={styles.logo}
                                    source={Images.U_LOGO}
                                />
                                <Text style={styles.logoText}>uBudy</Text>
                            </View>
                        </View>

                        <View style={styles.heroCard}>
                            <View style={styles.heroLeft}>
                                <Text style={styles.heroTitle}>Mind Easy</Text>
                                <Text style={styles.heroBody}>Take a moment to breathe and check in with yourself.</Text>
                            </View>
                        </View>

                        <View>
                            <Text style={styles.sectionTitle}>How are you feeling today?</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <View style={styles.moodRow}>
                                    {moods.map((item) => (
                                        <View key={item.name} style={[styles.moodTile, { backgroundColor: item.bg }]}>
                                            <Text style={styles.moodEmoji}>{item.icon}</Text>
                                            <Text style={[styles.moodLabel, { color: item.color }]}>{item.name}</Text>
                                        </View>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>

                        <View>
                            <Text style={styles.sectionTitle}>Quick actions</Text>
                            <View style={styles.quickGrid}>
                                {quickActions.map((item) => (
                                    <TouchableOpacity
                                        key={item.title}
                                        style={[styles.quickTile, { backgroundColor: item.bg }]}
                                        onPress={item.onPress}
                                        activeOpacity={0.7}
                                    >
                                        <View style={styles.quickTileContent}>
                                            <View style={[styles.quickIconWrap, { backgroundColor: 'rgba(255, 255, 255, 0.5)' }]}>
                                                <Ionicons name={item.icon as any} size={24} color={item.iconColor} />
                                            </View>
                                            <Text style={styles.quickTitle} numberOfLines={2}>{item.title}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        <View style={styles.tipCard}>
                            <View style={styles.tipTitleRow}>
                                <Ionicons name="bulb" size={22} color="#F5A623" />
                                <Text style={styles.tipTitle}>Daily Tip</Text>
                            </View>
                            <Text style={styles.tipBody}>
                                Taking short breaks during work can boost your productivity and reduce stress. Try the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.
                            </Text>
                        </View>
                    </>
                )}
            </ScrollView>

            {/* Coming Soon Modal */}
            <Modal
                visible={showComingSoon}
                transparent
                animationType="fade"
                onRequestClose={() => setShowComingSoon(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <LinearGradient
                            colors={['#6A5AE0', '#4A90E2']}
                            style={styles.modalIconCircle}
                        >
                            <Ionicons name="time-outline" size={40} color="#FFFFFF" />
                        </LinearGradient>
                        <Text style={styles.modalTitle}>Coming Soon 🔜</Text>
                        <Text style={styles.modalText}>
                            Expert consultation feature will be available soon! We're working hard to bring you the best experience.
                        </Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setShowComingSoon(false)}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={['#6A5AE0', '#4A90E2']}
                                style={styles.modalButtonGradient}
                            >
                                <Text style={styles.modalButtonText}>Got it!</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </LinearGradient>
    )
}


export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 22,
        paddingTop: 14,
        paddingBottom: 120,
        gap: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    gmText: {
        color: '#8A8AA0',
        fontSize: 13,
        fontWeight: '800',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    nameText: {
        color: '#1A2340',
        fontSize: 27,
        fontWeight: '800',
        marginTop: 4,
        letterSpacing: -0.5,
    },
    avatarWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 16,
        ...Shadows.softCard,
    },
    logo: {
        width: 38,
        height: 38,
        borderRadius: 8,
    },
    logoText: {
        marginTop: 3,
        fontSize: 10,
        fontWeight: '800',
        color: '#1A2340',
        letterSpacing: 0.3,
    },
    heroCard: {
        backgroundColor: '#6A5AE0',
        borderRadius: 26,
        padding: 22,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...Shadows.hero,
    },
    heroLeft: {
        width: '60%',
    },
    heroTitle: {
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: '700',
        letterSpacing: -0.5,
    },
    heroBody: {
        color: '#EEF1FF',
        marginTop: 8,
        lineHeight: 22,
        fontWeight: '600',
        fontSize: 14.5,
    },
    heroButton: {
        marginTop: 14,
        alignSelf: 'flex-start',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        height: 42,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        ...Shadows.toggleActive,
    },
    heroButtonText: {
        color: '#4A3AAE',
        fontSize: 15,
        fontWeight: '700',
    },
    heroImage: {
        width: 90,
        height: 90,
    },
    sectionTitle: {
        color: '#1A2340',
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 12,
        letterSpacing: -0.3,
    },
    moodRow: {
        flexDirection: 'row',
        gap: 11,
    },
    moodTile: {
        width: 84,
        height: 104,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 9,
        ...Shadows.softCard,
    },
    moodEmoji: {
        fontSize: 30,
    },
    moodLabel: {
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 0.3,
    },
    quickGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: 12,
    },
    quickTile: {
        width: '48%',
        borderRadius: 22,
        padding: 18,
        shadowColor: '#3C3278',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 20,
        elevation: 4,
    },
    quickTileContent: {
        width: '100%',
    },
    quickIconWrap: {
        width: 46,
        height: 46,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    quickTitle: {
        marginTop: 12,
        color: '#1A2340',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '800',
    },
    tipCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 22,
        padding: 20,
        shadowColor: '#3C3278',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 12 },
        shadowRadius: 24,
        elevation: 5,
    },
    tipTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 9,
        marginBottom: 2,
    },
    tipTitle: {
        color: '#1A2340',
        fontSize: 18,
        fontWeight: '800',
        letterSpacing: -0.3,
    },
    tipBody: {
        marginTop: 9,
        color: '#4A4763',
        fontSize: 14,
        lineHeight: 22,
        fontWeight: '600',
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
        borderRadius: 28,
        padding: 32,
        alignItems: 'center',
        width: '100%',
        maxWidth: 380,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 20 },
        shadowRadius: 40,
        elevation: 15,
    },
    modalIconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 26,
        fontWeight: '800',
        color: '#1A2340',
        marginBottom: 12,
        textAlign: 'center',
    },
    modalText: {
        fontSize: 15,
        color: '#4A4763',
        textAlign: 'center',
        lineHeight: 24,
        fontWeight: '600',
        marginBottom: 24,
    },
    modalButton: {
        width: '100%',
        borderRadius: 18,
        overflow: 'hidden',
    },
    modalButtonGradient: {
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '700',
    },
});
