// ─── Types ────────────────────────────────────────────────────────────────────

export type CardNetwork = "visa" | "mastercard" | "amex" | "discover";
export type CardType    = "debit" | "credit" | "prepaid";
export type CardStatus  = "active" | "frozen" | "expired" | "cancelled";

export interface CardFormData {
  cardNumber: string;
  cardHolderName: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  saveCard: boolean;
}

export interface CardFormErrors {
  cardNumber?: string;
  cardHolderName?: string;
  expiry?: string;
  cvv?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Detect network from first digits
export const detectCardNetwork = (number: string): CardNetwork | null => {
  const n = number.replace(/\s/g, "");
  if (/^4/.test(n))             return "visa";
  if (/^5[1-5]/.test(n))        return "mastercard";
  if (/^3[47]/.test(n))         return "amex";
  if (/^6(?:011|5)/.test(n))    return "discover";
  return null;
};

// Format card number with spaces: 4-4-4-4
export const formatCardNumber = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
};

// Format expiry MM/YY
export const formatExpiry = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
  return digits;
};

// ─── Validation ───────────────────────────────────────────────────────────────

export const validateCardForm = (data: CardFormData): CardFormErrors => {
  const errors: CardFormErrors = {};
  const rawNumber = data.cardNumber.replace(/\s/g, "");

  if (!rawNumber || rawNumber.length < 16)
    errors.cardNumber = "Enter a valid 16-digit card number";

  if (!data.cardHolderName.trim())
    errors.cardHolderName = "Cardholder name is required";

  const expiry = `${data.expiryMonth}${data.expiryYear}`;
  if (!data.expiryMonth || !data.expiryYear || expiry.length < 4)
    errors.expiry = "Enter a valid expiry date";

  if (!data.cvv || data.cvv.length < 3)
    errors.cvv = "Enter a valid CVV";

  return errors;
};