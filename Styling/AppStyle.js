import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0, // Remove padding to the top of the screen for the list
        backgroundColor: 'white',
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
    ModalButton: {
        borderRadius: 5,
        paddingLeft: 5,
        elevation: 2,
        backgroundColor: '#2196F3',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});