import Loading from "@/components/Loading";
import Toast from "@/components/Toast";
import useSessionStore, { SessionModel } from "@/stores/Sessions/SessionsStore";
import NavigationServices from "@/utils/NavigationServices";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { LogBox, useColorScheme } from "react-native";

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const { isLogin }: any = useSessionStore((state: SessionModel) => ({
    isLogin: state.isLogin,
  }));
  const segments = useSegments();
  const router = useRouter();

  NavigationServices.setRouter(router);

  useEffect(() => {
    const inTabsGroup = segments[0] === "(auth)";

    if (isLogin && !inTabsGroup) {
      router.replace("/dashboard");
    } else if (!isLogin) {
      router.replace("/login");
    }
  }, [isLogin]);

  return <Slot />;
};

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const [loaded, fontsError] = useFonts({
    "Poppins-Bold": Poppins_700Bold,
    "Poppins-SemiBold": Poppins_600SemiBold,
    "Poppins-Medium": Poppins_500Medium,
    "Poppins-Regular": Poppins_400Regular,
  });

  useEffect(() => {
    if (loaded || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [loaded, fontsError]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <InitialLayout />
      <Loading />
      <Toast />
    </ThemeProvider>
  );
};

export default RootLayout;

LogBox.ignoreLogs(["Require cycle:"]);
