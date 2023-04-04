import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { styles } from '../Styling/components/MeetingSliderStyle';
import { getDatabase, ref, onValue, off, update } from 'firebase/database';


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

    const updateMeetingStatus = (value) => {
        const status = value === 1 ? 'inMeeting' : 'available';
        const database = getDatabase();
        const userRef = ref(database, `users/${userId}`);
        update(userRef, { meetingStatus: status });
        setSliderValue(value);
    };

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