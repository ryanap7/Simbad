import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/themes/Colors";
import { scaleSize } from "@/utils/Normalize";
import { Tabs } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        freezeOnBlur: true,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].primary[800],
        tabBarStyle: {
          height: scaleSize(64),
          paddingBottom: scaleSize(8),
          paddingTop: scaleSize(12),
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="recipient"
        options={{
          title: "Data Penerima",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "document-text" : "document-text-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
