import { Redirect } from "expo-router";
import SplashScreen from "@/components/screens/onboarding/splash-screen";
import { useAuthStore } from "@/stores/auth.store";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const { session, initialized } = useAuthStore();

  if (!initialized) {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FAF5FB"}}>
        <ActivityIndicator size="large" color="#56034C" />
      </View>
    );
  }

  if (session) {
    return <Redirect href="/(protected)/(tabs)/home" />;
  }

  return <SplashScreen />;
}