import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useFonts } from "expo-font";
import { Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";

import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";

import "../global.css";
import { AppRoutes } from "./AppRoutes";
import { TimerProvider } from "./context/TimerContext";

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export function App() {
  const [fontsLoaded, error] = useFonts({
    InterRegular: Inter_400Regular,
    InterBold: Inter_700Bold,
  });

  useEffect(() => {
    async function prepareApp() {
      if (fontsLoaded || error) {
        await SplashScreen.hideAsync();
      }
    }

    prepareApp();
  }, [fontsLoaded, error]);

  useEffect(() => {
    async function setupNotifications() {
      await Notifications.requestPermissionsAsync();

      await Notifications.setNotificationChannelAsync("pomodoro", {
        name: "Pomodoro Timer",
        importance: Notifications.AndroidImportance.HIGH,
        sound: "default",
      });
    }

    setupNotifications();
  }, []);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar
        backgroundColor="#062013"
        barStyle="light-content"
        translucent={false}
      />

      <TimerProvider>
        <AppRoutes />
      </TimerProvider>
    </SafeAreaView>
  );
}