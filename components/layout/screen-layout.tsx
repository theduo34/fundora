import React, {ReactNode} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {Navbar} from "@/components/layout/nav-bar";
import {Animated, View} from "react-native";
import ScrollView = Animated.ScrollView;

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

const ScreenLayout = (
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

  const content = scrollable ? (
    <ScrollView
      contentContainerClassName={`${className}`}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View className={`${className}`}>
      {children}
    </View>
  );

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

export default ScreenLayout;