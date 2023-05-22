import React, { useState } from 'react';
import { View, Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import SearchCoworker from './components/SearchCoworker/SearchCoworker';
import MeetingToggle from './components/MeetingToggle';
import { styles } from './Styling/AppStyle';
import logo from './assets/iO-logo.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RegisterForPushNotification } from './components/Notification';

import * as Notifications from 'expo-notifications';
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
    const [expoPushToken, setExpoPushToken] = useState('');

    useEffect(() => {
        RegisterForPushNotification().then(token => {
            setExpoPushToken(token);
            console.log(token);
        })
    }, []);

    return (
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
    );
};

export default App;
