import {Stack} from "expo-router";

export default function SingUpLayout() {
  return(
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index"/>
    </Stack>
  )
}