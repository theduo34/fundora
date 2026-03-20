import {Stack} from "expo-router";

export default function StackLayout() {
  return(
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="notifications"/>
      <Stack.Screen name="transactions/[id]"/>
      <Stack.Screen name="add-card"/>
      <Stack.Screen name="settings"/>
    </Stack>
  )
}