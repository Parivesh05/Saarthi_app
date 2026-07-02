import React, { useEffect } from "react";
import AppButton from "@components/Common/AppButton";
import { FEELING_DATA, QUICK_ACTIONS_DATA } from "@utils/homeDummyData";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Images } from "src/assets/images";
import { styles } from "src/styles/homeScreen.style";
import { colors } from "src/styles/theme/colors";
import { commonStyle } from "src/styles/theme/commonStyles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NAVIGATION } from "src/constants/Navigation/navigation.constant";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "src/interface/Navigation/navigation.interface";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { fetchUserProfile } from "src/store/slices/authSlice";

const HomeScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const dispatch = useAppDispatch();
    const authUser = useAppSelector((state) => state.auth.user);

    useEffect(() => {
        if (!authUser?.name) {
            dispatch(fetchUserProfile());
        }
    }, [authUser?.name, dispatch]);

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.headerContainer}>
                    <View style={styles.style48per}>
                        <Text style={styles.gmTest}>Good Morning 👋</Text>
                        <Text style={styles.nameTestStyle}>Hello, {authUser?.name ?? 'Ubudy'}</Text>
                    </View>
                    <View style={[styles.style48per, { justifyContent: 'flex-end', alignItems: 'flex-end' }]}>
                        <Image
                            style={styles.logo}
                            source={Images.UPDATED_OWL}
                        />
                    </View>
                </View>

                <View style={styles.getStartContainer}>
                    <View style={styles.style48per}>
                        <Text style={[styles.nameTestStyle, { color: colors.WHITE }]}>
                            Mind Easy
                        </Text>
                        <Text style={{ color: colors.WHITE }}>
                            Take a moment to breathe and check in with yourself today.
                        </Text>
                        <AppButton
                            title="Get Started"
                            textStyle={styles.buttonText}
                            onPress={() => navigation.navigate('Profile')}
                            style={styles.buttonStyle}
                            iconLibrary="Ionicons"
                            iconName="arrow-forward"
                            iconPosition="right"
                        />
                    </View>
                    <View style={[styles.style48per, { justifyContent: 'center', alignItems: 'flex-end' }]}>
                        <Image
                            style={styles.boxLogo}
                            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb1uRUcL1Ls5rkHgbmdsTKVQUaHHwqzwrz7g&s' }}
                        />
                    </View>
                </View>
                <View style={commonStyle.marginTop30}>
                    <Text style={[styles.nameTestStyle, { fontSize: 20 }]}>How are you feeling today?</Text>

                    <ScrollView horizontal>
                        <View style={[commonStyle.flexRow, commonStyle.marginTop10]}>
                            {
                                FEELING_DATA.map((item, index) => (
                                    <View style={{ width: '28%', padding: 10, backgroundColor: item.colors, marginRight: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }} key={index}>
                                        <Text style={{ fontSize: 24 }}>{item.icon}</Text>
                                        <Text style={{ color: item.textColor }}>{item.name}</Text>
                                    </View>
                                ))
                            }
                        </View>
                    </ScrollView>

                </View>

                <View style={commonStyle.marginTop30}>
                    <Text style={[styles.nameTestStyle, { fontSize: 20 }]}>Quick Action's</Text>

                    <View style={[commonStyle.marginTop10, { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'space-between' }]}>
                        {
                            QUICK_ACTIONS_DATA.map((item, index) => (
                                <View style={{ width: '30%', padding: 10, backgroundColor: colors.WHITE, borderRadius: 10, justifyContent: 'center', alignItems: 'center', elevation: 8, }} key={index}>
                                    <Image
                                        source={{ uri: item.icon }}
                                        style={{ width: 28, height: 28, marginBottom: 10 }}
                                    />
                                    <Text style={{ color: colors.BLACK, fontSize: 16, fontWeight: 'bold', textAlign: "center" }}>{item.name}</Text>
                                </View>
                            ))
                        }
                    </View>
                </View>

                <TouchableOpacity 
                onPress={()=> navigation.navigate(NAVIGATION.JOURNAL_SCREEN)}
                style={styles.dailyTipContainer}>
                    <View style={{ gap: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/8569/8569915.png' }} style={{ width: 24, height: 25, }} />


                            <Text style={[styles.nameTestStyle, { fontSize: 22 }]}>Daily Tips</Text>
                        </View>

                        <Text style={{ color: "#73778c", textAlign: "justify", letterSpacing: 0.5 }}>
                            Practice the 5-4-3-2-1 grounding technique: Notice 5 things you see, 4 you touch, 3 you hear, 2 you smell, and 1 you taste.
                        </Text>
                    </View>

                </TouchableOpacity>
            </ScrollView>

        </View>
    )
}


export default HomeScreen;
