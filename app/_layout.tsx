import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import "./global.css";

import { SplashScreenAnimate } from "@/components/splash-screen-animate";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const [isSplashReady, setIsSplashReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
      {isSplashReady && <SplashScreenAnimate />}
    </ThemeProvider>
  );
}
