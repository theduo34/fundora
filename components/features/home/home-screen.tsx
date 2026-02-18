import {GradientView} from "@/components/ui/gradient-view";
import {Text, View} from "react-native";
import ScreenLayout from "@/components/layout/screen-layout";
import {Bell, User} from "lucide-react-native";

const HomeScreen = () => {
  return(
    <ScreenLayout
      screen="home"
      navbarLeftContent={
        <View className={"w-10 h-10 rounded-full border p-2 items-center justify-center "}>
          <User/>
        </View>
      }
      navbarRightContent={<Bell/>}
    >
      <GradientView className="h-56 w-full rounded-md items-center justify-center">
        <Text className="font-semibold">
          Home
        </Text>
      </GradientView>
    </ScreenLayout>
  )
}
export default HomeScreen;