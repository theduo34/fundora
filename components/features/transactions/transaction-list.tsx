import React from "react";
import {View, Text, Image, Pressable} from "react-native";
import {Transaction} from "@/components/features/home";
import {formatAmount, formatDate} from "@/lib/helper";
import {ChevronRight} from "lucide-react-native";
import {useRouter} from "expo-router";

const getAmountColor = (type: Transaction["type"]): string => {
  switch (type) {
    case "credit":
    case "topup":
      return "#16a34a"; // Green
    case "debit":
      return "#dc2626"; // Red
    case "transfer":
      return "#890058"; // Secondary
    case "convert":
      return "#BC005B"; // Accent
    default:
      return "#2D0D3A"; // Foreground
  }
};

import {
  ShoppingBag, ShoppingCart, GraduationCap, Bus, Utensils, Zap, HeartPulse, Plane, Gamepad2, Tag, ArrowUpRight, ArrowDownLeft, PlusCircle, RefreshCcw, HelpCircle
} from "lucide-react-native";

const CATEGORY_ICONS: Record<string, any> = {
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

const TYPE_ICONS: Record<string, any> = {
  debit: ArrowUpRight,
  credit: ArrowDownLeft,
  topup: PlusCircle,
  convert: RefreshCcw,
  transfer: ArrowUpRight,
};

const TransactionAvatar: React.FC<{ tx: Transaction }> = ({tx}) => {
  const logoUrl = tx.merchantLogoUrl ?? tx.counterparty?.avatarUrl ?? null;

  if (logoUrl) {
    return (
      <Image
        source={{uri: logoUrl}}
        className="w-11 h-11 rounded-full bg-muted border border-border"
        resizeMode="cover"
      />
    );
  }

  const IconComponent = CATEGORY_ICONS[tx.category] ?? TYPE_ICONS[tx.type] ?? HelpCircle;
  const color = getAmountColor(tx.type);

  return (
    <View 
      className="w-11 h-11 rounded-full items-center justify-center border border-border"
      style={{ backgroundColor: color + "10" }}
    >
      <IconComponent size={20} color={color} strokeWidth={2} />
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
        <Text className="text-sm font-semibold text-foreground" numberOfLines={1}>
          {tx.description}
        </Text>
        <Text className="text-[10px] text-muted-foreground uppercase tracking-widest">
          {tx.category} • {formatDate(tx.createdAt)}
        </Text>
      </View>

      <View className="items-end">
        <Text
          className="text-sm font-bold"
          style={{ color: getAmountColor(tx.type) }}
        >
          {tx.type === "credit" || tx.type === "topup" ? "+" : "-"}{formatAmount(tx)}
        </Text>
        {tx.reference && (
          <Text className="text-[9px] text-muted-foreground font-mono">
            {tx.reference.slice(0, 8)}
          </Text>
        )}
      </View>
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
  const router = useRouter();
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
        {visible.slice(0,5).map((tx, i) => (
          <TransactionItem
            key={tx.id}
            transaction={tx}
            onPress={(tx) => router.push({
              pathname: "/(stack)/transactions/[id]",
              params: {id: tx.id},
            } as any)}
            isLast={i === visible.length - 1}
          />
        ))}
      </View>
    </View>
  );
};