import React, { useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NAVIGATION } from "src/constants/Navigation/navigation.constant";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "src/interface/Navigation/navigation.interface";
import { View } from "react-native-animatable";
import { styles } from "src/styles/profileScreen.styles";
import { ActivityIndicator, Image, Text, TouchableOpacity } from "react-native";
import { Images } from "src/assets/images";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import { colors } from "src/styles/theme/colors";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import AntDesign from "@expo/vector-icons/build/AntDesign";
import Entypo from "@expo/vector-icons/build/Entypo";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { fetchUserProfile, logoutUser } from "src/store/slices/authSlice";

const ProfileScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
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

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Profile👋</Text>
            <View style={styles.boxContainer}>
                <Image
                    style={styles.logo}
                    source={Images.UPDATED_OWL}
                />
                <Text style={styles.headerText}>{authUser?.name ?? 'User'}</Text>
                <Text style={styles.emailText}>{authUser?.email ?? 'No email available'}</Text>
                <Text style={[styles.emailText, { letterSpacing: 3 }]}>⭐️⭐️⭐️⭐️⭐️</Text>
            </View>

            {isProfileLoading && (
                <ActivityIndicator size="small" color={colors.PRIMARY} style={{ marginTop: 12 }} />
            )}

            <View style={styles.profileContainer}>
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.width48per}>
                        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.APP_BACKGROUND, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                            <MaterialCommunityIcons name="face-man-profile" size={22} color={colors.PRIMARY} />
                        </View>
                        <Text style={styles.profileContainerText}>Name</Text>
                    </View>
                    <View style={styles.width48per}>
                        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'flex-end', width: "100%", gap: 8 }}>
                            <Text style={styles.emailText}>{authUser?.name ?? '-'}</Text>
                            <Ionicons name="arrow-forward" size={22} color={colors.GREY} style={{ marginTop: 9, justifyContent: "flex-end" }} />
                        </View>

                    </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                    <View style={styles.width48per}>
                        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.APP_BACKGROUND, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                            <AntDesign name="heart" size={24} color={colors.PRIMARY} />
                        </View>
                        <Text style={styles.profileContainerText}>Favorites</Text>
                    </View>
                    <View style={styles.width48per}>
                        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'flex-end', width: "100%", gap: 8 }}>
                            <Ionicons name="arrow-forward" size={22} color={colors.GREY} style={{ marginTop: 9, justifyContent: "flex-end" }} />
                        </View>

                    </View>
                </View>


                <View style={{ flexDirection: "row" }}>
                    <View style={styles.width48per}>
                        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.APP_BACKGROUND, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                            <Ionicons name="alarm" size={24} color={colors.PRIMARY} />
                        </View>
                        <Text style={styles.profileContainerText}>Reminder</Text>
                    </View>
                    <View style={styles.width48per}>
                        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'flex-end', width: "100%", gap: 8 }}>
                            <Ionicons name="arrow-forward" size={22} color={colors.GREY} style={{ marginTop: 9, justifyContent: "flex-end" }} />
                        </View>

                    </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                    <View style={styles.width48per}>
                        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.APP_BACKGROUND, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                            <AntDesign name="global" size={24} color={colors.PRIMARY} />
                        </View>
                        <Text style={styles.profileContainerText}>Role</Text>
                    </View>
                    <View style={styles.width48per}>
                        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'flex-end', width: "100%", gap: 8 }}>
                            <Text style={styles.emailText}>{authUser?.role ?? 'USER'}</Text>

                        </View>

                    </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                    <View style={styles.width48per}>
                        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.APP_BACKGROUND, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                            <Entypo name="credit-card" size={24} color={colors.PRIMARY} />
                        </View>
                        <Text style={styles.profileContainerText}>Subscription</Text>
                    </View>
                    <View style={styles.width48per}>
                        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'flex-end', width: "100%", gap: 8 }}>
                            <Text style={styles.emailText}>Premium</Text>

                        </View>

                    </View>
                </View>
            </View>

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleLogout}
                style={{
                width: "100%", backgroundColor: "#eddde8", padding
                    : 15, justifyContent: "center", alignItems: "center", borderRadius: 10, marginTop: 20,flexDirection:"row",gap:10
            }}
            >
                <MaterialIcons name="logout" size={24} color="red" />
                <Text style={[styles.profileContainerText, { color: "red" }]}>Logout</Text>
            </TouchableOpacity>

        </View>
    )
}
export default ProfileScreen;
