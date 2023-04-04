import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { styles } from '../Styling/components/MeetingSliderStyle';


const MeetingSlider = () => {
    const [sliderValue, setSliderValue] = useState(0);

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
                onValueChange={value => setSliderValue(value)}
            />
        </View>
    );
};



export default MeetingSlider;