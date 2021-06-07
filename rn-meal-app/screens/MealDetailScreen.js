import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

import DefaultText from '../components/DefaultText';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/actions/meals';


const ListItem = props => {
    return (<View style={styles.listItem}>
        <DefaultText>{props.children}</DefaultText>
    </View>);
        }


const MealDetailScreen = props => {
    const availableMeals = useSelector(state => state.meals.meals);
    const mealId = props.navigation.getParam('mealId');
    //const favoriteMeals = useSelector(state => state.meals.favoriteMeals);
    //const currentMealIsFavorite = useSelector(state => state.meals.favoriteMeals.some(meal => meal.id === mealId));
   
    const selectedMeal = availableMeals.find(item => item.id === mealId);

    const dispatch = useDispatch();
    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId));
    }, [dispatch, mealId]);
    //This will delay in rendering the title as 'useEffect' will only run when the component is fully loaded
    //useEffect(() => {
    //    props.navigation.setParams({ mealTitle: selectedMeal.title });
    //}, [selectedMeal])

    useEffect(() => {
        props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
    }, [toggleFavoriteHandler]);

    //useEffect(() => {
    //    props.navigation.setParams({ isFav: currentMealIsFavorite });
    //}, [currentMealIsFavorite]);

    return (
        <ScrollView>
            <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
            <View style={styles.detail}>
                <DefaultText>{selectedMeal.duration}m</DefaultText>
                <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}> Ingredients </Text>
            {selectedMeal.ingredients.map(ing => <ListItem key={ing}>{ing}</ListItem>)}
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map(ing => <ListItem key={ing}>{ing}</ListItem>)}
           </ScrollView>
    );
};

MealDetailScreen.navigationOptions = navigationData => {
    //const mealId = navigationData.navigation.getParam('mealId');
    const mealTitle = navigationData.navigation.getParam('mealTitle');
    const toggleFavorite = navigationData.navigation.getParam('toggleFav');
    const isFavorite = navigationData.navigation.getParam('isFav');
    return {
        headerTitle: mealTitle,
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Favorite"
                iconName={isFavorite ? 'ios-star':'ios-star-outline'}
                onPress={toggleFavorite} />
        </HeaderButtons>
    }
};

const styles = StyleSheet.create({
    detail: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    image: {
        width: '100%',
        height: 200
    },
    title: {
        fontSize: 18,
        fontFamily: 'sans-serif',
        textAlign:'center'
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: "#ccc",
        borderWidth: 1,
        padding:10
    }

});

export default MealDetailScreen;