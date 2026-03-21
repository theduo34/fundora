import {GradientVariant} from "@/components/ui/gradient-view";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl: string | null;
  currencyCode: string; // e.g. "USD"
  balance: number;      // total wallet balance in smallest unit (cents) OR float
  createdAt: string;    // ISO 8601
  updatedAt: string;
}

export type CardNetwork = "visa" | "mastercard" | "amex" | "discover";
export type CardType    = "debit" | "credit" | "prepaid";
export type CardStatus  = "active" | "frozen" | "expired" | "cancelled";

export interface Card {
  id: string;
  userId: string;
  network: CardNetwork;
  type: CardType;
  status: CardStatus;
  label: string;           // e.g. "Personal Visa"
  cardHolderName: string;
  maskedPan: string;       // last 4 digits shown in UI, e.g. "1121"
  pan: string;             // full PAN – only used locally / never log
  expiryMonth: string;     // "07"
  expiryYear: string;      // "26"
  cvv: string;             // masked in UI
  billingAddress: Address;
  balance: number;         // card-level balance (prepaid)
  creditLimit: number | null;
  availableCredit: number | null;
  gradientVariant: GradientVariant;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type TransactionType      = "debit" | "credit" | "transfer" | "topup" | "convert";
export type TransactionStatus    = "pending" | "completed" | "failed" | "reversed";
export type TransactionCategory  =
  | "entertainment"
  | "food"
  | "transport"
  | "shopping"
  | "utilities"
  | "transfer"
  | "topup"
  | "convert"
  | "health"
  | "education"
  | "other";

export interface Transaction {
  id: string;
  userId: string;
  cardId: string | null;       // null for wallet-level transactions
  type: TransactionType;
  status: TransactionStatus;
  category: TransactionCategory;
  amount: number;              // always positive; direction determined by `type`
  currency: string;            // "USD"
  description: string;         // merchant / counterparty name, e.g. "Netflix"
  note: string | null;         // user-added note
  merchantLogoUrl: string | null;
  counterparty: Counterparty | null;  // filled for peer-to-peer transfers
  reference: string;           // internal reference number
  balanceAfter: number;        // wallet balance after this tx
  fee: number;                 // platform fee (0 if none)
  exchangeRate: number | null; // if currency conversion happened
  metadata: Record<string, unknown>; // extensible backend fields
  createdAt: string;           // ISO 8601 – when the tx was initiated
  updatedAt: string;           // ISO 8601 – last status change
  completedAt: string | null;  // ISO 8601 – when status became "completed"
}

export interface Counterparty {
  id: string;
  name: string;
  avatarUrl: string | null;
  accountMask: string | null; // last 4 digits of their account
}

// ─── Quick Actions ────────────────────────────────────────────────────────────

export type QuickActionKey = "payment" | "send" | "topup" | "convert";

export interface QuickAction {
  key: QuickActionKey;
  label: string;
  iconName: string; // lucide icon name
}


export const dummyUser: User = {
  id: "usr_01hx9z4qfkm3p8t2v6wb5ycrnd",
  firstName: "Florence",
  lastName: "Nightingale",
  email: "florence@example.com",
  phone: "+1 (555) 234-5678",
  avatarUrl: "https://i.pravatar.cc/150?u=florence",
  currencyCode: "USD",
  balance: 349985,   // stored in cents → $3,499.85 OR treat as dollars: $349,985
  createdAt: "2024-01-15T08:00:00.000Z",
  updatedAt: "2025-02-24T10:30:00.000Z",
};

export const dummyCards: Card[] = [
  {
    id: "crd_01hx9z4qfkm3p8t2v6wb5yaaaa",
    userId: dummyUser.id,
    network: "visa",
    type: "debit",
    status: "active",
    label: "Personal Visa",
    cardHolderName: "Racheal Bean",
    maskedPan: "1121",
    pan: "1234567891011121",
    expiryMonth: "07",
    expiryYear: "26",
    cvv: "345",
    billingAddress: {
      line1: "123 Main Street",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "US",
    },
    balance: 4965000,     // cents → $49,650
    creditLimit: null,
    availableCredit: null,
    gradientVariant: "primary",
    createdAt: "2024-01-15T08:00:00.000Z",
    updatedAt: "2025-02-24T10:30:00.000Z",
  },
  {
    id: "crd_01hx9z4qfkm3p8t2v6wb5ybbbb",
    userId: dummyUser.id,
    network: "mastercard",
    type: "credit",
    status: "active",
    label: "Business Credit",
    cardHolderName: "Florence Nightingale",
    maskedPan: "4488",
    pan: "5105105105104488",
    expiryMonth: "11",
    expiryYear: "27",
    cvv: "912",
    billingAddress: {
      line1: "456 Business Ave",
      city: "San Francisco",
      state: "CA",
      postalCode: "94105",
      country: "US",
    },
    balance: 40292300,
    creditLimit: 1000000,    // cents → $10,000
    availableCredit: 750000, // cents → $7,500
    gradientVariant: "secondary",
    createdAt: "2024-03-10T09:00:00.000Z",
    updatedAt: "2025-02-20T14:00:00.000Z",
  },
];

export const dummyTransactions: Transaction[] = [
  {
    id: "txn_01hx9z4qfkm3p8t2v6wb5y0001",
    userId: dummyUser.id,
    cardId: dummyCards[0].id,
    type: "debit",
    status: "completed",
    category: "entertainment",
    amount: 1590,           // cents → $15.90
    currency: "USD",
    description: "Netflix",
    note: null,
    merchantLogoUrl: "https://logo.clearbit.com/netflix.com",
    counterparty: null,
    reference: "REF20250224001",
    balanceAfter: 496350000,
    fee: 0,
    exchangeRate: null,
    metadata: { merchantId: "MCH_netflix_001", category_code: "5815" },
    createdAt: "2025-02-24T08:15:00.000Z",
    updatedAt: "2025-02-24T08:15:30.000Z",
    completedAt: "2025-02-24T08:15:30.000Z",
  },
  {
    id: "txn_01hx9z4qfkm3p8t2v6wb5y0002",
    userId: dummyUser.id,
    cardId: null,
    type: "credit",
    status: "completed",
    category: "transfer",
    amount: 150000,         // cents → $1,500
    currency: "USD",
    description: "Shola Daniel",
    note: "Rent split February",
    merchantLogoUrl: null,
    counterparty: {
      id: "usr_01hx9z4qfkm3p8t2counterp1",
      name: "Shola Daniel",
      avatarUrl: "https://i.pravatar.cc/150?u=shola",
      accountMask: "7823",
    },
    reference: "REF20250226002",
    balanceAfter: 497850000,
    fee: 0,
    exchangeRate: null,
    metadata: {},
    createdAt: "2025-02-26T16:30:00.000Z",
    updatedAt: "2025-02-26T16:30:45.000Z",
    completedAt: "2025-02-26T16:30:45.000Z",
  },
  {
    id: "txn_01hx9z4qfkm3p8t2v6wb5y0003",
    userId: dummyUser.id,
    cardId: dummyCards[0].id,
    type: "debit",
    status: "completed",
    category: "entertainment",
    amount: 15000,          // cents → $150
    currency: "USD",
    description: "Itunes",
    note: null,
    merchantLogoUrl: "https://logo.clearbit.com/apple.com",
    counterparty: null,
    reference: "REF20250225003",
    balanceAfter: 497700000,
    fee: 0,
    exchangeRate: null,
    metadata: { merchantId: "MCH_apple_002", category_code: "5735" },
    createdAt: "2025-02-25T15:00:00.000Z",
    updatedAt: "2025-02-25T15:00:20.000Z",
    completedAt: "2025-02-25T15:00:20.000Z",
  },
  {
    id: "txn_01hx9z4qfkm3p8t2v6wb5y0kk003",
    userId: dummyUser.id,
    cardId: dummyCards[0].id,
    type: "topup",
    status: "completed",
    category: "entertainment",
    amount: 15000,
    currency: "USD",
    description: "Itunes",
    note: null,
    merchantLogoUrl: "https://logo.clearbit.com/apple.com",
    counterparty: null,
    reference: "REF20250225003",
    balanceAfter: 497700000,
    fee: 0,
    exchangeRate: null,
    metadata: { merchantId: "MCH_apple_002", category_code: "5735" },
    createdAt: "2025-02-25T15:00:00.000Z",
    updatedAt: "2025-02-25T15:00:20.000Z",
    completedAt: "2025-02-25T15:00:20.000Z",
  },
];

export const quickActions: QuickAction[] = [
  { key: "payment", label: "Payment",  iconName: "ReceiptText" },
  { key: "send",    label: "Send",     iconName: "Send" },
  { key: "topup",   label: "Top up",   iconName: "PlusCircle" },
  { key: "convert", label: "Convert",  iconName: "RefreshCcw" },
];