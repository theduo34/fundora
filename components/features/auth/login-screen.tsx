import ScreenLayout from "@/components/layout/screen-layout";
import {Text} from "react-native";

const LoginScreen = () => {
  return(
    <ScreenLayout
      screen={"login"}
      showNavbar={false}
    >
      <Text>Login In</Text>
    </ScreenLayout>
  )
}
export default LoginScreen;