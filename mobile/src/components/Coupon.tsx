import { Ticket } from "lucide-react-native";
import { Text, View } from "react-native";

export default function Coupon({ code }: { code: string }) {
	return (
		<View className="px-8">
			<Text className="text-sm font-medium text-gray-500 mb-3">
				Utilize este cupom
			</Text>
			<View className="flex-row bg-green-soft p-3 rounded-lg items-center gap-2">
				<Ticket size={24} color="#3B9B62" />
				<Text className="text-base font-semiBold text-gray-600 uppercase">
					{code}
				</Text>
			</View>
		</View>
	);
}
