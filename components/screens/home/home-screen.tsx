import React from "react";
import {Bell} from "lucide-react-native";
import {useRouter} from "expo-router";

import ScreenLayout from "@/components/layout/screen-layout";
import {dummyCards, dummyTransactions, QuickActionKey, quickActions} from "@/components/features/home";
import {CardCarousel} from "@/components/features/home/card-carousel";
import {QuickActionsRow} from "@/components/features/home/quick-actions";
import {TransactionList} from "@/components/features/transactions/transaction-list";
import {UserProfile} from "@/components/shared/user-profile";
import {Pressable} from "react-native";

const HomeScreen: React.FC = () => {
  const router = useRouter();

  const handleQuickAction = (key: QuickActionKey) => {
    const routes: Record<QuickActionKey, string> = {
      payment: "/payment",
      send:    "/send",
      topup:   "/topup",
      convert: "/convert",
    };
    router.push(routes[key] as any);
  };

  const navigationToNotification = () => {
    router.push("/notifications");
  }

  return (
    <ScreenLayout
      screen="home"
      navbarLeftContent={<UserProfile/>}
      navbarRightContent={
        <Pressable onPress={() => navigationToNotification()}>
          <Bell size={22} color="#2D0D3A" strokeWidth={1.8} />
        </Pressable>
      }
      className={"flex flex-col gap-4"}
    >
      <CardCarousel cards={dummyCards} />

      <QuickActionsRow actions={quickActions} onAction={handleQuickAction} />

      <TransactionList
        transactions={dummyTransactions}
        onViewAll={() => router.push("/transactions" as any)}
        limit={5}
      />
    </ScreenLayout>
  );
};

export default HomeScreen;