import { Modal, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

import { Button } from "@/components/Button";

interface ModalQrCameraProps {
	modalVisible: boolean;
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	couponIsFetching: boolean;
	handleUseCoupon: (data: string) => void;
}

export default function ModalQrCamera({
	modalVisible,
	setModalVisible,
	couponIsFetching,
	handleUseCoupon,
}: ModalQrCameraProps) {
	return (
		<Modal className="flex-1" visible={modalVisible}>
			<CameraView
				style={{ flex: 1 }}
				facing="back"
				onBarcodeScanned={({ data }) => handleUseCoupon(data)}
			/>
			<View className="absolute bottom-8 left-8 right-8">
				<Button
					onPress={() => setModalVisible(false)}
					isLoading={couponIsFetching}
				>
					<Button.Title>Voltar</Button.Title>
				</Button>
			</View>
		</Modal>
	);
}
