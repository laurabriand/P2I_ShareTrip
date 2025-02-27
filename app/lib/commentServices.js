import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

//GET ALL COMMENTS
export const getComments = async () => {
    const commentsRef = collection(db, 'comments');
    const snapshot = await getDocs(commentsRef);
    const comments = [];
  
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;  
    }
  
    snapshot.forEach(doc => {
      const commentData = doc.data();
      if (commentData.destination) {
        comments.push(commentData.destination); 
      }
    });
  
    return comments;
  };
  
  //GET COMMENT (ID)
  export const getCommentById = async (commentId) => {
    try {
      // Référence du document avec l'ID spécifié
      const commentRef = doc(db, 'comments', commentId);
  
      // Récupération du document
      const snapshot = await getDoc(commentRef);
  
      if (!snapshot.exists()) {
        console.log('No matching document.');
        return null;  
      }
  
      console.log(snapshot.id, '=>', snapshot.data());
      return { id: snapshot.id, ...snapshot.data() };  // Retourne les données de l'utilisateur
    } catch (error) {
      console.error("Erreur lors de la récupération du commentaire :", error);
      throw error;  // Propagation de l'erreur pour la gestion en amont
    }
  };
  
//POST COMMENT
export const postComment = async (commentData) => {
  try {
    const commentRef = collection(db, 'comments');
    const docRef = await addDoc(commentRef, commentData);
    console.log('Commentaire ajouté avec succès, ID :', docRef.id);
    return docRef.id; // Retourne l'ID du document ajouté
  }
  catch (error) {
    console.error('Erreur lors de l ajout du commentaire :', error);
    throw error;
  }
}

//PUT COMMENT
export const putComment = async (commentId, commentData) => {
  try {
    const commentRef = doc(db, 'comments', commentId.trim());
    const docRef = await updateDoc(commentRef, commentData);
    console.log('Commentaire modifié avec succès');
    return docRef; 
  }
  catch (error) {
    console.error('Erreur lors de la modification du commentaire :', error);
    throw error;
  }
}

//DELETE COMMENT
export const deleteComment = async (commentId) => {
  try {
    const commentRef = doc(db, 'comments', commentId.trim());
    const docRef = await deleteDoc(commentRef);
    console.log('Commentaire supprimé avec succès');
    return docRef; 
  }
  catch (error) {
    console.error('Erreur lors de la suppression du commentaire :', error);
    throw error;
  }
}

export default { getComments, getCommentById, postComment, putComment, deleteComment };