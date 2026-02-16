import {SafeAreaView} from "react-native-safe-area-context";
import {View, ViewStyle} from "react-native";

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
    <SafeAreaView edges={['top']} style={{flex: 1}} id={screen}>
      <View style={contentContainerStyle || {paddingHorizontal: 16, flex: 1}}>
        {children}
      </View>
    </SafeAreaView>
  );
}