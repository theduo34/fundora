import React from "react";
import {View, Text} from "react-native";
import {TrendingUp, TrendingDown} from "lucide-react-native";
import {Period, totalByPeriod, trendByPeriod} from "@/components/features/transactions/index";

interface AmountHeaderProps {
  period: Period;
}

export const AmountHeader: React.FC<AmountHeaderProps> = ({period}) => {
  const total = totalByPeriod[period];
  const trend = trendByPeriod[period];

  const formatted = (total / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <View className="gap-y-1">
      <Text className="text-3xl font-bold text-foreground">{formatted}</Text>
      <View className="flex-row items-center gap-x-1">
        {trend.up
          ? <TrendingUp  size={13} color="#16a34a" strokeWidth={2} />
          : <TrendingDown size={13} color="#EB1254" strokeWidth={2} />
        }
        <Text
          className="text-xs font-medium"
          style={{color: trend.up ? "#16a34a" : "#EB1254"}}
        >
          you spent {trend.value}%{" "}
          {trend.up ? "less" : "more"} than last {period.toLowerCase()}
        </Text>
      </View>
    </View>
  );
};