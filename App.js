import React from 'react';
import { View, StyleSheet } from 'react-native';
import EmployeeList from './components/EmployeeList';


const App = () => {
    return (
        <View style={styles.container}>
            <EmployeeList />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
});

export default App;
