import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { getAuth } from 'firebase/auth';
import { SignOut } from '../lib/auth';
import { useNavigation } from '@react-navigation/native';
import { getUserByUID } from '../lib/userServices';
import { useState, useEffect } from 'react';

const Profile = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  //User info recovery
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user?.uid) {
        try {
          const userData = await getUserByUID(user.uid);
          setUserInfo(userData);
        } catch (err) {
          console.log('Erreur lors de la récupération des informations utilisateur :', err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserInfo();
  }, [user]);

  //Diconnect function
  const handleDisconnect = async () => {
    await SignOut();
    navigation.navigate('auth/firstScreen');
    console.log('Déconnexion');
  };

  return (
    <View style={styles.container}>
      <View style={styles.appName}>
        <Image source={require('../assets/images/ShareTripLogo.png')} style={styles.logo} />
        <Text style={styles.shareTrip}>ShareTrip</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>MON PROFIL</Text>
        <Text style={styles.label}>Mon nom d'utilisateur :</Text>
        <Text style={styles.info}>{loading ? 'Chargement...' : userInfo?.userName ?? 'User name non disponible'}</Text>
        <Text style={styles.label}>Mon adresse mail :</Text>
        <Text style={styles.info}>{loading ? 'Chargement...' : user?.email ?? 'Email non disponible'}</Text>
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
  },
  title: {
    fontFamily: 'LilitaOne-Regular',
    fontSize: 36,
    color: '#5A439A',
    marginBottom: '3%',
    textAlign: 'center',
    marginTop: '5%',
  },
  label: {
    color: '#5A439A',
    fontFamily: 'LilitaOne-Regular',
    fontSize: 20,
    marginLeft: '5%',
    marginBottom: '2%',
    marginTop: '2%',
  },
  info: {
    color: '#000000',
    fontFamily: 'Convergence-Regular',
    fontSize: 18,
    marginLeft: '5%',
    marginBottom: '5%',
  },
  secondButton: {
    backgroundColor: '#9B7EDC',
    paddingVertical: '1.5%',
    paddingHorizontal: '10%',
    borderRadius: 60,
    width: '90%',
    height: '6%',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '5%',
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