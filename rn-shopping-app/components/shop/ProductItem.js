import React from 'react';
import {View, Text, StyleSheet, Button,Image, TouchableOpacity, TouchableNativeFeedback, Platform} from 'react-native';
import  Colors from '../../constants/Colors';
import Card from '../UI/Card';


const ProductItem = props => {
    let TouchableCmp = TouchableOpacity;

if(Platform.OS === 'android' && Platform.Version >=21){
    TouchableCmp = TouchableNativeFeedback;
}

return (

<Card style={styles.product}>
<View style={styles.touchable}>
<TouchableCmp onPress={props.onSelect} useForeground>
<View>
<View style={styles.imageContainer}>
<Image style={styles.image}  source={{uri:props.image}} />
</View>

<View style={styles.details}>
<Text style={styles.title}>{props.title}</Text>
<Text style={styles.price}>${props.price.toFixed(2)}</Text>
</View>
<View style={styles.action}>
{props.children}
</View>
</View>
</TouchableCmp>
</View>
</Card>
);
};

const styles = StyleSheet.create({
    touchable:{
        overflow:'hidden',
        borderRadius:10
    },
product:{
    height:300,
    margin:20
},
image:{
    width:'100%',
    height:'100%'
},
title:{
fontSize:18,
marginVertical:2,
fontFamily:'open-sans-bold'
},
price:{
fontSize:14,
color:'#888',
fontFamily:'open-sans'
},
action:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    height:'23%',
    paddingHorizontal:10
},
details:{
    alignItems:'center',
    height:'17%',
    padding:10,
    fontFamily:'open-sans'
},
imageContainer:{
    width:'100%',
    height:'60%',
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    overflow:'hidden'
}
});

export default ProductItem;