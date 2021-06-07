import React, {useEffect, useCallback, useReducer, useState} from 'react';
import {View, Text, StyleSheet, TextInput,ScrollView, Platform,Alert, KeyboardAvoidingView, ActivityIndicator} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import {useSelector, useDispatch} from 'react-redux';
import * as productsActions from '../../store/actions/products';
import Input from '../../components/UI/Input';

import Colors from '../../constants/Colors';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

//this is not a redux reducer- dont get confused
const formReducer = (state, action) =>{
    if(action.type === FORM_INPUT_UPDATE){
const updatedValues = {
    ...state.inputValues,
    [action.input]:action.value
};

const updatedValidities = {
    ...state.inputValidities,
    [action.input]:action.isValid
};

let updatedFormIsValid = true;
for(const key in updatedValidities){
    updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
}

return {
    formIsValid: updatedFormIsValid,
    inputValues:updatedValues,
    inputValidities: updatedValidities
};
    }

    return state;
};

const EditProductScreen = props =>{
    const prodId = props.navigation.getParam('productId');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId));

  const [formState, dispatchFormState] = useReducer(formReducer, {inputValues:{
        title:editedProduct ? editedProduct.title :'',
        imageUrl:editedProduct ? editedProduct.imageUrl :'',
        description:editedProduct ? editedProduct.description :'',
        price:''
    }, inputValidities:{
        title:editedProduct ? true :false,
        imageUrl:editedProduct ? true :false,
        description:editedProduct ? true :false,
        price:editedProduct ? true :false,
    }, formIsValid:editedProduct ? true: false});

    useEffect(()=>{
        if(error){
            Alert.alert('An error occurred', error,[{
text:'Okay'
            }]);
        }
    },[error])

//const [title, setTitle] = useState(editedProduct ? editedProduct.title :'');
//const [titleIsValid, setTitleIsValid] = useState(false);
//const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl :'');
//const [price, setPrice] = useState('');
//const [description, setDescription] = useState(editedProduct ? editedProduct.description :'');


const dispatch = useDispatch();

const submitHandler = useCallback(async () =>{
  
if(!formState.formIsValid)
{
    Alert.alert('Wrong input!','Please check the errors in the form',[
        {text:"Okay"}
    ]);
    return;
}
setError(null);
setIsLoading(true);

try {
    if(editedProduct){
    
        await dispatch(productsActions.updateProduct(prodId, formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl));
  }else {
         await dispatch(productsActions.createProduct(formState.inputValues.title,
           formState.inputValues.description,
           formState.inputValues.imageUrl,
           +formState.inputValues.price));
  }
  props.navigation.goBack();
}catch(err)
{
setError(err.message);
}

setIsLoading(false);

}, [dispatch, prodId, formState]);

useEffect(()=>{
props.navigation.setParams({submit: submitHandler});
},[submitHandler]);

const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {

   dispatchFormState({
    type:FORM_INPUT_UPDATE, 
    value: inputValue, 
    isValid:inputValidity,
    input:inputIdentifier})
},[dispatchFormState]);

if(isLoading){
    return (<View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary}/>
    </View>);
}

return (
    <KeyboardAvoidingView style={{flex:1}} behavior="padding" keyboardVerticalOffset={100}>
    <ScrollView>
    <View style={styles.form}>
    <Input
    id='title'
    label="Title"
    errorText="Please enter a valid text!"
    keyboardType='default'
    autoCapitalize='sentences'
    autoCorrect
    returnKeyType="next"
    onInputChange={inputChangeHandler}
    initialValue={editedProduct ? editedProduct.title: ''}
    initiallyValid={!!editedProduct}
    required
    />
    <Input
    id='imageUrl'
    label="Image Url"
    errorText="Please enter a image url!"
    keyboardType='default'
    returnKeyType="next"
    onInputChange={inputChangeHandler}
    initialValue={editedProduct ? editedProduct.imageUrl: ''}
    initiallyValid={!!editedProduct}
    required
    />
{editedProduct ? null : <Input
id="price"
    label="Price"
    errorText="Please enter a valid price!"
    keyboardType='decimal-pad'
    returnKeyType="next"
    required
    min={0.1}
    onInputChange={inputChangeHandler}
    />}
    <Input
    id="description"
    label="Description"
    errorText="Please enter a valid description!"
    keyboardType='default'
    autoCapitalize='sentences'
    autoCorrect
    multiline
    numberOfLines={3}
    onInputChange={inputChangeHandler}
    initialValue={editedProduct ? editedProduct.description: ''}
    initiallyValid={!!editedProduct}
    required
    minLength={5}
    />
</View>
</ScrollView>
</KeyboardAvoidingView>
);
};

EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');
    return {
        headerTitle:navData.navigation.getParam('productId') ? 'Edit Product' :'Add Product',
        headerRight:() => {
            return (<HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Save' 
                iconName={Platform.OS === 'android' ?'md-checkmark' :'ios-checkmark'}
                    onPress={submitFn}
                />
            </HeaderButtons>);
        },
    };
}

const styles = StyleSheet.create({
form:{
    margin:20
},
centered:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
}


});

export default EditProductScreen;

