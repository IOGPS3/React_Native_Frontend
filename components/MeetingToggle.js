import React, { useState, useEffect } from 'react';
import { View, Text, Switch, Alert } from 'react-native';
import { styles } from '../Styling/components/MeetingSliderStyle';
import { getDatabase, ref, onValue, off } from 'firebase/database';

const API_BASE_URL = 'http://localhost:3000'; // Replace with the API's base URL

const MeetingToggle = () => {
    const [toggleValue, setToggleValue] = useState(false);
    const errorHandling = 'Error';
    const userId = 'user1'; // Replace with the desired user ID

    useEffect(() => {
        const database = getDatabase();
        const userRef = ref(database, `users/${userId}`);
        const onValueChange = snapshot => {
            const user = snapshot.val();
            setToggleValue(user.MeetingStatus === 'inMeeting');
        };

        onValue(userRef, onValueChange);

        return () => {
            off(userRef, 'value', onValueChange);
        };
    }, [userId]);

    // This code does not work. No api present at this moment. This route should be updated.
    const updateMeetingStatus = (value) => {
        const status = value ? 'inMeeting' : 'available';
        fetch(`${API_BASE_URL}/api/users/${userId}/meeting-status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ meetingStatus: status }),
        })
            //.then((response) => {
            //    if (response.ok) {
            //        setToggleValue(value);
            //    } else {

            //    }
            //})
            .then(setToggleValue(value)) // this line should be deleted when the API is finished
            .catch(error => {
                Alert.alert('Error', 'Failed to update meeting status. Please try again.', [{ text: 'OK' }]);
                //possibly check if there is a better way to do the following piece of code
                setToggleValue(!value);
                throw new Error('Bad request');
            });
    };

    const Completing = (value) => {
        if (errorHandling != "Error") {
            //DONT TOUCH
            setToggleValue(value);
        }
        else {

        }
    };

    return (
        <View style={styles.container}>
            {/*<Text style={styles.text}>{toggleValue ? 'In meeting' : 'Available'}</Text>*/}
            <Switch
                style={styles.toggle}
                trackColor={{ false: "#00FF00", true: "#FF0000" }}
                thumbColor={"#FFFFFF"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={updateMeetingStatus}
                value={toggleValue}
            />
        </View>
    );
};

export default MeetingToggle;
