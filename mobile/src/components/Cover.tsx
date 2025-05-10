import { ImageBackground, View } from "react-native";
import { Button } from "./Button";
import { ArrowLeft } from "lucide-react-native";
import { router } from "expo-router";

export default function Cover({ cover }: { cover: string }) {
	return (
		<ImageBackground
			source={{ uri: cover }}
			className="w-full h-60 mb-[-32] bg-gray-200"
		>
			<View className="p-6 pt-14">
				<Button className="h-10 w-10" onPress={() => router.back()}>
					<Button.Icon icon={ArrowLeft} />
				</Button>
			</View>
		</ImageBackground>
	);
}
