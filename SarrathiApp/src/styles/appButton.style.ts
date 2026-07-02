import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',

    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 15,
        fontWeight: '600',
    },
    icon: {
        width: 18,
        height: 18,
        marginRight: 8,
        resizeMode: 'contain',
    },
});
