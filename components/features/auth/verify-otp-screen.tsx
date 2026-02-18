import {Text} from "react-native";
import ScreenLayout from "@/components/layout/screen-layout";

const VerifyOtpScreen = () => {
  return(
    <ScreenLayout
      screen={"verify-otp"}
      showNavbar={false}
    >
      <Text>Verify Otp</Text>
    </ScreenLayout>
  )
}
export default VerifyOtpScreen;