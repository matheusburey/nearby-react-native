import { StatusBar } from "expo-status-bar";
// import "@/assets/global.css";

import { Stack } from "expo-router";

export default function RootLayout() {
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
