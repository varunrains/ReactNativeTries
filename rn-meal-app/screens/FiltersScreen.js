import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, Switch } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import { setFilters } from '../store/actions/meals';

const FilterSwitch = props => {
    return (<View style={styles.filterContainer}>
        <Text>{props.title}</Text>
        <Switch
            trackColor={{ true: Colors.primaryColor }}
            thumbColor={Colors.primaryColor}
            value={props.state}
            onValueChange={props.onChange} />
    </View>);

};

const FiltersScreen = props => {
    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);
    //const { navigation } = props

    const dispatch = useDispatch();

    //use
    const saveFilter = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        };
        dispatch(setFilters(appliedFilters));
        // console.log(appliedFilters);
    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

    useEffect(() => {
        props.navigation.setParams({
            save: saveFilter
        });

    }, [saveFilter])

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters /Restrictions </Text>
            <FilterSwitch title="Gluten-Free" state={isGlutenFree} onChange={newValue => setIsGlutenFree(newValue)} />
            <FilterSwitch title="Lactose-Free" state={isLactoseFree} onChange={newValue => setIsLactoseFree(newValue)} />
            <FilterSwitch title="Vegan" state={isVegan} onChange={newValue => setIsVegan(newValue)} />
            <FilterSwitch title="Vegetarian" state={isVegetarian} onChange={newValue => setIsVegetarian(newValue)} />
        </View>
    );
};

FiltersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Filter Meals',
        headerLeft: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName='ios-menu' onPress={() => {
                navData.navigation.toggleDrawer();
            }} />
        </HeaderButtons>),
        headerRight: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Save" iconName='ios-save' onPress={navData.navigation.getParam('save')} />
        </HeaderButtons>)
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        margin: 20,
        textAlign:'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical:15
    }

});

export default FiltersScreen;