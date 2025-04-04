import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Share } from "react-native";
import React, { useEffect, useState } from 'react';
import { getUserByUID } from "../../lib/userServices";
import Icon from "react-native-vector-icons/Ionicons";
import { useLocalSearchParams } from 'expo-router';
import { getProjectById } from "../../lib/projectServices";
import { useRouter } from 'expo-router';
import * as Linking from 'expo-linking';

export default function Participants() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [userNames, setUserNames] = useState([]);
    const [project, setProject] = useState(null);
    useEffect(() => {
        if (id) {
            getProjectById(id)
                .then(setProject)
                .catch((err) => console.error('Erreur projet :', err));
        }
    }, [id]);

    useEffect(() => {
        const fetchUserNames = async () => {
            if (!project || !project.users) return;
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
    }, [project]);

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


    if (!project) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center', marginTop: 100, fontSize: 18 }}>
                    Chargement...
                </Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <View style={styles.appName}>
                <Image source={require('../../assets/images/ShareTripLogo.png')} style={styles.logo} />
                <Text style={styles.shareTrip}>ShareTrip</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Icon name="arrow-back" size={30} color="#000000" />
                    </TouchableOpacity>
                    <View style={styles.info}>
                        <Text style={styles.title}>{project.destination}</Text>
                        <Text style={styles.label2}>Gestion des participants</Text>
                    </View>
                </View>
                <Text style={styles.label}>Liste des participants de ce voyage : </Text>
                <ScrollView style={styles.scrollView}>
                    {userNames.map((name, index) => (
                        <View key={index} style={styles.participant}>
                            <Text style={styles.participantName}>{name}</Text>
                        </View>
                    ))}
                </ScrollView>
                <TouchableOpacity style={styles.secondButton} onPress={handleShare}>
                    <Text style={styles.secondButtonText} >Créer un lien de partage</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '10%',
        paddingHorizontal: '5%',
        backgroundColor: '#DAE7FF',
    },
    appName: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '5%',
        marginTop: '5%',
        left: '-5%',
    },
    logo: {
        width: '15%',
        height: undefined,
        aspectRatio: 1,
        alignSelf: 'center',
    },
    shareTrip: {
        color: '#5A439A',
        fontFamily: 'Knewave-Regular',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 36,
        marginLeft: '5%',
    },
    content: {
        flex: 1,
        marginTop: '5%',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'LilitaOne-Regular',
        fontSize: 36,
        color: '#5A439A',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    header: {
        flexDirection: 'row',
        backgroundColor: 'rgba(218, 231, 255, 0.48)',
        width: '90%',
        height: '12%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '4%',
        position: 'relative',
        borderRadius: 10,

    },
    label2: {
        color: '#000000',
        fontFamily: 'LilitaOne-Regular',
        fontSize: 20,

    },
    label: {
        color: '#000000',
        fontFamily: 'LilitaOne-Regular',
        fontSize: 20,
        marginTop: '5%',
        marginBottom: '2%',
    },
    info: {
        color: '#000000',
        fontFamily: 'Convergence-Regular',
        fontSize: 18,
    },

    backButton: {
        position: 'absolute',
        left: '0%',
        padding: '5%',
    },
    scrollView: {
        flex: 1,
        width: '90%',
    },
    participant: {
        padding: '2%',
        backgroundColor: 'rgba(218, 231, 255, 0.30)',
        borderRadius: 10,
        marginBottom: '2%',
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    participantName: {
        fontSize: 16,
        color: '#333',
        fontFamily: 'Convergence-Regular',
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
        marginBottom: '5%',
    },
    secondButtonText: {
        color: '#FFFFFF',
        fontFamily: 'LilitaOne-Regular',
        fontSize: 25,
        textAlign: 'center',
        alignSelf: 'center',
    },
});

