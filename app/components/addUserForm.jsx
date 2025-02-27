import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { postUser } from '../lib/userServices'

const AddUserForm = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleAddUser = async () => {
    if (!userName || !email) {
      setMessage('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const newUserId = await postUser({ userName, email, createdAt: new Date() });
      setMessage(`Utilisateur ajouté avec succès ! ID : ${newUserId}`);
      setUserName('');
      setEmail('');
    } catch (error) {
      setMessage('Erreur lors de l’ajout de l’utilisateur.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un utilisateur</Text>
      <TextInput
        placeholder="Nom d'utilisateur"
        value={userName}
        onChangeText={setUserName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <Button title="Ajouter" onPress={handleAddUser} />
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

export default AddUserForm;
