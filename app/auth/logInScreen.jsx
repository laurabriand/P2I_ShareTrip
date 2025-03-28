import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SignIn } from '../lib/auth';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';



const LogInScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [fontsLoaded] = useFonts({
        'Knewave-Regular': require('../assets/fonts/Knewave-Regular.ttf'),
        'LilitaOne-Regular': require('../assets/fonts/LilitaOne-Regular.ttf'),
    });

    const handleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            if (!email || !password) {
                setError("Veuillez remplir tous les champs");
                setLoading(false);
                return;
            }
            await SignIn(email, password);
            navigation.navigate('(tabs)');
            console.log('Email:', email);
            console.log('Password:', password);
        } catch (error) {
            console.error(error);
            if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                setError('Email ou mot de passe incorrect');
            } else if (err.code === 'auth/too-many-requests') {
                setError('Trop de tentatives de connexion. Veuillez réessayer plus tard.');
            } else {
                setError('Échec de la connexion. Veuillez réessayer.');
            }
            setLoading(false);
        }
    };


    return (

        <View style={styles.container}>
            <Image source={require('../assets/images/ShareTripLogo.png')} style={styles.logo} />
            <Text style={styles.title}>CONNEXION</Text>
            <Text style={styles.label}>Entrez votre adresse mail :</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text style={styles.label}>Entrez votre mot de passe :</Text>
            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>
            <Text style={styles.message}>Pas encore de compte ?</Text>
            <TouchableOpacity style={styles.secondButton} onPress={() => navigation.navigate('auth/signUpScreen')}>
                <Text style={styles.secondButtonText}>Inscrivez-vous</Text>
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: '5%',
        backgroundColor: '#DAE7FF',
    },
    logo: {
        width: '40%',
        height: undefined,
        aspectRatio: 182 / 119,
        alignSelf: 'center',
        marginBottom: '5%',
    },
    title: {
        fontFamily: 'LilitaOne-Regular',
        fontSize: 36,
        color: '#5A439A',
        marginBottom: '10%',
        textAlign: 'center',
    },
    label: {
        color: '#5A439A',
        fontFamily: 'LilitaOne-Regular',
        fontSize: 20,
        marginBottom: '2%',
        marginTop: '5%',
        marginLeft: '5%',
    },
    input: {
        height: '5%',
        width: '95%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 50,
        marginBottom: '5%',
        paddingHorizontal: '3%',
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
    },
    button: {
        backgroundColor: '#5A439A',
        borderRadius: 60,
        width: '95%',
        height: '7%',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: '2%',
        marginBottom: '5%',
    },
    buttonText: {
        color: '#FFFFFF',
        fontFamily: 'LilitaOne-Regular',
        fontSize: 36,
        textAlign: 'center',
        alignSelf: 'center',
    },
    error: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
    message: {
        color: '#5A439A',
        fontFamily: 'LilitaOne-Regular',
        fontSize: 20,
        textAlign: 'center',
        marginTop: '20%',
    },
    secondButton: {
        backgroundColor: '#9B7EDC',
        justifyContent: 'center',
        borderRadius: 60,
        width: '95%',
        height: '5%',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: '2%',
    },
    secondButtonText: {
        color: '#FFFFFF',
        fontFamily: 'LilitaOne-Regular',
        fontSize: 25,
        textAlign: 'center',
        alignSelf: 'center',
    },
});

export default LogInScreen;