import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import * as React from "react";

import { HapticTab } from "@/components/haptic-tab";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: "Categories",
          tabBarIcon: ({ color }) => (
            <Ionicons name="paper-plane" size={28} color={color} />
          ),
          href: "/categories",
        }}
      />
      <Tabs.Screen
        name="gifs"
        options={{
          title: "Gifs",
          tabBarIcon: ({ color }) => (
            <Ionicons name="gift" size={28} color={color} />
          ),
          href: "/gifs",
        }}
      />
    </Tabs>
  );
}
