import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Modal, Button, TextInput, Pressable } from 'react-native';
import { styles } from '../Styling/AppStyle';
import { RegisterForPushNotification } from './Notification';

import * as Notifications from 'expo-notifications';
//import RespondPing from './components/RespondPing';
import { SendCustomPush } from './Notification';
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false
    }),
});

const NotificationModal = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [notificationData, setNotificationData] = useState(null);
    const [text, onChangeText] = React.useState('Lets meet at ...');

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        RegisterForPushNotification().then(token => {
            setExpoPushToken(token);
            //console.log(token);
        });

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            notificationCommonHandler(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification 
        // (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            notificationCommonHandler(response.notification);
            notificationNavigationHandler(response.notification.request.content);
        });

        // The listeners must be clear on app unmount
        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);

    const notificationCommonHandler = (notification) => {
        //Receive event
        //console.log('A notification has been received', notification)
        console.log("A notification has Arrived")
    }

    const notificationNavigationHandler = ({ data }) => {
        //Click event
        console.log('Notification has been clicked', data)

        //navigate to the respondPing with the data

        setNotificationData(data);
        setModalVisible(true);
    }

    const handlePress = async () => {
        //change to custom message and read token from db or whatever
        let token = "ExponentPushToken[kPHezhNKpQJihMQ7Yn1EPY]";
        let title = "Response";
        let body = text;
        let data = { senderID: "User2", messageType: "ResponseToPing" };

        if (token == null) {
            console.warn("Receiving token is still not set here in app.js, (please paste own token here for now to test)");
        }

        //await SendPushNotification(token);
        await SendCustomPush(token, title, body, data)
    };

    const closeModal = () => {
        setModalVisible(false);
        setNotificationData(null);
    };

    const renderModalContent = () => {
        if (notificationData) {
            return (
                <View style={{ padding: 20 }}>
                    <Button title="Close" onPress={closeModal} />
                    <Text>Notification Data:</Text>
                    <Text>{notificationData.senderID}</Text>
                    <Text>{notificationData.body}</Text>

                    <Text>Your Response</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={text}
                    />

                    <Pressable
                        style={[styles.button]}
                        onPress={handlePress}>
                        <Text style={styles.textStyle}>Send</Text>
                    </Pressable>
                </View>
            );
        }

        return null;
    };

    return (
        <View style={{ flex: 1 }}>
            <Modal visible={isModalVisible} animationType="slide">
                <View style={{ flex: 1 }}>
                    {renderModalContent()}
                </View>
            </Modal>
        </View>
    );
};

export default NotificationModal;
