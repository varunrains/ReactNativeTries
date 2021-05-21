import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/color';

const NumberContainer = props => {
    return (
        <View style={styles.container}>
        <Text>{props.text}</Text>
            <View style={styles.number}>
            <Text>{props.number}</Text>
        </View>
    </View>);
}

const styles = StyleSheet.create({
    number: {
       // flex: 1,
        width: 30,
        height:35,
        fontSize: 30,
        borderColor: Colors.accent,
        borderWidth: 2,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5
    },
    container: {
        flex: 1,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical:10
    },
    header: {
        fontSize:18
    }
});

export default NumberContainer;