import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/color';


const MainButton = props => {
    return (<TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
        <View style={styles.button}>
            <Text style={styles.buttonText}>{props.children}</Text>
        </View>
    </TouchableOpacity>);
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderRadius:24
    },
    buttonText: {
        fontFamily: 'open-sans',
        fontSize:15
    }

});

export default MainButton;