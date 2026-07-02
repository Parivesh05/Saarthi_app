import { StyleSheet } from "react-native";
import { colors } from "./theme/colors";

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.APP_BACKGROUND,
       
    },

    // ── Header ────────────────────────────────────────────────
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: colors.WHITE,
        borderBottomWidth: 1,
        borderBottomColor: colors.BORDER,
    },
    backBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.APP_BACKGROUND,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    headerTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: "700",
        color: colors.TEXT_PRIMARY,
    },
    headerDate: {
        fontSize: 12,
        color: colors.GREY,
    },

    // ── Scroll content ────────────────────────────────────────
    scroll: { flex: 1 },
    scrollContent: { paddingBottom: 30 },

    // ── Section wrapper ───────────────────────────────────────
    section: {
        backgroundColor: colors.WHITE,
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 16,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.TEXT_PRIMARY,
        marginBottom: 14,
    },
    sectionSubtitle: {
        fontSize: 12,
        color: colors.GREY,
        marginBottom: 14,
    },

    // ── Stats row ─────────────────────────────────────────────
    statsRow: {
        flexDirection: "row",
        gap: 12,
        marginHorizontal: 16,
        marginTop: 16,
    },
    statCard: {
        flex: 1,
        backgroundColor: colors.WHITE,
        borderRadius: 14,
        padding: 14,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    statEmoji: { fontSize: 22 },
    statValue: {
        fontSize: 18,
        fontWeight: "800",
        color: colors.TEXT_PRIMARY,
        marginTop: 4,
    },
    statLabel: {
        fontSize: 11,
        color: colors.GREY,
        marginTop: 2,
        textAlign: "center",
    },

    // ── Mood picker ───────────────────────────────────────────
    moodRow: {
        flexDirection: "row",
        gap: 8,
    },
    moodOption: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 12,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: "transparent",
    },
    moodOptionSelected: {
        borderWidth: 2,
    },
    moodEmoji: { fontSize: 24 },
    moodLabel: {
        fontSize: 10,
        fontWeight: "600",
        marginTop: 4,
    },

    // ── Chart ─────────────────────────────────────────────────
    chartWrapper: {
        marginTop: 4,
        borderRadius: 12,
        overflow: "hidden",
    },

    // ── History list ──────────────────────────────────────────
    historyItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.BORDER,
    },
    historyItemLast: {
        borderBottomWidth: 0,
    },
    historyDot: {
        width: 42,
        height: 42,
        borderRadius: 21,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    historyEmoji: { fontSize: 20 },
    historyContent: { flex: 1 },
    historyTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    historyMood: {
        fontSize: 14,
        fontWeight: "700",
        color: colors.TEXT_PRIMARY,
    },
    historyTime: {
        fontSize: 11,
        color: colors.GREY,
    },
    historyNote: {
        fontSize: 12,
        color: colors.GREY,
        marginTop: 3,
        lineHeight: 17,
    },
    historyDate: {
        fontSize: 11,
        color: colors.PRIMARY,
        fontWeight: "600",
        marginTop: 2,
    },

    // ── Log button ────────────────────────────────────────────
    logBtn: {
        marginHorizontal: 16,
        marginTop: 20,
        backgroundColor: colors.PRIMARY,
        borderRadius: 16,
        paddingVertical: 16,
        alignItems: "center",
    },
    logBtnText: {
        fontSize: 15,
        fontWeight: "700",
        color: colors.WHITE,
    },
});


