import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import NativeBottomTabs from "./navigations/NativeBottomTabs";
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { FavoritesProvider } from './context/FavoritesContext';
import SplashScreen from "./screens/SplashScreen";
import { useEffect,useState } from "react";

export default function App() {
  let [fontsLoaded] = useFonts({
    'Playfair-Bold': PlayfairDisplay_700Bold,
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
  });
  const [showSplash,setSplash]=useState(true);
  useEffect(()=>{
    setTimeout(()=>{
      setSplash(false)
    },4000);
  });

  if(showSplash)
    return <SplashScreen></SplashScreen>

  return (
    <FavoritesProvider>
    <NavigationContainer>
      <NativeBottomTabs></NativeBottomTabs>
    </NavigationContainer>
    </FavoritesProvider>
  );
}
