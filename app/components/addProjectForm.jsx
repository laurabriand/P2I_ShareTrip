import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { postProject } from '../lib/projectServices';
import dayjs from 'dayjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getAuth } from 'firebase/auth';

const AddProjectForm = () => {
  const [destination, setDestination] = useState('');
  const [start, setStart] = useState(dayjs());
  const [end, setEnd] = useState(dayjs());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [message, setMessage] = useState('');

  const auth = getAuth();
  const user = auth.currentUser;
  const userUid = user.uid;

  // Add project function
  const handleAddProject = async () => {

    if (!destination || !start || !end) {
      setMessage('Veuillez remplir tous les champs.');
      return;
    }
    // Convert dayjs objects to Firestore Timestamps
    const startTimestamp = firebase.firestore.Timestamp.fromMillis(start.valueOf());
    const endTimestamp = firebase.firestore.Timestamp.fromMillis(end.valueOf());

    // Initialize activities and users
    const initActivities = [];
    const initUsers = [userUid];

    try {
      const newProjectId = await postProject({ destination: destination, startDate: startTimestamp, endDate: endTimestamp, activities: initActivities, users: initUsers, createdAt: new Date() });
      setMessage(`Projet ajouté avec succès !`);
      setDestination('');
      setStart(dayjs());
      setEnd(dayjs());
    } catch (error) {
      setMessage('Erreur lors de l’ajout du projet.');
      console.error(error);
    }
  };

  // Date picker handler
  const handleStartDateChange = (event, selectedDate) => {
    setShowStartPicker(false);
    if (selectedDate) {
      setStart(dayjs(selectedDate));
    }
  };

  // Date picker handler
  const handleEndDateChange = (event, selectedDate) => {
    setShowEndPicker(false);
    if (selectedDate) {
      setEnd(dayjs(selectedDate));
    }
  };

  return (
    <View >
      <Text style={styles.label}>Entrer la destination : </Text>
      <TextInput
        placeholder="Destination"
        value={destination}
        onChangeText={setDestination}
        style={styles.input}
      />
      <Text style={styles.label}>Entrer la date de départ : </Text>
      <TouchableOpacity style={styles.datePicker} onPress={() => setShowStartPicker(true)} >
        <Text style={styles.dateText}>{start.format('DD/MM/YYYY')}</Text>
      </TouchableOpacity>
      {showStartPicker && (
        <DateTimePicker
          value={start.toDate()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleStartDateChange}
        />
      )}

      <Text style={styles.label}>Entrer la date de retour :</Text>
      <TouchableOpacity onPress={() => setShowEndPicker(true)} style={styles.datePicker}>
        <Text style={styles.dateText}>{end.format('DD/MM/YYYY')}</Text>
      </TouchableOpacity>
      {showEndPicker && (
        <DateTimePicker
          value={end.toDate()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleEndDateChange}
        />
      )}
      <Button title="Ajouter le projet" onPress={handleAddProject} />
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
    borderBottomWidth: 1.5,
    borderColor: '#ccc',
    marginBottom: '5%',
    padding: '2%',
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
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  datePicker: {
    borderBottomWidth: 1.5,
    borderColor: '#ccc',
    marginBottom: '5%',
    padding: '2%',
  },
});

export default AddProjectForm;
