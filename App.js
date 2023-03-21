import React, { useState } from 'react';
import { SectionList, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';

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
  const [searchQuery, setSearchQuery] = useState('');

  const employeesByLetter = employeeData.reduce((acc, employee) => {
    const firstLetter = employee.name.charAt(0);
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(employee);
    return acc;
  }, {});

  const filteredEmployees = employeeData.filter(employee => {
    return (
      employee.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const sections = Object.keys(employeesByLetter)
    .sort()
    .map(letter => ({
      title: letter,
      data: employeesByLetter[letter].sort((a, b) => a.name.localeCompare(b.name)),
    }));

  const handleEmployeePress = employee => {
    const selectedEmployeeString = `${employee.name}, ${employee.location}`;
    setSelectedEmployee(selectedEmployeeString);
  };

  return (
    <View style={styles.container}>
      {selectedEmployee && (
        <View style={styles.selectedEmployeeContainer}>
          <Text style={styles.selectedEmployeeName}>
            {selectedEmployee}
          </Text>
        </View>
      )}
      <TextInput
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={query => setSearchQuery(query)}
        placeholder="Search employees"
      />
      <SectionList
        sections={filteredEmployees.length > 0 ? [{ data: filteredEmployees }] : sections}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  header: {
    backgroundColor: '#f2f2f2',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  selectedEmployeeContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f2f2f2',
  },
  selectedEmployeeName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 16,
    marginBottom: 16,
  },
});

export default EmployeeList;
