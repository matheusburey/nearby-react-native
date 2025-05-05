import { Text, View } from "react-native";
import type { LucideIcon } from "lucide-react-native";
import { MapPin, QrCode, Ticket } from "lucide-react-native";

interface IStepProps {
	icon: LucideIcon;
	title: string;
	description: string;
}

function Step({ icon: Icon, title, description }: IStepProps) {
	return (
		<View className="flex-row w-full gap-4">
			<Icon size={32} color="#F94144" />
			<View className="flex-1">
				<Text className="text-base font-bold text-gray-600">{title}</Text>
				<Text className="text-sm font-regular text-gray-500 mt-1">
					{description}
				</Text>
			</View>
		</View>
	);
}

export default function Steps() {
	return (
		<View className="flex-1 gap-6 ">
			<Text className="text-base font-regular text-gray-500">
				Veja como funciona:
			</Text>

			<Step
				icon={MapPin}
				title="Encontre estabelecimentos"
				description="Veja locais perto de você que são parceiros Nearby"
			/>
			<Step
				icon={QrCode}
				title="Ative o cupom com QR Code"
				description="Escaneie o código no estabelecimento para usar o benefício"
			/>
			<Step
				icon={Ticket}
				title="Garanta vantagens perto de você"
				description="Ative cupons onde estiver, em diferentes tipos de estabelecimento "
			/>
		</View>
	);
}
