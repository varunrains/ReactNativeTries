import React from 'react';
import {FlatList,Platform, Button, Alert, View, Text} from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';

import Colors from '../../constants/Colors';

const UserProductsScreen = props =>{
    const userProducts = useSelector(state => state.products.userProducts);

    const dispatch = useDispatch();

    const editProductHandler = id =>{
        console.log(userProducts);
props.navigation.navigate('EditProduct', {productId: id});
    };

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item ?',[
            {
                text:'No', style:'default'
            },
            {
                text:'Yes',
                style:'destructive',
                onPress:()=>{
                    dispatch(productsActions.deleteProduct(id));
                }
            }
        ])
        };

        if(userProducts.length === 0){
            return (<View style={{flex:1, justifyContent:'center', alignItems:'center'}}><Text>No products found!!</Text></View>)
        }

return(<FlatList 
    data={userProducts}
    keyExtractor={item =>item.id}
    renderItem={itemData => <ProductItem 
    title={itemData.item.title} 
    price={itemData.item.price} 
    image={itemData.item.imageUrl} 
    onSelect={()=>{
        editProductHandler(itemData.item.id);
    }}
    >
     <Button color={Colors.primary} title="Edit" onPress={()=>{
         editProductHandler(itemData.item.id);
     }}/>
    <Button color={Colors.primary} 
                title="Delete" 
                onPress={()=>{
                    deleteHandler(itemData.item.id);
            
                }} />
    </ProductItem>}
/>);
};

UserProductsScreen.navigationOptions = navData => {
   return {
        headerTitle:'Your products',
        headerLeft:() => {
            return (<HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Menu' 
                iconName={Platform.OS === 'android' ?'md-menu' :'ios-menu'}
                    onPress={()=>{
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>);
        },
        headerRight:() => {
            return (<HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Add' 
                iconName={Platform.OS === 'android' ?'md-create' :'ios-create'}
                    onPress={()=>{
                        navData.navigation.navigate('EditProduct');
                    }}
                />
            </HeaderButtons>);
        },
}

}

export default UserProductsScreen;