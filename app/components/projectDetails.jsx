import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const projectDetails = ({ project }) => {
    const [fontsLoaded] = useFonts({
        'Knewave-Regular': require('/Users/laura/Desktop/ShareTrip/ShareTrip/assets/fonts/Knewave-Regular.ttf'),
        'LilitaOne-Regular': require('/Users/laura/Desktop/ShareTrip/ShareTrip/assets/fonts/LilitaOne-Regular.ttf'),
        'Convergence-Regular': require('/Users/laura/Desktop/ShareTrip/ShareTrip/assets/fonts/Convergence-Regular.ttf'),
    });

    const formatDate = (ts) => {
        const date = new Date(Number(ts));
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${day}/${month}`;
    };

    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.container} >
            <View style={styles.destination}>
                <Text style={styles.label}>{project.destination}</Text>
                <Icon name="chevron-up-outline" size={30} style={styles.icon1} />
            </View>
            <View style={styles.time}>
                <Icon name="today-outline" size={37} color={'#5A439A'} style={styles.icon2} />
                <Text style={styles.date}>du {formatDate(project.startDate)} au {formatDate(project.endDate)}</Text>
            </View>
            <View>
                <Icon name="people" size={37} color={'#5A439A'} style={styles.icon2} />
                <Text style={styles.people}>Participants :</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        flexShrink: 0,
        width: 380,
        height: 600,
        borderRadius: 40,
        backgroundColor: '#FFFFFF',
        marginBottom: 20,
    },
    destination: {
        flexDirection: 'row',
        width: 320,
        height: 32,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        position: 'relative',
        marginHorizontal: 30,
        backgroundColor: 'rgba(218, 231, 255, 0.48)',
    },
    label: {
        color: '#5A439A',
        fontFamily: 'LilitaOne-Regular',
        fontSize: 28,
        textAlign: 'center',
        flex: 1,
    },
    icon1: {
        position: 'absolute',
        right: 10,
    },
    icon2: {
        position: 'absolute',
        marginRight: 10,
        left: 20,
    },
    date: {
        fontFamily: 'Convergence-Regular',
        fontSize: 22,
        marginTop: 5,
        marginLeft: 70,
    },
    time: {
        flexDirection: 'row',
        flexShrink: 0,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 19,
    },
    people: {
        fontFamily: 'LilitaOne-Regular',
        fontSize: 22,
        marginTop: 5,
        marginLeft: 70,
    },
});

export default projectDetails;