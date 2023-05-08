import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
    },
    centered: {
        alignItems: 'center',
    },
    header: {
        fontSize: 28,
        padding: 10,
        backgroundColor: 'transparent',
    },
    headerSeparator: {
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        width: '95%',
        alignSelf: 'center',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        fontSize: 20,
        color: 'blue',
    },
    searchInput: {
        height: 40,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 20, // Make the search bar pill-shaped
        paddingLeft: 45, // Add padding to make space for the search icon
        paddingRight: 45, // Add padding to make space for the cross icon
        width: '95%', // Set width to 90% of the screen width
        alignSelf: 'center', // Center the search bar horizontally
        marginVertical: 10, // Add some vertical margin
    },

    buttonHeyThere: {
        backgroundColor: '#EE7F54',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 20,
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

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        fontSize: 25,
        marginLeft: 30,
        textAlign: 'center',
    },

    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
});