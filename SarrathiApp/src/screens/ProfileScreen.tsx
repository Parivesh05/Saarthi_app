import React, { useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NAVIGATION } from "src/constants/Navigation/navigation.constant";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "src/interface/Navigation/navigation.interface";
import { ActivityIndicator, Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Images } from "src/assets/images";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { fetchUserProfile, logoutUser } from "src/store/slices/authSlice";
import { Shadows, Colors } from "src/constants/designTokens";
import { LinearGradient } from "expo-linear-gradient";

const ProfileScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const dispatch = useAppDispatch();
    const authUser = useAppSelector((state) => state.auth.user);
    const isProfileLoading = useAppSelector((state) => state.auth.isProfileLoading);

    useEffect(() => {
        if (!authUser) {
            dispatch(fetchUserProfile());
        }
    }, [authUser, dispatch]);

    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigation.replace(NAVIGATION.LOGIN_SCREEN);
    };

    const rows = [
        { label: 'Name', value: authUser?.name ?? '-', icon: 'person-outline' },
        { label: 'Email', value: authUser?.email ?? '-', icon: 'mail-outline' },
        { label: 'Role', value: authUser?.role ?? 'USER', icon: 'shield-checkmark-outline' },
        {
            label: 'Subscription',
            value: 'View plans',
            icon: 'card-outline',
            onPress: () => navigation.navigate(NAVIGATION.PRICING_SCREEN),
        },
        {
            label: 'About uBudy',
            value: 'Meet the team',
            icon: 'information-circle-outline',
            onPress: () => navigation.navigate(NAVIGATION.ABOUT_US_SCREEN),
        },
    ];

    return (
        <LinearGradient
            colors={[Colors.appBgGradientStart, Colors.appBgGradientEnd]}
            style={styles.container}
        >
            <Text style={styles.headerText}>Profile</Text>

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
                                <View style={styles.iconTile}>
                                    <Ionicons name={item.icon as any} size={20} color="#6A5AE0" />
                                </View>
                                <Text style={styles.rowLabel}>{item.label}</Text>
                            </View>
                            <View style={styles.rightRow}>
                                <Text style={styles.rowValue}>{item.value}</Text>
                                {item.onPress && <Ionicons name="chevron-forward" size={18} color="#A6A6BC" />}
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity
                onPress={handleLogout}
                activeOpacity={0.7}
            >
                <View style={styles.logoutButton}>
                    <Ionicons name="log-out-outline" size={20} color="#EF5B5B" />
                    <Text style={styles.logoutText}>Log out</Text>
                </View>
            </TouchableOpacity>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 22,
        paddingTop: 12,
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
    rowLabel: {
        color: '#1A2340',
        fontSize: 15,
        fontWeight: '800',
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
});

export default ProfileScreen;
