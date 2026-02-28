import React from "react";
import {View, Text, Dimensions} from "react-native";
import {GradientView} from "@/components/ui/gradient-view";
import {Card} from "@/components/features/home/index";

interface VisaCardProps {
  card: Card;
}

const {height: SCREEN_HEIGHT} = Dimensions.get("window");
export const CARD_HEIGHT = SCREEN_HEIGHT / 4;

export const VisaCard: React.FC<VisaCardProps> = ({card}) => {
  const formattedBalance = (card.balance / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const panGroups = ["1234", "5678", "9101", card.maskedPan];

  return (
    <GradientView
      variant={card.gradientVariant}
      className="w-full rounded-lg p-4 flex-col justify-between"
      style={{height: CARD_HEIGHT}}
    >
      <View className="flex-row items-start justify-between">
        <Text className="text-white text-2xl font-bold tracking-wide">
          {formattedBalance}
        </Text>
        <NetworkLogo network={card.network} />
      </View>

      <View className="gap-y-1">
        <Text className="text-white/60 text-[10px] font-medium uppercase tracking-widest">
          Card Number
        </Text>
        <View className="flex-row items-center justify-between">
          <View className="flex-row gap-x-3">
            {panGroups.map((group, i) => (
              <Text key={i} className="text-white text-sm font-semibold tracking-[2px]">
                {group}
              </Text>
            ))}
          </View>
          <View className="flex-row items-center">
            {Array.from({length: 5}).map((_, i) => (
              <Text key={i} className="text-white/70">))</Text>
            ))}
          </View>
        </View>
      </View>

      {/* Bottom: holder / expiry / cvv */}
      <View className="flex-row justify-between items-end">
        <CardField label="Card Holder Name" value={card.cardHolderName} />
        <CardField label="Expiry date" value={`${card.expiryMonth}/${card.expiryYear}`} />
        <CardField label="CVV" value={card.cvv} />
      </View>
    </GradientView>
  );
};

const NetworkLogo: React.FC<{network: string}> = ({network}) => {
  const labels: Record<string, string> = {
    visa: "VISA",
    mastercard: "MC",
    amex: "AMEX",
    discover: "DISC",
  };
  return (
    <Text className="text-white text-xl font-black italic tracking-wider">
      {labels[network] ?? network.toUpperCase()}
    </Text>
  );
};

const CardField: React.FC<{label: string; value: string}> = ({label, value}) => (
  <View className="gap-y-0.5">
    <Text className="text-white/60 text-[9px] font-medium uppercase tracking-wider">
      {label}
    </Text>
    <Text className="text-white text-xs font-semibold tracking-wide">
      {value}
    </Text>
  </View>
);