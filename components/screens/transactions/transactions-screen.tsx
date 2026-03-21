import React, {useState, useEffect} from "react";
import {View, Text, ScrollView, Pressable} from "react-native";
import ScreenLayout from "@/components/layout/screen-layout";
import {PeriodSelector} from "@/components/features/transactions/period-selector";
import {Period, PieDataItem, TransactionTabType} from "@/components/features/transactions";
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
import {getCategoryConfig} from "@/constants/categories";

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

  // Dynamic Pie Data calculation
  const categoryMap = uiTransactions.reduce((acc, tx) => {
    const cat = tx.category || "Other";
    if (!acc[cat]) {
      acc[cat] = { total: 0, count: 0, transactions: [] };
    }
    acc[cat].total += tx.amount;
    acc[cat].count += 1;
    acc[cat].transactions.push(tx);
    return acc;
  }, {} as Record<string, { total: number; count: number; transactions: any[] }>);

  const totalSpend = uiTransactions.reduce((sum, tx) => sum + tx.amount, 0);
  
  const dynamicPieData: PieDataItem[] = Object.keys(categoryMap).map((cat) => ({
    text: cat,
    value: totalSpend > 0 ? Math.round((categoryMap[cat].total / totalSpend) * 100) : 0,
    count: categoryMap[cat].count,
    color: getCategoryConfig(cat).color,
  }));

  const dynamicCategoryAmounts: Record<string, { amount: number; positive: boolean }> = Object.keys(categoryMap).reduce((acc, cat) => {
    const txs = categoryMap[cat].transactions;
    const hasCredit = txs.some(t => t.type === "credit" || t.type === "topup");
    acc[cat] = {
      amount: categoryMap[cat].total,
      positive: hasCredit && !txs.some(t => t.type === "debit"), // Simplified logic for UI
    };
    return acc;
  }, {} as any);

  return (
    <>
    <ScreenLayout
      screen="transactions"
      navbarTitle="Transactions"
      scrollable={false}
      navbarRightContent={
        <Pressable
          onPress={() => router.push("/(protected)/(stack)/send" as any)}
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
          : <CategoriesChart period={period} data={dynamicPieData} />
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
                    pathname: "/(protected)/(stack)/transactions/[id]",
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
              {dynamicPieData.map((item) => (
                <CategoryRow
                  key={item.text}
                  item={item}
                  amountData={dynamicCategoryAmounts[item.text]}
                  onPress={(item: React.SetStateAction<PieDataItem | null>) => setSelectedCategory(item)}
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
        {selectedCategory && (
          <CategoryDetailSheet 
            item={selectedCategory as PieDataItem} 
            amountData={dynamicCategoryAmounts[selectedCategory.text]}
            transactions={transactions.filter(t => t.category.toLowerCase() === selectedCategory.text.toLowerCase())}
          />
        )}
      </BottomSheet>
    </>
  );
};

export default TransactionsScreen;