import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Project from "../components/project";
import React, { useEffect, useState } from 'react';
import { getPastProjectsByUserId } from "../lib/projectServices";
import { getAuth } from 'firebase/auth';

export default function Archive() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [loading, setLoading] = useState(true);

  //Project recovery
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      if (user?.uid) {
        try {
          const projectsData = await getPastProjectsByUserId(user.uid);
          setProjects(projectsData);
        } catch (err) {
          setError('Erreur lors de la récupération des projets');
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProjects();
  }, []);

  //Loading screen
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.appName}>
          <Image source={require('../assets/images/ShareTripLogo.png')} style={styles.logo} />
          <Text style={styles.shareTrip}>ShareTrip</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.empty}>Chargement...</Text>
        </View>
      </View>
    );
  }

  //No projects screen
  if (projects.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.appName}>
          <Image source={require('../assets/images/ShareTripLogo.png')} style={styles.logo} />
          <Text style={styles.shareTrip}>ShareTrip</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.empty}>Aucun projet pour le moment...</Text>
        </View>
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
    width: '90%',
  },
  empty: {
    color: '#5A439A',
    fontFamily: 'LilitaOne-Regular',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 100,
  },
});
