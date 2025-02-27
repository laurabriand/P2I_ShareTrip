
import { getSuggestions} from '../lib/suggestionServices'; 
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';


const GetProjectsTest = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const projects = await getSuggestions();
        console.log('Projects:', projects); // Affiche les utilisateurs dans la console
      } catch (error) {
        console.log('Error fetching projects:', error); // Affiche l'erreur si la récupération échoue
      }
    };

    fetchData();  // Appelle la fonction
  }, []);

  return (
    <View>
      <Text>Liste des projets : </Text>
    </View>
  );
};

export default GetProjectsTest;

