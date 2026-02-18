import React, {ReactNode} from "react";
import {View, Text, Pressable} from "react-native";
import {useRouter} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import {useSafeAreaInsets} from "react-native-safe-area-context";

type NavbarProps = {
  title?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  variant?: "default" | "transparent";
  className?: string;
};

export const Navbar = (
  {
    title,
    showBack = false,
    onBackPress,
    leftContent,
    rightContent,
    variant = "default",
    className = "",
  }: NavbarProps) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else if (router.canGoBack()) {
      router.back();
    }
  };

  const isTransparent = variant === "transparent";

  return (
    <View
      style={{paddingTop: insets.top}}
      className={`
        ${isTransparent ? "" : ""}
        ${className}
      `}
    >
      <View
        style={{ height: 64}}
        className="flex-row items-center justify-between px-4"
      >

        <View className="flex-1 flex-row items-center">
          {showBack ? (
            <Pressable
              onPress={handleBackPress}
              className="mr-2 active:opacity-70"
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            >
              <Ionicons name="arrow-back" size={24} className="text-foreground"/>
            </Pressable>
          ) : null}
          {leftContent}
        </View>

        {title ? (
          <View className="flex-1 items-center">
            <Text
              className="text-foreground text-lg font-semibold"
              numberOfLines={1}
            >
              {title}
            </Text>
          </View>
        ) : (
          <View className="flex-1"/>
        )}

        <View className="flex-1 flex-row items-center justify-end">
          {rightContent}
        </View>
      </View>
    </View>
  );
};
