import React from "react";
import {Pressable, View, Text} from "react-native";
import {
  ArrowUpRight, ArrowDownLeft, ShieldAlert,
  XCircle, Gift, Bell, LucideIcon,
} from "lucide-react-native";
import {NotificationType, NotificationInterface} from "@/components/features/notifications/index";
import {timeAgo} from "@/lib/helper";


const TYPE_CONFIG: Record<
  NotificationType,
  { iconBg: string; iconColor: string; icon: LucideIcon }
> = {
  transaction_credit: {iconBg: "#dcfce7", iconColor: "#16a34a", icon: ArrowDownLeft},
  transaction_debit: {iconBg: "#fce7f3", iconColor: "#EB1254", icon: ArrowUpRight},
  transaction_failed: {iconBg: "#fee2e2", iconColor: "#dc2626", icon: XCircle},
  security_alert: {iconBg: "#fef3c7", iconColor: "#d97706", icon: ShieldAlert},
  account_update: {iconBg: "#ede9fe", iconColor: "#7c3aed", icon: Bell},
  promotion: {iconBg: "#fce7f3", iconColor: "#EB1254", icon: Gift},
  system: {iconBg: "#f3f4f6", iconColor: "#6b7280", icon: Bell},
};


export const getTypeConfig = (type: NotificationType) =>
  TYPE_CONFIG[type] ?? TYPE_CONFIG.system;


interface NotificationItemProps {
  notification: NotificationInterface;
  onPress: (n: NotificationInterface) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = (
  {
    notification: n,
    onPress,
  }) => {
  const config = getTypeConfig(n.type);
  const IconComponent = config.icon;
  const isUnread = n.status === "unread";

  return (
    <Pressable
      onPress={() => onPress(n)}
      className="flex-row gap-x-3 p-3 rounded-lg active:opacity-70 bg-card"
    >
      {/* Icon */}
      <View
        className="w-11 h-11 rounded-full items-center justify-center shrink-0"
        style={{backgroundColor: config.iconBg}}
      >
        <IconComponent size={18} color={config.iconColor} strokeWidth={2}/>
      </View>

      {/* Content */}
      <View className="flex-1 gap-y-0.5">
        <View className="flex-row justify-between items-start">
          <Text
            className="text-sm font-semibold flex-1 pr-2"
            numberOfLines={1}
          >
            {n.title}
          </Text>
          <Text className="text-[10px] shrink-0">
            {timeAgo(n.createdAt)}
          </Text>
        </View>
        <Text className="text-xs leading-4" numberOfLines={2}>
          {n.body}
        </Text>
      </View>

      {/* Unread dot */}
      {isUnread && (
        <View className="w-2 h-2 rounded-full bg-primary self-start mt-1.5 shrink-0"/>
      )}
    </Pressable>
  );
};