import ScreenLayout from "@/components/layout/screen-layout";
import { Text } from "react-native";

export default function SettingsScree() {
  return (
    <ScreenLayout screen={"settings"}>
      <Text className={"text-red-500"}>
        Setting page
      </Text>
    </ScreenLayout>
  );
}
