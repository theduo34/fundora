import React, {ReactNode} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {Navbar} from "@/components/layout/nav-bar";
import {ScrollView, View} from "react-native";

type ScreenLayoutProps = {
  children: ReactNode;
  screen: string;

  showNavbar?: boolean;
  navbarTitle?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  navbarLeftContent?: ReactNode;
  navbarRightContent?: ReactNode;
  navbarVariant?: "default" | "transparent";

  scrollable?: boolean;
  className?: string;
};

const SlackLayout = (
  {
    children,
    screen,
    showNavbar = true,
    navbarTitle,
    showBack = false,
    onBackPress,
    navbarLeftContent,
    navbarRightContent,
    navbarVariant = "default",
    scrollable = true,
    className = "",
  }: ScreenLayoutProps) => {

  const inner = (
    <View className={`flex-1 flex-col ${className}`}>
      {children}
    </View>
  );

  const content = scrollable ? (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}
    >
      {inner}
    </ScrollView>
  ) : inner;

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <View className="flex-1" id={screen}>
        {showNavbar && (
          <Navbar
            title={navbarTitle}
            showBack={showBack}
            onBackPress={onBackPress}
            leftContent={navbarLeftContent}
            rightContent={navbarRightContent}
            variant={navbarVariant}
          />
        )}
        <View className="p-4 flex-1 bg-background">
          {content}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SlackLayout;