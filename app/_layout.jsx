import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";


export default function RootLayout() {
  const { user } = useAuth() || {};
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/firstScreen"); // Redirection si non connecté
    }
  }, [user]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="logInScreen" options={{ headerShown: false }} />
      <Stack.Screen name="signUpScreen" options={{ headerShown: false }} />
      <Stack.Screen name="firstScreen" options={{ headerShown: false }} />
    </Stack>
  );
}
