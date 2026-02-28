export type NotificationType =
  | "transaction_debit"
  | "transaction_credit"
  | "transaction_failed"
  | "security_alert"
  | "account_update"
  | "promotion"
  | "system";

export type NotificationStatus = "unread" | "read";

export interface NotificationInterface {
  id: string;
  userId: string;
  type: NotificationType;
  status: NotificationStatus;
  title: string;
  body: string;          // short preview shown in list
  fullContent: string;   // full message shown in detail screen
  amount: number | null; // cents, if transaction-related
  currency: string | null;
  actionUrl: string | null; // deep link if tappable
  iconName: string;      // lucide icon name
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  readAt: string | null;
}

export const dummyNotifications: NotificationInterface[] = [
  {
    id: "ntf_001",
    userId: "usr_01hx9z4qfkm3p8t2v6wb5ycrnd",
    type: "transaction_debit",
    status: "unread",
    title: "Payment Successful",
    body: "Your payment of $15.90 to Netflix was successful.",
    fullContent:
      "Your payment of $15.90 to Netflix has been processed successfully on 24 Feb 2025 at 08:15 AM. Your new available balance is $49,634.10. Reference: REF20250224001. If you did not authorise this transaction, please contact support immediately.",
    amount: 1590,
    currency: "USD",
    actionUrl: "/transactions/txn_01hx9z4qfkm3p8t2v6wb5y0001",
    iconName: "ArrowUpRight",
    metadata: {transactionId: "txn_01hx9z4qfkm3p8t2v6wb5y0001"},
    createdAt: "2025-02-24T08:15:30.000Z",
    updatedAt: "2025-02-24T08:15:30.000Z",
    readAt: null,
  },
  {
    id: "ntf_002",
    userId: "usr_01hx9z4qfkm3p8t2v6wb5ycrnd",
    type: "transaction_credit",
    status: "unread",
    title: "Money Received",
    body: "Shola Daniel sent you $1,500.00.",
    fullContent:
      "Great news! Shola Daniel has sent you $1,500.00 on 26 Feb 2025 at 4:30 PM. The funds have been added to your wallet balance. Reference: REF20250226002. Note: Rent split February.",
    amount: 150000,
    currency: "USD",
    actionUrl: "/transactions/txn_01hx9z4qfkm3p8t2v6wb5y0002",
    iconName: "ArrowDownLeft",
    metadata: {transactionId: "txn_01hx9z4qfkm3p8t2v6wb5y0002"},
    createdAt: "2025-02-26T16:30:45.000Z",
    updatedAt: "2025-02-26T16:30:45.000Z",
    readAt: null,
  },
  {
    id: "ntf_003",
    userId: "usr_01hx9z4qfkm3p8t2v6wb5ycrnd",
    type: "security_alert",
    status: "read",
    title: "New Device Login",
    body: "A new login was detected from Chrome on Windows.",
    fullContent:
      "We detected a login to your Fundora account from a new device on 25 Feb 2025 at 10:42 AM. Device: Chrome on Windows 11. Location: Lagos, Nigeria. IP: 102.88.xx.xx. If this was you, no action is needed. If you don't recognise this activity, secure your account immediately by changing your password.",
    amount: null,
    currency: null,
    actionUrl: "/settings/security",
    iconName: "ShieldAlert",
    metadata: {device: "Chrome / Windows 11", ip: "102.88.xx.xx"},
    createdAt: "2025-02-25T10:42:00.000Z",
    updatedAt: "2025-02-25T10:42:00.000Z",
    readAt: "2025-02-25T11:00:00.000Z",
  },
  {
    id: "ntf_004",
    userId: "usr_01hx9z4qfkm3p8t2v6wb5ycrnd",
    type: "transaction_failed",
    status: "read",
    title: "Transaction Failed",
    body: "Your payment of $150.00 to iTunes could not be processed.",
    fullContent:
      "Unfortunately your payment of $150.00 to iTunes on 25 Feb 2025 at 3:00 PM could not be processed. Reason: Insufficient funds on selected card ending in 1121. Please top up your card or use a different payment method and try again. Reference: REF20250225003.",
    amount: 15000,
    currency: "USD",
    actionUrl: "/topup",
    iconName: "XCircle",
    metadata: {transactionId: "txn_failed_003"},
    createdAt: "2025-02-25T15:00:20.000Z",
    updatedAt: "2025-02-25T15:00:20.000Z",
    readAt: "2025-02-25T15:30:00.000Z",
  },
  {
    id: "ntf_005",
    userId: "usr_01hx9z4qfkm3p8t2v6wb5ycrnd",
    type: "promotion",
    status: "read",
    title: "Zero Fees This Weekend 🎉",
    body: "Send money to any bank for free until Sunday midnight.",
    fullContent:
      "This weekend only — send money to any local or international bank account with zero transfer fees. Valid from Friday 28 Feb 2025 12:00 AM to Sunday 2 Mar 2025 11:59 PM. No promo code needed. Offer applies to transfers up to $5,000. Terms and conditions apply.",
    amount: null,
    currency: null,
    actionUrl: "/send",
    iconName: "Gift",
    metadata: {promoId: "PROMO_WEEKEND_FEB25"},
    createdAt: "2025-02-28T00:00:00.000Z",
    updatedAt: "2025-02-28T00:00:00.000Z",
    readAt: "2025-02-28T09:00:00.000Z",
  },
];