import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';
import { getDatabase, ref, set, onValue } from 'firebase/database';

jest.mock('firebase/database', () => ({
    getDatabase: jest.fn(),
    ref: jest.fn(),
    set: jest.fn(),
    onValue: jest.fn(),
}));

const mockDatabase = {
    users: {},
};

beforeEach(() => {
    getDatabase.mockImplementation(() => mockDatabase);
    ref.mockImplementation((database, path) => path);
    set.mockImplementation(() => Promise.resolve());
    onValue.mockImplementation((_, callback) => {
        callback({ val: () => mockDatabase.users });
    });
});

test('renders EmployeeList with an empty list of employees inside App', () => {
    const { getByText } = render(<App />);
    expect(getByText('Search employees')).toBeTruthy();
});
