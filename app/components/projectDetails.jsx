import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { getUserById } from '../lib/userServices';
import { getSuggestionById } from '../lib/suggestionServices';



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

    const [userNames, setUserNames] = useState([]);
    useEffect(() => {
        const fetchUserNames = async () => {

            const names = await Promise.all(
                project.users.map(async (id) => {
                    try {
                        const user = await getUserById(id.trim());
                        return user?.userName || id;
                    } catch (error) {
                        console.error(`Erreur lors de la récupération de l'utilisateur avec l'ID ${id}:`, error);
                        return id;
                    }
                })
            );

            setUserNames(names);
        };

        fetchUserNames();
    }, [project.users]);

    const [activityNames, setActivityNames] = useState([]);
    useEffect(() => {
        const fetchActivityNames = async () => {

            const activities = await Promise.all(
                project.activities.map(async (id) => {
                    try {
                        const activity = await getSuggestionById(id.trim());
                        return activity?.suggestionName || id;
                    } catch (error) {
                        console.error(`Erreur lors de la récupération de l'activité avec l'ID ${id}:`, error);
                        return id;
                    }
                })
            );

            setActivityNames(activities);
        };

        fetchActivityNames();
    }, [project.activities]);

    const navigation = useNavigation();

    return (
        <View style={styles.container} >
            <TouchableOpacity style={styles.destination}>
                <Text style={styles.label}>{project.destination}</Text>
                <Icon name="chevron-up-outline" size={30} style={styles.icon1} />
            </TouchableOpacity>
            <View style={styles.time}>
                <Icon name="today-outline" size={37} color={'#5A439A'} style={styles.icon2} />
                <Text style={styles.date}>du {formatDate(project.startDate)} au {formatDate(project.endDate)}</Text>
            </View>
            <View style={styles.participantsContainer}>
                <Icon name="people" size={37} color={'#5A439A'} style={styles.icon2} />
                <Text style={styles.people}>Participants :</Text>
                <View style={styles.scrollBox}>
                    <ScrollView>
                        {userNames && userNames.length > 0 ? (
                            userNames.map((name, index) => (
                                <Text key={index} style={styles.userText}>
                                    • {name}
                                </Text>
                            ))
                        ) : (
                            <Text style={styles.userTextItalic}>Aucun participant</Text>
                        )}
                    </ScrollView>
                </View>
            </View>
            <View style={styles.activitiesContainer}>
                <Icon name="clipboard" size={32} color={'#5A439A'} style={styles.icon2} />
                <Text style={styles.people}>Activitiés :</Text>
                <View style={styles.scrollBox}>
                    <ScrollView>
                        {activityNames && activityNames.length > 0 ? (
                            activityNames.map((name, index) => (
                                <Text key={index} style={styles.userText}>
                                    • {name}
                                </Text>
                            ))
                        ) : (
                            <Text style={styles.userTextItalic}>Aucune activité</Text>
                        )}
                    </ScrollView>
                </View>
            </View>
            <View style={styles.manageButtonsContainer}>
                <TouchableOpacity style={styles.manageButton} onPress={() => navigation.navigate('Activities')}>
                    <Icon name="clipboard-outline" size={50} color="#5A439A" />
                    <Text style={styles.manageButtonText}>Gestion des activités</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.manageButton} onPress={() => console.log('Gestion participants')}>
                    <Icon name="people-outline" size={50} color="#5A439A" />
                    <Text style={styles.manageButtonText}>Gestion des participants</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.secondButton} >
                <Text style={styles.secondButtonText}>Créer un lien de partage</Text>
            </TouchableOpacity>
        </View>
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
        marginBottom: 8,
    },
    people: {
        fontFamily: 'LilitaOne-Regular',
        fontSize: 22,
        marginTop: 5,
        marginLeft: 70,
    },
    secondButton: {
        backgroundColor: '#9B7EDC',
        paddingVertical: 5,
        paddingHorizontal: 40,
        borderRadius: 60,
        width: 350,
        height: 40,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10,
        position: 'absolute',
        bottom: 15,
    },
    secondButtonText: {
        color: '#FFFFFF',
        fontFamily: 'LilitaOne-Regular',
        fontSize: 25,
        textAlign: 'center',
        alignSelf: 'center',
    },
    participantsContainer: {
        marginTop: 5,
    },

    activitiesContainer: {
        marginTop: 10,
    },

    scrollBox: {
        maxHeight: 100,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(218, 231, 255, 0.48)',
    },

    userText: {
        fontFamily: 'Convergence-Regular',
        fontSize: 18,
        marginBottom: 4,
        marginTop: 4,
        marginLeft: 10,
    },

    userTextItalic: {
        fontFamily: 'Convergence-Regular',
        fontSize: 16,
        fontStyle: 'italic',
    },
    manageButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        paddingHorizontal: 10,
    },

    manageButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 120,
        backgroundColor: 'rgba(218, 231, 255, 0.48)',
        borderRadius: 20,
        borderWidth: 3,
        borderColor: 'rgba(218, 231, 255, 1)',
        padding: 10,
    },

    manageButtonText: {
        fontFamily: 'LilitaOne-Regular',
        fontSize: 17,
        textAlign: 'center',
        marginTop: 5,
        color: '#5A439A',
    },


});

export default projectDetails;