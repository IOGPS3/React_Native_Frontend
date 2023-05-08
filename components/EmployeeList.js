import React, { useEffect, useState } from 'react';
import { SectionList, StyleSheet, Text, TouchableOpacity, View, Modal, Pressable, TextInput } from 'react-native';
import { app } from '../firebaseConfig';
import { getDatabase, ref, onValue } from 'firebase/database';

//added for the <Icon /> element
//install with command:
//npm install @rneui/themed @rneui/base
import { Icon } from '@rneui/base';
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons for search and cross icons

//import styling
import { styles } from '../Styling/components/EmployeeListStyle';

/**
 * A component that displays a list of employees and allows the user to view their details.
 *
 * @returns {JSX.Element} - The EmployeeList component.
 */

const EmployeeList = () => {
    // State variables for employee data, selected employee, modal visibility, and search query
    const [employeeData, setEmployeeData] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch data from Firebase Real-Time Database and update the employeeData state
    useEffect(() => {
        // Get a reference to the Firebase Real-Time Database
        const database = getDatabase();

        // Create a reference to the 'users' node
        const usersRef = ref(database, 'users');

        // Set up a listener for changes in the 'users' node
        // The listener will be called with a snapshot of the data whenever it changes
        const unsubscribe = onValue(usersRef, (snapshot) => {
            // Extract the user data from the snapshot
            const users = snapshot.val();

            // Updated formatting of user data to include the user key as 'id'
            const formattedUsers = Object.entries(users || {}).map(([id, userData]) => ({
                id,
                ...userData,
            }));

            // Update the employeeData state with the fetched data
            setEmployeeData(formattedUsers);
        });

        // Clean up the listener when the component is unmounted
        return () => {
            unsubscribe();
        };
    }, []);




    /**
     * Groups an array of employees by the first letter of their first name.
     *
     * @param {array} employeeData - An array of employee objects.
     *
     * @returns {object} - An object containing employees grouped by the first letter of their first name.
     */
    const employeesByLetter = employeeData.reduce((acc, employee) => {
        const firstLetter = employee.Name.charAt(0);
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(employee);
        return acc;
    }, {});

    // Update filtering logic to filter employees within each group in employeesByLetter
    const filteredEmployeesByLetter = Object.entries(employeesByLetter).reduce((acc, [letter, employees]) => {
        acc[letter] = employees.filter(employee =>
            employee.Name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return acc;
    }, {});


    /**
   * Builds an array of sections for a list of employees, sorted alphabetically by first letter.
   * Each section contains a title letter and an array of employees whose first name starts with that letter.
   *
   * @param {object} employeesByLetter - An object containing employees grouped by the first letter of their  first name.
   *
   * @returns {void} 
   */
    const sections = Object.keys(filteredEmployeesByLetter)
        .sort()
        .map(letter => ({
            title: letter,
            data: filteredEmployeesByLetter[letter],
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
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>{selectedEmployee.Name}</Text>
                                <Text style={styles.modalText}>{selectedEmployee.Location}</Text>
                                <Text style={styles.modalText}>{selectedEmployee.MeetingStatus === 'available' ? 'Available' : 'In a meeting'}</Text>
                                <Pressable
                                    style={[styles.button, styles.buttonHeyThere]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.textStyle}>HeyThere</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>

                </View>
            )}
            {/* TextInput component to display the searchbar*/}
            <View style={styles.centered}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="search" size={24} color="black" style={{ position: 'absolute', left: 20 }} />
                    <TextInput
                        style={styles.searchInput}
                        value={searchQuery}
                        onChangeText={query => setSearchQuery(query)}
                        placeholder="Search employees"
                    />
                    {searchQuery.length > 0 && (
                        <MaterialIcons
                            name="cancel"
                            size={24}
                            color="black"
                            style={{ position: 'absolute', right: 20 }}
                            onPress={() => setSearchQuery('')}
                        />
                    )}
                </View>
            </View>
            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id} // Use 'id' from the user object
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleEmployeePress(item)}>
                        <Text style={styles.item}>{item.Name}</Text>
                    </TouchableOpacity>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.headerSeparator}>
                        <Text style={styles.header}>{title}</Text>
                    </View>
                )}
                extraData={searchQuery}
            />
        </View >
    );
};


export default EmployeeList;