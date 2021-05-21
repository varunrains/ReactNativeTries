import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../constants/color';
import TitleText from '../components/TitleText';


const Header = props => {
    return (
        <View style={styles.header}>
            <TitleText> {props.title}</TitleText>
        </View>
        );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 50,
        backgroundColor: Colors.primary,
        color: 'black',
        width: '100%',
        paddingTop: 5,
        marginVertical:28,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        fontFamily: 'open-sans-bold',
        height:40

    }
});

export default Header;