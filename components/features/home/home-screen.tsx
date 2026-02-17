import {GradientView} from "@/components/ui/gradient-view";
import {Text} from "react-native";
import ScreenLayout from "@/components/layout/screen-layout";

const HomeScreen = () => {
  return(
    <ScreenLayout screen="home">
      <GradientView className="h-40 w-80 rounded-md items-center justify-center">
        <Text className="font-semibold">
          Home
        </Text>
      </GradientView>
    </ScreenLayout>
  )
}
export default HomeScreen;