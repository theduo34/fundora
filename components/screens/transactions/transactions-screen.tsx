import React, {useState, useEffect} from "react";
import {View, Text, ScrollView, Pressable} from "react-native";
import ScreenLayout from "@/components/layout/screen-layout";
import {PeriodSelector} from "@/components/features/transactions/period-selector";
import {Period, pieData, PieDataItem, TransactionTabType} from "@/components/features/transactions";
import {TransactionsChart} from "@/components/features/transactions/transactions-chart";
import {CategoriesChart} from "@/components/features/transactions/categories-chart";
import {TabSwitcher} from "@/components/features/transactions/tab-switcher";
import {TransactionItem} from "@/components/features/transactions/transaction-list";
import {CategoryRow} from "@/components/features/transactions/categories-row";
import {BottomSheet} from "@/components/layout/bottom-sheet";
import {CategoryDetailSheet} from "@/components/screens/transactions/category-detail-sheet";
import {useRouter} from "expo-router";
import {Send} from "lucide-react-native";
import {useAuthStore} from "@/stores/auth.store";
import {useTransactionStore} from "@/stores/transaction.store";
import {mapTransaction} from "@/lib/mappers";

const TransactionsScreen: React.FC = () => {
  const router = useRouter();
  const profile = useAuthStore((s) => s.profile);
  const {transactions, fetchTransactions} = useTransactionStore();
  const [period, setPeriod] = useState<Period>("Week");
  const [activeTab, setActiveTab] = useState<TransactionTabType>("Transactions");
  const [selectedCategory, setSelectedCategory] = useState<PieDataItem | null>(null);

  useEffect(() => {
    if (profile?.id) fetchTransactions(profile.id);
  }, [profile?.id]);

  const uiTransactions = transactions.map(mapTransaction);

  return (
    <>
    <ScreenLayout
      screen="transactions"
      navbarTitle="Transactions"
      scrollable={false}
      navbarRightContent={
        <Pressable
          onPress={() => router.push("/(protected)/(stack)/add-card" as any)}
          className="w-9 h-9 rounded-full bg-card border border-border items-center justify-center active:opacity-60"
          hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}
        >
          <Send size={18} color="#56034C" strokeWidth={2.5} />
        </Pressable>
      }
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 32, gap: 16}}
      >
        <PeriodSelector selected={period} onChange={setPeriod} />

        {activeTab === "Transactions"
          ? <TransactionsChart period={period} />
          : <CategoriesChart period={period} />
        }

        <TabSwitcher selected={activeTab} onChange={setActiveTab} />

        {activeTab === "Transactions" ? (
          <View className="gap-y-2">
            <Text className="text-sm font-bold ">
              Recent transactions
            </Text>
            <View className="gap-y-2">
              {uiTransactions.map((tx) => (
                <TransactionItem
                  key={tx.id}
                  transaction={tx}
                  onPress={(tx) => router.push({
                    pathname: "/(stack)/transactions/[id]",
                    params: {id: tx.id},
                  } as any)}
                />
              ))}
            </View>
          </View>
        ) : (
          <View className="gap-y-2">
            <Text className="text-sm font-bold">
              Categories
            </Text>
            <View className="gap-y-2">
              {pieData.map((item) => (
                <CategoryRow
                  key={item.text}
                  item={item}
                  onCategoryPress={(item) => setSelectedCategory(item)}
                />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </ScreenLayout>

      <BottomSheet
        visible={!!selectedCategory}
        onClose={() => setSelectedCategory(null)}
        title={selectedCategory?.text}
        heightRatio={0.75}
      >
        {selectedCategory && <CategoryDetailSheet item={selectedCategory} />}
      </BottomSheet>
    </>
  );
};

export default TransactionsScreen;