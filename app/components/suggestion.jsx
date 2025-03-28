import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import CommentSection from './commentSection';


const Suggestion = ({ suggestion }) => {

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
                    <TouchableOpacity style={styles.icon1}>
                        <Icon name="thumbs-up-outline" size={30} color="#000000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon2}>
                        <Icon name="thumbs-down-outline" size={30} color="#000000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon3}>
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
        width: 360,
        height: 500,
        borderRadius: 40,
        backgroundColor: 'rgba(218, 231, 255, 0.48)',
        marginBottom: 5,
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 15,
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
        width: 320,
        height: 370,
        borderRadius: 40,
        backgroundColor: '#FFFFF5',
        marginBottom: 5,
        marginTop: 7,
        paddingHorizontal: 20,
        paddingVertical: 15,
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
});

export default Suggestion;