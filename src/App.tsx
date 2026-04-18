import { View } from "react-native";
import { Home } from "./pages/Home";
import { Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import "../global.css";
import { useEffect } from "react";
import { AppRoutes } from "./AppRoutes";
import React from "react";

SplashScreen.preventAutoHideAsync();

export function App() {
  const [fontsLoaded, error] = useFonts({
    InterRegular: Inter_400Regular,
    InterBold: Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <AppRoutes/>
  );
}
