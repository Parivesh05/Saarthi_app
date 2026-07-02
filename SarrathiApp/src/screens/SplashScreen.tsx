import { Image, ImageBackground, Text, View } from "react-native";
import { styles } from "../styles/splash.style";
import { Images } from "src/assets/images";
import * as Animatable from "react-native-animatable";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "src/interface/Navigation/navigation.interface";
import { NAVIGATION } from "src/constants/Navigation/navigation.constant";
import { TIMEOUT } from "src/constants/common/Common.constant";
import { colors } from "src/styles/theme/colors";
import { useAppDispatch } from "src/hooks/useRedux";
import { restoreAuthSession } from "src/store/slices/authSlice";

const SplashScreen = () => {
    const [step, setStep] = useState(0);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const dispatch = useAppDispatch();

    useEffect(() => {
        const timer = setTimeout(async () => {
            const result = await dispatch(restoreAuthSession());
            if (restoreAuthSession.fulfilled.match(result) && result.payload?.access_token) {
                navigation.replace(NAVIGATION.MAIN_TABS);
                return;
            }
            navigation.replace(NAVIGATION.WELCOME_SCREEN);
        }, TIMEOUT[4000]);

        return () => clearTimeout(timer);
    }, [dispatch, navigation])

    return (
        <View style={styles.container}>
            <ImageBackground
                style={{ position: "absolute", width: "100%", height: "100%" }}
                source={Images.SPLASH_BACKGROUND}
            />
            <Image
                style={styles.logo}
                source={Images.UPDATED_OWL}
            />
            <View>
                {/* STEP 0 & 1 → HELLO */}
                {step < 2 && (
                    <Animatable.Text
                        style={styles.helloText}
                        animation={step === 0 ? "fadeInUp" : "fadeOutUp"}
                        duration={700}
                        onAnimationEnd={() => {
                            if (step === 0) {
                                // Stay visible briefly, then fade out
                                setTimeout(() => setStep(1), 600);
                            }
                            if (step === 1) {
                                setStep(2);
                            }
                        }}
                    >
                        Hello!
                    </Animatable.Text>
                )}

                {/* STEP 2 → WELCOME */}
                {step === 2 && (
                    <Animatable.Text
                        animation="fadeInUp"
                        duration={800}
                        style={styles.welcomeText}
                    >
                        Welcome to <Text style={{ color: colors.APP_TEXT, fontWeight: 'bold', fontSize: 30 }}>Ubudy</Text>
                        {"\n"}Your journey to a peaceful
                        {"\n"}mind begins here.
                    </Animatable.Text>
                )}
            </View>
        </View>
    )
}
export default SplashScreen;
