import { Stack, useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import * as Linking from 'expo-linking';


export default function RootLayout() {
  const { user } = useAuth() || {};
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("auth/firstScreen"); // Redirection si non connecté
    }
    const checkInitialUrl = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();
        if (initialUrl) {
          const parsedUrl = Linking.parse(initialUrl);
          const path = parsedUrl.path;

          if (path) {
            await AsyncStorage.setItem('redirectAfterAuth', `/${path}`);
            console.log('Lien initial stocké :', `/${path}`);
          }
        }
      } catch (error) {
        console.error('Erreur lors de la lecture du lien initial :', error);
      }
    };

    checkInitialUrl();

    const handleUrl = async ({ url }) => {
      try {
        if (url) {
          const parsedUrl = Linking.parse(url);
          const path = parsedUrl.path;

          if (path) {
            // Stocke la destination dans AsyncStorage
            await AsyncStorage.setItem('redirectAfterAuth', `/${path}`);
            console.log('Lien stocké :', `/${path}`);
          }
        }
      } catch (error) {
        console.error('Erreur lors du stockage du lien :', error);
      }
    };

    // Ajoute un écouteur pour les événements d'URL
    const subscription = Linking.addEventListener('url', handleUrl);

    // Nettoie l'écouteur lors du démontage du composant
    return () => subscription.remove();
  }, [user]);


  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="auth/logInScreen" options={{ headerShown: false }} />
      <Stack.Screen name="auth/signUpScreen" options={{ headerShown: false }} />
      <Stack.Screen name="auth/firstScreen" options={{ headerShown: false }} />
    </Stack>
  );
}
