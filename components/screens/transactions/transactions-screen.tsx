import React, {useState} from "react";
import {View, Text, ScrollView} from "react-native";
import ScreenLayout from "@/components/layout/screen-layout";
import {dummyTransactions} from "@/components/features/home";
import {PeriodSelector} from "@/components/features/transactions/period-selector";
import {Period, pieData, PieDataItem, TransactionTabType} from "@/components/features/transactions";
import {TransactionsChart} from "@/components/features/transactions/transactions-chart";
import {CategoriesChart} from "@/components/features/transactions/categories-chart";
import {TabSwitcher} from "@/components/features/transactions/tab-switcher";
import {TransactionItem} from "@/components/features/transactions/transaction-list";
import {CategoryRow} from "@/components/features/transactions/categories-row";
import { BottomSheet } from "@/components/layout/bottom-sheet";
import {CategoryDetailSheet} from "@/components/screens/transactions/category-detail-sheet";
import {useRouter} from "expo-router";

const TransactionsScreen: React.FC = () => {
  const router = useRouter();
  const [period, setPeriod] = useState<Period>("Week");
  const [activeTab, setActiveTab] = useState<TransactionTabType>("Transactions");
  const [selectedCategory, setSelectedCategory] = useState<PieDataItem | null>(null);

  return (
    <>
    <ScreenLayout
      screen="transactions"
      navbarTitle="Transactions"
      scrollable={false}
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
              {dummyTransactions.map((tx) => (
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

      {/* Category detail sheet */}
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