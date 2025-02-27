import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { postComment } from '../lib/commentServices'

const AddCommentForm = () => {
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');

  const handleAddComment = async () => {
    if (!text) {
      setMessage('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const newCommentId = await postComment({ text, createdAt: new Date() });
      setMessage(`Commentaire ajouté avec succès ! `);
      setText('');
    } catch (error) {
      setMessage('Erreur lors de l’ajout du commentaire.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un commentaire</Text>
      <TextInput
        placeholder="Commentaire"
        value={text}
        onChangeText={setText}
        style={styles.input}
      />
      <Button title="Ajouter" onPress={handleAddComment} />
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

export default AddCommentForm;
