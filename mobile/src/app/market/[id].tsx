import { useEffect, useRef, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { useCameraPermissions } from "expo-camera";
import { Redirect, router, useLocalSearchParams } from "expo-router";

import { api } from "@/service/api";

import Coupon from "@/components/Coupon";
import Cover from "@/components/Cover";
import Details from "@/components/Details";
import Loading from "@/components/Loading";
import ModalQrCamera from "@/components/ModalQrCamera";
import { Button } from "@/components/Button";

export interface IPlaceInfoData {
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
	rules: Rule[];
}

export interface Rule {
	description: string;
	id: string;
	marketId: string;
}

export default function MarketScreen() {
	const [placeInfo, setPlaceInfo] = useState<IPlaceInfoData>();
	const [loading, setLoading] = useState(true);
	const [coupon, setCoupon] = useState<string | null>();
	const [modalVisible, setModalVisible] = useState(false);
	const [couponIsFetching, setCouponIsFetching] = useState(false);
	const [, requestCameraPermission] = useCameraPermissions();
	const { id } = useLocalSearchParams<{ id: string }>();
	const qrLock = useRef(false);

	async function handleOpenCamera() {
		try {
			const { granted } = await requestCameraPermission();

			if (!granted) {
				return Alert.alert("Camera", "Voce precisa permitir o acesso a camera");
			}
			qrLock.current = false;
			setModalVisible(true);
		} catch (error) {
			Alert.alert("Camera", "Nao foi possivel abrir a camera");
		}
	}

	async function getCoupon(id: string) {
		try {
			setCouponIsFetching(true);
			const { data } = await api.patch(`/coupons/${id}`);
			Alert.alert("Cupom", data.coupon);
			setCoupon(data.coupon);
		} catch (error) {
			Alert.alert("Camera", "Nao foi possivel ler o QR code");
		}
		setCouponIsFetching(false);
	}

	async function handleUseCoupon(id: string) {
		if (!id && qrLock.current) return;

		qrLock.current = true;
		setModalVisible(false);
		Alert.alert(
			"Cupom",
			"Não é possível reutilizar o cupom resgatado. Deseja realmente resgatar o cupom?",
			[
				{
					style: "cancel",
					text: "Não",
				},
				{
					text: "Sim",
					onPress: () => getCoupon(id),
				},
			],
		);
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		(async () => {
			try {
				const { data } = await api.get(`/markets/${id}`);
				setPlaceInfo(data);
			} catch (error) {
				Alert.alert("Lugares", "Nao foi possivel carregar os dados", [
					{ text: "OK", onPress: () => router.back() },
				]);
			}
			setLoading(false);
		})();
	}, [id, coupon]);

	if (loading) {
		return <Loading />;
	}

	if (!placeInfo) {
		return <Redirect href="/home" />;
	}

	return (
		<View className="flex-1">
			<ScrollView showsHorizontalScrollIndicator={false}>
				<Cover cover={placeInfo.cover} />
				<Details placeInfo={placeInfo} />
				{coupon && <Coupon code={coupon} />}
			</ScrollView>

			<View className="p-8">
				<Button onPress={handleOpenCamera}>
					<Button.Title>Ler QR code</Button.Title>
				</Button>
			</View>

			<ModalQrCamera
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				couponIsFetching={couponIsFetching}
				handleUseCoupon={handleUseCoupon}
			/>
		</View>
	);
}
