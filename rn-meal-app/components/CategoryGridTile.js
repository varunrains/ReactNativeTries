import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';


const CategoryGridTile = props => {
 //   let TouchableCmp = TouchableOpacity;

 //   if (Platform.OS === 'android' && Platform.Version >= 21) {
 //       TouchableCmp = TouchableNativeFeedback;
	//}

    return (
        <TouchableOpacity style={{ ...styles.renderItemContainer, ...styles.container, backgroundColor: props.color }} onPress={props.onSelect}>
            <View style={styles.textContainer}>
                <Text style={{ fontSize: 18, textAlign: 'right' }} numberOfLines={2}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 15,
        borderRadius: 10,
        borderColor: 'black',
        elevation: 5,
       
       
    },
    renderItemContainer: {
        flex: 1,
        margin: 15,
        height: 150,
         overflow: 'hidden'
    },
    textContainer: {
        flex: 1,
        justifyContent: 'flex-end',
	}

});

export default CategoryGridTile;