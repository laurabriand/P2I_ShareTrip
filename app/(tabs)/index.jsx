import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { useFonts } from 'expo-font';
import Project from "../components/project";
import React, { useEffect, useState } from 'react';
import { getProjects, getProjectsByUserId } from "../lib/projectServices";
import { useRouter } from 'expo-router';
import { getAuth } from 'firebase/auth';

export default function Index() {
  const [fontsLoaded] = useFonts({
    'Knewave-Regular': require('../assets/fonts/Knewave-Regular.ttf'),
    'LilitaOne-Regular': require('../assets/fonts/LilitaOne-Regular.ttf'),
    'Convergence-Regular': require('../assets/fonts/Convergence-Regular.ttf'),
  });
  const router = useRouter();

  const auth = getAuth();
  const user = auth.currentUser;

  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      const projectsData = await getProjectsByUserId(user.uid);
      setProjects(projectsData);
      console.log('Projets chargés:', projectsData);
    };

    fetchProjects();
  }, []);

  if (!projects || projects.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.appName}>
          <Image source={require('../assets/images/ShareTripLogo.png')} style={styles.logo} />
          <Text style={styles.shareTrip}>ShareTrip</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.empty}>Aucun projet pour le moment...</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/addProject')}>
          <Text style={styles.buttonText}>Créer un projet</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.appName}>
        <Image source={require('../assets/images/ShareTripLogo.png')} style={styles.logo} />
        <Text style={styles.shareTrip}>ShareTrip</Text>
      </View>
      <View style={styles.content}>
        <ScrollView style={styles.scrollView} scrollIndicatorInsets={{ right: -5 }}>
          {projects.map((project) => (
            <Project key={project.id} project={project} />
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/addProject')}>
        <Text style={styles.buttonText}>Créer un projet</Text>
      </TouchableOpacity>
    </View>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '10%',
    width: '100%',
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
    width: '100%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#DAE7FF',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#5A439A',
    justifyContent: 'center',
    borderRadius: 60,
    marginVertical: '5%',
    width: '90%',
    height: '8%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'LilitaOne-Regular',
    fontSize: 36,
  },
  scrollView: {
    width: '90%', // La ScrollView occupe toute la largeur de son conteneur parent
  },
  empty: {
    color: '#5A439A',
    fontFamily: 'LilitaOne-Regular',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 100,
  },
});
