import { StatusBar } from "expo-status-bar";
import "@/assets/global.css";

import { Stack } from "expo-router";

import {
	useFonts,
	Rubik_400Regular,
	Rubik_500Medium,
	Rubik_600SemiBold,
	Rubik_700Bold,
} from "@expo-google-fonts/rubik";

export default function RootLayout() {
	const [loaded] = useFonts({
		Rubik_400Regular,
		Rubik_500Medium,
		Rubik_600SemiBold,
		Rubik_700Bold,
	});

	if (!loaded) {
		return null;
	}

	return (
		<>
			<Stack
				screenOptions={{
					headerShown: false,
					contentStyle: { backgroundColor: "#FCFDFE" },
				}}
			>
				<Stack.Screen name="index" />
			</Stack>
			<StatusBar style="auto" />
		</>
	);
}
