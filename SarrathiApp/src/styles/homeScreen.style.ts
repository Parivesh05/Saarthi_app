import { StyleSheet } from "react-native";
import { colors } from "./theme/colors";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.APP_BACKGROUND,
        padding: 15
    },
    headerContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
    style48per: {
        width: "48%",
        gap: 4
    },
    logo: {
        width: 80, height: 90, resizeMode: 'contain', borderRadius: 20,
    },
    nameTestStyle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
    },
    gmTest: {
        fontSize: 14,
    },
    getStartContainer: {
        width: "100%",
        padding: 15,
        borderRadius: 10,
        backgroundColor: colors.BUTTON_BACKGROUND, marginTop: 10, flexDirection: "row",
    },
    boxLogo: {
        width: 120, height: 120, resizeMode: 'contain', borderRadius: 10,
    },
    buttonText: { fontSize: 16, fontWeight: 'bold', color: colors.WHITE },
    buttonStyle: {
        borderRadius: 15, marginTop: 10, backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.WHITE,paddingVertical:8
    },
      dailyTipContainer: {
        width: "100%",
        padding: 15,
        borderRadius: 10,
        backgroundColor: colors.WHITE, marginTop: 30, flexDirection: "row",elevation:8
    },
});
