import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FiltersScreen from '../screens/FiltersScreen';
import { Platform } from 'react-native';
import FavoritesScreen from '../screens/Favorites';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Colors from '../constants/Colors';
import { createDrawerNavigator } from 'react-navigation-drawer';

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
    },
    headerTitleStyle: {
        fontFamily:'sans-serif'
    },
    headerTintColor: 'white'
}


const MealsNavigator = createStackNavigator({

    Categories: {
        screen: CategoriesScreen,
        navigationOptions: {
            headerTitle: 'Meal Categories'
        }
    },

    CategoryMeals: {
        screen: CategoryMealsScreen
    },
    //SHortcut to above syntax
    MealDetail: MealDetailScreen
},
    {
        //You can give the initial page using initialRouteName
       // initialRouteName:'MealDetail',
        mode:'modal',// This mode will only work in iOS (This will change the screen changing theme)
        defaultNavigationOptions: defaultStackNavOptions
    }
);

const FavNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen

},
    { defaultNavigationOptions: defaultStackNavOptions });

const tabScreenConfig =
{
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primaryColor
        }
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarLabel: 'Favorites!',
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
            },
            // tabBarColor only works with shifting property given in MealsFavTabNavigator
            tabBarColor: Colors.accentColor
        }
    }
};

const MealsFavTabNavigator = Platform.OS === 'android' ?
    createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: 'white',
        shifting:true
    })
    : createBottomTabNavigator(tabScreenConfig, {
    tabBarOptions: {
        activeTintColor: Colors.accentColor
        },
        labelStyle: {
            fontFamily:'sans-serif-condensed'
        }
    });

const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
}, { defaultNavigationOptions: defaultStackNavOptions });

const MainNavigator = createDrawerNavigator({
    MealsFav: {
        screen: MealsFavTabNavigator,
        navigationOptions: {
            drawerLabel: 'Meals'
        }
    },
    Filters: FiltersNavigator
},
    {
        contentOptions: {
            activeTintColor: Colors.accentColor
            
        },
        
    }
);

export default createAppContainer(MainNavigator);