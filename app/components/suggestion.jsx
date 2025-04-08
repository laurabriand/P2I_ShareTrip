import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import CommentSection from './commentSection';
import { useRouter } from 'expo-router';


const Suggestion = ({ suggestion }) => {
    const router = useRouter();
    const [likeActive, setLikeActive] = useState(false);
    const [dislikeActive, setDislikeActive] = useState(false);
    const handleLike = () => {
        if (likeActive) {
            setLikeActive(false);
        } else {
            setLikeActive(true);
            setDislikeActive(false);
        }
    };

    const handleDislike = () => {
        if (dislikeActive) {
            setDislikeActive(false);
        } else {
            setDislikeActive(true);
            setLikeActive(false);
        }
    };

    const likeButtonStyle = likeActive ? [styles.icon1, styles.activeIcon1] : styles.icon1;
    const dislikeButtonStyle = dislikeActive ? [styles.icon2, styles.activeIcon2] : styles.icon2;
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{suggestion.creator} propose : </Text>
            <Text style={styles.activity}>{suggestion.suggestionName}</Text>
            <View style={styles.row}>
                <Icon name="cash-outline" size={25} color="#000000" />
                <Text style={styles.price}>{suggestion.price}€ /pers</Text>
            </View>
            <View style={styles.container2}>
                <View style={styles.row2}>
                    <TouchableOpacity onPress={handleLike} style={likeButtonStyle}>
                        <Icon name="thumbs-up-outline" size={30} color={likeActive ? "#FFFFFF" : "#000000"} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDislike} style={dislikeButtonStyle}>
                        <Icon name="thumbs-down-outline" size={30} color={dislikeActive ? "#FFFFFF" : "#000000"} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push(`/addComment/${suggestion.id}`)} style={styles.icon3}>
                        <Icon name="chatbox-outline" size={30} color="#000000" />
                    </TouchableOpacity>
                </View>
                <CommentSection suggestionID={suggestion.id} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexShrink: 0,
        width: '100%',
        height: 500,
        borderRadius: 40,
        backgroundColor: 'rgba(218, 231, 255, 0.48)',
        marginBottom: '2%',
        marginTop: '5%',
        paddingHorizontal: '5%',
        paddingVertical: '4%',
    },
    label: {
        color: '#5A439A',
        fontFamily: 'LilitaOne-Regular',
        fontSize: 22,
        marginLeft: 5,
    },
    activity: {
        color: '#000000',
        fontFamily: 'Convergence-Regular',
        fontSize: 18,
        marginTop: 5,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    row2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
        justifyContent: 'center',
    },
    price: {
        color: '#000000',
        fontFamily: 'Convergence-Regular',
        fontSize: 18,
        marginLeft: 10,
        fontWeight: 'bold',
    },
    container2: {
        flexShrink: 0,
        width: '100%',
        height: 370,
        borderRadius: 40,
        backgroundColor: '#FFFFF5',
        marginBottom: '2%',
        marginTop: '2%',
        paddingHorizontal: '2%',
        paddingVertical: '5%',
        alignSelf: 'center',
    },
    icon1: {
        backgroundColor: 'rgba(201, 250, 197, 0.71)',
        width: 50,
        height: 50,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#rgba(55, 119, 50, 0.71)',
    },
    icon2: {
        backgroundColor: 'rgba(255, 218, 218, 0.71)',
        width: 50,
        height: 50,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#rgba(122, 58, 59, 0.71)',
        marginLeft: 15,
    },
    icon3: {
        backgroundColor: 'rgba(218, 220, 255, 0.71)',
        width: 50,
        height: 50,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#rgba(73, 79, 160, 0.71)',
        marginLeft: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    icon: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
    },
    activeIcon1: {
        backgroundColor: '#rgba(55, 119, 50, 0.71)',
    },
    activeIcon2: {
        backgroundColor: '#rgba(122, 58, 59, 0.71)', // Couleur de fond pour l'état actif
    },
});



export default Suggestion;