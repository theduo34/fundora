import { Card as DbCard, Transaction as DbTransaction, Notification as DbNotification } from "@/types";
import { Card, Transaction } from "@/components/features/home";
import { NotificationInterface } from "@/components/features/notifications";
import { GradientVariant } from "@/components/ui/gradient-view";

export const mapCard = (c: DbCard): Card => ({
  id: c.id,
  userId: c.user_id,
  network: c.network,
  type: c.type,
  status: c.status,
  label: c.label,
  cardHolderName: c.card_holder_name,
  maskedPan: c.masked_pan,
  pan: `************${c.masked_pan}`,
  expiryMonth: c.expiry_month,
  expiryYear: c.expiry_year,
  cvv: "***",
  billingAddress: { line1: "", city: "", state: "", postalCode: "", country: "US" },
  balance: c.balance,
  creditLimit: c.credit_limit,
  availableCredit: c.available_credit,
  gradientVariant: c.gradient_variant as GradientVariant,
  createdAt: c.created_at,
  updatedAt: c.updated_at,
});

export const mapTransaction = (t: DbTransaction): Transaction => ({
  id: t.id,
  userId: t.user_id,
  cardId: t.card_id,
  type: t.type,
  status: t.status,
  category: t.category,
  amount: t.amount,
  currency: t.currency,
  description: t.description,
  note: t.note,
  merchantLogoUrl: t.merchant_logo_url,
  counterparty: t.counterparty_name
    ? {
        id: "",
        name: t.counterparty_name,
        avatarUrl: t.counterparty_avatar_url,
        accountMask: t.counterparty_account_mask,
      }
    : null,
  reference: t.reference,
  balanceAfter: t.balance_after,
  fee: t.fee,
  exchangeRate: t.exchange_rate,
  metadata: t.metadata,
  createdAt: t.created_at,
  updatedAt: t.updated_at,
  completedAt: t.completed_at,
});

export const mapNotification = (n: DbNotification): NotificationInterface => ({
  id: n.id,
  userId: n.user_id,
  type: n.type,
  status: n.status,
  title: n.title,
  body: n.body,
  fullContent: n.full_content,
  amount: n.amount,
  currency: n.currency,
  actionUrl: n.action_url,
  iconName: n.icon_name,
  metadata: n.metadata,
  createdAt: n.created_at,
  updatedAt: n.updated_at,
  readAt: n.read_at,
});
