import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";


export default function RootLayout() {
  const { user } = useAuth() || {};
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("auth/firstScreen"); // Redirection si non connecté
    }
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
