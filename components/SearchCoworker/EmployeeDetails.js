import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { styles } from '../../Styling/components/EmployeeDetailsStyle';
import { SendCustomPush } from '../Notification';

const EmployeeDetails = ({ route }) => {
    const { employee } = route.params;

    const handlePress = async () => {
        //change to custom message and read token from db or whatever
        let ownToken = global.ownDeviceToken;
        //console.warn("Global token = " + ownToken);

        let token = employee.NotificationToken; //"ExponentPushToken[kPHezhNKpQJihMQ7Yn1EPY]"
        let title = "Hello there";
        let body = "Someone wants to see you";
        let data = { senderID: "LogedInUserName", receivedToken: ownToken, body: "Let's meet up", messageType: "RespondPing" };

        if (token == null || token == "null") {
            console.error("NotificationToken from employee is not connected to a mobile device token");
        }

        //await SendPushNotification(token);
        await SendCustomPush(token, title, body, data)
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{employee.Name}</Text>
            <Text style={styles.text}>{employee.Location}</Text>
            <Text style={styles.text}>{employee.MeetingStatus === 'available' ? 'Available' : 'In a meeting'}</Text>
            <Pressable
                style={[styles.button]}
                onPress={handlePress}>
                <Text style={styles.textStyle}>Ping</Text>
            </Pressable>
        </View>
    );
};

export default EmployeeDetails;
