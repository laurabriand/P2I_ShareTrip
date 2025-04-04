import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from 'react';
import AddCommentForm from "../../components/addCommentForm";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

export default function AddComment() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

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
                        <Text style={styles.title}>Commentaire</Text>
                    </View>
                </View>
                <View style={styles.form}>
                    <AddCommentForm suggestionId={id} />
                </View>
            </View>
        </View>
    );

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
        fontSize: 23,
        color: '#5A439A',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    header: {
        flexDirection: 'row',
        backgroundColor: 'rgba(218, 231, 255, 0.48)',
        width: '90%',
        height: '10%',
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
    form: {
        width: '90%',
        marginTop: '5%',
    },
});