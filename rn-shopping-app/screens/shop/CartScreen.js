import React, {useState} from 'react';
import {View,Text,StyleSheet, Button, FlatList, ActivityIndicator} from 'react-native';
import Colors from '../../constants/Colors';
import {useSelector, useDispatch} from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/order';
import Card from '../../components/UI/Card';

const CartScreen = props => {
const cartTotalAmount = useSelector(state=> state.cart.totalAmount);
const dispatch= useDispatch();
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);
const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for(const key in state.cart.items){
        //console.log("For "+ state.cart.items[key].title)
        transformedCartItems.push({
            productId:key,
            productTitle: state.cart.items[key].title,
            productPrice: state.cart.items[key].productPrice,
            quantity:state.cart.items[key].quantity,
            sum:state.cart.items[key].sum,
            productPushToken: state.cart.items[key].pushToken
        })
    }
    return transformedCartItems.sort((a,b)=> a.productId > b.productId ? 1 : -1);
});
//console.log("Cartscreen " + useSelector(state=> state.cart.quantity));
const sendOrderHandler = async () => {
    setIsLoading(true);
   await dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
   setIsLoading(false);
}


return (<View style={styles.screen}>
    <Card style={styles.summary}>
        <Text style={styles.summaryText}>Total: 
        <Text style={styles.amountText}>${Math.round(cartTotalAmount.toFixed(2) *  100)/100}</Text></Text>
        {isLoading ? <ActivityIndicator size="small" color={Colors.primary} /> : (<Button color={Colors.accent} 
        title="Order Now"  
        disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
        />)}
     
    </Card>
<View>
   <FlatList data={cartItems} 
   keyExtractor={item => item.productId} 
   renderItem={itemData=> 
   <CartItem  
   quantity={itemData.item.quantity}
   title={itemData.item.productTitle}
   amount={itemData.item.sum}
   deletable
   onRemove={()=>{
dispatch(cartActions.removeFromCart(itemData.item.productId));

   }}
   />} />
</View>
</View>);
};

export const screenOptions = {
    headerTitle:'Your Orders'
    };

const styles = StyleSheet.create({
screen:{
margin:20,

},
summary:{
flexDirection:'row',
alignItems:'center',
justifyContent:'space-between',
marginBottom:20,
padding:10,
},
summaryText:{
fontFamily:'open-sans-bold',
fontSize:18
},
amountText:{
color:Colors.primary
}

});
export default CartScreen;