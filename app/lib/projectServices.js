import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

//GET ALL PROJECTS
export const getProjects = async () => {
    const projectsRef = collection(db, 'projects');
    const snapshot = await getDocs(projectsRef);
    const projects = [];
  
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;  
    }
  
    snapshot.forEach(doc => {
      const projectData = doc.data();
      projects.push({ id: doc.id, ...projectData }); 
    });
  
    return projects;
  };
  
  //GET PROJECT (ID)
  export const getProjectById = async (projectId) => {
    try {
      // Référence du document avec l'ID spécifié
      const projectRef = doc(db, 'projects', projectId);
  
      // Récupération du document
      const snapshot = await getDoc(projectRef);
  
      if (!snapshot.exists()) {
        console.log('No matching document.');
        return null;  // Retourne null si l'utilisateur n'existe pas
      }
  
      console.log(snapshot.id, '=>', snapshot.data());
      return { id: snapshot.id, ...snapshot.data() };  // Retourne les données de l'utilisateur
    } catch (error) {
      console.error("Erreur lors de la récupération du projet :", error);
      throw error;  // Propagation de l'erreur pour la gestion en amont
    }
  };

//GET PROJECTS BY USER UID
export const getProjectsByUserId = async (userId) => {
  try {
  const projectsRef = collection(db, 'projects');
  const snapshot = await getDocs(projectsRef);
  const projects = [];

  if (snapshot.empty) {
    console.log('No matching documents.');
    return;  
  }

  snapshot.forEach(doc => {
    const projectData = doc.data();
    console.log('ProjectData:', projectData);
    projectData.users.forEach(user => {
      if (user === userId.trim()) {
        projects.push({ id: doc.id, ...projectData }); 
      }
    });

  })
  console.log('Projects:', projects);
  return projects;

} catch (error) {
    console.error("Erreur lors de la récupération des projets :", error);
    throw error;  
  }
};
  

  //POST PROJECT
export const postProject = async (projectData) => {
    try {
      const projectRef = collection(db, 'projects');
      const docRef = await addDoc(projectRef, projectData);
      console.log('Projet ajouté avec succès, ID :', docRef.id);
      return docRef.id; // Retourne l'ID du document ajouté
    }
    catch (error) {
      console.error('Erreur lors de l ajout du projet :', error);
      throw error;
    }
  }

  //PUT PROJECT
export const putProject = async (projectId, projectData) => {
    try {
      const projectRef = collection(db, 'projects', projectId.trim());
      const docRef = await updateDoc(projectRef, projectData);
      console.log('Projet modifié avec succès');
      return docRef; 
    }
    catch (error) {
      console.error('Erreur lors de la modification du projet :', error);
      throw error;
    }
  }
  
//DELETE PROJECT
export const deleteProject = async (projectId) => {
  try {
    const projectRef = collection(db, 'projects', projectId.trim());
    const docRef = await deleteDoc(projectRef);
    console.log('Projet supprimé avec succès');
    return docRef; 
  }
  catch (error) {
    console.error('Erreur lors de la suppression du projet :', error);
    throw error;
  }
}

export default { getProjects, getProjectById, postProject, putProject, deleteProject };