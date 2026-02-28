import React from "react";
import {Pressable, View, Text} from "react-native";
import {
  ReceiptText,
  Send,
  PlusCircle,
  RefreshCcw,
  LucideIcon,
} from "lucide-react-native";
import {QuickAction, QuickActionKey} from "@/components/features/home/index";

const ICON_MAP: Record<string, LucideIcon> = {
  ReceiptText,
  Send,
  PlusCircle,
  RefreshCcw,
};

interface QuickActionButtonProps {
  action: QuickAction;
  onPress: (key: QuickActionKey) => void;
}

export const QuickActionButton: React.FC<QuickActionButtonProps> = ({action, onPress,}) => {
  const IconComponent = ICON_MAP[action.iconName] ?? ReceiptText;

  return (
    <Pressable
      onPress={() => onPress(action.key)}
      className="flex-1 items-center gap-y-2 active:opacity-60 bg-card p-4 rounded-lg"
    >
      <View className="w-13 h-13 rounded-2xl bg-card items-center justify-center">
        <IconComponent size={22}  strokeWidth={1.8} />
      </View>
      <Text className="text-xs font-medium text-center">
        {action.label}
      </Text>
    </Pressable>
  );
};

interface QuickActionsRowProps {
  actions: QuickAction[];
  onAction: (key: QuickActionKey) => void;
}

export const QuickActionsRow: React.FC<QuickActionsRowProps> = ({actions, onAction,}) => (
  <View className="flex-row justify-between py-2 gap-4">
    {actions.map((a) => (
      <QuickActionButton key={a.key} action={a} onPress={onAction} />
    ))}
  </View>
);