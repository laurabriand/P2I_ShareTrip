import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { putComment } from '../lib/commentServices'

const UpdateCommentForm = () => {
    const [commentId, setCommentId] = useState('');
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdateComment = async () => {
    if (!text|| !commentId) {
      setMessage('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const udatedComment = await putComment(commentId, { text, updatedAt: new Date()});
      setMessage(`Commentaire modifié avec succès !`);
      setText('');
    } catch (error) {
      setMessage('Erreur lors de la modification du commentaire.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier un commentaire</Text>
      <TextInput
        placeholder="Identifiant"
        value={commentId}
        onChangeText={setCommentId}
        style={styles.input}
      />
      <TextInput
        placeholder="Commentaire"
        value={text}
        onChangeText={setText}
        style={styles.input}
      />
      <Button title="Enregistrer" onPress={handleUpdateComment} />
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

export default UpdateCommentForm;
