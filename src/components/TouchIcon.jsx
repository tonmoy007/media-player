import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export const TouchableIcon = ({name, children}) => {
    return (
        <TouchableOpacity style={styles.touchIcon}>
            <MaterialCommunityIcons name={name} size={30} color="#767577"/>
            <Text style={styles.iconText}>{children}</Text>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    touchIcon: {
        alignItems: "center",
        justifyContent: "center",
    },
    iconText: {
        marginTop: 5,
    },
})