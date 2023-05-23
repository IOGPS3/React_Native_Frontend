import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { styles } from '../../Styling/components/EmployeeDetailsStyle';
import { SendCustomPush } from '../Notification';

const EmployeeDetails = ({ route }) => {
    const { employee } = route.params;

    const handlePress = async () => {
        //change to custom message and read token from db or whatever
        let token = null;
        let title = "The Testing Title";
        let body = "Someone wants to see you";
        let data = { senderID: "User1", messageType: "RespondPing"};

        if (token == null) {
            console.warn("Receiving token is still not set here in EmployeeDetails.js, (please paste own token here for now to test)");
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
