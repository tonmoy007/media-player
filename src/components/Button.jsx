import React from 'react';
import {
    StyleSheet,
    Text,
    TextStyle,
    TouchableWithoutFeedback,
    ViewStyle,
} from 'react-native';



export const Button= ({
                                                  title,
                                                  onPress,
                                                  type = 'primary',
                                                  style,
                                              }) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Text
                style={{
                    ...styles[type],
                    ...style,
                }}
            >
                {title}
            </Text>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    primary: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFD479',
        padding: 20,
    },
    secondary: {
        fontSize: 14,
        color: '#FFD479',
        padding: 22,
    },});