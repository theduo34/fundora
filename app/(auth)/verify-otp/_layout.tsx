import {Stack} from "expo-router";

export default function VerifyOtp() {
  return(
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen  name={"index"}/>
    </Stack>
  )
}