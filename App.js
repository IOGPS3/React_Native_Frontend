import React from 'react';
import { View, StyleSheet } from 'react-native';
import EmployeeList from './components/EmployeeList';
//import FavoriteList from './components/FavoriteList';


const App = () => {
    return (
        <View style={styles.container}>
            <EmployeeList />
            {/*<FavoriteList />*/}
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
