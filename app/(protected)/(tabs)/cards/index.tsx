import ScreenLayout from "@/components/layout/screen-layout";
import { Text } from "react-native";

export default function Index() {
  return (
    <ScreenLayout screen={"cards"}>
      <Text className={"text-red-500"}>
        Card screen
      </Text>
    </ScreenLayout>
  );
}
