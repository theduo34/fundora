import React from "react";
import {View, Text, Pressable, ScrollView} from "react-native";
import {useLocalSearchParams, useRouter} from "expo-router";
import {ExternalLink} from "lucide-react-native";

import ScreenLayout from "@/components/layout/screen-layout";
import {dummyNotifications} from "@/components/features/notifications";
import {getTypeConfig} from "@/components/features/notifications/notification-item";


const formatAmount = (amount: number, currency: string): string =>
  (amount / 100).toLocaleString("en-US", {style: "currency", currency});


const NotificationDetailScreen: React.FC = () => {
  const {id} = useLocalSearchParams<{id: string}>();
  const router = useRouter();

  const notification = dummyNotifications.find((n) => n.id === id);

  if (!notification) {
    return (
      <ScreenLayout screen="notification-detail" showBack navbarTitle="Notification">
        <View className="flex-1 items-center justify-center">
          <Text className="text-muted-foreground text-sm">Notification not found.</Text>
        </View>
      </ScreenLayout>
    );
  }

  const config = getTypeConfig(notification.type);
  const IconComponent = config.icon;

  const formattedDate = new Date(notification.createdAt).toLocaleDateString(
    "en-US",
    {weekday: "long", day: "numeric", month: "long", year: "numeric"}
  );
  const formattedTime = new Date(notification.createdAt).toLocaleTimeString(
    "en-US",
    {hour: "2-digit", minute: "2-digit"}
  );

  return (
    <ScreenLayout
      screen="notification-detail"
      showBack
      navbarTitle="Notification"
      scrollable={false}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 32}}>

        <View className="items-center gap-y-4 pt-4 pb-6">
          <View
            className="w-20 h-20 rounded-full items-center justify-center"
            style={{backgroundColor: config.iconBg}}
          >
            <IconComponent size={36} color={config.iconColor} strokeWidth={1.8} />
          </View>

          <View className="items-center gap-y-1 px-4">
            <Text className="text-xl font-bold text-foreground text-center">
              {notification.title}
            </Text>
            <Text className="text-xs text-muted-foreground">
              {formattedDate} · {formattedTime}
            </Text>
          </View>

          {notification.amount !== null && notification.currency && (
            <View
              className="px-5 py-2 rounded-full"
              style={{backgroundColor: config.iconBg}}
            >
              <Text className="text-base font-bold" style={{color: config.iconColor}}>
                {notification.type === "transaction_credit" ? "+" : "-"}
                {formatAmount(notification.amount, notification.currency)}
              </Text>
            </View>
          )}
        </View>

        <View className="h-px bg-border mx-1 mb-5" />

        <View className="bg-card rounded-lg p-4 gap-y-3">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            Details
          </Text>
          <Text className="text-sm text-foreground leading-6">
            {notification.fullContent}
          </Text>
        </View>

        {Object.keys(notification.metadata).length > 0 && (
          <View className="bg-card rounded-lg p-4 gap-y-2 mt-3">
            <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">
              Reference
            </Text>
            {Object.entries(notification.metadata).map(([key, value]) => (
              <View key={key} className="flex-row justify-between items-center">
                <Text className="text-xs text-muted-foreground capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </Text>
                <Text className="text-xs font-medium text-foreground">
                  {String(value)}
                </Text>
              </View>
            ))}
          </View>
        )}

        {notification.actionUrl && (
          <Pressable
            onPress={() => router.push(notification.actionUrl as any)}
            className="mt-4 bg-primary rounded-lg py-4 flex-row items-center justify-center gap-x-2 active:opacity-80"
          >
            <Text className="text-white text-sm font-bold">
              {notification.type === "transaction_failed"
                ? "Top Up Now"
                : notification.type === "promotion"
                  ? "Claim Offer"
                  : notification.type === "security_alert"
                    ? "Review Security"
                    : "View Transaction"}
            </Text>
            <ExternalLink size={15} color="#ffffff" strokeWidth={2} />
          </Pressable>
        )}

      </ScrollView>
    </ScreenLayout>
  );
};

export default NotificationDetailScreen;