import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
//import { Platform } from '../node_modules/react-native/types/index';

export const RegisterForPushNotification = async () => {
    let token;

    let devOptions = true;

    if (devOptions) {
        console.log("Platform = " + Platform.OS)
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.HIGH,
            vibrationPattern: [250, 0, 250, 0, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (devOptions) {
        console.log("Platform setnotifications has been setup")
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (devOptions) {
        console.log("Status checker = " + finalStatus)
    }

    //if (existingStatus !== 'granted') {
    //    console.log("requesting permission")
    //    const { status } = await Notifications.requestPermissionsAsync();
    //    finalStatus = status;

    //    //try {
            
    //    //}
    //    //catch (error) {
    //    //    console.error(error);
    //    //    console.log("Error = " + error)
    //    //}
    //}
    //if (finalStatus !== 'granted') {
    //    alert('Failed to get push token for push notification!');
    //    return;
    //}

    console.log("permission's been granted")
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("recipent ExponentPushToken = " + token)

    return token;
}

export const SendPushNotification = async (expoPushToken) => {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}

export const SendCustomPush = async (expoPushToken, titleVar, bodyVar, dataVar) => {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: titleVar,
        body: bodyVar,
        data: dataVar,
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}