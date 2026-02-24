import {dummyUser} from "@/components/features/home";
import {View, Text} from "react-native";
import {Image} from 'expo-image';

export const UserProfile: React.FC = () => {
  const formattedBalance = (dummyUser.balance / 100).toLocaleString("en-US", {
    style: "currency",
    currency: dummyUser.currencyCode,
    minimumFractionDigits: 0,
  });

  return (
    <View className="flex-row items-center gap-x-3">
      {/* Avatar */}
      {dummyUser.avatarUrl ? (
        <Image
          source={{uri: dummyUser.avatarUrl}}
          className="w-10 h-10 rounded-full"
          resizeMode="cover"
        />
      ) : (
        <View className="w-10 h-10 rounded-full bg-card items-center justify-center">
          <Text className="text-sm font-bold text-secondary">
            {dummyUser.firstName[0]}{dummyUser.lastName[0]}
          </Text>
        </View>
      )}

      {/* Greeting + balance */}
      <View>
        <Text className="text-xs text-muted-foreground font-medium">
          Hi, {dummyUser.firstName}.
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
