import { useState, useContext, createContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
  
    // Simule une vérification d'utilisateur
    useEffect(() => {
      const fakeUser = { name: 'John Doe', email: 'john@example.com' };
      setUser(fakeUser); // Connecte l'utilisateur (fictif ici)
    }, []);

    useEffect(() => {
      console.log('User state updated:', user);
    }, [user]);
  
    return (
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    );
  };

  export const useAuth = () => {
    const context = useContext(AuthContext);
    console.log('useAuth context:', context);
    return context;
  };

