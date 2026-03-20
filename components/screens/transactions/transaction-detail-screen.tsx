import React from "react";
import {View, Text, Pressable} from "react-native";
import {
  CheckCircle2, XCircle, Clock, RefreshCcw,
  ArrowUpRight, ArrowDownLeft, PlusCircle,
  Copy, Share2, ReceiptText,
} from "lucide-react-native";
import {useLocalSearchParams} from "expo-router";
import ScreenLayout from "@/components/layout/screen-layout";
import {useTransactionStore} from "@/stores/transaction.store";
import {mapTransaction} from "@/lib/mappers";

const formatAmount = (amount: number, currency: string) =>
  (amount / 100).toLocaleString("en-US", {style: "currency", currency});

const formatFullDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("en-US", {
    hour: "2-digit", minute: "2-digit",
  });

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const STATUS_CONFIG = {
  completed: {icon: CheckCircle2, color: "#16a34a", bg: "#dcfce7", label: "Completed"},
  pending: {icon: Clock, color: "#d97706", bg: "#fef3c7", label: "Pending"},
  failed: {icon: XCircle, color: "#dc2626", bg: "#fee2e2", label: "Failed"},
  reversed: {icon: RefreshCcw, color: "#7c3aed", bg: "#ede9fe", label: "Reversed"},
};

const TYPE_CONFIG = {
  debit: {icon: ArrowUpRight, color: "#EB1254", sign: "-"},
  credit: {icon: ArrowDownLeft, color: "#16a34a", sign: "+"},
  transfer: {icon: ArrowUpRight, color: "#890058", sign: "-"},
  topup: {icon: PlusCircle, color: "#16a34a", sign: "+"},
  convert: {icon: RefreshCcw, color: "#BC005B", sign: ""},
};

const DetailRow: React.FC<{
  label: string;
  value: string;
  mono?: boolean;
  last?: boolean;
}> = ({label, value, mono = false, last = false}) => (
  <View className={`flex-row justify-between items-center py-3 ${!last ? "border-b border-border" : ""}`}>
    <Text className="text-sm">{label}</Text>
    <Text
      className="text-sm font-semibold max-w-[60%] text-right"
      numberOfLines={1}
      style={mono ? {fontVariant: ["tabular-nums"]} : {}}
    >
      {value}
    </Text>
  </View>
);

const ActionButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}> = ({icon, label, onPress}) => (
  <Pressable
    onPress={onPress}
    className="flex-1 items-center gap-y-2 py-3.5 bg-card rounded-2xl active:opacity-70"
  >
    {icon}
    <Text className="text-xs font-semibold text-secondary">{label}</Text>
  </Pressable>
);

export const TransactionDetailScreen = () => {
  const {id} = useLocalSearchParams<{ id: string }>();
  const transactions = useTransactionStore((s) => s.transactions);

  const dbTx = transactions.find((t) => t.id === id);
  const tx = dbTx ? mapTransaction(dbTx) : null;

  if (!tx) {
    return (
      <ScreenLayout screen="transaction-detail" navbarTitle="Transaction">
        <View className="flex-1 items-center justify-center">
          <Text className="text-sm">Transaction not found.</Text>
        </View>
      </ScreenLayout>
    );
  }

  const statusCfg = STATUS_CONFIG[tx.status] ?? STATUS_CONFIG.completed;
  const typeCfg = TYPE_CONFIG[tx.type] ?? TYPE_CONFIG.debit;
  const StatusIcon = statusCfg.icon;
  const TypeIcon = typeCfg.icon;

  return (
    <ScreenLayout screen="transaction-detail" navbarTitle="Transaction">
      <View className="gap-y-6">
        <View className="items-center gap-y-3">
          <View
            className="w-20 h-20 rounded-full items-center justify-center"
            style={{backgroundColor: typeCfg.color + "15"}}
          >
            <View
              className="w-14 h-14 rounded-full items-center justify-center"
              style={{backgroundColor: typeCfg.color + "25"}}
            >
              <TypeIcon size={26} color={typeCfg.color} strokeWidth={2} />
            </View>
          </View>

          <Text className="text-4xl font-bold tracking-tight" style={{color: typeCfg.color}}>
            {typeCfg.sign}{formatAmount(tx.amount, tx.currency)}
          </Text>

          <Text className="text-base font-semibold">{tx.description}</Text>

          <Text className="text-xs text-muted-foreground text-center">
            {formatFullDate(tx.createdAt)}{"\n"}{formatTime(tx.createdAt)}
          </Text>

          <View
            className="flex-row items-center gap-x-1.5 px-4 py-1.5 rounded-full"
            style={{backgroundColor: statusCfg.bg}}
          >
            <StatusIcon size={12} color={statusCfg.color} strokeWidth={2.5} />
            <Text className="text-xs font-bold" style={{color: statusCfg.color}}>
              {statusCfg.label}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-x-1">
          <View className="w-5 h-5 rounded-full bg-background -ml-7 border border-border" />
          <View className="flex-1 border-b border-dashed border-border" />
          <View className="w-5 h-5 rounded-full bg-background -mr-7 border border-border" />
        </View>

        <View className="bg-card rounded-2xl px-4">
          <DetailRow label="Type" value={capitalize(tx.type)} />
          <DetailRow label="Category" value={capitalize(tx.category)} />
          <DetailRow label="Reference" value={tx.reference} mono />
          {tx.fee > 0 && (
            <DetailRow label="Fee" value={formatAmount(tx.fee, tx.currency)} />
          )}
          {tx.exchangeRate != null && (
            <DetailRow label="Exchange rate" value={`1 = ${tx.exchangeRate}`} />
          )}
          <DetailRow
            label="Balance after"
            value={formatAmount(tx.balanceAfter, tx.currency)}
          />
          {tx.note && <DetailRow label="Note" value={tx.note} />}
          {tx.counterparty && (
            <>
              <DetailRow label="From / To" value={tx.counterparty.name} />
              {tx.counterparty.accountMask && (
                <DetailRow
                  label="Account"
                  value={`•••• ${tx.counterparty.accountMask}`}
                  mono
                  last
                />
              )}
            </>
          )}
        </View>

        <View className="flex-row gap-x-3">
          <ActionButton
            icon={<Copy size={18} color="#56034C" strokeWidth={1.8} />}
            label="Copy ref"
          />
          <ActionButton
            icon={<Share2 size={18} color="#56034C" strokeWidth={1.8} />}
            label="Share"
          />
          <ActionButton
            icon={<ReceiptText size={18} color="#56034C" strokeWidth={1.8} />}
            label="Receipt"
          />
        </View>
      </View>
    </ScreenLayout>
  );
};