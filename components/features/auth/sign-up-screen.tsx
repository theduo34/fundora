import LoginScreen from "@/components/features/auth/login-screen";
import ScreenLayout from "@/components/layout/screen-layout";
import {Text} from "react-native";

const SignUpScreen = () => {
  return(
    <ScreenLayout screen={"signup"}>
      <Text>Sign Up</Text>
    </ScreenLayout>
  )
}
export default SignUpScreen;