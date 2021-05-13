import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const GoalItem = props => {
    return (
        <TouchableOpacity onPress={props.onGoalDelete.bind(this, props.goalItem.item.key)}>
        <View style={styles.listItem}>
        <Text>{props.goalItem.item.value}</Text>
        </View>
        </TouchableOpacity>);
}

const styles = StyleSheet.create({
    listItem: { borderColor: 'black', borderWidth: 1, padding: 10, marginVertical: 10, backgroundColor: '#ccc' }
});

export default GoalItem;