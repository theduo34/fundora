import React from "react";
import {View, Dimensions} from "react-native";
import {BarChart} from "react-native-gifted-charts";
import {barDataByPeriod, maxValueByPeriod, Period} from "@/components/features/transactions/index";
import {AmountHeader} from "@/components/features/transactions/amount-header";

const {width: SCREEN_WIDTH} = Dimensions.get("window");

const INTERNAL_BIAS = 6;

const getBarDimensions = (count: number, ratio = 0.6) => {
  const usableWidth = SCREEN_WIDTH - INTERNAL_BIAS;
  const slotWidth = usableWidth / count;
  const barWidth = Math.floor(slotWidth * ratio);
  const spacing = Math.floor(slotWidth * (1 - ratio));
  return {barWidth, spacing};
};

interface TransactionsChartProps {
  period: Period;
}

export const TransactionsChart: React.FC<TransactionsChartProps> = ({period}) => {
  const data = barDataByPeriod[period];
  const {barWidth, spacing} = getBarDimensions(data.length);

  return (
    <View className="w-full gap-y-3">
      <AmountHeader period={period} />

      <View style={{marginHorizontal: -16, width: SCREEN_WIDTH, overflow: "hidden"}}>
        <BarChart
          data={data}
          width={SCREEN_WIDTH - INTERNAL_BIAS}
          height={160}
          barWidth={barWidth}
          spacing={spacing}
          initialSpacing={0}
          endSpacing={0}
          roundedTop
          hideRules
          hideAxesAndRules
          hideYAxisText
          yAxisThickness={0}
          xAxisThickness={0}
          xAxisLabelTextStyle={{color: "#9CA3AF", fontSize: 10}}
          noOfSections={4}
          maxValue={maxValueByPeriod[period]}
          isAnimated
        />
      </View>
    </View>
  );
};