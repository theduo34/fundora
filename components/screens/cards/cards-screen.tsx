import React, {useState, useEffect} from "react";
import {View, Text, ScrollView, Pressable} from "react-native";
import {Plus} from "lucide-react-native";
import {useRouter} from "expo-router";
import ScreenLayout from "@/components/layout/screen-layout";
import {EmptyCards} from "@/components/features/cards/empty-cards";
import {Card} from "@/components/features/home";
import {CardQuickActions} from "@/components/features/cards/card-quick-action";
import {CardCarousel} from "@/components/features/cards/card-carousel";
import {TransactionItem} from "@/components/features/transactions/transaction-list";
import {useAuthStore} from "@/stores/auth.store";
import {useCardStore} from "@/stores/card.store";
import {useTransactionStore} from "@/stores/transaction.store";
import {mapCard, mapTransaction} from "@/lib/mappers";

const CardsScreen: React.FC = () => {
  const router = useRouter();
  const profile = useAuthStore((s) => s.profile);
  const {cards, fetchCards} = useCardStore();
  const {transactions, fetchTransactions} = useTransactionStore();

  const [isNumberVisible, setIsNumberVisible] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);

  const uiCards = cards.map(mapCard);
  const uiTransactions = transactions.map(mapTransaction);
  const [activeCard, setActiveCard] = useState<Card | null>(null);

  useEffect(() => {
    if (profile?.id) {
      fetchCards(profile.id);
      fetchTransactions(profile.id);
    }
  }, [profile?.id]);

  useEffect(() => {
    if (uiCards.length > 0 && !activeCard) {
      setActiveCard(uiCards[0]);
    }
  }, [uiCards.length]);

  const hasCards = uiCards.length > 0;

  const cardTransactions = uiTransactions.filter(
    (tx) => tx.cardId === activeCard?.id
  );

  return (
    <ScreenLayout
      screen="cards"
      navbarTitle="Cards"
      navbarRightContent={
        <Pressable
          onPress={() => router.push("/(protected)/(stack)/add-card" as any)}
          className="w-9 h-9 rounded-full bg-card border border-border items-center justify-center active:opacity-60"
          hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}
        >
          <Plus size={18} color="#56034C" strokeWidth={2.5} />
        </Pressable>
      }
      scrollable={false}
    >
      {!hasCards ? (
        <EmptyCards />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 32, gap: 20}}
        >
          <CardCarousel
            cards={uiCards}
            showFullNumber={isNumberVisible}
            frozen={isFrozen}
            onActiveCardChange={(card) => {
              setActiveCard(card);
              setIsNumberVisible(false);
              setIsFrozen(false);
            }}
          />

          <CardQuickActions
            isNumberVisible={isNumberVisible}
            isFrozen={isFrozen}
            onToggleVisibility={() => {
              if (!isFrozen) setIsNumberVisible((v) => !v);
            }}
            onFreeze={() => {
              setIsFrozen((v) => !v);
              setIsNumberVisible(false);
            }}
            onTopUp={() => router.push("/(protected)/(stack)/topup" as any)}
            onSettings={() => router.push("/(protected)/(stack)/card-settings" as any)}
          />

          <View className="gap-y-3">
            {cardTransactions.length === 0 ? (
              <View className="items-center py-8">
                <Text className="text-sm text-muted-foreground">
                  No transactions for this card
                </Text>
              </View>
            ) : (
              <View className="gap-y-2">
                {cardTransactions.map((tx) => (
                  <TransactionItem
                    key={tx.id}
                    transaction={tx}
                    onPress={(tx) => router.push({
                      pathname: "/(protected)/(stack)/transactions/[id]",
                      params: {id: tx.id},
                    } as any)}
                  />
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </ScreenLayout>
  );
};

export default CardsScreen;