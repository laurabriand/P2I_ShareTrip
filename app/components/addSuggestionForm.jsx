import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { postSuggestion } from '../lib/suggestionServices';
import { getAuth } from 'firebase/auth';
import { getUserByUID } from '../lib/userServices';
import { useEffect } from 'react';

const AddSuggestionForm = (projectId) => {
  const [suggestionName, setSuggestionName] = useState('');
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState('');
  const auth = getAuth();
  const user = auth.currentUser;

  // User info recovery
  const [userInfo, setUserInfo] = useState(null);
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

  // Add suggestion function
  const handleAddSuggestion = async () => {
    if (!suggestionName || !price) {
      setMessage('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const newSuggestionId = await postSuggestion({ suggestionName, price, creator: userInfo.userName, createdAt: new Date() }, projectId);
      setMessage(`Suggestion ajoutés avec succès !`);
      setSuggestionName('');
      setPrice(0);
      setType('');

    } catch (error) {
      setMessage('Erreur lors de l’ajout de la suggestion.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Entrez le nom de l'activité :</Text>
      <TextInput
        placeholder="Nom de l'activité"
        value={suggestionName}
        onChangeText={setSuggestionName}
        style={styles.input}
      />
      <Text style={styles.label}>Entrez le prix par personne :</Text>
      <TextInput
        placeholder="Prix (en €)"
        value={price.toString()} // Convert number to string for TextInput
        onChangeText={(text) => {
          const numericValue = text.replace(/[^0-9.]/g, '');
          setPrice(numericValue);
        }}
        keyboardType="numeric" // Only allow numeric input
        style={styles.input}
      />
      <Button title="Ajouter la suggestion" onPress={handleAddSuggestion} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: '2%',
    backgroundColor: 'white',
    borderRadius: 10,

  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: '7%',
    padding: '1%',
  },
  message: {
    marginTop: 10,
    textAlign: 'center',
    color: 'green',
  },
  label: {
    color: '#0F0F0F',
    fontFamily: 'LilitaOne-Regular',
    fontSize: 20,
    marginBottom: '2%',
    marginLeft: '5%',
  },
});

export default AddSuggestionForm;
