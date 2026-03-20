import React from "react";
import {View, Text, Pressable} from "react-native";

// Simple inline SVG-style Google G using Text (no image needed)
const GoogleIcon = () => (
  <Text style={{fontSize: 16, fontWeight: "700"}}>
    <Text style={{color: "#4285F4"}}>G</Text>
    <Text style={{color: "#EA4335"}}>o</Text>
    <Text style={{color: "#FBBC05"}}>o</Text>
    <Text style={{color: "#4285F4"}}>g</Text>
    <Text style={{color: "#34A853"}}>l</Text>
    <Text style={{color: "#EA4335"}}>e</Text>
  </Text>
);

interface SocialButtonsProps {
  onGoogle?: () => void;
  onFacebook?: () => void;
}

export const SocialButtons: React.FC<SocialButtonsProps> = ({
                                                              onGoogle,
                                                              onFacebook,
                                                            }) => (
  <View className="gap-y-4">
    <Text className="text-sm text-muted-foreground text-center">Sign up with</Text>
    <View className="flex-row gap-x-3">
      {/* Google */}
      <Pressable
        onPress={onGoogle}
        className="flex-1 flex-row items-center justify-center gap-x-2 border border-border bg-background rounded-xl py-3.5 active:opacity-70"
      >
        <GoogleIcon />
        <Text className="text-sm font-semibold text-foreground">Google</Text>
      </Pressable>

      {/* Facebook */}
      <Pressable
        onPress={onFacebook}
        className="flex-1 flex-row items-center justify-center gap-x-2 rounded-xl py-3.5 active:opacity-70"
        style={{backgroundColor: "#1877F2"}}
      >
        <Text style={{color: "#fff", fontSize: 16, fontWeight: "900"}}>f</Text>
        <Text style={{color: "#fff", fontSize: 14, fontWeight: "700"}}>Facebook</Text>
      </Pressable>
    </View>
  </View>
);