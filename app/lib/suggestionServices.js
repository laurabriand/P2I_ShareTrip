import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase.config";

//GET ALL SUGGESTIONS
export const getSuggestions = async () => {
  const suggestionsRef = collection(db, 'suggestions');
  const snapshot = await getDocs(suggestionsRef);
  const suggestions = [];

  if (snapshot.empty) {
    console.log('No matching documents.');
    return;  
  }

  snapshot.forEach(doc => {
    const suggestionData = doc.data();
    if (suggestionData.name) {
      suggestions.push(suggestionData.name); 
    }
  });

  return suggestions; 
};

// GET SUGGESTION (ID)
export const getSuggestionById = async (suggestionId) => {
  try {
    const suggestionRef = doc(db, 'suggestions', suggestionId);
    const snapshot = await getDoc(suggestionRef);

    if (!snapshot.exists()) {
      console.log('No matching document.');
      return null;  
    }

    console.log(snapshot.id, '=>', snapshot.data());
    return { id: snapshot.id, ...snapshot.data() };  
  } catch (error) {
    console.error("Erreur lors de la récupération de la suggestion :", error);
    throw error;  
  }
};

//POST SUGGESTION
export const postSuggestion = async (suggestionData, projectId) => {
    try {
      const suggestionRef = collection(db, 'suggestions');
      const docRef = await addDoc(suggestionRef, suggestionData);
      console.log('Suggestion ajoutée avec succès, ID :', docRef.id);

      const projectRef = doc(db, 'projects', projectId.projectId.trim());
      console.log('projectRef:', projectRef);
      await updateDoc(projectRef, {
        activities: arrayUnion(docRef.id)
      });
      console.log('ID de la suggestion ajouté au projet avec succès');

      return docRef.id; 
    }
    catch (error) {
      console.error('Erreur lors de l ajout de la suggestion :', error);
      throw error;
    }
  }

  //PUT SUGGESTION
export const putSuggestion = async (suggestionId, suggestionData) => {
    try {
      const suggestionRef = doc(db, 'suggestions', suggestionId.trim());
      const docRef = await updateDoc(suggestionRef, suggestionData);
      console.log('Suggestion modifiée avec succès');
      return docRef; 
    }
    catch (error) {
      console.error('Erreur lors de la modification de la suggestion :', error);
      throw error;
    }
  }

//DELETE SUGGESTION
export const deleteSuggestion = async (suggestionId) => {
  try {
    const suggestionRef = doc(db, 'suggestions', suggestionId.trim());
    const docRef = await deleteDoc(suggestionRef);
    console.log('Suggestion supprimée avec succès');
    return docRef; 
  }
  catch (error) {
    console.error('Erreur lors de la suppression de la suggestion :', error);
    throw error;
  }
}

export default { getSuggestions, getSuggestionById, postSuggestion, putSuggestion, deleteSuggestion };
