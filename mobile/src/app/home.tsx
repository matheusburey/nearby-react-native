import Categories from "@/components/Categories";
import Places from "@/components/Places";
import { api } from "@/service/api";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";

export interface ICategoryData {
	id: string;
	name: string;
}

export interface IPlaceData {
	address: string;
	categoryId: string;
	coupons: number;
	cover: string;
	description: string;
	id: string;
	latitude: number;
	longitude: number;
	name: string;
	phone: string;
}

const currentLocationMock = {
	latitude: -23.561187293883442,
	longitude: -46.656451388116494,
};

export default function HomeScreen() {
	const [categoryIdSelected, setCategoryIdSelected] = useState("");
	const [categories, setCategories] = useState<ICategoryData[]>([]);
	const [places, setPlaces] = useState<IPlaceData[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const { data } = await api.get("/categories");
				setCategories(data);
				setCategoryIdSelected(data[0].id);
			} catch (error) {
				Alert.alert("Categorias", "Nao foi possivel carregar as categorias");
			}
		})();
	}, []);

	useEffect(() => {
		(async () => {
			try {
				if (!categoryIdSelected) return;

				const { data } = await api.get(
					`/markets/category/${categoryIdSelected}`,
				);
				setPlaces(data);
			} catch (error) {
				Alert.alert("Lugares", "Nao foi possivel carregar os lugares");
			}
		})();
	}, [categoryIdSelected]);

	return (
		<View className="flex-1">
			<Categories
				categoryIdSelected={categoryIdSelected}
				onCategorySelected={setCategoryIdSelected}
				categories={categories}
			/>

			<MapView
				initialRegion={{
					...currentLocationMock,
					latitudeDelta: 0.01,
					longitudeDelta: 0.01,
				}}
				style={{ flex: 1 }}
			>
				<Marker
					identifier="current"
					coordinate={currentLocationMock}
					image={require("@/assets/images/location.png")}
				/>

				{places.map((place) => (
					<Marker
						key={place.id}
						identifier={place.id}
						title={place.name}
						description={place.address}
						coordinate={{
							latitude: place.latitude,
							longitude: place.longitude,
						}}
						image={require("@/assets/images/pin.png")}
						onCalloutPress={() => router.push(`/market/${place.id}`)}
					/>
				))}
			</MapView>

			<Places places={places} />
		</View>
	);
}
