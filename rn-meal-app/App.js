import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { useScreens } from 'react-native-screens';

import MealsNavigator from './navigation/MealsNavigator';

import { createStore, combineReducers } from 'redux';
import mealsReducer from './store/reducers/meals';
import { Provider } from 'react-redux';

//This will enhance performance and it uses the native OS's navigation theme
//enableScreens();

//const fetchFonts = () => {
//  return  Font.loadAsync({
//        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
//        'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf')
//    });
//};

const rootReducer = combineReducers({
    meals: mealsReducer
});

const store = createStore(rootReducer);


const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf')
    });
}


export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);


    if (!fontLoaded) {
        <AppLoading startAsync={fetchFonts} onFinish={() => { setFontLoaded(true) }} onError={err => console.log(err)} />
    }

    return (
        <Provider store={store}><MealsNavigator /></Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
