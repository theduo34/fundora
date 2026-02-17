import {ColorValue} from "react-native";

type GradientTuple = readonly [
  ColorValue,
  ColorValue,
  ...ColorValue[]
];

export const palette = {
  brand: {
    900: "var(--chart-4)",
    800: "var(--chart-3)",
    700: "var(--chart-2)",
    600: "var(--chart-1)",
    500: "var(--ring)",
  },
};

export const gradients: Record<string, GradientTuple> = {
  primary: [
    palette.brand[900] as ColorValue,
    palette.brand[800] as ColorValue,
    palette.brand[700] as ColorValue,
    palette.brand[600] as ColorValue,
    palette.brand[500] as ColorValue,
  ],
};

export const semantic = {
  primary: "var(--primary)",
  primaryForeground: "var(--primary-foreground)",

  secondary: "var(--secondary)",
  secondaryForeground: "var(--secondary-foreground)",

  background: "var(--background)",

  card: "var(--card)",
  cardForeground: "var(--card-foreground)",

  popover: "var(--popover)",
  popoverForeground: "var(--popover-foreground)",

  border: "var(--border)",
  input: "var(--input)",
  ring: "var(--ring)",

  muted: "var(--muted)",
  mutedForeground: "var(--muted-foreground)",

  accent: "var(--accent)",
  accentForeground: "var(--accent-foreground)",

  destructive: "var(--destructive)",
  destructiveForeground: "var(--destructive-foreground)",

  foreground: "var(--foreground)",

  sidebar: "var(--sidebar)",
  sidebarForeground: "var(--sidebar-foreground)",
  sidebarPrimary: "var(--sidebar-primary)",
  sidebarPrimaryForeground: "var(--sidebar-primary-foreground)",
  sidebarAccent: "var(--sidebar-accent)",
  sidebarAccentForeground: "var(--sidebar-accent-foreground)",
  sidebarBorder: "var(--sidebar-border)",
  sidebarRing: "var(--sidebar-ring)",

  chart1: "var(--chart-1)",
  chart2: "var(--chart-2)",
  chart3: "var(--chart-3)",
  chart4: "var(--chart-4)",
  chart5: "var(--chart-5)",
};