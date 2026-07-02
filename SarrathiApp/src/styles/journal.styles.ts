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
         backgroundColor: colors.WHITE, borderRadius: 10,
        marginTop: 20, elevation: 5, gap: 5
    },
    promptText:{
        fontSize: 18,
        fontWeight: "400",
        color: colors.PRIMARY
    }
});