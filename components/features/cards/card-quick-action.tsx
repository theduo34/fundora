import React from "react";
import {View, Text, Pressable} from "react-native";
import {Eye, EyeOff, Snowflake, Plus, Settings, LucideIcon} from "lucide-react-native";

interface CardQuickActionsProps {
  isNumberVisible: boolean;
  isFrozen: boolean;
  onToggleVisibility: () => void;
  onFreeze: () => void;
  onTopUp: () => void;
  onSettings: () => void;
}

const ActionButton: React.FC<{
  icon: LucideIcon;
  label: string;
  onPress: () => void;
  isActive?: boolean;
}> = ({icon: Icon, label, onPress, isActive = false}) => (
  <Pressable
    onPress={onPress}
    className="flex-1 items-center gap-y-2 active:opacity-60 bg-card p-4 rounded-lg"
  >
    <View className="w-13 h-13 rounded-2xl bg-card items-center justify-center">
      <Icon
        size={22}
        color={isActive ? "#56034C" : "#2D0D3A"}
        strokeWidth={1.8}
      />
    </View>
    <Text className="text-xs font-medium text-center text-foreground">
      {label}
    </Text>
  </Pressable>
);

export const CardQuickActions: React.FC<CardQuickActionsProps> = (
  {
    isNumberVisible,
    isFrozen,
    onToggleVisibility,
    onFreeze,
    onTopUp,
    onSettings,
  }) => (
  <View className="flex-row justify-between py-2 gap-4">  {/* ← was px-2 */}
    <ActionButton
      icon={isNumberVisible ? Eye : EyeOff}
      label="Hide"
      onPress={onToggleVisibility}
      isActive={isNumberVisible}
    />
    <ActionButton
      icon={Snowflake}
      label="Freeze"
      onPress={onFreeze}
      isActive={isFrozen}
    />
    <ActionButton
      icon={Plus}
      label="Top up"
      onPress={onTopUp}
    />
    <ActionButton
      icon={Settings}
      label="Settings"
      onPress={onSettings}
    />
  </View>
);