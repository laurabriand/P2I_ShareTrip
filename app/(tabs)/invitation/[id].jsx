import { View, Text, StyleSheet, Image } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { getProjectById } from "../../lib/projectServices";
import InvitationDetails from "../../components/invitationDetails";
import React, { useEffect, useState } from 'react';

export default function InvitationPage() {
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

    //Loading screen
    if (!project) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center', marginTop: 100, fontSize: 18 }}>
                    Chargement du projet...
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
                <Text style={styles.invite}>Vous avez été invité sur ce projet : </Text>
                <View style={styles.destination}>
                    <Text style={styles.title}>{project.destination}</Text>
                </View>
                <InvitationDetails project={project} />
            </View>
        </View>
    );
}
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
        paddingTop: '2%',
    },
    title: {
        fontFamily: 'LilitaOne-Regular',
        fontSize: 36,
        color: '#5A439A',
        textAlign: 'center',
        textTransform: 'uppercase',
        marginTop: '3%',
        marginBottom: '3%',
    },
    destination: {
        backgroundColor: 'rgba(218, 231, 255, 0.48)',
        width: '90%',
        height: '8%',
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '2%',
        position: 'relative',
        borderRadius: 10,
        flexDirection: 'row',

    },
    invite: {

        fontFamily: 'LilitaOne-Regular',
        fontSize: 20,
        marginBottom: '1.5%',
        marginTop: '2%',
    },
    info: {
        color: '#000000',
        fontFamily: 'Convergence-Regular',
        fontSize: 18,
        marginLeft: '8%',
        marginBottom: '3%',
    },
    button: {
        backgroundColor: '#5A439A',
        justifyContent: 'center',
        borderRadius: 60,
        marginBottom: '3%',
        marginTop: '3%',
        width: '90%',
        height: '8%',
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontFamily: 'LilitaOne-Regular',
        fontSize: 36,
        textAlign: 'center',
        alignSelf: 'center',
    },
    backButton: {
        position: 'absolute',
        left: '2%',
        padding: '2%',
    },

});
