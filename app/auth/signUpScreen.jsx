import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SignUp } from '../lib/auth';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignUpScreen = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigation = useNavigation();
    const router = useRouter();

    //Inscription function
    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        if (!userName || !email || !password || !confirmPassword) {
            setError("Veuillez remplir tous les champs");
            return;
        }
        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }
        try {
            await SignUp(email, password, userName);
            // Redirect to the invitation screen if the user used a share link to open the app
            const redirectPath = await AsyncStorage.getItem('redirectAfterAuth');
            if (redirectPath) {
                await AsyncStorage.removeItem('redirectAfterAuth');
                router.replace(redirectPath);
            } else {
                router.replace('/(tabs)');
            }
        } catch (err) {
            console.error('Erreur lors de l inscription :', err);
            setError('Échec de l inscription. Veuillez réessayer.');
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/ShareTripLogo.png')} style={styles.logo} />
            <Text style={styles.title}>INSCRIPTION</Text>
            <Text style={styles.label}>Entrez votre adresse mail :</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text style={styles.label}>Entrez votre nom d'utilisateur :</Text>
            <TextInput
                style={styles.input}
                placeholder="Nom d'utilisateur"
                value={userName}
                onChangeText={setUserName}
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
            <Text style={styles.label}>Confirmez votre mot de passe :</Text>
            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>S'inscrire</Text>
            </TouchableOpacity>
            <Text style={styles.message}>Déjà inscrit ?</Text>
            <TouchableOpacity style={styles.secondButton} onPress={() => navigation.navigate('auth/logInScreen')}>
                <Text style={styles.secondButtonText}>Se connecter</Text>
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
        marginBottom: '5%%',
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
        marginTop: '5%',
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
        marginTop: '8%',
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
export default SignUpScreen;