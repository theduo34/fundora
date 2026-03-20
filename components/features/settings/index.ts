// ─── Types ────────────────────────────────────────────────────────────────────

export interface SettingsItem {
  key: string;
  label: string;
  iconName: string;
  route: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const settingsItems: SettingsItem[] = [
  {key: "profile", label: "Profile", iconName: "UserCircle", route: "/(protected)/(stack)/settings/profile"},
  {key: "security", label: "Security", iconName: "ShieldCheck", route: "/(protected)/(stack)/security"},
  {key: "support", label: "Support", iconName: "Headphones", route: "/(protected)/(stack)/support"},
  {key: "notifications", label: "Notifications", iconName: "Bell", route: "/(protected)/(stack)/notifications"},
  {key: "referral", label: "Referral", iconName: "Gift", route: "/(protected)/(stack)/referral"},
];

// ─── Edit field types ─────────────────────────────────────────────────────────

export type EditFieldKey = "phone" | "address" | "email";

export interface EditField {
  key: EditFieldKey;
  label: string;
  placeholder: string;
  keyboardType?: "default" | "phone-pad" | "email-address";
}

export const profileEditFields: EditField[] = [
  {key: "phone", label: "Enter phone number", placeholder: "e.g. +44 6790 493 202", keyboardType: "phone-pad"},
  {key: "address", label: "Enter address", placeholder: "e.g. 23 Headway Street...", keyboardType: "default"},
  {key: "email", label: "Enter email", placeholder: "e.g. name@email.com", keyboardType: "email-address"},
];