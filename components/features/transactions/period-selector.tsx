import React from "react";
import {View, Text, Pressable} from "react-native";
import {Period} from "@/components/features/transactions/index";

interface PeriodSelectorProps {
  selected: Period;
  onChange: (p: Period) => void;
}

const PERIODS: Period[] = ["Week", "Month", "Year"];

export const PeriodSelector: React.FC<PeriodSelectorProps> = ({selected, onChange}) => {
  return (
    <View className="w-full flex-row justify-between bg-card rounded-lg p-1 items-center">
      {PERIODS.map((p, i) => (
        <View key={p} className={"flex-1"}>
          <Pressable
            onPress={() => onChange(p)}
            className={`px-5 py-1.5 rounded-lg ${selected === p ? "bg-secondary" : ""}`}
          >
            <Text
              className="text-center text-sm font-semibold"
              style={{color: selected === p ? "#ffffff" : "#9CA3AF"}}
            >
              {p}
            </Text>
          </Pressable>
          {i < PERIODS.length - 1 && (
            <View className="w-px bg-border self-stretch mx-0.5" />
          )}
        </View>
      ))}
    </View>
  );
};