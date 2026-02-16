import React from "react";
import { View } from "react-native";
import { Tabs } from "expo-router";
import {
  LayoutDashboard,
  CreditCard,
  ArrowLeftRight,
  Settings, Plus,
} from "lucide-react-native";

const TABS = [
  { name: "home", title: "Home", icon: LayoutDashboard },
  { name: "cards", title: "Cards", icon: CreditCard },
  { name: "add-money", title: "Add", icon: Plus },
  { name: "transactions", title: "Transactions", icon: ArrowLeftRight },
  { name: "settings", title: "Settings", icon: Settings },
] as const;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: {
          height: 70,
          paddingBottom: 4,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginTop: 2,
        },
      }}
    >
      {TABS.map((tab) => {
        const IconComponent = tab.icon;

        return (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: tab.title,
              tabBarIcon: ({ color, focused }) => {
                // Floating center Add button
                if (tab.name === "add-money") {
                  return (
                    <View
                      style={{
                        backgroundColor: "#000",
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: -25,
                        shadowColor: "#000",
                        shadowOpacity: 0.25,
                        shadowRadius: 10,
                        shadowOffset: { width: 0, height: 5 },
                        elevation: 8,
                      }}
                    >
                      <IconComponent
                        color="#fff"
                        size={28}
                        strokeWidth={2.5}
                      />
                    </View>
                  );
                }

                // Normal tabs
                return (
                  <IconComponent
                    color={color}
                    size={focused ? 26 : 24}
                    strokeWidth={focused ? 2.5 : 2}
                    style={{
                      transform: [{ scale: focused ? 1.1 : 1 }],
                    }}
                  />
                );
              },
              tabBarLabel:
                tab.name === "add-money" ? () => null : undefined,
            }}
          />
        );
      })}
    </Tabs>
  );
}
