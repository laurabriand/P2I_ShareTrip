import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { putUser } from '../lib/userServices'

const UpdateUserForm = () => {
    const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdateUser = async () => {
    if (!userName || !email || !userId) {
      setMessage('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const userUpdate = await putUser(userId, { userName, email, updatedAt: new Date()});
      setMessage(`Utilisateur modifié avec succès !`);
      setUserName('');
      setEmail('');
    } catch (error) {
      setMessage('Erreur lors de la modification de l’utilisateur.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier un utilisateur</Text>
      <TextInput
        placeholder="Identifiant"
        value={userId}
        onChangeText={setUserId}
        style={styles.input}
      />
      <TextInput
        placeholder="Nom"
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
      <Button title="Enregistrer" onPress={handleUpdateUser} />
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

export default UpdateUserForm;
