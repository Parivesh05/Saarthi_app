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
import { styles } from "src/styles/moodScreen.style";
import {
    MOOD_OPTIONS,
    MOOD_HISTORY,
    WEEKLY_MOOD,
    MOOD_STATS,
} from "@utils/moodDummyData";
import { colors } from "src/styles/theme/colors";

const SCREEN_WIDTH = Dimensions.get("window").width;

const MoodScreen = () => {
    //const navigation = useNavigation();
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
        <View style={styles.screen}>


            {/* ── Header ── */}
            {/* <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={22} color={colors.TEXT_PRIMARY} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Mood Tracker</Text>
                <Text style={styles.headerDate}>1 Mar 2026</Text>
            </View> */}
            <Text style={{
                fontSize: 22,
                fontWeight: "bold", marginTop: 15, marginLeft: 20,marginBottom:15,
            }}>Mood Tracker ⭐️</Text>

            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* ── Stats Row ── */}
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

                {/* ── How are you feeling? ── */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>How are you feeling right now?</Text>
                    <Text style={styles.sectionSubtitle}>Tap on an emoji to log your mood</Text>
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

                {/* ── Weekly Chart ── */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Weekly Mood Trend 📈</Text>
                    <View style={styles.chartWrapper}>
                        <LineChart
                            data={WEEKLY_MOOD}
                            width={SCREEN_WIDTH - 64}
                            height={180}
                            yAxisInterval={1}
                            fromZero
                            segments={4}
                            chartConfig={{
                                backgroundColor: colors.WHITE,
                                backgroundGradientFrom: colors.WHITE,
                                backgroundGradientTo: "#EFF6FF",
                                decimalPlaces: 0,
                                color: (opacity = 1) => `rgba(47, 128, 237, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(115, 119, 140, ${opacity})`,
                                propsForDots: {
                                    r: "5",
                                    strokeWidth: "2",
                                    stroke: colors.PRIMARY,
                                },
                                propsForBackgroundLines: {
                                    strokeDasharray: "4,4",
                                    stroke: colors.BORDER,
                                },
                            }}
                            bezier
                            style={{ borderRadius: 12 }}
                        />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 10 }}>
                        {["1 Awful", "2 Bad", "3 Okay", "4 Good", "5 Great"].map((label) => (
                            <Text key={label} style={{ fontSize: 10, color: colors.GREY }}>{label}</Text>
                        ))}
                    </View>
                </View>

                {/* ── Recent Mood History ── */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recent Entries 📋</Text>
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

            {/* ── Log Mood Button ── */}
            <TouchableOpacity style={styles.logBtn} onPress={handleLog} activeOpacity={0.85}>
                <Text style={styles.logBtnText}>Log Today's Mood ✨</Text>
            </TouchableOpacity>
        </View>
    );
};

export default MoodScreen;


