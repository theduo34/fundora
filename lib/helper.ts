import {Transaction} from "@/components/features/home";

export const formatAmount = (tx: Transaction): string => {
  const dollars = tx.amount / 100;
  const formatted = dollars.toLocaleString("en-US", {
    style: "currency",
    currency: tx.currency,
  });
  return tx.type === "credit" ? `+${formatted}` : `-${formatted}`;
};

export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

