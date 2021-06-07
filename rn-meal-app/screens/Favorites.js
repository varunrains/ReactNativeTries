import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MealList from '../components/MealList';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';


const Favorites = props => {

    const favMeals = useSelector(state => state.meals.favoriteMeals);

    // const favMeals = availableMeals.filter(meal => meal.id === 'm1' || meal.id === 'm2');
    if (favMeals.length === 0 || !favMeals) {
        return (<View style={styles.content}>
            <DefaultText>No favorite meals found. Start adding some!</DefaultText>
        </View>);
    }
    return (
        <MealList listData={favMeals} navigation={props.navigation} />
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
    ,
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    }
});

Favorites.navigationOptions = (navData) => {
    return {
        headerTitle: 'Favourites Screen',
        headerLeft: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName='ios-menu' onPress={() => {
                navData.navigation.toggleDrawer();
            }} />
        </HeaderButtons>)
    }
};


export default Favorites;