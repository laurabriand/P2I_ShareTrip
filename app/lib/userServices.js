import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { db } from "../../firebase.config";

//GET ALL USERS
export const getUsers = async () => {
  const usersRef = collection(db, 'user');
  const snapshot = await getDocs(usersRef);
  const users = [];

  if (snapshot.empty) {
    console.log('No matching documents.');
    return;  
  }

  snapshot.forEach(doc => {
    const userData = doc.data();
    if (userData.userName) {
      users.push(userData.userName); 
    }
  });

  return users; 
};

// GET USER (ID)
export const getUserById = async (userId) => {
  try {
    const userRef = doc(db, 'user', userId);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      console.log('No matching document.');
      return null;
    }

    console.log(snapshot.id, '=>', snapshot.data());
    return { id: snapshot.id, ...snapshot.data() };  
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    throw error; 
  }
};

//GET USER (UID)
export const getUserByUID = async (userUID) => {
  try {
    const usersRef = collection(db, 'user');
    const q = query(usersRef, where('userUID', '==', userUID));
    const snapshot = await getDocs(q);
    let userData = null;

    if (snapshot.empty) {
      console.log('No matching documents.');
      return null;
    }

    snapshot.forEach(doc => {
      const data = doc.data();
      userData = { id: doc.id, ...data };
    });
    return userData;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    throw error;
  }
};

//POST USER
export const postUser = async (userData) => {
  try {
    const userRef = collection(db, 'user');
    const docRef = await addDoc(userRef, userData);
    console.log('Utilisateur ajouté avec succès, ID :', docRef.id);
    return docRef.id; 
  }
  catch (error) {
    console.error('Erreur lors de l ajout de l utilisateur :', error);
    throw error;
  }
}

//PUT USER
export const putUser = async (userId, userData) => {
  try {
    const userRef = doc(db, "user", userId.trim());
    const docRef = await updateDoc(userRef, userData);
    console.log('Utilisateur modifié avec succès');
    return docRef;
  }
  catch (error) {
    console.error('Erreur lors de la modification de l utilisateur :', error);
    throw error;
  }
}

//DELETE USER
export const deleteUser = async (userId) => {
  try {
    const userRef = doc(db, "user", userId.trim());
    const docRef = await deleteDoc(userRef);
    console.log('Utilisateur supprimé avec succès');
    return docRef;
  }
  catch (error) {
    console.error('Erreur lors de la suppression de l utilisateur :', error);
    throw error;
  }
}

export default { getUsers, getUserById, getUserByUID, postUser, putUser, deleteUser };