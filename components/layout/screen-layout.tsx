import React, {ReactNode} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {Navbar} from "@/components/layout/nav-bar";
import {ScrollView, View} from "react-native";
import {useRootNavigationState, useSegments} from "expo-router";

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
    showBack,
    onBackPress,
    navbarLeftContent,
    navbarRightContent,
    navbarVariant = "default",
    scrollable = true,
    className = "",
  }: ScreenLayoutProps) => {
  const segments = useSegments();
  const rootState = useRootNavigationState();

  const isInsideTabs = segments.includes("(tabs)" as never);
  const rootStackCount = rootState?.routes?.length ?? 1;

  const resolvedShowBack = showBack !== undefined
    ? showBack
    : isInsideTabs
      ? rootStackCount > 1
      : true;

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
            showBack={resolvedShowBack}
            onBackPress={onBackPress}
            leftContent={navbarLeftContent}
            rightContent={navbarRightContent}
            variant={navbarVariant}
          />
        )}
        <View className="p-4  border flex-1 bg-background">
          {content}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ScreenLayout;