import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { postComment } from '../lib/commentServices'
import { getAuth } from 'firebase/auth';
import { getUserByUID } from '../lib/userServices';
import { useEffect } from 'react';

const AddCommentForm = (suggestionId) => {
  const [text, setText] = useState('');
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

  // Publish comment function
  const handleAddComment = async () => {
    if (!text) {
      setMessage('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const newCommentId = await postComment({ text, creator: userInfo.userName, suggestionId: suggestionId.suggestionId, createdAt: new Date() });
      setMessage(`Commentaire ajouté avec succès : ${newCommentId}`);
      setText('');
    } catch (error) {
      setMessage('Erreur lors de l’ajout du commentaire.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Entrez votre commentaire : </Text>
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
    marginBottom: '5%',
    marginLeft: '5%',
  },
});

export default AddCommentForm;
