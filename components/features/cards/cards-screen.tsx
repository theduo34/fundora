import ScreenLayout from "@/components/layout/screen-layout";
import {Text} from "react-native";

const CardsScreen = () => {
  return(
    <ScreenLayout screen={"cards"}>
      <Text className={"text-foreground"}>
        Card screen
      </Text>
    </ScreenLayout>
  )
}
export default CardsScreen;