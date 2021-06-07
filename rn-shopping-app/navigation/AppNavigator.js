import React from "react";
//import ShopNavigator from "./ShopNavigator";
import { useSelector } from "react-redux";
import {NavigationContainer} from '@react-navigation/native';
import { ShopNavigator, AuthNavigator } from "./ShopNavigator";
import StartupScreen from '../screens/StartupScreen';

//import { NavigationActions } from "react-navigation";

//No need to pass any object to configure the stack 
//MyStack is the react component
//const MyStack = createStackNavigator();

const AppNavigator = (props) => {
 // const navRef = useRef();
  const isAuth = useSelector((state) => !!state.auth.token);
  const didTryAutoLogin = useSelector((state) => !!state.auth.didTryAutoLogin);
 /* useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(NavigationActions.navigate({routeName:'Auth'}));
    }
  }, [isAuth]); */

  //return <ShopNavigator ref={navRef} />;
  //for react navigation 5
  return <NavigationContainer>
   {isAuth && <ShopNavigator/>}
   {!isAuth && didTryAutoLogin && <AuthNavigator/>}
   {!isAuth && !didTryAutoLogin && <StartupScreen />}
  </NavigationContainer>
};

export default AppNavigator;
