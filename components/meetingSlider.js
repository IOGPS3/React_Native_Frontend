import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';


const MeetingSlider = () => {
    const [sliderValue, setSliderValue] = useState(0);

    return (
        <View style={stylesSlider.container}>
            <Text style={stylesSlider.text}>{sliderValue === 0 ? 'In meeting' : 'Available'}</Text>
            <Slider
                style={stylesSlider.slider}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                step={1}
                onValueChange={value => setSliderValue(value)}
            />
        </View>
    );
};
const stylesSlider = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slider: {
        width: 200,
        height: 40,
    },
    text: {
        fontSize: 20,
        marginBottom: 20,
    },
});



export default MeetingSlider;