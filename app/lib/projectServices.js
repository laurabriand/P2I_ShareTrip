import { collection, getDocs, doc, getDoc, addDoc, updateDoc } from "firebase/firestore";
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
      const projectRef = doc(db, 'projects', projectId);
      const snapshot = await getDoc(projectRef);
  
      if (!snapshot.exists()) {
        console.log('No matching document.');
        return null;  
      }
  
      console.log(snapshot.id, '=>', snapshot.data());
      return { id: snapshot.id, ...snapshot.data() };  
    } catch (error) {
      console.error("Erreur lors de la récupération du projet :", error);
      throw error;  
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
      return docRef.id; 
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
export const deleteProject = async (projectId, userUid) => {
  try {
    const projectRef = doc(db, 'projects', projectId.trim());
    const projectDoc = await getDoc(projectRef);
    if (!projectDoc.exists()) {
      console.log('No matching document.');
      return null;  
    }
    const projectData = projectDoc.data();
    const updatedUsers = projectData.users.filter(user => user !== userUid);
    await updateDoc(projectRef, { users: updatedUsers });
    console.log('Utilisateur supprimé du projet avec succès');
  } catch (error) {
    console.error('Erreur lors de la suppression de l utilisateur du projet :', error);
    throw error;
  }
  
}

// ADD USER TO PROJECT
export const addUserToProject = async (projectId, userUid) => {
  try {
    const projectRef = doc(db, 'projects', projectId.trim());
    const projectDoc = await getDoc(projectRef);
    if (!projectDoc.exists()) {
      console.log('No matching document.');
      return null;  
    }
    const projectData = projectDoc.data();
    const updatedUsers = [...projectData.users, userUid];
    await updateDoc(projectRef, { users: updatedUsers });
    console.log('Utilisateur ajouté au projet avec succès');
  } catch (error) {
    console.error('Erreur lors de l ajout de l utilisateur au projet :', error);
    throw error;
  }
};

// GET PAST PROJECTS BY USER UID
export const getPastProjectsByUserId = async (userId) => {
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
      const endDate = projectData.endDate?.toDate ? projectData.endDate.toDate() : new Date(projectData.endDate);
      console.log('Project destination:', projectData.destination);
      console.log('EndDate:', endDate);
      console.log('CurrentDate:', new Date());
      projectData.users.forEach(user => {
        if (user === userId.trim() && endDate < new Date()) {
          projects.push({ id: doc.id, ...projectData }); 
        }
      });
  
    })
    return projects;
  
  } catch (error) {
      console.error("Erreur lors de la récupération des projets :", error);
      throw error;  
    }
  };
// GET FUTURE PROJECTS BY USER UID
export const getFuturProjectsByUserId = async (userId) => {
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
      const endDate = projectData.endDate?.toDate ? projectData.endDate.toDate() : new Date(projectData.endDate);
      projectData.users.forEach(user => {
        if (user === userId.trim() && endDate > new Date()) {
          projects.push({ id: doc.id, ...projectData }); 
        }
      });
  
    })
    return projects;
  
  } catch (error) {
      console.error("Erreur lors de la récupération des projets :", error);
      throw error;  
    }
  };

export default { getProjects, getProjectById, postProject, putProject, deleteProject, addUserToProject, getProjectsByUserId, getPastProjectsByUserId, getFuturProjectsByUserId };