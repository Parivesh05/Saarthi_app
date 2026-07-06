import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Images } from "src/assets/images";
import { NAVIGATION } from "src/constants/Navigation/navigation.constant";
import { RootStackParamList } from "src/interface/Navigation/navigation.interface";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Gradients } from 'src/constants/designTokens';

const WelcomeScreen = () => {
        const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <LinearGradient
            colors={[Colors.appBgGradientStart, Colors.appBgGradientEnd]}
            style={styles.container}
        >
            <Image
                style={styles.logo}
                source={Images.U_LOGO}
            />

                        <Text style={styles.title}>Welcome to uBudy</Text>
                        <Text style={styles.subtitle}>Your journey to a peaceful mind begins here.</Text>

                        <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => navigation.navigate(NAVIGATION.LOGIN_SCREEN)}
                                style={styles.ctaWrap}
                        >
                                <LinearGradient colors={Gradients.primaryButton} style={styles.buttonStyle}>
                                        <Text style={styles.buttonText}>Let&apos;s Begin</Text>
                                        <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                                </LinearGradient>
                                <Text style={styles.tagline}>Your mindful companion</Text>
                        </TouchableOpacity>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 140,
        height: 140,
        borderRadius: 20,
    },
    title: {
        marginTop: 24,
        fontSize: 32,
        fontWeight: '700',
        color: '#211E37',
        textAlign: 'center',
    },
    subtitle: {
        marginTop: 10,
        color: '#4A4763',
        fontSize: 16,
        lineHeight: 25,
        fontWeight: '600',
        textAlign: 'center',
        paddingHorizontal: 12,
    },
    ctaWrap: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        paddingHorizontal: 22,
    },
    buttonStyle: {
        height: 60,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 19,
        fontWeight: '700',
    },
    tagline: {
        marginTop: 12,
        color: '#8A8AA0',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default WelcomeScreen;