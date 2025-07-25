import { StatusBar } from "expo-status-bar";
import "@/assets/global.css";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
	useFonts,
	Rubik_400Regular,
	Rubik_500Medium,
	Rubik_600SemiBold,
	Rubik_700Bold,
} from "@expo-google-fonts/rubik";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		Rubik_400Regular,
		Rubik_500Medium,
		Rubik_600SemiBold,
		Rubik_700Bold,
	});

	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync();
		}
	}, [loaded, error]);

	if (!loaded && !error) {
		return null;
	}
	return (
		<GestureHandlerRootView className="flex-1">
			<Stack
				screenOptions={{
					headerShown: false,
					contentStyle: { backgroundColor: "#FCFDFE" },
				}}
			/>
			<StatusBar style="auto" />
		</GestureHandlerRootView>
	);
}
