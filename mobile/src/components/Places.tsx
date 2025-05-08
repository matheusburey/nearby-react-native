import { useRef } from "react";
import type { IPlaceData } from "@/app/home";
import { Ticket } from "lucide-react-native";
import {
	Image,
	Text,
	TouchableOpacity,
	useWindowDimensions,
	View,
	StyleSheet,
} from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { router } from "expo-router";

function Place({
	place,
	onPress,
}: {
	place: IPlaceData;
	onPress: () => void;
}) {
	return (
		<TouchableOpacity
			className="h-32 w-full p-2 border border-gray-200 rounded-xl flex-row gap-2 items-center"
			onPress={onPress}
		>
			<Image
				className="h-24 w-28 bg-gray-200 rounded-lg"
				source={{ uri: place.cover }}
			/>
			<View className="flex-1 gap-1">
				<Text className="text-sm font-regular text-gray-600">{place.name}</Text>
				<Text numberOfLines={2} className="text-xs font-medium text-gray-500">
					{place.description}
				</Text>
				<View className="flex-row mt-2 gap-2">
					<Ticket size={16} color="#F94144" />
					<Text className="text-xs font-regular text-gray-400">
						{place.coupons} cupons disponiveis
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

interface IPlacesProps {
	places: IPlaceData[];
}

export default function Places({ places }: IPlacesProps) {
	const dimensionValue = useWindowDimensions();
	const bottomSheetRef = useRef<BottomSheet>(null);

	const snapPoints = [278, dimensionValue.height - 128];

	return (
		<BottomSheet
			ref={bottomSheetRef}
			snapPoints={snapPoints}
			enableOverDrag={false}
			handleIndicatorStyle={s.indicator}
			backgroundStyle={s.container}
		>
			<BottomSheetFlatList
				data={places}
				keyExtractor={(item) => item.id}
				contentContainerStyle={s.content}
				renderItem={({ item }) => (
					<Place
						place={item}
						onPress={() => router.push(`/market/${item.id}` as never)}
					/>
				)}
				showsHorizontalScrollIndicator={false}
				ListHeaderComponent={() => (
					<Text className="text-gray-600 text-base font-regular mb-4">
						Explore locais perto de você
					</Text>
				)}
			/>
		</BottomSheet>
	);
}

const s = StyleSheet.create({
	container: { backgroundColor: "#FCFDFE" },
	content: {
		gap: 12,
		padding: 20,
		paddingBottom: 100,
	},
	indicator: {
		width: 80,
		height: 4,
		backgroundColor: "#C4D0DB",
	},
});
