import React, {useState} from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/order';
import NavigationContainer from './navigation/NavigationContainer';
import  AppLoading  from 'expo-app-loading';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';
import authReducer from './store/reducers/auth';

const fetchFonts = () => {
  return Font.loadAsync({
       'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
       'open-sans':require('./assets/fonts/OpenSans-Regular.ttf')
   });
}

const rootReducer = combineReducers({
products: productsReducer,
cart:cartReducer,
orders: orderReducer,
auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => { setDataLoaded(true); }} onError={(error) => { console.log(error); }} />
}


  return (
<Provider store={store}><NavigationContainer /></Provider>
  );
}

