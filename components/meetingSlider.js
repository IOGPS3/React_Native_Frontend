import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { styles } from '../Styling/components/MeetingSliderStyle';
import { getDatabase, ref, onValue, off } from 'firebase/database';

//const API_BASE_URL = 'http://localhost:3000'; // Replace with the API's base URL

const MeetingSlider = () => {
    const [sliderValue, setSliderValue] = useState(0);
    const userId = 'user1'; // Replace with the desired user ID

    useEffect(() => {
        const database = getDatabase();
        const userRef = ref(database, `users/${userId}`);
        const onValueChange = snapshot => {
            const user = snapshot.val();
            if (user.meetingStatus === 'inMeeting') {
                setSliderValue(1);
            } else {
                setSliderValue(0);
            }
        };

        onValue(userRef, onValueChange);

        return () => {
            off(userRef, 'value', onValueChange);
        };
    }, [userId]);


    // This code does not work. No api present at this moment. This route should be updated.
    //const updateMeetingStatus = (value) => {
    //    const status = value === 1 ? 'inMeeting' : 'available';
    //    fetch(`${API_BASE_URL}/api/users/${userId}/meeting-status`, {
    //        method: 'PUT',
    //        headers: {
    //            'Content-Type': 'application/json',
    //        },
    //        body: JSON.stringify({ meetingStatus: status }),
    //    })
    //        .then(() => {
    //            setSliderValue(value);
    //        })
    //        .catch(error => {
    //            console.error('Error updating user data:', error);
    //        });
    //};

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{sliderValue === 1 ? 'In meeting' : 'Available'}</Text>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FF0000"
                maximumTrackTintColor="#00FF00"
                step={1}
                value={sliderValue}
                onValueChange={updateMeetingStatus}
            />
        </View>
    );
};

export default MeetingSlider;