import { LinearGradient } from "expo-linear-gradient";
import { forwardRef } from "react";
import { ViewProps } from "react-native";
import { gradients } from "@/theme/colors";
import { cn } from "@/lib/utils";

type GradientVariant = keyof typeof gradients;

interface GradientViewProps extends ViewProps {
  variant?: GradientVariant;
  className?: string;
}

export const GradientView = forwardRef<
  LinearGradient,
  GradientViewProps
>(function GradientView(
  { variant = "primary", className, ...props },
  ref
) {
  return (
    <LinearGradient
      ref={ref}
      colors={gradients[variant]}
      locations={[0, 0.19, 0.42, 0.67, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      className={cn(className)}
      {...props}
    />
  );
});
