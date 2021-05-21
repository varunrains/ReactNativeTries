import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import  AppLoading  from 'expo-app-loading';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
   return Font.loadAsync({
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
        'open-sans':require('./assets/fonts/OpenSans-Regular.ttf')
    });
}

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [guessRounds, setGuessRounds] = useState(0);
    const [dataLoaded, setDataLoaded] = useState(false);

    const startGameHandler = (selectedNumber) => {
        setUserNumber(selectedNumber);
        setGuessRounds(0);
    }

    const gameOverHandler = numOfRounds => {
        setGuessRounds(numOfRounds);
    };

    const configureNewGameHandler = () => {
        setGuessRounds(0);
        setUserNumber(null);
    }

    if (!dataLoaded) {
        return <AppLoading startAsync={fetchFonts} onFinish={() => { setDataLoaded(true); }} onError={(error) => { console.log(error); }} />
    }


    let content = <StartGameScreen onStartGame={startGameHandler} />;

    if (userNumber && guessRounds <= 0) {
        content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    } else if (guessRounds > 0) {
        content = <GameOverScreen round={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler} />;
    }

    //content = <GameOverScreen round={1} userNumber={1} onRestart={configureNewGameHandler} />;

  return (
      <View style={styles.container}>
          <Header title="Guess the number" />
          {content}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent:'center'
    }
});
