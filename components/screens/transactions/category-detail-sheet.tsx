import React from "react";
import {View, Text} from "react-native";
import {
  ShoppingBag, ShoppingCart, GraduationCap, Bus,
  Utensils, Zap, HeartPulse, Plane, Gamepad, Tag, LucideIcon,
} from "lucide-react-native";
import {TransactionItem} from "@/components/features/transactions/transaction-list";
import {dummyTransactions} from "@/components/features/home";
import {
  categoryAmounts, PieDataItem,
} from "@/components/features/transactions";


const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Shops: ShoppingBag,
  Supermarkets: ShoppingCart,
  Education: GraduationCap,
  Transport: Bus,
  Food: Utensils,
  Utilities: Zap,
  Health: HeartPulse,
  Travel: Plane,
  Gaming: Gamepad,
  Other: Tag,
};


const StatPill: React.FC<{ label: string; value: string; color: string }> = ({label, value, color,
                                                                             }) => (
  <View className="flex-1 items-center bg-card rounded-2xl py-3 px-2 gap-y-1">
    <Text className="text-base font-bold" style={{color}}>{value}</Text>
    <Text className="text-[10px] text-muted-foreground text-center">{label}</Text>
  </View>
);

interface CategoryDetailSheetProps {
  item: PieDataItem;
}

export const CategoryDetailSheet: React.FC<CategoryDetailSheetProps> = ({item}) => {
  const amountData = categoryAmounts[item.text];
  const IconComponent = CATEGORY_ICONS[item.text] ?? Tag;

  const transactions = dummyTransactions.filter(
    (tx) => tx.category.toLowerCase() === item.text.toLowerCase()
  );

  const formatted = (amountData.amount / 100).toLocaleString("en-US", {
    style: "currency", currency: "USD",
  });

  const avg = transactions.length > 0
    ? (amountData.amount / transactions.length / 100).toLocaleString("en-US", {
      style: "currency", currency: "USD",
    })
    : "$0.00";

  return (
    <View className="px-5 gap-y-6">

      <View className="items-center gap-y-3">
        <View
          className="w-20 h-20 rounded-full items-center justify-center"
          style={{backgroundColor: item.color + "15"}}
        >
          <View
            className="w-14 h-14 rounded-full items-center justify-center"
            style={{backgroundColor: item.color + "25"}}
          >
            <IconComponent size={26} color={item.color} strokeWidth={2}/>
          </View>
        </View>

        <Text className="text-4xl font-bold tracking-tight" style={{color: item.color}}>
          {amountData?.positive ? "+" : "-"}{formatted}
        </Text>

        <Text className="text-xs text-muted-foreground">
          This week · {item.count} transactions
        </Text>
      </View>

      <View className="flex-row gap-x-3">
        <StatPill
          label="of total spending"
          value={`${item.value}%`}
          color={item.color}
        />
        <StatPill
          label="transactions"
          value={String(item.count)}
          color={item.color}
        />
        <StatPill
          label="avg per transaction"
          value={avg}
          color={item.color}
        />
      </View>

      <View className="gap-y-2">
        <View className="flex-row justify-between">
          <Text className="text-xs text-muted-foreground">Spending share</Text>
          <Text className="text-xs font-semibold" style={{color: item.color}}>
            {item.value}%
          </Text>
        </View>
        <View className="w-full bg-card rounded-full h-2.5 overflow-hidden">
          <View
            className="h-2.5 rounded-full"
            style={{
              width: `${item.value}%`,
              backgroundColor: item.color,
            }}
          />
        </View>
      </View>

      <View className="h-px bg-border"/>

      <View className="gap-y-3">
        <Text className="text-sm font-bold text-foreground">Transactions</Text>

        {transactions.length === 0 ? (
          <View className="items-center py-8 gap-y-2">
            <View
              className="w-12 h-12 rounded-full items-center justify-center"
              style={{backgroundColor: item.color + "15"}}
            >
              <IconComponent size={22} color={item.color} strokeWidth={1.8}/>
            </View>
            <Text className="text-sm text-muted-foreground">
              No transactions in this category
            </Text>
          </View>
        ) : (
          <View className="gap-y-2">
            {transactions.map((tx) => (
              <TransactionItem key={tx.id} transaction={tx} onPress={() => {
              }}/>
            ))}
          </View>
        )}
      </View>

    </View>
  );
};