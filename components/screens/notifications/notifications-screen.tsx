import React, {useEffect} from "react";
import {View, Text, Pressable, SectionList} from "react-native";
import {useRouter} from "expo-router";
import {BellOff} from "lucide-react-native";
import ScreenLayout from "@/components/layout/screen-layout";
import {NotificationInterface} from "@/components/features/notifications";
import {NotificationItem} from "@/components/features/notifications/notification-item";
import {useAuthStore} from "@/stores/auth.store";
import {useNotificationStore} from "@/stores/notification.store";
import {mapNotification} from "@/lib/mappers";

const groupByDate = (notifications: NotificationInterface[]) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const groups: Record<string, NotificationInterface[]> = {};

  notifications.forEach((n) => {
    const date = new Date(n.createdAt);
    date.setHours(0, 0, 0, 0);
    let label: string;
    if (date.getTime() === today.getTime()) label = "Today";
    else if (date.getTime() === yesterday.getTime()) label = "Yesterday";
    else label = date.toLocaleDateString("en-US", {day: "numeric", month: "long", year: "numeric"});

    if (!groups[label]) groups[label] = [];
    groups[label].push(n);
  });

  return Object.entries(groups).map(([title, data]) => ({title, data}));
};

const NotificationsScreen: React.FC = () => {
  const router = useRouter();
  const profile = useAuthStore((s) => s.profile);
  const {notifications, fetchNotifications, markAsRead, markAllAsRead} = useNotificationStore();

  useEffect(() => {
    if (profile?.id) fetchNotifications(profile.id);
  }, [profile?.id]);

  const uiNotifications = notifications.map(mapNotification);
  const unreadCount = uiNotifications.filter((n) => n.status === "unread").length;
  const sections = groupByDate(uiNotifications);

  const handleMarkAllRead = () => {
    if (profile?.id) markAllAsRead(profile.id);
  };

  const handlePress = (n: NotificationInterface) => {
    if (n.status === "unread") markAsRead(n.id);
    router.push({
      pathname: "/(protected)/(stack)/notifications/[id]",
      params: {id: n.id},
    } as any);
  };

  return (
    <ScreenLayout
      screen="notifications"
      navbarTitle="Notifications"
      scrollable={false}
    >
      {unreadCount > 0 && (
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-xs text-muted-foreground">
            {unreadCount} unread
          </Text>
          <Pressable onPress={handleMarkAllRead} className="active:opacity-60">
            <Text className="text-xs font-semibold text-primary">
              Mark all as read
            </Text>
          </Pressable>
        </View>
      )}

      {sections.length === 0 ? (
        <View className="flex-1 items-center justify-center gap-y-3">
          <View className="w-16 h-16 rounded-full bg-card items-center justify-center">
            <BellOff size={28} color="#5C3568" strokeWidth={1.5} />
          </View>
          <Text className="text-sm font-medium text-muted-foreground">
            {"You're all caught up"}
          </Text>
        </View>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
          contentContainerStyle={{gap: 8, paddingBottom: 24}}
          renderSectionHeader={({section}) => (
            <Text className="text-xs font-semibold uppercase tracking-widest mt-2 mb-1">
              {section.title}
            </Text>
          )}
          renderItem={({item}) => (
            <NotificationItem notification={item} onPress={handlePress} />
          )}
          ItemSeparatorComponent={() => <View className="h-2" />}
        />
      )}
    </ScreenLayout>
  );
};

export default NotificationsScreen;