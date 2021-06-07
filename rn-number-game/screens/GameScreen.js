import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, ScrollView, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';
import Card from '../components/Card';
import BodyText from '../components/BodyText';


//If you write the logic outside the function component then it will not render every time
//No repainting out side the function component

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const renderListItem = (value, numOfRound) => {
    <View key={value}>
        <BodyText>{numOfRound}</BodyText>
        <BodyText>{value}</BodyText>
    </View>
};

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);

    //useRef will be used to stop the re-rendering cycle.
    //useState will re-render everytime when the value changes but useRef will not do that
    //This will be used typically when you want your internal business logic to change and not the screen.
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    //object de-structuring
    const { userChoice, onGameOver } = props;

    //useEffect will only run when any of its dependecy is changed, if not it will not re-render the screen.
    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }

    }, [currentGuess, userChoice, onGameOver]);

   

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie!', 'You know that this is wrong..', [
                { text: 'Sorry!', style: 'cancel' }
            ]);
            return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        }
        else {
            currentLow.current = currentGuess + 1;
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        //setRounds(curRound => curRound + 1);
        setPastGuesses(curPasGuesses => [nextNumber, ...curPasGuesses]);
    };

    return (
        <View style={styles.screen}>
            <NumberContainer text="Opponents Guess" number={currentGuess} />
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')} >
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                <Text> {pastGuesses} </Text>
                { <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) =>
                        renderListItem(guess, pastGuesses.length - index)
                    )}
                </ScrollView> }
                {/* <FlatList keyExtractor={item => item} data={pastGuesses} renderItem={renderListItem} /> */}
            </View>
        </View>

        );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        //justifyContent:'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
        width: '80%',
        height: 80,
        paddingHorizontal:15

    },
    listContainer: {
        flex: 1,
        width: Dimensions.get('window').width > 350 ? '60%':'80%'
    },
    list: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexGrow:1
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-around',
        width:'60%'
        

    }
});

export default GameScreen;