import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

const Input = props => {
    return (
        <TextInput {...props} style={{ ...styles.text, ...props.style }}  />
        );
}

const styles = StyleSheet.create({
    text: {
        height: 30,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginVertical: 10,
    }
});

export default Input;