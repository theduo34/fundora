import { Stack, Redirect } from "expo-router";
import { useAuthStore } from "@/stores/auth.store";

const ProtectedLayout = () => {
  const session = useAuthStore((s) => s.session);

  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(stack)" />
    </Stack>
  );
};
export default ProtectedLayout;