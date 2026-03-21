import React from "react";
import {View, Text, Pressable} from "react-native";
import {TransactionTabType} from "@/components/features/transactions/index";

interface TabSwitcherProps {
  selected: TransactionTabType;
  onChange: (t: TransactionTabType) => void;
}

const TABS: TransactionTabType[] = ["Transactions", "Categories"];

export const TabSwitcher: React.FC<TabSwitcherProps> = ({selected, onChange}) => {
  return (
    <View className="items-center justify-center flex-row space-x-8 border-b border-border">
      {TABS.map((t) => (
        <Pressable
          key={t}
          onPress={() => onChange(t)}
          className="items-center pb-2 mx-4"
        >
          <Text
            className="text-sm font-semibold"
            style={{color: selected === t ? "var(--secondary)" : ""}}
          >
            {t}
          </Text>
          {selected === t && (
            <View
              className="absolute bottom-0 h-0.5 w-full rounded-full"
              style={{backgroundColor: "var(--secondary)"}}
            />
          )}
        </Pressable>
      ))}
    </View>
  );
};