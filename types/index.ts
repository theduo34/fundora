export type CardNetwork = "visa" | "mastercard" | "amex" | "discover";
export type CardType = "debit" | "credit" | "prepaid";
export type CardStatus = "active" | "frozen" | "expired" | "cancelled";
export type TransactionType = "debit" | "credit" | "transfer" | "topup" | "convert";
export type TransactionStatus = "pending" | "completed" | "failed" | "reversed";
export type TransactionCategory =
  | "entertainment" | "food" | "transport" | "shopping"
  | "utilities" | "transfer" | "topup" | "convert"
  | "health" | "education" | "other";
export type NotificationType =
  | "transaction_debit" | "transaction_credit" | "transaction_failed"
  | "security_alert" | "account_update" | "promotion" | "system";
export type NotificationStatus = "unread" | "read";

export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  avatar_url: string | null;
  currency_code: string;
  balance: number;
  address: string | null;
  created_at: string;
  updated_at: string;
}

export interface Card {
  id: string;
  user_id: string;
  network: CardNetwork;
  type: CardType;
  status: CardStatus;
  label: string;
  card_holder_name: string;
  masked_pan: string;
  expiry_month: string;
  expiry_year: string;
  balance: number;
  credit_limit: number | null;
  available_credit: number | null;
  gradient_variant: string;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  card_id: string | null;
  type: TransactionType;
  status: TransactionStatus;
  category: TransactionCategory;
  amount: number;
  currency: string;
  description: string;
  note: string | null;
  merchant_logo_url: string | null;
  counterparty_name: string | null;
  counterparty_avatar_url: string | null;
  counterparty_account_mask: string | null;
  reference: string;
  balance_after: number;
  fee: number;
  exchange_rate: number | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
}

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  status: NotificationStatus;
  title: string;
  body: string;
  full_content: string;
  amount: number | null;
  currency: string | null;
  action_url: string | null;
  icon_name: string;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  read_at: string | null;
}
