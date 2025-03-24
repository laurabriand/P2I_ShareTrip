import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { postProject } from '../lib/projectServices';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import firebase from 'firebase/compat/app';


const AddProjectForm = () => {
  const [destination, setDestination] = useState('');
  const [start, setStart] = useState(dayjs());
  const [end, setEnd] = useState(dayjs());
  const [message, setMessage] = useState('');

  const handleAddProject = async () => {
    if (!destination || !start || !end) {
      setMessage('Veuillez remplir tous les champs.');
      return;
    }
    const startTimestamp = firebase.firestore.Timestamp.fromMillis(start.valueOf());
    const endTimestamp = firebase.firestore.Timestamp.fromMillis(end.valueOf());

    try {
      const newProjectId = await postProject({ destination, start: startTimestamp, end: endTimestamp, createdAt: new Date() });
      setMessage(`Projet ajouté avec succès ! ID : ${newProjectId}`);
      setDestination('');
      setStart(dayjs());
      setEnd(dayjs());
    } catch (error) {
      setMessage('Erreur lors de l’ajout du projet.');
      console.error(error);
    }
  };

  return (
    <View >
      <Text style={styles.title}>Ajouter un projet</Text>
      <TextInput
        placeholder="Destination"
        value={destination}
        onChangeText={setDestination}
        style={styles.input}
      />
      <DateTimePicker
        mode="single"
        date={start.toDate()}
        onChange={(params) => setStart(params.date)}
      />
      <DateTimePicker
        mode="single"
        date={end.toDate()}
        onChange={(params) => setEnd(params.date)}
      />
      <Button title="Ajouter" onPress={handleAddProject} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default AddProjectForm;
