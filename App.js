import React from 'react';
import { View, StyleSheet } from 'react-native';
import EmployeeList from './components/EmployeeList';
import MeetingSlider from './components/MeetingSlider';


const App = () => {
    return (
        <View style={styles.container}>
            <MeetingSlider />
            <EmployeeList />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30, // Add some padding to the top of the screen
    },
});

export default App;