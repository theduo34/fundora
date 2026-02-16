import ScreenLayout from "@/components/layout/screen-layout";
import { Text } from "react-native";

export default function HomeScreen() {
  return (
    <ScreenLayout screen={"home"}>
      <Text className={"text-red-500"}>
        Home Screen
      </Text>
    </ScreenLayout>
  );
}
