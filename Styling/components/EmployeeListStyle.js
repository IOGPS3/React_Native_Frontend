import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    centered: {
        alignItems: 'center',
    },
    header: {
        fontSize: 28,
        paddingLeft: 10,
        backgroundColor: 'white',
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
        borderRadius: 20,
        paddingLeft: 45, 
        paddingRight: 45, 
        width: '95%', 
        alignSelf: 'center', 
        marginVertical: 10, 
    },

    employeeItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    availabilityIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginLeft: 11,
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