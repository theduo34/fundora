# Fundora — Personal Finance & Savings App

## What This App Does
Fundora is a fintech mobile app that helps users manage their savings, track spending history, and make informed financial decisions. Users can add cards, log transactions, set savings goals, track budgets, and view spending analytics.

**Current phase: UI is built with dummy data. Next phase: wire up Zustand stores + Supabase backend.**

---

## Tech Stack
| Tool | Purpose |
|------|---------|
| React Native + Expo SDK 52 | Mobile framework |
| Expo Router v3 | File-based routing |
| NativeWind v4 | Tailwind CSS for React Native |
| TypeScript | Strict mode throughout |
| Zustand | Global state management (per-feature stores) |
| Supabase | Auth, Database, Storage, Realtime |
| react-native-paper | UI components (TextInput, Button, Modal, Checkbox) |
| react-native-reanimated-carousel | Card carousel |
| react-native-gifted-charts | Bar + donut charts |
| expo-linear-gradient | Card gradient backgrounds |
| expo-blur | Frozen card blur overlay |
| react-native-safe-area-context | Safe area handling |

**Target platforms: iOS + Android**

---

## Folder Structure
```
fundora/
├── app/                              # Expo Router routes
│   ├── index.tsx                     # Entry: redirects based on auth/onboarding
│   ├── (auth)/
│   │   ├── onboarding.tsx
│   │   ├── login/index.tsx
│   │   ├── sign-up/index.tsx
│   │   └── forgot-password/index.tsx
│   └── (protected)/
│       ├── (tabs)/
│       │   ├── _layout.tsx
│       │   ├── home/
│       │   ├── transactions/
│       │   │   ├── index.tsx
│       │   │   └── [id].tsx          # Transaction detail (full page)
│       │   ├── cards/
│       │   └── settings/
│       └── (stack)/                  # Screens without tab bar
│           ├── notifications/
│           ├── add-card/
│           ├── profile/
│           ├── send/
│           ├── topup/
│           ├── savings-goals/
│           ├── budget/
│           └── convert/
│
├── components/
│   ├── features/                     # Feature-grouped components
│   │   ├── auth/
│   │   ├── home/
│   │   ├── transactions/
│   │   ├── cards/
│   │   ├── settings/
│   │   ├── savings/                  # (planned)
│   │   └── notifications/
│   ├── layout/
│   │   ├── screen-layout.tsx         # Base layout for all screens
│   │   ├── nav-bar.tsx
│   │   └── bottom-sheet.tsx          # Reusable Modal-based sheet
│   ├── ui/
│   │   └── gradient-view.tsx
│   └── shared/
│       └── user-profile.tsx
│
├── stores/                           # Zustand — one store per feature
│   ├── auth.store.ts
│   ├── card.store.ts
│   ├── transaction.store.ts
│   ├── savings.store.ts
│   └── notification.store.ts
│
├── lib/
│   ├── supabase.ts                   # Supabase client init
│   ├── helper.ts                     # formatAmount, formatDate etc.
│   └── constants.ts
│
└── types/                            # Shared TypeScript types
    └── index.ts
```

---

## Routing Rules
- **Tab screens** → `app/(protected)/(tabs)/[tab]/index.tsx`
- **Stack screens** (no tab bar) → `app/(protected)/(stack)/[screen]/index.tsx`
- **Auth screens** → `app/(auth)/[screen]/index.tsx`
- **Navigation**:
  - `router.push("/path" as any)` — go forward
  - `router.replace("/path" as any)` — replace (used for auth flows)
  - `router.back()` — go back
  - With params: `router.push({ pathname: "/(protected)/(tabs)/transactions/[id]", params: { id } } as any)`
- **Back button**: auto-detected in `ScreenLayout` via `navigation.canGoBack()` — no need to pass manually unless overriding

---

## Design System

### Brand Colors
```
primary:           #56034C    deep purple
secondary:         #EB1254    pink/red
background:        #FAF5FB    off-white with purple tint
card:              #F3EAF5    light purple card background
foreground:        #2D0D3A    near-black purple (text)
muted-foreground:  #9CA3AF    grey (secondary text)
border:            #E8D9EC    light purple border
```

### Gradients (GradientView variant prop)
```
primary:   ["#56034C", "#BC005B", "#EB1254"]
secondary: ["#BC005B", "#890058", "#56034C"]
```

