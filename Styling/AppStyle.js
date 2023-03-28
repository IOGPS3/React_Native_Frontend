import { StyleSheet } from 'react-native';

//export default styles = StyleSheet.create({
//    // or export const styles = StyleSheet.create({
//    Container: {
//        flex: 1,
//        flexDirection: 'column',
//        justifyContent: 'center',
//        alignItems: 'center',
//        backgroundColor: '#fff',
//    },
//})

export const styles = StyleSheet.create({
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

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
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
});