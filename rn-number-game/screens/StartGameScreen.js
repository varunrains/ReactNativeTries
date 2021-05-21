import React, { useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Button, Text, Keyboard, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Number from '../components/NumberContainer';
import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constants/color';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {
    const [enteredText, setEnteredText] = useState('');
    const [selectedNumber, setSelectedNumber] = useState();
    const [isConfirmed, setIsConfirmed] = useState(false);
    

    const onTextChangeHandler = (inputText) => {
        setEnteredText(() => { return inputText.replace(/[^0-9]/g,''); })
    }

    const onResetHandler = () => {
        setEnteredText('');
        setIsConfirmed(false);
    }
    const onConfirmHandler = () => {
        const chosenNumber = parseInt(enteredText);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert("Please enter Number", "Enter value between 1 to 99", [{
                style: "destructive",
                text: "Okay",
                onPress: () => { onResetHandler }
            }]);
            return;
        }
        setIsConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredText('');
        Keyboard.dismiss();
    }

    let feedback;
    if (isConfirmed) {
        feedback = (<View style={styles.feedbackContainer}>
            <Number text="You selected" number={selectedNumber} />
            <View style={styles.buttonStyle2}>
                <MainButton onPress={() => { props.onStartGame(selectedNumber) }}>Start Game</MainButton>
            </View>
        </View>);
    }

    return (
        <View style={styles.container}>
        <Card style={styles.inputContainer}>
                <BodyText style={styles.text}> Start the game!</BodyText>
                <Input style={styles.input} blurOnSubmit={true} maxLength={2} keyboardType='number-pad' onChangeText={onTextChangeHandler} value={enteredText} />
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonStyle}><Button title="Reset" color={Colors.accent} onPress={onResetHandler} /></View>
                    <View style={styles.buttonStyle}><Button title="Confirm" color={Colors.primary} onPress={onConfirmHandler} /></View>
                </View>
            </Card>
            {feedback ? <Card style={styles.inputContainer}>{feedback}</Card> : null}
           
        </View>);
}
//shadow[*] (COlor,Opacity,Radius,Offset) will only work in iOS
//elevation will work in Android

const styles = StyleSheet.create({
    container: {
        width:'100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 15,
        paddingVertical:10
    },
    inputContainer: {
        width: '90%',
        paddingHorizontal: 20,
        height: 150,
    },
    feedbackCardContainer: {
        width: '100%',
        padding: 1,
        height: 60,
        marginTop: 15,
        fontSize: 8,
        alignItems: 'center',
        justifyContent: 'space-between'
        

    },
    buttonContainer: {
        width:'95%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginVertical: 15
    },
    buttonStyle: {
        width: '45%',
       // width: '45%'
    },
    buttonStyle2: {
        width: '50%',
        marginVertical: 10,
        height:10
        // width: '45%'
    },
    input: {
        width: 45,
    },
    feedbackContainer: {
        flex: 1,
        width: '95%',
        height:200,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        padding:10
    }
    
});

export default StartGameScreen;