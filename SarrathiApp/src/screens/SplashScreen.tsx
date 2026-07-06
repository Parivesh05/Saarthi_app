import { Image, StyleSheet, Text, View } from "react-native";
import { Images } from "src/assets/images";
import * as Animatable from "react-native-animatable";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "src/interface/Navigation/navigation.interface";
import { NAVIGATION } from "src/constants/Navigation/navigation.constant";
import { TIMEOUT } from "src/constants/common/Common.constant";
import { useAppDispatch } from "src/hooks/useRedux";
import { restoreAuthSession } from "src/store/slices/authSlice";
import { onboardingStorage } from "src/services/onboardingStorage";
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from 'src/constants/designTokens';

const SplashScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const timer = setTimeout(async () => {
            // ══════════════════════════════════════════════════════════════
            // TEMPORARY BYPASS: Server issue - skip auth restore
            // ══════════════════════════════════════════════════════════════
            navigation.replace(NAVIGATION.WELCOME_SCREEN);
            return;
            // ══════════════════════════════════════════════════════════════
            // ORIGINAL CODE: Uncomment when server is back
            // ══════════════════════════════════════════════════════════════
            // const result = await dispatch(restoreAuthSession());
            // if (restoreAuthSession.fulfilled.match(result) && result.payload?.access_token) {
            //     const done = await onboardingStorage.isCompleted();
            //     navigation.replace(done ? NAVIGATION.MAIN_TABS : NAVIGATION.ONBOARDING_STEPS);
            //     return;
            // }
            // navigation.replace(NAVIGATION.WELCOME_SCREEN);
            // ══════════════════════════════════════════════════════════════
        }, TIMEOUT[4000]);

        return () => clearTimeout(timer);
    }, [dispatch, navigation])

    return (
        <LinearGradient
            colors={[Colors.appBgGradientStart, Colors.appBgGradientEnd]}
            style={styles.container}
        >
                        <Animatable.View
                            animation="pulse"
                            duration={2500}
                            iterationCount="infinite"
                            easing="ease-out"
                            style={styles.glow}
                        />

                        <Animatable.Image
                            animation="bounceIn"
                            duration={1000}
                            source={Images.U_LOGO}
                            style={styles.logo}
                        />

                        <Animatable.Text animation="fadeInUp" delay={300} duration={800} style={styles.title}>
                            uBudy
                        </Animatable.Text>
                        <Text style={styles.subtitle}>Your mindful companion</Text>

                        <View style={styles.dotsRow}>
                            <Animatable.View animation="pulse" iterationCount="infinite" duration={900} style={styles.dot} />
                            <Animatable.View animation="pulse" iterationCount="infinite" delay={200} duration={900} style={styles.dot} />
                            <Animatable.View animation="pulse" iterationCount="infinite" delay={400} duration={900} style={styles.dot} />
                        </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 22,
    },
    glow: {
        position: 'absolute',
        width: 220,
        height: 220,
        borderRadius: 120,
        backgroundColor: '#EEEBFA',
    },
    logo: {
        width: 120,
        height: 120,
        borderRadius: 20,
    },
    title: {
        marginTop: 24,
        fontSize: 36,
        fontWeight: '800',
        color: '#1A2340',
        textAlign: 'center',
        letterSpacing: -0.5,
    },
    subtitle: {
        marginTop: 10,
        fontSize: 15,
        color: '#4A4763',
        fontWeight: '600',
    },
    dotsRow: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 18,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: '#6A5AE0',
    },
});

export default SplashScreen;
