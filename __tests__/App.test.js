import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from '../App.js';
import { getDatabase, ref, onValue } from 'firebase/compat/database';


jest.mock('firebase/compat/database', () => ({
    getDatabase: jest.fn(),
    ref: jest.fn(),
    onValue: jest.fn(),
}));

describe('EmployeeList', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render the EmployeeList component', () => {
        const { getByPlaceholderText, getByText } = render(<EmployeeList />);

        expect(getByPlaceholderText('Search employees')).toBeTruthy();
        expect(getByText('Search employees')).toBeTruthy();
    });

    it('should fetch data from Firebase', () => {
        const databaseMock = {};
        getDatabase.mockReturnValue(databaseMock);
        ref.mockReturnValue('usersRef');
        render(<EmployeeList />);

        expect(getDatabase).toHaveBeenCalled();
        expect(ref).toHaveBeenCalledWith(databaseMock, 'users');
        expect(onValue).toHaveBeenCalledWith('usersRef', expect.any(Function));
    });

    it('should display employee data when available', () => {
        const { getAllByText, getByText } = render(<EmployeeList />);

        // Mock employee data
        const employeeData = [
            {
                name: 'John Doe',
                location: 'New York',
            },
            {
                name: 'Jane Smith',
                location: 'San Francisco',
            },
        ];

        // Trigger onValue callback with employee data
        onValue.mock.calls[0][1]({ val: () => employeeData });

        // Check if employee names are rendered
        expect(getAllByText(/John Doe|Jane Smith/)).toHaveLength(2);

        // Check if section headers are rendered
        expect(getByText('J')).toBeTruthy();
    });

    it('should filter employees based on search query', () => {
        const { getByPlaceholderText, getAllByText, getByText } = render(<EmployeeList />);

        // Mock employee data
        const employeeData = [
            {
                name: 'John Doe',
                location: 'New York',
            },
            {
                name: 'Jane Smith',
                location: 'San Francisco',
            },
        ];

        // Trigger onValue callback with employee data
        onValue.mock.calls[0][1]({ val: () => employeeData });

        const searchInput = getByPlaceholderText('Search employees');

        fireEvent.changeText(searchInput, 'John');

        // Check if filtered employee name is rendered
        expect(getByText('John Doe')).toBeTruthy();

        // Check if non-matching employee name is not rendered
        expect(() => getAllByText('Jane Smith')).toThrow();
    });
});