### react-native-paper Theme
Always pass this theme to Paper inputs and use brand colors on buttons:
```tsx
const inputTheme = {
  colors: { primary: "#56034C", error: "#dc2626", outline: "#E8D9EC" },
  roundness: 12,
};
<TextInput mode="outlined" theme={inputTheme} />
<Button mode="contained" buttonColor="#56034C" />
```

---

## Zustand Store Pattern
One store per feature. Keep stores simple — state + actions only.

```ts
// stores/transaction.store.ts
import {create} from "zustand";
import {Transaction} from "@/types";

interface TransactionStore {
  transactions: Transaction[];
  loading: boolean;
  fetchTransactions: (userId: string) => Promise<void>;
  addTransaction: (tx: Transaction) => void;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  loading: false,
  fetchTransactions: async (userId) => {
    set({loading: true});
    const {data} = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId);
    set({transactions: data ?? [], loading: false});
  },
  addTransaction: (tx) =>
    set((state) => ({transactions: [tx, ...state.transactions]})),
}));
```

**Planned stores:** `auth.store`, `card.store`, `transaction.store`, `savings.store`, `notification.store`

---

## Supabase Integration Plan
**Client lives in `lib/supabase.ts`** — import from there everywhere, never reinitialise.

| Feature | Supabase service |
|---------|-----------------|
| Login / Signup / Session | Auth |
| Cards, Transactions, Savings goals, Budgets | Database |
| Profile avatars, receipt images | Storage |
| Live balance / transaction updates | Realtime |

```ts
// lib/supabase.ts
import {createClient} from "@supabase/supabase-js";
export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
);
```

**When replacing dummy data:** swap the dummy import in each screen for the matching Zustand store hook. The UI components don't change — only the data source.

---

## Key Conventions

### Amounts are always in cents
```ts
// Storage / state: cents (integer)
amount: 1590        // = $15.90

// Display only:
(amount / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })
```
Never store dollars. Never divide outside the display layer.

### Dynamic colors must use inline styles
NativeWind purges dynamic class names at build time:
```tsx
// ❌ Will not work
<Text className={`text-${color}`} />

// ✅ Always do this
<Text style={{ color: hexValue }} />
```

### Every screen uses ScreenLayout
```tsx
<ScreenLayout
  screen="screen-id"
  navbarTitle="Title"
  scrollable={false}        // false = you manage your own ScrollView inside
  navbarRightContent={...}  // optional icon slot
>
  {children}
</ScreenLayout>
```

### BottomSheet usage
```tsx
<BottomSheet
  visible={!!selectedItem}
  onClose={() => setSelectedItem(null)}
  title="Title"
  heightRatio={0.75}
  scrollable
>
  {selectedItem && <SheetContent item={selectedItem} />}
</BottomSheet>
```

---

## Common Bugs — Always Avoid These

| Bug | Wrong | Right |
|-----|-------|-------|
| onPress not firing | `onPress={() => fn}` | `onPress={() => fn(arg)}` |
| Router path TS error | `router.push("/path")` | `router.push("/path" as any)` |
| scrollToIndex silently fails | No `getItemLayout` | Always add `getItemLayout` to FlatList |
| Stale state in FlatList callbacks | Read from `useState` inside `useRef` callback | Mirror state in a `useRef` and read from the ref |
| Card number showing in plain text | Forget `showFullNumber` prop | Default `showFullNumber={false}` — only pass `true` on cards screen |

---

## What's Built (UI — dummy data)
- ✅ Splash screen + 3-slide onboarding
- ✅ Login, Sign up, Forgot password
- ✅ Home (carousel, quick actions, recent transactions)
- ✅ Transactions screen (bar/donut charts, period selector, tab switcher)
- ✅ Transaction detail — full page
- ✅ Category detail — bottom sheet
- ✅ Cards screen (freeze/blur, mask toggle, card transactions)
- ✅ Add card (Paper form, network detection, success modal)
- ✅ Notifications list + detail
- ✅ Settings + Profile (edit fields modal, sign out)

## What's Next
- ⬜ Zustand stores (auth, card, transaction, savings, notification)
- ⬜ Supabase client + environment variables
- ⬜ Replace dummy data with store hooks screen by screen
- ⬜ Send money screen
- ⬜ Top up / Deposit screen
- ⬜ Savings goals screen
- ⬜ Budget tracker screen
- ⬜ Currency convert screen
- ⬜ Spending insights / Analytics screen
- ⬜ OTP verification screen
- ⬜ Dark mode

---

## Dev Commands
```bash
npx expo start              # start dev server
npx expo start --ios        # iOS simulator
npx expo start --android    # Android emulator
npx tsc --noEmit            # TypeScript check — run after every major change
```