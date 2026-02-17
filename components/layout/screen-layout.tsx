import {SafeAreaView} from "react-native-safe-area-context";
import {Keyboard, TouchableWithoutFeedback, View, ViewStyle} from "react-native";

interface ScreenLayoutProps {
  screen: string;
  children: React.ReactNode;
  contentContainerStyle?: ViewStyle;
}

export default function ScreenLayout(
  {
    screen,
    children,
    contentContainerStyle,
  }: ScreenLayoutProps) {
  return (
   <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
     <SafeAreaView edges={['top']} style={{flex: 1}} id={screen}>
       <View
         style={contentContainerStyle || {paddingHorizontal: 16, flex: 1}}
         className={"bg-background text-text"}
       >
         {children}
       </View>
     </SafeAreaView>
   </TouchableWithoutFeedback>
  );
}