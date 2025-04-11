import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { postUser } from "./userServices";

//SIGNUP
export function SignUp(email, password, userName) {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      return postUser({ userName: userName.trim(), email, userUID: user.uid, createdAt: new Date() })
        .then(() => user); })
    .catch((error) => {
      console.error('Erreur lors de l\'inscription :', error);
      throw error;
    });
  
}

//SIGNIN
export function SignIn(email, password) {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      throw error;
    });
}

//SIGNOUT
export function SignOut() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      console.log('Utilisateur déconnecté');
    })
    .catch((error) => {
      console.error('Erreur lors de la déconnexion :', error);
    });
}

export default { SignUp, SignIn, SignOut };