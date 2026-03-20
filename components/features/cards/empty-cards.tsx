import React from "react";
import {View, Text} from "react-native";
import {CreditCard} from "lucide-react-native";

export const EmptyCards: React.FC = () => (
  <View className="flex-1 items-center justify-center gap-y-4 px-8">
    <View className="w-20 h-20 rounded-full bg-card items-center justify-center">
      <CreditCard size={36} color="#5C3568" strokeWidth={1.5} />
    </View>
    <View className="items-center gap-y-2">
      <Text className="text-base font-bold text-foreground text-center">
        No cards yet
      </Text>
      <Text className="text-sm text-muted-foreground text-center leading-5">
        {`You don't have any card added to your account. Tap the  `}
        <Text className="font-semibold text-primary">+</Text>
        {" "}button to add one.
      </Text>
    </View>
  </View>
);