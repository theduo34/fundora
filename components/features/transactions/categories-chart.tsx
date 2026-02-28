import React from "react";
import {View, Text} from "react-native";
import {PieChart} from "react-native-gifted-charts";
import {AmountHeader} from "@/components/features/transactions/amount-header";
import {Period, pieData} from "@/components/features/transactions/index";

interface CategoriesChartProps {
  period: Period;
}

export const CategoriesChart: React.FC<CategoriesChartProps> = ({period}) => {
  return (
    <View className="gap-y-3">
      <AmountHeader period={period} />
      <View className="items-center">
        <PieChart
          data={pieData}
          donut
          radius={90}
          innerRadius={55}
          innerCircleColor="#FAF5FB"
          centerLabelComponent={() => (
            <View className="items-center">
              <Text className="text-xs text-muted-foreground">Total</Text>
              <Text className="text-sm font-bold text-foreground">
                {pieData.length} cats
              </Text>
            </View>
          )}
          isAnimated
        />
      </View>
    </View>
  );
};