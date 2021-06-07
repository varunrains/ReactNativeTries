import React from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions } from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import Colors from '../constants/color';



const GameOverScreen = props => {
    return (<View style={styles.container}>
        <TitleText> Game Over </TitleText>
        <View style={styles.imageContainer} >
            <Image
                //For local image there is no need to provide the size
                //But for network images you need to give the the width and height for the image
                //source={require('../assets/success.png')}
                source={{ uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Summit_camp_Everest.jpg/1280px-Summit_camp_Everest.jpg'}}
                style={styles.image}
                fadeDuration={1000}
                resizeMode="center" />
        </View>
        <BodyText style={styles.resultText}>Your phone needed <Text style={styles.highlight}>{props.round}</Text> to guess the number <Text style={styles.highlight}>{props.userNumber}</Text></BodyText>

        <MainButton onPress={props.onRestart} >NEW GAME </MainButton>
    </View>);
    //Any text style that you apply to the Text component gets inherited to the child Text components.
    //This is one exception that the React Native has
    //And no other React components inherits the styles from the parent component only Text component does.
}
//By default Text component has its own positioning system and it will not have the flex box positioning.
//By default Text component wraps the text if it didn't find the space.
const styles = StyleSheet.create({
    container: {
        //flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%'
    },
    image: {
        width: '100%',
        height:'100%'
    },
    imageContainer: {
        borderRadius: Dimensions.get('window').width * 0.7 /2,
        borderWidth: 3,
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height /20

    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultText: {
        textAlign: "center",
        fontSize: 17,
        marginBottom:15
    }

});

export default GameOverScreen;