import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import EmployeeList from './components/EmployeeList';
import MeetingSlider from './components/meetingSlider';
import { styles } from './Styling/AppStyle';
import { RegisterForPushNotification } from './components/Notification';

import * as Notifications from 'expo-notifications';
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false      
    }),
});


const App = () => {
    const [expoPushToken, setExpoPushToken] = useState('');

    useEffect(() => {
        RegisterForPushNotification().then(token => {
            setExpoPushToken(token);
            console.log(token);
        })
    }, []);
    return (
        <View style={styles.container}>
            <MeetingSlider />
            <EmployeeList />
        </View>
    );
};


export default App;