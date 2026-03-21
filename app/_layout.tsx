import { Stack, useRouter } from "expo-router";
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import { useEffect, useRef } from "react";
import { AppState } from "react-native";
import { useAuthStore } from "@/stores/auth.store";

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#56034C",
    secondary: "#EB1254",
  },
};

export default function RootLayout() {
  const initialize = useAuthStore((s) => s.initialize);
  const signOut = useAuthStore((s) => s.signOut);
  const router = useRouter();
  const backgroundTimeRef = useRef<number | null>(null);

  useEffect(() => {
    initialize();

    const subscription = AppState.addEventListener("change", async (nextAppState) => {
      if (nextAppState === "background" || nextAppState === "inactive") {
        if (!backgroundTimeRef.current) {
          backgroundTimeRef.current = Date.now();
        }
      } else if (nextAppState === "active") {
        if (backgroundTimeRef.current) {
          const elapsed = Date.now() - backgroundTimeRef.current;
          backgroundTimeRef.current = null;
          
          if (elapsed > 3 * 60 * 1000) { // 3 minutes
            await signOut();
            router.replace("/(auth)/login" as any);
          }
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name={"(onboarding)"} />
            <Stack.Screen name={"(auth)"} />
            <Stack.Screen name={"(protected)"} />
          </Stack>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
