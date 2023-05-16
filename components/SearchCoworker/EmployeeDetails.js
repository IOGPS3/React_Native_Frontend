import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styles } from '../../Styling/components/EmployeeDetailsStyle';

const EmployeeDetails = ({ route }) => {
    const { employee } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{employee.Name}</Text>
            <Text style={styles.text}>{employee.Location}</Text>
            <Text style={styles.text}>{employee.MeetingStatus === 'available' ? 'Available' : 'In a meeting'}</Text>
        </View>
    );
};

export default EmployeeDetails;
