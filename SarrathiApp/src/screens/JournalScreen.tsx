import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Gradients, Shadows, Colors } from "src/constants/designTokens";

const JournalScreen = () => {
        const cards = [
                {
                        title: "Today's Prompt",
                        body: "What is one thing you are looking forward to this week?",
                        icon: "✨",
                },
                {
                        title: "Morning Gratitude",
                        body: "Today I am grateful for the warm sunshine and the peaceful walk I had this morning.",
                        icon: "🌤️",
                },
                {
                        title: "Reflection on Growth",
                        body: "I have been noticing how much calmer I feel compared to a month ago.",
                        icon: "📈",
                },
        ];

    return (
        <LinearGradient
            colors={[Colors.appBgGradientStart, Colors.appBgGradientEnd]}
            style={styles.container}
        >
                        <Text style={styles.headerText}>Journal</Text>
                        <Text style={styles.subHeader}>Express your thoughts freely</Text>

                        {cards.map((card) => (
                                <View key={card.title} style={styles.boxContainer}>
                                        <Text style={styles.promptText}>{card.icon} {card.title}</Text>
                                        <Text style={styles.body}>{card.body}</Text>
                                </View>
                        ))}

                        <TouchableOpacity style={styles.writeButtonWrapper} activeOpacity={0.9}>
                                <LinearGradient
                                        colors={Gradients.primaryButton}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={styles.writeButton}
                                >
                                        <Ionicons name="add" size={20} color="#FFFFFF" />
                                        <Text style={styles.writeButtonText}>Start writing</Text>
                                </LinearGradient>
                        </TouchableOpacity>
        </LinearGradient>

        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 22,
        paddingTop: 12,
        gap: 14,
    },
    headerText: {
        color: '#211E37',
        fontSize: 27,
        fontWeight: '700',
    },
    subHeader: {
        color: '#8A8AA0',
        fontSize: 14,
        fontWeight: '600',
        marginTop: -6,
    },
    boxContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 22,
        padding: 18,
        shadowColor: '#3C3278',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 20,
        elevation: 4,
    },
    promptText: {
        color: '#211E37',
        fontSize: 18,
        fontWeight: '700',
    },
    body: {
        marginTop: 8,
        color: '#4A4763',
        fontSize: 14,
        lineHeight: 22,
        fontWeight: '600',
    },
    writeButtonWrapper: {
        marginTop: 'auto',
        marginBottom: 110,
        borderRadius: 18,
        ...Shadows.primaryButton,
    },
    writeButton: {
        height: 56,
        borderRadius: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    writeButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default JournalScreen;