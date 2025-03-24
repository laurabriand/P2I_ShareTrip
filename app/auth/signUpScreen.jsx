import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SignUp } from '../lib/auth';
import { useNavigation } from '@react-navigation/native';
import { postUser } from '../lib/userServices';
import { getAuth } from 'firebase/auth';

const SignUpScreen = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigation = useNavigation();

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
            console.log('Email:', email);
            console.log('Password:', password);
            // const auth = getAuth();
            // const user = auth.currentUser;
            // const userUID = user.uid;
            // postUser({ userName, email, userUID, createdAt: new Date() });
            navigation.navigate('(tabs)');
        } catch (err) {
            console.error('Erreur lors de l inscription :', err);
            setError('Échec de l inscription. Veuillez réessayer.');
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/ShareTripLogo.png')} style={styles.image} />
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
        padding: 16,
        backgroundColor: '#DAE7FF',
    },
    image: {
        width: 182,
        height: 119,
        alignSelf: 'center',
    },
    title: {
        fontFamily: 'LilitaOne-Regular',
        fontSize: 36,
        color: '#5A439A',
        marginBottom: 16,
        textAlign: 'center',
        marginBottom: 50,
    },
    label: {
        color: '#5A439A',
        fontFamily: 'LilitaOne-Regular',
        fontSize: 20,
        marginLeft: 30,
        marginBottom: 5,
        marginTop: 10,
    },
    input: {
        height: 40,
        width: 350,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 50,
        marginBottom: 12,
        paddingHorizontal: 8,
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
    },
    button: {
        backgroundColor: '#5A439A',
        paddingVertical: 9,
        paddingHorizontal: 40,
        borderRadius: 60,
        width: 350,
        height: 60,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 40,
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
        marginTop: 120,
    },
    secondButton: {
        backgroundColor: '#9B7EDC',
        paddingVertical: 5,
        paddingHorizontal: 40,
        borderRadius: 60,
        width: 350,
        height: 40,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10,
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