import {
  ShoppingBag, ShoppingCart, GraduationCap, Bus,
  Utensils, Zap, HeartPulse, Plane, Gamepad, Tag,
  ArrowLeftRight, Download, RefreshCcw, LucideIcon
} from "lucide-react-native";

export interface CategoryInfo {
  icon: LucideIcon;
  color: string;
  label: string;
}

export const CATEGORY_CONFIG: Record<string, CategoryInfo> = {
  shopping: { icon: ShoppingBag, color: "#EC4899", label: "Shopping" },
  food: { icon: Utensils, color: "#F59E0B", label: "Food" },
  transport: { icon: Bus, color: "#3B82F6", label: "Transport" },
  utilities: { icon: Zap, color: "#10B981", label: "Utilities" },
  health: { icon: HeartPulse, color: "#EF4444", label: "Health" },
  education: { icon: GraduationCap, color: "#8B5CF6", label: "Education" },
  entertainment: { icon: Gamepad, color: "#6366F1", label: "Entertainment" },
  transfer: { icon: ArrowLeftRight, color: "#56034C", label: "Transfer" },
  topup: { icon: Download, color: "#16A34A", label: "Top-up" },
  convert: { icon: RefreshCcw, color: "#BC005B", label: "Currency" },
  other: { icon: Tag, color: "#9CA3AF", label: "Other" },
};

export const getCategoryConfig = (category: string): CategoryInfo => {
  const normalized = category?.toLowerCase() || "other";
  return CATEGORY_CONFIG[normalized] || CATEGORY_CONFIG.other;
};
