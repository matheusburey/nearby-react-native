import { ActivityIndicator } from "react-native";

export default function Loading() {
	return (
		<ActivityIndicator
			color={"#257F49"}
			className="flex-1 items-center justify-center bg-gray-100"
		/>
	);
}
