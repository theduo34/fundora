import React, {useEffect} from "react";
import {Bell} from "lucide-react-native";
import {useRouter} from "expo-router";
import {ActivityIndicator, Pressable, View, Text} from "react-native";
import ScreenLayout from "@/components/layout/screen-layout";
import {quickActions, QuickActionKey} from "@/components/features/home";
import {CardCarousel} from "@/components/features/cards/card-carousel";
import {QuickActionsRow} from "@/components/features/home/quick-actions";
import {TransactionList} from "@/components/features/transactions/transaction-list";
import {UserProfile} from "@/components/shared/user-profile";
import {useAuthStore} from "@/stores/auth.store";
import {useCardStore} from "@/stores/card.store";
import {useTransactionStore} from "@/stores/transaction.store";
import {useNotificationStore} from "@/stores/notification.store";
import {mapCard, mapTransaction} from "@/lib/mappers";

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const profile = useAuthStore((s) => s.profile);
  const {cards, fetchCards, loading: cardsLoading} = useCardStore();
  const {transactions, fetchTransactions, loading: txLoading} = useTransactionStore();
  const {notifications, fetchNotifications} = useNotificationStore();

  useEffect(() => {
    if (profile?.id) {
      fetchCards(profile.id);
      fetchTransactions(profile.id);
      fetchNotifications(profile.id);
    }
  }, [profile?.id]);

  const handleQuickAction = (key: QuickActionKey) => {
    const routes: Record<QuickActionKey, string> = {
      payment: "/payment",
      send: "/send",
      topup: "/topup",
      convert: "/convert",
    };
    router.push(routes[key] as any);
  };

  const uiCards = cards.map(mapCard);
  const uiTransactions = transactions.map(mapTransaction);
  const unreadCount = notifications.filter(n => n.status === "unread").length;

  if (cardsLoading && txLoading) {
    return (
      <ScreenLayout screen="home" navbarLeftContent={<UserProfile />}>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#56034C" />
        </View>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout
      screen="home"
      navbarLeftContent={<UserProfile />}
      navbarRightContent={
        <Pressable onPress={() => router.push("/(protected)/(stack)/notifications" as any)} className="relative">
          <Bell size={24} color="#2D0D3A" strokeWidth={1.8} />
          {unreadCount > 0 && (
            <View className="absolute -top-1 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-[1.5px] border-background" />
          )}
        </Pressable>
      }
      className={"flex flex-col gap-4"}>
      <CardCarousel cards={uiCards} />
      <QuickActionsRow actions={quickActions} onAction={handleQuickAction} />
      <TransactionList
        transactions={uiTransactions}
        onViewAll={() => router.push("/transactions" as any)}
        limit={5}
      />
    </ScreenLayout>
  );
};

export default HomeScreen;