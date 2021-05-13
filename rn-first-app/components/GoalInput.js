import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Modal } from 'react-native';


const GoalInput = props => {
    const [enteredGoal, setEnteredGoal] = useState('');

    const enteredGoalHandler = (enteredText) => {
        //console.log(enteredText);
        setEnteredGoal(enteredText);
    };

    const onAddGoalHandler = () => {
        props.onAddClick(enteredGoal);
        setEnteredGoal('');
    }

    //You cannot assign styles to directly to the button component
    return (
        <Modal visible={props.visible} animationType="slide" >
        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Course Goal"
                style={styles.textInput}
                onChangeText={enteredGoalHandler}
                    value={enteredGoal.value} />
                <View style={styles.buttonAlignment}>
                    <View style={styles.buttonStyle}><Button title="Cancel" color="red" onPress={() => { props.onCancelClick() }} /></View>
                    <View style={styles.buttonStyle}><Button title="ADD" onPress={onAddGoalHandler} /></View>
                </View>
            </View>
        </Modal>
        );
}

const styles = StyleSheet.create({
    inputContainer: { justifyContent: 'center', alignItems: 'center', flex: 1 },
    textInput: { width: '80%', borderColor: 'black', borderWidth: 1, padding: 10, marginBottom: 10 },
    buttonAlignment: { flexDirection: 'row', justifyContent: 'space-between', width: '60%' },
    buttonStyle: { width:'30%' }
});

export default GoalInput;