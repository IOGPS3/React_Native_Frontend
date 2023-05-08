import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30, // Add some padding to the top of the screen
    },
    font: {
        paddingLeft: 20,
        paddingBottom: 30,
        fontSize: 30,
    },

    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingLeft: 20,
        paddingRight: 70,
    },
    meetingFont: {
        paddingBottom: 0,
        fontSize: 30,
    },
    toggleContainer: {
        marginLeft: 'auto',
    },
});