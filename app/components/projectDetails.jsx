import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Share } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { getUserById } from '../lib/userServices';
import { getSuggestionById } from '../lib/suggestionServices';
import * as Linking from 'expo-linking';


const projectDetails = ({ project }) => {
    const [fontsLoaded] = useFonts({
        'Knewave-Regular': require('../assets/fonts/Knewave-Regular.ttf'),
        'LilitaOne-Regular': require('../assets/fonts/LilitaOne-Regular.ttf'),
        'Convergence-Regular': require('../assets/fonts/Convergence-Regular.ttf'),
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

    const handleShare = async () => {
        console.log("Partage en cours...");
        try {
            const deepLink = Linking.createURL(`/project/${project.id}`, {
                queryParams: {
                    name: project.destination,
                },
            });

            const result = await Share.share({
                message: `Rejoignez le projet "${project.destination}" sur ShareTrip ! Cliquez ici pour en savoir plus : ${deepLink}`,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log('Partagé avec une activité spécifique');
                } else {
                    console.log('Partagé');
                }
            } else if (result.action === Share.dismissedAction) {
                console.log('Partage annulé');
            }
        } catch (error) {
            console.error('Erreur lors du partage :', error);
        }
    };

    const router = useRouter();
    const handleNavigationActivities = () => {
        router.push(`/activities/${project.id}`);
    };
    const handleNavigationParticipants = () => {
        router.push(`/participants/${project.id}`);
    };

    return (
        <View style={styles.container} >
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
                <TouchableOpacity style={styles.manageButton} onPress={handleNavigationActivities}>
                    <Icon name="clipboard-outline" size={50} color="#5A439A" />
                    <Text style={styles.manageButtonText}>Gestion des activités</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.manageButton} onPress={handleNavigationParticipants}>
                    <Icon name="people-outline" size={50} color="#5A439A" />
                    <Text style={styles.manageButtonText}>Gestion des participants</Text>
                </TouchableOpacity>

            </View>
            <TouchableOpacity style={styles.secondButton} onPress={handleShare}>
                <Text style={styles.secondButtonText} >Créer un lien de partage</Text>
            </TouchableOpacity>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexShrink: 0,
        width: '95%',
        height: '80%',
        borderRadius: 40,
        backgroundColor: '#FFFFFF',
        marginBottom: '5%',
    },
    icon2: {
        position: 'absolute',
        marginRight: '2%',
        left: 20,
    },
    date: {
        fontFamily: 'Convergence-Regular',
        fontSize: 22,
        marginTop: '2%',
        marginLeft: '20%',
    },
    time: {
        flexDirection: 'row',
        flexShrink: 0,
        alignItems: 'center',
        marginTop: '2%',
        marginBottom: '2%',
    },
    people: {
        fontFamily: 'LilitaOne-Regular',
        fontSize: 22,
        marginTop: '2%',
        marginLeft: '20%',
    },
    secondButton: {
        backgroundColor: '#9B7EDC',
        justifyContent: 'center',
        borderRadius: 60,
        width: '90%',
        height: '8%',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: '5%',
        position: 'absolute',
        bottom: '0%',
    },
    secondButtonText: {
        color: '#FFFFFF',
        fontFamily: 'LilitaOne-Regular',
        fontSize: 25,
        textAlign: 'center',
        alignSelf: 'center',
    },
    participantsContainer: {
        marginTop: '2%',
        height: '28%',
    },
    activitiesContainer: {
        marginTop: '2%',
        height: '28%',
    },
    scrollBox: {
        maxHeight: '60%',
        marginTop: '2%',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        paddingVertical: '2%',
        backgroundColor: 'rgba(218, 231, 255, 0.48)',
    },
    userText: {
        fontFamily: 'Convergence-Regular',
        fontSize: 18,
        marginBottom: '2%',
        marginLeft: '3%',
    },
    userTextItalic: {
        fontFamily: 'Convergence-Regular',
        fontSize: 16,
        fontStyle: 'italic',
    },
    manageButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: '0%',
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