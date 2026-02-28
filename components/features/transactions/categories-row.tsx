import React from "react";
import {View, Text, Pressable} from "react-native";
import {
  ShoppingBag,
  ShoppingCart,
  GraduationCap,
  Bus,
  Utensils,
  Zap,
  HeartPulse,
  Plane,
  Gamepad2,
  MoreHorizontal,
  LucideIcon,
  Tag
} from "lucide-react-native";
import {PieDataItem, categoryAmounts} from "@/components/features/transactions/index";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Shops: ShoppingBag,
  Supermarkets: ShoppingCart,
  Education: GraduationCap,
  Transport: Bus,
  Food: Utensils,
  Utilities: Zap,
  Health: HeartPulse,
  Travel: Plane,
  Gaming: Gamepad2,
  Other: Tag,
};

interface CategoryRowProps {
  item: PieDataItem;
  onCategoryPress?: (item: PieDataItem) => void;
}

export const CategoryRow: React.FC<CategoryRowProps> = ({item, onCategoryPress}) => {
  const amountData = categoryAmounts[item.text];
  const IconComponent = CATEGORY_ICONS[item.text] ?? MoreHorizontal;

  const formatted = (amountData.amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <Pressable
      onPress={() => onCategoryPress?.(item)}
      className="flex-row items-center gap-x-3 p-3 bg-card rounded-lg">
      <View
        className="w-11 h-11 rounded-full items-center justify-center shrink-0 border border-border"
        style={{backgroundColor: item.color + "28"}}
      >
        <IconComponent size={18} color={item.color} strokeWidth={1.8}/>
      </View>

      <View className="flex-1">
        <Text className="text-sm font-semibold ">{item.text}</Text>
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