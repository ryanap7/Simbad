import React from "react";
import { Stack } from "expo-router";

const PublicLayout = () => {
  return (
    <Stack
      screenOptions={{
        freezeOnBlur: true,
        gestureEnabled: true,
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen
        name="distribution"
        options={{
          headerTitle: "Distribusikan",
        }}
      />
    </Stack>
  );
};

export default PublicLayout;
