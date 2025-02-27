import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { postSuggestion } from '../lib/suggestionServices';

const AddSuggestionForm = () => {
  const [suggestionName, setSuggestionName] = useState('');
  const [price, setPrice] = useState(0);
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');

  const handleAddSuggestion = async () => {
    if (!suggestionName || !price || !type) {
      setMessage('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const newSuggestionId = await postSuggestion({ suggestionName, price, type, createdAt: new Date() });
      setMessage(`Suggestion ajoutés avec succès ! `);
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
      <Text style={styles.title}>Ajouter une suggestion</Text>
      <TextInput
        placeholder="Nom"
        value={suggestionName}
        onChangeText={setSuggestionName}
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={(text) => setPrice(text === "" ? "" : parseFloat(text))}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Type"
        value={type}
        onChangeText={setType}
        style={styles.input}
      />
      <Button title="Ajouter" onPress={handleAddSuggestion} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 8,
  },
  message: {
    marginTop: 10,
    textAlign: 'center',
    color: 'green',
  },
});

export default AddSuggestionForm;
