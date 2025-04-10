import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from 'react';
import Suggestion from "../../components/suggestion";
import { useLocalSearchParams } from 'expo-router';
import { getProjectById } from "../../lib/projectServices";
import { getSuggestionById } from "../../lib/suggestionServices";
import { useRouter } from 'expo-router';
import Icon from "react-native-vector-icons/Ionicons";


export default function Activities() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    //Project recovery
    const [project, setProject] = useState(null);
    useEffect(() => {
        if (id) {
            getProjectById(id)
                .then(setProject)
                .catch((err) => console.error('Erreur projet :', err));
        }
    }, [id]);

    //Suggestions recovery
    const [suggestions, setSuggestions] = useState(null);
    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                if (project?.activities?.length > 0) {
                    const fetchedSuggestions = await Promise.all(
                        project.activities.map(async (activityId) => {
                            try {
                                const suggestion = await getSuggestionById(activityId.trim());
                                return suggestion;
                            } catch (error) {
                                console.error(`Erreur lors de la récupération de la suggestion avec l'ID ${activityId}:`, error);
                                return null;
                            }
                        })
                    );
                    setSuggestions(fetchedSuggestions.filter((s) => s !== null));
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des suggestions :', error);
            }
        };
        fetchSuggestions();
    }, [project]);

    //Loading screen
    if (!project) {
        return (
            <View style={styles.container}>
                <Text style={styles.empty}>Chargement du projet...</Text>
            </View>
        );
    }

    //No suggestions screen
    if (!suggestions) {
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
                            <Text style={styles.label}>Gestion des activités</Text>
                        </View>
                    </View>
                    <Text style={styles.empty}>Aucune suggestion pour le moment</Text>
                    <TouchableOpacity onPress={() => router.push(`/addSuggestion/${id}`)} style={styles.button}>
                        <Text style={styles.buttonText}>Proposer une activité</Text>
                    </TouchableOpacity>
                </View>

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
                        <Text style={styles.label}>Gestion des activités</Text>
                    </View>
                </View>
                <View style={styles.scrollContent}>
                    <ScrollView style={styles.scrol} contentContainerStyle={{ paddingBottom: 20 }}>
                        {suggestions.map((activity, index) => (

                            <Suggestion key={index} suggestion={activity} />

                        ))}
                    </ScrollView>
                </View>
                <TouchableOpacity onPress={() => router.push(`/addSuggestion/${id}`)} style={styles.button} >
                    <Text style={styles.buttonText}>Proposer une activité</Text>
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
    label: {
        color: '#000000',
        fontFamily: 'LilitaOne-Regular',
        fontSize: 20,
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
    button: {
        backgroundColor: '#5A439A',
        justifyContent: 'center',
        borderRadius: 60,
        marginBottom: '2%',
        marginTop: '5%',
        width: '95%',
        height: '10%',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0,
    },
    buttonText: {
        color: '#FFFFFF',
        fontFamily: 'LilitaOne-Regular',
        fontSize: 36,
        textAlign: 'center',
        alignSelf: 'center',
    },
    scrol: {
        flex: 1,
        marginTop: '2%',
        marginBottom: '20%',
        width: '100%',
        height: '100%',
        alignSelf: 'center',

    },
    scrollContent: {
        maxHeight: '80%',
        marginTop: '2%',
        width: '90%',
        height: '100%',
        alignSelf: 'center',
        borderRadius: 10,
    },
    empty: {
        color: '#5A439A',
        fontFamily: 'LilitaOne-Regular',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 100,
    },
    backButton: {
        position: 'absolute',
        left: '0%',
        padding: '5%',
    },

});
