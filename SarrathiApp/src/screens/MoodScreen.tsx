import { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LineChart } from "react-native-chart-kit";
import {
    MOOD_OPTIONS,
    MOOD_HISTORY,
    WEEKLY_MOOD,
    MOOD_STATS,
} from "@utils/moodDummyData";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Gradients, Shadows, Colors } from "src/constants/designTokens";

const SCREEN_WIDTH = Dimensions.get("window").width;

const MoodScreen = () => {
    const navigation = useNavigation();
    const [selectedMood, setSelectedMood] = useState<number | null>(null);

    const handleLog = () => {
        if (!selectedMood) {
            Alert.alert("Select a mood", "Please pick how you're feeling first.");
            return;
        }
        const found = MOOD_OPTIONS.find((m) => m.value === selectedMood);
        Alert.alert("Mood Logged! " + found?.emoji, `You're feeling ${found?.mood} today.`);
        setSelectedMood(null);
    };

    return (
        <LinearGradient
            colors={[Colors.appBgGradientStart, Colors.appBgGradientEnd]}
            style={styles.screen}
        >
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={22} color="#211E37" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Mood tracker</Text>
            </View>

            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                <View style={styles.statsRow}>

                    <View style={styles.statCard}>
                        <Text style={styles.statEmoji}>🔥</Text>
                        <Text style={styles.statValue}>{MOOD_STATS.streak}</Text>
                        <Text style={styles.statLabel}>Day Streak</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statEmoji}>{MOOD_STATS.avgEmoji}</Text>
                        <Text style={styles.statValue}>{MOOD_STATS.avgMood}</Text>
                        <Text style={styles.statLabel}>Avg Mood</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statEmoji}>📝</Text>
                        <Text style={styles.statValue}>{MOOD_STATS.totalLogs}</Text>
                        <Text style={styles.statLabel}>Total Logs</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>How are you feeling right now?</Text>
                    <Text style={styles.sectionSubtitle}>Tap on a mood to log your check-in</Text>
                    <View style={styles.moodRow}>
                        {MOOD_OPTIONS.map((item) => (
                            <TouchableOpacity
                                key={item.value}
                                style={[
                                    styles.moodOption,
                                    { backgroundColor: item.bg },
                                    selectedMood === item.value && [
                                        styles.moodOptionSelected,
                                        { borderColor: item.color },
                                    ],
                                ]}
                                onPress={() => setSelectedMood(item.value)}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.moodEmoji}>{item.emoji}</Text>
                                <Text style={[styles.moodLabel, { color: item.color }]}>
                                    {item.mood}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Weekly mood trend</Text>
                    <View style={styles.chartWrapper}>
                        <LineChart
                            data={WEEKLY_MOOD}
                            width={SCREEN_WIDTH - 64}
                            height={180}
                            yAxisInterval={1}
                            fromZero
                            segments={4}
                            chartConfig={{
                                backgroundColor: '#FFFFFF',
                                backgroundGradientFrom: '#FFFFFF',
                                backgroundGradientTo: '#FFFFFF',
                                decimalPlaces: 0,
                                color: (opacity = 1) => `rgba(106, 90, 224, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(138, 138, 160, ${opacity})`,
                                propsForDots: {
                                    r: "5",
                                    strokeWidth: "2",
                                    stroke: '#6A5AE0',
                                },
                                propsForBackgroundLines: {
                                    strokeDasharray: "4,4",
                                    stroke: '#EFEDF7',
                                },
                            }}
                            bezier
                            style={{ borderRadius: 12 }}
                        />
                    </View>
                    <View style={styles.scaleLegend}>
                        {["1 Awful", "2 Bad", "3 Okay", "4 Good", "5 Great"].map((label) => (
                            <Text key={label} style={styles.scaleLabel}>{label}</Text>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recent entries</Text>
                    {MOOD_HISTORY.map((item, index) => (
                        <View
                            key={item.id}
                            style={[
                                styles.historyItem,
                                index === MOOD_HISTORY.length - 1 && styles.historyItemLast,
                            ]}
                        >
                            <View style={[styles.historyDot, { backgroundColor: item.color + "22" }]}>
                                <Text style={styles.historyEmoji}>{item.emoji}</Text>
                            </View>
                            <View style={styles.historyContent}>
                                <View style={styles.historyTop}>
                                    <Text style={[styles.historyMood, { color: item.color }]}>{item.mood}</Text>
                                    <Text style={styles.historyTime}>{item.time}</Text>
                                </View>
                                <Text style={styles.historyNote} numberOfLines={2}>{item.note}</Text>
                                <Text style={styles.historyDate}>{item.date}</Text>
                            </View>
                        </View>
                    ))}
                </View>

            </ScrollView>

            <TouchableOpacity
                style={styles.logBtnWrapper}
                onPress={handleLog}
                activeOpacity={0.85}
            >
                <LinearGradient
                    colors={Gradients.primaryButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.logBtn}
                >
                    <Text style={styles.logBtnText}>Log today's mood</Text>
                </LinearGradient>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 22,
        paddingTop: 10,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 13,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    headerTitle: {
        color: '#211E37',
        fontSize: 25,
        fontWeight: '700',
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 22,
        paddingTop: 14,
        paddingBottom: 120,
        gap: 16,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingVertical: 14,
        alignItems: 'center',
    },
    statEmoji: {
        fontSize: 20,
    },
    statValue: {
        color: '#211E37',
        fontSize: 18,
        marginTop: 6,
        fontWeight: '700',
    },
    statLabel: {
        color: '#8A8AA0',
        fontSize: 12,
        marginTop: 4,
        fontWeight: '700',
    },
    section: {
        backgroundColor: '#FFFFFF',
        borderRadius: 22,
        padding: 16,
    },
    sectionTitle: {
        color: '#211E37',
        fontSize: 18,
        fontWeight: '600',
    },
    sectionSubtitle: {
        color: '#8A8AA0',
        marginTop: 4,
        fontSize: 13,
        fontWeight: '600',
    },
    moodRow: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    moodOption: {
        width: '19%',
        borderRadius: 19,
        height: 98,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
    },
    moodOptionSelected: {
        borderWidth: 2.5,
        transform: [{ translateY: -4 }],
        shadowColor: '#6A5AE0',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 12 },
        shadowRadius: 24,
    },
    moodEmoji: {
        fontSize: 26,
    },
    moodLabel: {
        fontSize: 11,
        fontWeight: '800',
    },
    chartWrapper: {
        marginTop: 10,
        marginLeft: -16,
    },
    scaleLegend: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 8,
    },
    scaleLabel: {
        fontSize: 10,
        color: '#8A8AA0',
        fontWeight: '700',
    },
    historyItem: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#EFEDF7',
        paddingBottom: 12,
    },
    historyItemLast: {
        borderBottomWidth: 0,
    },
    historyDot: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    historyEmoji: {
        fontSize: 20,
    },
    historyContent: {
        flex: 1,
    },
    historyTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    historyMood: {
        fontSize: 14,
        fontWeight: '800',
    },
    historyTime: {
        fontSize: 12,
        color: '#8A8AA0',
        fontWeight: '700',
    },
    historyNote: {
        marginTop: 4,
        color: '#4A4763',
        fontSize: 13,
        lineHeight: 20,
        fontWeight: '600',
    },
    historyDate: {
        marginTop: 3,
        color: '#9A97AE',
        fontSize: 11,
        fontWeight: '700',
    },
    logBtnWrapper: {
        position: 'absolute',
        bottom: 26,
        left: 22,
        right: 22,
        borderRadius: 20,
        ...Shadows.primaryButton,
    },
    logBtn: {
        height: 58,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logBtnText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 18,
    },
});

export default MoodScreen;


