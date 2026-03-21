import React from "react";
import {PieDataItem} from "@/components/features/transactions/index";
import {getCategoryConfig} from "@/constants/categories";
import {Pressable, View, Text} from "react-native";

export interface CategoryRowProps {
  item: PieDataItem;
  amountData: { amount: number; positive: boolean };
  onPress?: (item: PieDataItem) => void;
}

export const CategoryRow: React.FC<CategoryRowProps> = ({item, amountData, onPress}) => {
  const config = getCategoryConfig(item.text);
  const IconComponent = config.icon;
  const color = config.color;

  const formatted = (amountData.amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <Pressable
      onPress={() => onPress?.(item)}
      className="flex-row items-center gap-x-3 p-3 bg-card rounded-lg">
      <View
        className="w-11 h-11 rounded-full items-center justify-center shrink-0 border border-border"
        style={{backgroundColor: color + "28"}}
      >
        <IconComponent size={18} color={color} strokeWidth={1.8}/>
      </View>

      <View className="flex-1">
        <Text className="text-sm font-semibold ">{config.label}</Text>
        <Text className="text-xs text-foreground">{item.count} Transactions</Text>
      </View>

      <Text
        className="text-sm font-bold"
        style={{color: amountData.positive ? "#16a34a" : "#EB1254"}}
      >
        {amountData.positive ? "+" : "-"}{formatted}
      </Text>
    </Pressable>
  );
};