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

//import { getAuth } from 'firebase/auth';
//import auth from '@react-native-firebase/auth';
import { getDatabase, ref, onValue, set } from 'firebase/database';
//import { bcrypt } from "bcrypt.js"; 
import { MD5 } from 'crypto-es/lib/md5.js';

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
    //Modal and Notification variables
    const [isModalVisible, setModalVisible] = useState(false);
    const [notificationData, setNotificationData] = useState(null);
    const [text, onChangeText] = React.useState('Lets meet at ...');
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    //Login variables
    const database = getDatabase();
    const usersRef = ref(database, 'users');
    const [employeeData, setEmployeeData] = useState([]);

    const [user, setUser] = useState();
    const [email, onChangeEmail] = useState();
    const [name, onChangeName] = useState();
    const [password, onChangePassword] = useState();

    //START NOTIFICATION data
    useEffect(() => {
        RegisterForPushNotification().then(token => {
            setExpoPushToken(token);
            //set the ownDeviceToken as a accessable variable for entire project
            global.ownDeviceToken = token;
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

    const handlePress = async (receivedToken) => {
        //change to custom message and read token from db or whatever
        let senderName = "OwnDevice";

        //console.warn("TOTOKEN is " + receivedTokenx);

        let token = receivedToken;
        let title = "Response from " + senderName;
        let body = text;
        let data = { senderID: senderName, receivedToken: expoPushToken, body: text, messageType: "ResponseToPing" };

        if (token == null) {
            console.warn("Receiving token is still not set here in app.js, (please paste own token here for now to test)");
        }

        //await SendPushNotification(token);
        await SendCustomPush(token, title, body, data);

        closeModal();
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
                        style={[styles.ModalButton]}
                        onPress={() => handlePress(notificationData.receivedToken)}>
                        <Text style={styles.textStyle}>Send</Text>
                    </Pressable>
                </View>
            );
        }

        return null;
    };

    //END NOTIFICATION



    //START LOGIN

    //const onAuthStateChanged = (user) => {
    //    setUser(user);
    //    console.log("User: " + user);
    //}

    useEffect(() => {
        // Set up a listener for changes in the 'users' node
        // The listener will be called with a snapshot of the data whenever it changes
        const unsubscribe = onValue(usersRef, (snapshot) => {
            const users = snapshot.val();

            // Updated formatting of user data to include the user key as 'id'
            const formattedUsers = Object.entries(users || {}).map(([id, userData]) => ({
                id,
                ...userData,
            }));

            // Update the employeeData state with the fetched data
            setEmployeeData(formattedUsers);
        });

        // Clean up the listener when the component is unmounted
        return () => {
            unsubscribe();
        };
    }, [])

    const handleLogin = () => {
        //check list
        var temp = false;

        for (const item of employeeData) {
            //console.log(item);

            //Password go encrypt
            const encryptedPass = MD5(password).toString();
            //console.log(encryptedPass);

            //check login data
            if (item.Email === email && item.Password == encryptedPass) {
                //Save the data(or partially if only unique is needed)
                setUser(item)

                temp = true;

                //stop the list
                //console.warn("User has been found");

                //check if there are favorites and if not set it to null
                var favorites = item.Favorites;
                if (!favorites) {
                    favorites = null;
                }

                //update the user's NotificationToken in the database
                const updateLink = ref(database, 'users/' + item.id);
                console.log(updateLink);
                set(updateLink, {
                    Email: item.Email,
                    Favorites: favorites,
                    Location: item.Location,
                    MeetingStatus: item.MeetingStatus,
                    Name: item.Name,
                    NotificationToken: expoPushToken,
                    Password: item.Password
                }).then(() => {
                    console.log("YAHOO UPDATED the token");
                }).catch((error) => {
                    console.error("Error updating the data", error);
                });
                //console.log(updateLink);

                break;
            }
        }

        //handle
        //setUser(true);

        //check if user is null return an error about login incorrect
        if (!temp) {
            console.error("Login was incorrect, please try again with the CORRECT data");
        }
    }

    const handleRegister = () => {
        const location = "Home";
        const meetingStatus = "Available";
        const favorites = null;

        const encryptedPass = MD5(password).toString();

        //get the unique code for the new employee
        var uniqueCode = "tempCode";
        var foundAvailableCode = false;

        //counting numbers
        const listAmount = employeeData.length;
        var counter = 0;

        console.log("Amount of list is: " + listAmount);

        //loop through the list for available code
        for (const item of employeeData) {
            const takenCode = item.id;
            const tempCode = "user" + counter;

            //check the takencode with the counter
            if (takenCode != tempCode) {
                uniqueCode = tempCode;
                foundAvailableCode = true;

                break;
            }

            //increment
            counter = counter + 1;
        }

        if (!foundAvailableCode) {
            //get the latest row number
            uniqueCode = "user" + listAmount;
        }

        //get the link to the users with the unique code link
        const updateLink = ref(database, 'users/' + uniqueCode);

        //data for the new user
        const registerUserData = {
            Email: email,
            Favorites: favorites,
            Location: location,
            MeetingStatus: meetingStatus,
            Name: name,
            NotificationToken: expoPushToken,
            Password: encryptedPass
        };

        console.log(registerUserData);

        //set the user
        set(updateLink, registerUserData).then(() => {
            console.log("Registered");
        }).catch((error) => {
            console.error("Error updating the data", error);
        });

        //console.log(updateLink);

        closeModal();

        //set the user
        setUser(registerUserData);

        //go brbrr
    }

    const renderRegisterModalContent = () => {
            return (
                <View style={{ padding: 20 }}>
                    <Button title="Go Back" onPress={closeModal} />
                    <Text style={styles.font}></Text>
                    <Text style={styles.font}>Email:</Text>
                    <TextInput style={styles.input}
                        onChangeText={onChangeEmail}
                        value={email} />
                    <Text style={styles.font}>Password:</Text>
                    <TextInput style={styles.input}
                        onChangeText={onChangePassword}
                        value={password}
                        secureTextEntry={true} />
                    <Text style={styles.font}>Name:</Text>
                    <TextInput style={styles.input}
                        onChangeText={onChangeName}
                        value={name} />
                    <Pressable
                        style={[styles.ModalButton]}
                        onPress={() => handleRegister()}>
                        <Text style={styles.fontAligned}>Send</Text>
                    </Pressable>
                </View>
            );
    };


    const logout = () => {
        setUser(null);
    }

    const Logout = () => {
        return (
            <View style={styles.container}>
                <Text style={styles.font}>Are you sure?</Text>

                <Pressable
                    onPress={() => logout()}
                    style={styles.ModalButton}>
                    <Text style={styles.fontAligned}>Yes</Text>
                </Pressable>

                <Pressable
                    onPress={() => Home()}
                    style={styles.ModalButton}>
                    <Text style={styles.fontAligned}>No</Text>
                </Pressable>
            </View>
        );        
    }

    //if (initializing) return null;

    if (!user) {
        return (
            <View style={styles.container}>
                <Text style={styles.font}></Text>
                <Text style={styles.font}>Email:</Text>
                <TextInput style={styles.input}
                    onChangeText={onChangeEmail}
                    value={email} />
                <Text style={styles.font}>Password:</Text>
                <TextInput style={styles.input}
                    onChangeText={onChangePassword}
                    value={password}
                    secureTextEntry={true}/>
                <Pressable
                    style={[styles.ModalButton]}
                    onPress={() => handleLogin()}>
                    <Text style={styles.fontAligned}>Login</Text>
                </Pressable>
                <Pressable
                    style={[styles.RegisterButton]}
                    onPress={() => setModalVisible(true)}>
                    <Text style={styles.fontAligned}>Register</Text>
                </Pressable>

                <Modal visible={isModalVisible} animationType="slide">
                    <View style={{ flex: 1 }}>
                        {renderRegisterModalContent()}
                    </View>
                </Modal>
            </View>
        )  
    }
    else {
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
    }

    //END LOGIN
};

export default App;
