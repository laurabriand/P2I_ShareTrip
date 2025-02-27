import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

//SIGNUP
export function SignUp(email, password) {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log('Utilisateur inscrit :', user.email);
    })
    .catch((error) => {
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
      console.log('Utilisateur connecté :', user.email);
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

//GET CURRENT USER
export function getCurrentUser() {
  const auth = getAuth();
  const user = auth.currentUser;
};

export default { SignUp, SignIn, SignOut };