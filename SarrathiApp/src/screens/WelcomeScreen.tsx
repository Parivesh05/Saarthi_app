import AppButton from "@components/Common/AppButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, ImageBackground, Text, View } from "react-native";
import { Images } from "src/assets/images";
import { NAVIGATION } from "src/constants/Navigation/navigation.constant";
import { RootStackParamList } from "src/interface/Navigation/navigation.interface";
import { styles } from "src/styles/welcome.style";
import { useNavigation } from "@react-navigation/native";
import { colors } from "src/styles/theme/colors";

const WelcomeScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

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

            <Text
                style={styles.welcomeText}
            >
                Welcome to <Text style={{ color: colors.APP_TEXT, fontWeight: 'bold', fontSize: 30 }}>Ubudy</Text>
                {"\n"}Your journey to a peaceful
                {"\n"}mind begins here.
            </Text>
            <View style={{ position: "absolute", bottom: 0, width: "100%", alignItems: "center", paddingBottom: 70 }}>
                <AppButton
                    title="Let's Begin"
                    textStyle={styles.buttonText}
                    onPress={() => navigation.navigate(NAVIGATION.LOGIN_SCREEN)}
                    style={styles.buttonStyle}
                    iconLibrary="Ionicons"
                    iconName="arrow-forward"
                    iconPosition="right"
                />
            </View>

        </View>
    )
}
export default WelcomeScreen;