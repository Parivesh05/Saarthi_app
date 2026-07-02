import { StyleSheet } from "react-native";
import { colors } from "./theme/colors";


export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.APP_BACKGROUND,
        padding: 20
    },
    headerText: {
        fontSize: 22,
        fontWeight: "bold"
    },
    boxContainer: {
        width: "100%",
        padding: 10,
        justifyContent: "center",
        alignItems: "center", backgroundColor: colors.WHITE, borderRadius: 10,
        marginTop: 20, elevation: 5, gap: 0
    },
    logo: {
        width: 90, height: 90, resizeMode: 'contain', borderRadius: 20,
    },
    emailText: {
        fontSize: 16,
        color: colors.GREY,
        marginTop: 5
    },
    profileContainer: {
        width: "100%",
        padding: 10,
        justifyContent: "space-between",
        backgroundColor: colors.WHITE, borderRadius: 10,
        marginTop: 20, elevation: 5, gap: 20,

    },
    width48per: {
        width: "48%", flexDirection: "row", alignItems: "center", gap: 10,
    },
    profileContainerText: {
        fontSize: 20,
        fontWeight: "500"
    },
})