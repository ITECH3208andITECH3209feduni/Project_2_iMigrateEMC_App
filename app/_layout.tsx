import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="studentVisa" options={{ headerShown: true }} />
      <Stack.Screen name="visitVisa" options={{ headerShown: true }} />
      <Stack.Screen name="workVisa" options={{ headerShown: true }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Show custom splash for 2 seconds
    const timer = setTimeout(() => {
      setIsReady(true);
      SplashScreen.hideAsync();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return (
      <View style={styles.splashContainer}>
        <Image 
          source={{ uri: 'https://imigrateemc.com/web/image/website/1/logo/imigrateemc?unique=6d04d39' }}
          style={styles.splashLogo}
          resizeMode="contain"
        />
      </View>
    );
  }

  return <RootLayoutNav />;
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashLogo: {
    width: 300,
    height: 120,
  },
});
