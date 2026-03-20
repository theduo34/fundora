import React from "react";
import {View, Text, TextInput, TextInputProps} from "react-native";

interface CardInputProps extends TextInputProps {
  label?: string;
  error?: string;
  rightElement?: React.ReactNode;
}

export const CardInput: React.FC<CardInputProps> = ({
                                                      label,
                                                      error,
                                                      rightElement,
                                                      ...props
                                                    }) => {
  return (
    <View className="gap-y-1.5">
      {label && (
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {label}
        </Text>
      )}
      <View
        className={`flex-row items-center bg-background border rounded-xl px-4 h-14 ${
          error ? "border-destructive" : "border-border"
        }`}
      >
        <TextInput
          className="flex-1 text-sm text-foreground"
          placeholderTextColor="#9CA3AF"
          autoCorrect={false}
          autoCapitalize="none"
          {...props}
        />
        {rightElement && (
          <View className="ml-2">{rightElement}</View>
        )}
      </View>
      {error && (
        <Text className="text-xs text-destructive">{error}</Text>
      )}
    </View>
  );
};