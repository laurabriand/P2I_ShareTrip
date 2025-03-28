
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

const FirstScreen = () => {
    const navigation = useNavigation();
    const [fontsLoaded] = useFonts({
        'Knewave-Regular': require('../assets/fonts/Knewave-Regular.ttf'),
        'LilitaOne-Regular': require('../assets/fonts/LilitaOne-Regular.ttf'),
    });

    if (!fontsLoaded) return null;

    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/ShareTripLogo.png')} style={styles.logo} />
            <Text style={styles.shareTrip}>ShareTrip</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('auth/logInScreen')}>
                <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={() => navigation.navigate('auth/signUpScreen')}>
                <Text style={styles.buttonText}>Inscription</Text>
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
    shareTrip: {
        color: '#5A439A',
        width: 278,
        fontFamily: 'Knewave-Regular',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 70,
        fontSize: 55,
        marginBottom: 50,
        textAlign: 'center',
        alignSelf: 'center',
    },
    logo: {
        width: 200,
        height: 200,
        alignSelf: 'center',
    },
    button: {
        backgroundColor: '#5A439A',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 25,
        marginTop: 10,
        width: 310,
        alignItems: 'center',
        alignSelf: 'center',
    },
    signUpButton: {
        backgroundColor: '#9B7EDC',
    },
    buttonText: {
        color: '#FFFFFF',
        fontFamily: 'LilitaOne-Regular',
        fontSize: 36,
        textAlign: 'center',
        alignSelf: 'center',
    },

});
export default FirstScreen;