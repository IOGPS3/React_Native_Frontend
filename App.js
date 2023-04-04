import React from 'react';
import { View } from 'react-native';
import EmployeeList from './components/employeeList';
import MeetingSlider from './components/meetingSlider';
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