import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = props => {
    return (
        <View style={{ ...styles.inputContainer, ...props.style }}>{props.children}</View>
        );
}

const styles = StyleSheet.create({
    inputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        borderColor: 'black',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 20 },
        borderRadius: 5
       // borderWidth: 2
    }
});

export default Card;