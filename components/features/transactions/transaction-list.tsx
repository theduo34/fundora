import React from "react";
import {View, Text, Image, Pressable} from "react-native";
import {Transaction} from "@/components/features/home/index";
import {formatAmount, formatDate} from "@/lib/helper";
import {ChevronRight} from "lucide-react-native";

const getAmountColor = (type: Transaction["type"]): string => {
  switch (type) {
    case "credit":
    case "topup":
      return "text-green"; // green — money coming in
    case "debit":
      return "text-red"; // primary red — money going out
    case "transfer":
      return "text-secondary"; // secondary purple — peer transfer
    case "convert":
      return "text-accent"; // accent — currency conversion
    default:
      return "text-foreground"; // foreground fallback
  }
};

const TransactionAvatar: React.FC<{ tx: Transaction }> = ({tx}) => {
  const logoUrl = tx.merchantLogoUrl ?? tx.counterparty?.avatarUrl ?? null;

  if (logoUrl) {
    return (
      <Image
        source={{uri: logoUrl}}
        className="w-11 h-11 rounded-full bg-muted border border-secondary-foreground"
        resizeMode="cover"
      />
    );
  }

  const initials = tx.type
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <View className="w-11 h-11 rounded-full bg-card items-center justify-center">
      <Text className="text-sm font-bold text-secondary">{initials}</Text>
    </View>
  );
};


interface TransactionItemProps {
  transaction: Transaction;
  onPress?: (tx: Transaction) => void;
  isLast?: boolean;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({transaction: tx, onPress, isLast = false,}) => {

  return (
    <Pressable
      onPress={() => onPress?.(tx)}
      className={`flex-row items-center gap-x-2 p-2 active:opacity-60 rounded-lg bg-card`}
    >
      <TransactionAvatar tx={tx}/>

      <View className="flex-1 gap-y-0.5">
        <Text className="text-sm font-semibold " numberOfLines={1}>
          {tx.description}
        </Text>
        <Text className="text-xs ">
          {formatDate(tx.createdAt)}
        </Text>
      </View>

      <Text
        className={`text-sm font-semibold ${getAmountColor(tx.type)}`}
      >
        {formatAmount(tx)}
      </Text>
    </Pressable>
  );
};


interface TransactionListProps {
  transactions: Transaction[];
  onViewAll?: () => void;
  onTransactionPress?: (tx: Transaction) => void;
  title?: string;
  limit?: number;
}

export const TransactionList: React.FC<TransactionListProps> = ({transactions, onViewAll, onTransactionPress, title = "Last Transaction", limit = 5,}) => {
  const visible = transactions.slice(0, limit);

  return (
    <View className="gap-y-1">
      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-base font-bold">{title}</Text>
        <Pressable onPress={onViewAll} className="flex-row items-center active:opacity-60 text-foreground">
          <Text className="text-sm font-medium text-foreground">View All</Text>
          <ChevronRight size={18} />
        </Pressable>
      </View>

      <View className={"flex gap-2"}>
        {visible.map((tx, i) => (
          <TransactionItem
            key={tx.id}
            transaction={tx}
            onPress={onTransactionPress}
            isLast={i === visible.length - 1}
          />
        ))}
      </View>
    </View>
  );
};