import React, { useState } from 'react';
import { SectionList, StyleSheet, Text, TouchableOpacity, View, Modal, Pressable } from 'react-native';

//added for the <Icon /> element
//install with command:
//npm install @rneui/themed @rneui/base
import { Icon } from '@rneui/base'; 

//import styling
import { styles } from './Styling/AppStyle';

//list
const EmployeeList = () => {
  const [employeeData] = useState([
    { name: 'Alice', location: 'Floor 2' },
    { name: 'Bob', location: 'Floor 1' },
    { name: 'Charlie', location: 'Floor 2' },
    { name: 'David', location: 'Home' },
    { name: 'Eve', location: 'Floor 5' },
    { name: 'Frank', location: 'Floor 2' },
    { name: 'Grace', location: 'Floor 1' },
    { name: 'Henry', location: 'Floor 3' },
    { name: 'Isabella', location: 'Floor 2' },
    { name: 'Jack', location: 'Home' },
    { name: 'Kate', location: 'Floor 4' },
    { name: 'Luke', location: 'Home' },
  ]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [modalVisible, setModalVisible] = useState(true);

  const employeesByLetter = employeeData.reduce((acc, employee) => {
    const firstLetter = employee.name.charAt(0);
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(employee);
    return acc;
  }, {});

  const sections = Object.keys(employeesByLetter)
    .sort()
    .map(letter => ({
      title: letter,
      data: employeesByLetter[letter],
    }));

  const handleEmployeePress = employee => {
    const selectedEmployeeString = `${employee.name}, ${employee.location}`;
    setSelectedEmployee(employee);
    setModalVisible(true);
  };

  return (
  <View style={styles.container}>
  {selectedEmployee && (
      <View style={styles.selectedEmployeeContainer}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style = {{width: 300, Height: 300, flexDirection: 'row'}}>
                    <Icon reverse name='arrow-back' onPress={() => setModalVisible(!modalVisible)} />
                    <Text style={styles.modalText}>{selectedEmployee.name}</Text>
                    <Icon name='star' style={{marginLeft: 30}} />
                </View>
                <Text style={styles.modalText}>{selectedEmployee.location}</Text>
              </View>
            </View>
          </Modal>
      </View>
    )}
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => item.name + index}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleEmployeePress(item)}>
          <Text style={styles.item}>{item.name}</Text>
        </TouchableOpacity>
      )}  
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
  </View>
);
};

export default EmployeeList;
