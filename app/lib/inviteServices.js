import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { nanoid } from "nanoid"; 


const generateShareLink = async (docId, permission) => {
    const token = nanoid(); // Crée un token unique
    const shareableLink = `https://sharetrip.com/view/${docId}?token=${token}`;
  
    // Enregistre le lien dans la base de donnée
    await setDoc(doc(collection(db, "invitations"), docId), {
      token,
      permission,
      createdAt: new Date()
    });
  
    return shareableLink;
  };

  export default generateShareLink;