import React from "react";
import {View, Text, Pressable} from "react-native";
import {useRouter} from "expo-router";
import {
  UserCircle, ShieldCheck, Headphones,
  Bell, Gift, ChevronRight, LucideIcon,
} from "lucide-react-native";
import ScreenLayout from "@/components/layout/screen-layout";
import {settingsItems} from "@/components/features/settings";


const ICON_MAP: Record<string, LucideIcon> = {
  UserCircle, ShieldCheck, Headphones, Bell, Gift,
};


const SettingsRow: React.FC<{
  iconName: string;
  label: string;
  onPress: () => void;
}> = ({iconName, label, onPress}) => {
  const Icon = ICON_MAP[iconName] ?? UserCircle;

  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-x-4 px-4 py-4 bg-card rounded-2xl active:opacity-70"
    >
      <View className="w-9 h-9 rounded-full bg-background items-center justify-center">
        <Icon size={18} color="#56034C" strokeWidth={1.8} />
      </View>
      <Text className="flex-1 text-sm font-semibold text-foreground">{label}</Text>
      <ChevronRight size={18} color="#9CA3AF" strokeWidth={1.8} />
    </Pressable>
  );
};

// ─── Screen ───────────────────────────────────────────────────────────────────

const SettingsScreen: React.FC = () => {
  const router = useRouter();

  return (
    <ScreenLayout screen="settings" navbarTitle="Settings">
      <View className="gap-y-3 flex-1">
        {/* Settings list */}
        <View className="gap-y-2">
          {settingsItems.map((item) => (
            <SettingsRow
              key={item.key}
              iconName={item.iconName}
              label={item.label}
              onPress={() => router.push(item.route as any)}
            />
          ))}
        </View>
      </View>
    </ScreenLayout>
  );
};

export default SettingsScreen;