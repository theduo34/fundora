import { LinearGradient } from "expo-linear-gradient";
import { forwardRef } from "react";
import { ViewProps } from "react-native";
import { gradients } from "@/theme/colors";
import { cn } from "@/lib/utils";

export type GradientVariant = keyof typeof gradients;

interface GradientViewProps extends ViewProps {
  variant?: GradientVariant;
  className?: string;
}

export const GradientView = forwardRef<LinearGradient, GradientViewProps>(
  function GradientView({ variant = "primary", className, ...props }, ref) {
    const colors = [...(gradients[variant] ?? [])] as string[];
    const locations = colors.map((_, i) =>
      colors.length === 1 ? 0 : i / (colors.length - 1)
    );

    return (
      <LinearGradient
        ref={ref}
        colors={colors as any}
        locations={locations as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className={cn(className)}
        {...props}
      />
    );
  }
);