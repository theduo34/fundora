import ScreenLayout from "@/components/layout/screen-layout";
import {Text} from "react-native";

const SettingsScreen = () => {
  return(
    <ScreenLayout screen={"settings"}>
      <Text className={"text-muted-foreground"}>
        Setting page
      </Text>
    </ScreenLayout>
  )
}
export default SettingsScreen;