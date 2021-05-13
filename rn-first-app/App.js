import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
    
    const [courseGoals, setCourseGoals] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
   
    const onAddClickHandler = (enteredGoal) => {
        setCourseGoals(() => [...courseGoals, { key: Math.random().toString(), value: enteredGoal }]);
        //We can set without the value without the anonymous function syntax.
        //But react native sometimes does not update the value of the state properly hence we should use
        //Anonymouse function to make sure the state gets updated successfully everytime.
        setModalVisible(() => false);
       
    };

    const onDeleteGoalItemHandler = goalId => {
        setCourseGoals(() => {
            return courseGoals.filter((goal) =>  goal.key !== goalId );

        });
    }

    const onAddNewGoalHandler = () => {
        setModalVisible(() => true);
    }

    const onCancelNewGoalHandler = () => {
        setModalVisible(() => false);
    }



//ScrollView unnecessarily loads all the elements into the viewable area, this could cause performance issue
    //Hence use FlatList --> This will load the items within the viewable area and it will not load all the items at once
    //It will load only items when you scroll
    return (
        <View style={styles.screen}>
            <Button title="Add new Goal" onPress={onAddNewGoalHandler} />
            <GoalInput onAddClick={onAddClickHandler} onCancelClick={onCancelNewGoalHandler} visible={isModalVisible} />
            <FlatList data={courseGoals} renderItem={
                (goal) =>
                    <GoalItem goalItem={goal} onGoalDelete={onDeleteGoalItemHandler} />
            }>
                
            </FlatList>
    </View>
  );
}

//In future you might get optimization if you use stylesheet object. Which might not get when using inline styles.
//Using these objects your JSX code will not contain the inline styles and it will be leaner now.
//We can add more sytles to the view hence I am using the Views to style the things
const styles = StyleSheet.create({
    screen: {
        padding:50
    },
  
   
    
});