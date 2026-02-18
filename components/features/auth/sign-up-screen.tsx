import ScreenLayout from "@/components/layout/screen-layout";
import {Text} from "react-native";

const SignUpScreen = () => {
  return(
    <ScreenLayout
      screen={"signup"}
      showNavbar={false}
    >
      <Text>Sign Up</Text>
    </ScreenLayout>
  )
}
export default SignUpScreen;