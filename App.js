import React from 'react';
import { View } from 'react-native';
import EmployeeList from './components/EmployeeList';
import MeetingSlider from './components/meetingSlider';
import { styles } from './Styling/AppStyle';
import { useEffect } from 'react';
import { RegisterForPushNotification } from './components/Notification';


const App = () => {
    useEffect(() => {
        RegisterForPushNotification()
    });
    return (
        <View style={styles.container}>
            <MeetingSlider />
            <EmployeeList />
        </View>
    );
};


export default App;