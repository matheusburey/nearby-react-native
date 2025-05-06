import { Button } from "@/components/Button";
import Steps from "@/components/Steps";
import { router } from "expo-router";
import { View, Text, Image } from "react-native";

export default function WelcomeScreen() {
	return (
		<View className="flex-1 p-10 gap-10">
			<View>
				<Image
					className="w-11 h-11 mt-6 mb-7"
					source={require("@/assets/images/logo.png")}
				/>
				<Text className="text-2xl font-bold text-gray-600">
					Boas vindas ao Nearby!
				</Text>
				<Text className="text-base font-regular mt-3 text-gray-400">
					Tenha cupons de vantagem para usar em {"\n"}
					seus estabelecimentos favoritos.
				</Text>
			</View>
			<Steps />
			<Button
				onPress={() => {
					router.push("/home");
				}}
			>
				<Button.Title>Começar</Button.Title>
			</Button>
		</View>
	);
}
