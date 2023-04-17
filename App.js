import React from 'react';
import { View } from 'react-native';
import EmployeeList from './components/EmployeeList';
import MeetingSlider from './components/MeetingSlider';
import { styles } from './Styling/AppStyle';


const App = () => {
    return (
        <View style={styles.container}>
            <MeetingSlider />
            <EmployeeList />
        </View>
    );
};


export default App;