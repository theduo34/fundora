import {View, Text} from "react-native";
import {Image} from "expo-image";
import {useAuthStore} from "@/stores/auth.store";

export const UserProfile: React.FC = () => {
  const profile = useAuthStore((s) => s.profile);

  const firstName = profile?.first_name || "User";
  const lastName = profile?.last_name || "";
  const avatarUrl = profile?.avatar_url;
  const balance = profile?.balance ?? 0;
  const currencyCode = profile?.currency_code ?? "USD";

  const formattedBalance = (balance / 100).toLocaleString("en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 0,
  });

  return (
    <View className="flex-row items-center gap-x-3">
      {avatarUrl ? (
        <Image
          source={{uri: avatarUrl}}
          className="w-12 h-12 rounded-full"
          resizeMode="cover"
        />
      ) : (
        <View className="w-10 h-10 rounded-full bg-card items-center justify-center">
          <Text className="text-sm font-bold text-secondary">
            {firstName[0]}{lastName?.[0] ?? ""}
          </Text>
        </View>
      )}
      <View>
        <Text className="text-xs text-muted-foreground font-medium">
          Hi, {firstName}.
        </Text>
        <View className="flex-row items-center gap-x-1">
          <Text className="text-sm text-foreground font-medium">Balance:</Text>
          <Text className="text-sm text-foreground font-extrabold">
            {formattedBalance}
          </Text>
        </View>
      </View>
    </View>
  );
};
