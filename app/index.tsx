import { Redirect } from "expo-router";

export default function Index() {
  const isAuthenticated = true;

  if (isAuthenticated) {
    return <Redirect href="/(protected)/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/login" />;
}