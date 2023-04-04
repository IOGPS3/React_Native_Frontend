import React, { useState } from 'react';
import { SectionList, StyleSheet, Text, TouchableOpacity, View, Modal, Pressable, TextInput } from 'react-native';

//import styling
import { styles } from '../Styles/components/EmployeeListStyle';

/**
 * A component that displays a list of employees and allows the user to view their details.
 *
 * @returns {JSX.Element} - The EmployeeList component.
 */
const EmployeeList = () => {
    // Define the initial employee data, selected employee, modal visibility, and search query using the `useState` hook.
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
        { name: 'Hank', location: 'Floor 5' },
    ]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [modalVisible, setModalVisible] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    /**
     * Groups an array of employees by the first letter of their first name.
     *
     * @param {array} employeeData - An array of employee objects.
     *
     * @returns {object} - An object containing employees grouped by the first letter of their first name.
     */
    const employeesByLetter = employeeData.reduce((acc, employee) => {
        const firstLetter = employee.name.charAt(0);
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(employee);
        return acc;
    }, {});

    /**
    * Filters the employeeData array based on the searchQuery.
    *
    * @param {array} employeeData - The array of employee objects to filter.
    * @param {string} searchQuery - The query string to filter the employeeData array by.
    * @returns {array} The filtered array of employee objects that match the search query.
    */
    const filteredEmployees = employeeData.filter(employee => {
        if (searchQuery === '') {
            // If the searchQuery is an empty string, return an empty array.
            return 0;
        } else {
            // If the searchQuery is not empty, return any employees whose name contains the searchQuery.
            return employee.name.toLowerCase().includes(searchQuery.toLowerCase());
        }
    });

    /**
   * Builds an array of sections for a list of employees, sorted alphabetically by first letter.
   * Each section contains a title letter and an array of employees whose first name starts with that letter.
   *
   * @param {object} employeesByLetter - An object containing employees grouped by the first letter of their  first name.
   *
   * @returns {void} 
   */
    const sections = Object.keys(employeesByLetter)
        .sort()
        .map(letter => ({
            title: letter,
            data: employeesByLetter[letter],
        }));

    /**
     * Sets the selected employee and displays the employee details modal.
     *
     * @param {object} employee - The employee object to select.
     *
     * @returns {void}
     */
    const handleEmployeePress = employee => {
        setSelectedEmployee(employee);
        setModalVisible(true);
    };

    /**
   * This component displays a list of employees with the ability to search for them and view details about a selected employee.
   * 
   * Props:
   * - employees: an array of employee objects with properties "name" and "location"
   * - onEmployeePress: a function that takes an employee object as an argument and is called when an employee is selected
   * 
   * State:
   * - selectedEmployee: the employee object that is currently selected
   * - searchQuery: the current search query entered by the user
   * - modalVisible: a boolean that determines whether the modal for the selected employee is visible or not
   * 
   * @returns a View component containing a TextInput for searching, a SectionList for displaying the employee list, and a modal for displaying employee details.
   */
    return (
        <View style={styles.container}>
            {selectedEmployee && (
                <View style={styles.selectedEmployeeContainer}>
                    <Text style={styles.selectedEmployeeName}>
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
                                    <Text style={styles.modalText}>{selectedEmployee.name}</Text>
                                    <Text style={styles.modalText}>{selectedEmployee.location}</Text>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => setModalVisible(!modalVisible)}>
                                        <Text style={styles.textStyle}>Hide Modal</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                    </Text>
                </View>
            )}
            {/* TextInput component to display the searchbar*/}
            <TextInput
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={query => setSearchQuery(query)}
                placeholder="Search employees"
            />
            {/* SectionList component to display the employee list */}
            <SectionList
                sections={
                    searchQuery
                        ? [{ data: filteredEmployees }]
                        : sections
                }
                keyExtractor={(item, index) => item.name + index}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleEmployeePress(item)}>
                        <Text style={styles.item}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}
                extraData={searchQuery}
            />
        </View>
    );
};

export default EmployeeList;
