import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Share } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { getUserByUID } from '../lib/userServices';
import { getSuggestionById } from '../lib/suggestionServices';
import { addUserToProject } from '../lib/projectServices';
import * as Linking from 'expo-linking';
import { getAuth } from 'firebase/auth';


const invitationDetails = ({ project }) => {
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

    const [userNames, setUserNames] = useState([]);
    useEffect(() => {
        const fetchUserNames = async () => {

            const names = await Promise.all(
                project.users.map(async (uid) => {
                    try {
                        const user = await getUserByUID(uid.trim());
                        return user?.userName || uid;
                    } catch (error) {
                        console.error(`Erreur lors de la récupération de l'utilisateur avec l'ID ${uid}:`, error);
                        return uid;
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

    const handleJoin = async () => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;
            await addUserToProject(project.id, user.uid);
            router.push('/(tabs)');
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur au projet :', error);
            alert('Une erreur est survenue lors de la tentative de rejoindre le projet.');
        }

    };


    return (
        <View style={styles.componant}>
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

            </View>
            <TouchableOpacity style={styles.secondButton} onPress={handleJoin}>
                <Text style={styles.secondButtonText} >Rejoindre le projet</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    componant: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    container: {
        marginTop: '2%',
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
        marginBottom: '3%',
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
        height: '35%',
    },
    activitiesContainer: {
        marginTop: '2%',
        height: '35%',
    },
    scrollBox: {
        maxHeight: '60%',
        marginTop: '2%',
        width: '90%',
        height: '100%',
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
        marginLeft: '3%',
    },
    manageButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: '2%',
        paddingHorizontal: '3%',
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

export default invitationDetails;