import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';


const Project = ({ project }) => {
    const [fontsLoaded] = useFonts({
        'Knewave-Regular': require('../assets/fonts/Knewave-Regular.ttf'),
        'LilitaOne-Regular': require('../assets/fonts/LilitaOne-Regular.ttf'),
        'Convergence-Regular': require('../assets/fonts/Convergence-Regular.ttf'),
    });

    const formatDate = (ts) => {
        const date = ts.toDate ? ts.toDate() : new Date(Number(ts));
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${day}/${month}`;
    };

    const router = useRouter();
    const handleNavigation = () => {
        router.push(`/project/${project.id}`); // Navigue vers la page du projet avec l'ID
    };
    return (
        <TouchableOpacity style={styles.container} onPress={handleNavigation}>
            <View style={styles.destination}>
                <Text style={styles.label}>{project.destination}</Text>
            </View>
            <View style={styles.time}>
                <Icon name="today-outline" size={37} color={'#5A439A'} style={styles.icon2} />
                <Text style={styles.date}>du {formatDate(project.startDate)} au {formatDate(project.endDate)}</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        flexShrink: 0,
        width: '100%',
        height: 105,
        borderRadius: 40,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginBottom: 20,
    },
    destination: {
        flexDirection: 'row',
        width: '85%',
        height: '30%',
        borderRadius: 10,
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '2%',
        position: 'relative',
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
        marginLeft: -80,
    },
    date: {
        fontFamily: 'Convergence-Regular',
        fontSize: 22,
        marginLeft: '2%',
    },
    time: {
        flexDirection: 'row',
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '3%',
    },
});

export default Project;