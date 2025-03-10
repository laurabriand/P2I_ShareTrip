import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';
import { getAuth } from 'firebase/auth';
import { SignOut } from '../lib/auth';
import { useNavigation } from '@react-navigation/native';
import { getUserByUID } from '../lib/userServices';
import { useState, useEffect } from 'react';

const Profile = () => {
  const [fontsLoaded] = useFonts({
    'Knewave-Regular': require('/Users/laura/Desktop/ShareTrip/ShareTrip/assets/fonts/Knewave-Regular.ttf'),
    'LilitaOne-Regular': require('/Users/laura/Desktop/ShareTrip/ShareTrip/assets/fonts/LilitaOne-Regular.ttf'),
    'Convergence-Regular': require('/Users/laura/Desktop/ShareTrip/ShareTrip/assets/fonts/Convergence-Regular.ttf'),
  });
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user?.uid) {
        try {
          const userData = await getUserByUID(user.uid);
          setUserInfo(userData);
        } catch (err) {
          setError('Erreur lors de la récupération des informations utilisateur');
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserInfo();
  }, [user]);

  const handleDisconnect = async () => {
    await SignOut();
    navigation.navigate('firstScreen');
    console.log('Déconnexion');
  };


  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={require('/Users/laura/Desktop/ShareTrip/ShareTrip/assets/images/ShareTripLogo.png')} style={styles.image} />
        <Text style={styles.shareTrip}>ShareTrip</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>MON PROFIL</Text>
        <Text style={styles.label}>Mon nom d'utilisateur :</Text>
        <Text style={styles.info}>{userInfo?.userName ?? 'User name non disponible'}</Text>
        <Text style={styles.label}>Mon adresse mail :</Text>
        <Text style={styles.info}>{user?.email ?? 'Email non disponible'}</Text>
        <TouchableOpacity style={styles.secondButton} onPress={handleDisconnect}>
          <Text style={styles.secondButtonText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 0,
    backgroundColor: '#DAE7FF',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 50,
    marginBottom: 0,
  },
  image: {
    width: 84,
    height: 49,
    alignSelf: 'center',
  },
  shareTrip: {
    color: '#5A439A',
    fontFamily: 'Knewave-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 36,
    marginLeft: 20,
  },
  content: {
    flex: 1,
    marginTop: 20,
    paddingBottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontFamily: 'LilitaOne-Regular',
    fontSize: 36,
    color: '#5A439A',
    marginBottom: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  label: {
    color: '#5A439A',
    fontFamily: 'LilitaOne-Regular',
    fontSize: 20,
    marginLeft: 30,
    marginBottom: 5,
    marginTop: 10,
  },
  info: {
    color: '#000000',
    fontFamily: 'Convergence-Regular',
    fontSize: 18,
    marginLeft: 30,
    marginBottom: 20,
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

export default Profile