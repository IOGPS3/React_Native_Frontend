import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EmployeeList from './EmployeeList';
import EmployeeDetails from './EmployeeDetails';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';

const Stack = createStackNavigator();

const SearchCoworker = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="EmployeeList"
                component={EmployeeList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EmployeeDetails"
                component={EmployeeDetails}
                options={{
                    headerBackTitleVisible: false,
                    headerTitle: '',
                    headerBackImage: () => (
                        <View style={{ marginLeft: 12 }}>
                            <MaterialIcons name='arrow-back' size={40} color='black' />
                        </View>
                    ),
                }}
            />
        </Stack.Navigator>
    );
};

export default SearchCoworker;