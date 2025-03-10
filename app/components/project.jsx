import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/Ionicons';

const Project = () => {
    const [fontsLoaded] = useFonts({
        'Knewave-Regular': require('/Users/laura/Desktop/ShareTrip/ShareTrip/assets/fonts/Knewave-Regular.ttf'),
        'LilitaOne-Regular': require('/Users/laura/Desktop/ShareTrip/ShareTrip/assets/fonts/LilitaOne-Regular.ttf'),
        'Convergence-Regular': require('/Users/laura/Desktop/ShareTrip/ShareTrip/assets/fonts/Convergence-Regular.ttf'),
    });
    return (
        <View style={styles.container}>
            <View style={styles.destination}>
                <Text style={styles.label}>Destination</Text>
                <Icon name="chevron-down-outline" size={30} style={styles.icon1} />
            </View>
            <View style={styles.time}>
                <Icon name="today-outline" size={37} color={'#5A439A'} style={styles.icon2} />
                <Text style={styles.date}>du 12/03 au 25/05</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexShrink: 0,
        width: 380,
        height: 105,
        borderRadius: 40,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginBottom: 20,
    },
    destination: {
        flexDirection: 'row',
        width: 320,
        height: 32,
        borderRadius: 10,
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        backgroundColor: 'rgba(218, 231, 255, 0.48)',
    },
    label: {
        color: '#5A439A',
        fontFamily: 'LilitaOne-Regular',
        fontSize: 28,
        marginLeft: 65,
    },
    icon1: {
        marginLeft: 45,
    },
    icon2: {
        marginLeft: -70,
    },
    date: {
        fontFamily: 'Convergence-Regular',
        fontSize: 22,
        marginLeft: 15,
    },
    time: {
        flexDirection: 'row',
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 19,
    },
});

export default Project;