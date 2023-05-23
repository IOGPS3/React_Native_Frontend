import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Text, Modal, Button, TextInput, Pressable } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import SearchCoworker from './components/SearchCoworker/SearchCoworker';
import MeetingToggle from './components/MeetingToggle';
import { styles } from './Styling/AppStyle';
import logo from './assets/iO-logo.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RegisterForPushNotification } from './components/Notification';

import * as Notifications from 'expo-notifications';
//import RespondPing from './components/RespondPing';
import { SendCustomPush } from './components/Notification';
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false
    }),
});

const Home = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.font}>Welcome back</Text>

            <Text style={styles.font}>Currently working from</Text>

            <View style={styles.rowContainer}>
                <Text style={styles.meetingFont}>Meeting</Text>
                <View style={styles.toggleContainer}>
                    <MeetingToggle />
                </View>
            </View>

            <Text style={styles.font}>Co-Workers</Text>
        </View>
    );
};

const Settings = () => {
    return <View />;
};

const Logout = () => {
    return <View />;
};

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
    const iconSize = 32; 
    const fontSize = 18; 
    const fontColor = 'black';
    const iconColor = 'black';

    return (
        <View style={{ flex: 1, paddingTop: 100 }}>
            <DrawerItem
                label="Home"
                labelStyle={{ fontSize, color: fontColor }}
                icon={({ color }) => <MaterialIcons name="home" size={iconSize} color={iconColor} />}
                onPress={() => props.navigation.navigate('Home')}
            />
            <DrawerItem
                label="Search Coworker"
                labelStyle={{ fontSize, color: fontColor }}
                icon={({ color }) => <MaterialIcons name="search" size={iconSize} color={iconColor} />}
                onPress={() => props.navigation.navigate('SearchCoworker')}
            />
            <DrawerItem
                label="Settings"
                labelStyle={{ fontSize, color: fontColor }}
                icon={({ color }) => <MaterialIcons name="settings" size={iconSize} color={iconColor} />}
                onPress={() => props.navigation.navigate('Settings')}
            />
            <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 30 }}>
                <DrawerItem
                    label="Logout"
                    labelStyle={{ fontSize, color: fontColor }}
                    icon={({ color }) => <MaterialIcons name="logout" size={iconSize} color={iconColor} />}
                    onPress={() => props.navigation.navigate('Logout')}
                />
            </View>
        </View>
    );
};

const CustomHeader = ({ navigation }) => {
    return (
        <SafeAreaView edges={['top']} style={{ backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                <MaterialIcons
                    name="menu"
                    size={45} 
                    onPress={() => navigation.toggleDrawer()}
                />
                <Text>
                    <Image source={logo} style={{ width: 100, height: 40 }} resizeMode="contain" />
                </Text>
            </View>
        </SafeAreaView>
    );
};

const App = () => {
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
        let token = null;
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
            <NavigationContainer>
                <Drawer.Navigator
                    drawerContent={(props) => <CustomDrawerContent {...props} />}
                    screenOptions={{ header: (props) => <CustomHeader {...props} /> }}
                >
                    <Drawer.Screen name="Home" component={Home} />
                    <Drawer.Screen name="SearchCoworker" component={SearchCoworker} />
                    <Drawer.Screen name="Settings" component={Settings} />
                    <Drawer.Screen name="Logout" component={Logout} />
                </Drawer.Navigator>
            </NavigationContainer>

            <Modal visible={isModalVisible} animationType="slide">
                <View style={{ flex: 1 }}>
                    {renderModalContent()}
                </View>
            </Modal>
        </View>
    );
};

export default App;
