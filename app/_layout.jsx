import { Stack, useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import * as Linking from 'expo-linking';
import { useFonts } from "expo-font";

export default function RootLayout() {
  const { user } = useAuth() || {};
  const [fontsLoaded] = useFonts({
    'Knewave-Regular': require('../app/assets/fonts/Knewave-Regular.ttf'),
    'Convergence-Regular': require('../app/assets/fonts/Convergence-Regular.ttf'),
    'LilitaOne-Regular': require('../app/assets/fonts/LilitaOne-Regular.ttf'),
  });
  const router = useRouter();

  // Send the user to the first screen if not logged in
  // and store the initial URL in AsyncStorage (if the user used a share link)
  useEffect(() => {
    if (!user) {
      router.push("auth/firstScreen");
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
            await AsyncStorage.setItem('redirectAfterAuth', `/${path}`);
            console.log('Lien stocké :', `/${path}`);
          }
        }
      } catch (error) {
        console.error('Erreur lors du stockage du lien :', error);
      }
    };

    const subscription = Linking.addEventListener('url', handleUrl);
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
