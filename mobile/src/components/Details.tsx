import type { IPlaceInfoData } from "@/app/market/[id]";
import { type LucideIcon, MapPin, Phone, Ticket } from "lucide-react-native";
import { Text, View } from "react-native";

export interface IInfoProps {
	description: string;
	icon: LucideIcon;
}

function Info({ description, icon: Icon }: IInfoProps) {
	return (
		<View className="flex-row items-center gap-2 mb-1">
			<Icon size={16} color="#73808C" />
			<Text className="text-gray-500 text-sm font-regular flex-1">
				{description}
			</Text>
		</View>
	);
}

interface IPlaceInfoProps {
	placeInfo: IPlaceInfoData;
}

export default function Details({ placeInfo }: IPlaceInfoProps) {
	return (
		<View className="p-8 pb-0 rounded-t-3xl bg-gray-100">
			<Text className="text-xl font-bold text-gray-600">{placeInfo.name}</Text>
			<Text className="text-base font-regular text-gray-500 mt-3 mb-8">
				{placeInfo.description}
			</Text>

			<View className="w-full border-b border-gray-300 pb-4 mb-4">
				<Text className="text-sm font-medium text-gray-500 mb-3">
					Informações
				</Text>
				<Info
					icon={Ticket}
					description={`${placeInfo.coupons} cupons disponíveis`}
				/>
				<Info icon={MapPin} description={placeInfo.address} />
				<Info icon={Phone} description={placeInfo.phone} />
			</View>

			<View className="w-full border-b border-gray-300 pb-4 mb-4">
				<Text className="text-sm font-medium text-gray-500 mb-3">
					Regulamento
				</Text>
				{placeInfo.rules.map((item) => (
					<Text
						className="text-gray-500 text-sm font-regular mb-1"
						key={item.id}
					>{`\u2022 ${item.description}`}</Text>
				))}
			</View>
		</View>
	);
}
