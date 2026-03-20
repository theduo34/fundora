import React from "react";
import {View, Text} from "react-native";
import {CreditCard} from "lucide-react-native";
import {CardNetwork} from "@/components/features/cards/index";

interface CardNetworkLogoProps {
  network: CardNetwork | null;
  size?: "sm" | "md";
}

export const CardNetworkLogo: React.FC<CardNetworkLogoProps> = ({
                                                                  network,
                                                                  size = "md",
                                                                }) => {
  if (!network) {
    return <CreditCard size={size === "md" ? 22 : 16} color="#9CA3AF" strokeWidth={1.5} />;
  }

  const labels: Record<CardNetwork, string> = {
    visa:       "VISA",
    mastercard: "MC",
    amex:       "AMEX",
    discover:   "DISC",
  };

  const colors: Record<CardNetwork, string> = {
    visa:       "#1A1F71",
    mastercard: "#EB001B",
    amex:       "#007BC1",
    discover:   "#FF6600",
  };

  return (
    <Text
      style={{
        color: colors[network],
        fontSize: size === "md" ? 16 : 12,
        fontWeight: "900",
        fontStyle: "italic",
        letterSpacing: 1,
      }}
    >
      {labels[network]}
    </Text>
  );
};