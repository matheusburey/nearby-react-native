import { twMerge } from "tailwind-merge";

import type { TouchableOpacityProps, TextProps } from "react-native";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import type { LucideIcon } from "lucide-react-native";

interface ButtonProps extends TouchableOpacityProps {
	isLoading?: boolean;
}

function Button({ children, className, isLoading, ...rest }: ButtonProps) {
	return (
		<TouchableOpacity
			className={twMerge(
				"h-14 flex-row gap-4 bg-green-base rounded-lg items-center justify-center",
				className,
			)}
			disabled={isLoading}
			activeOpacity={0.8}
			{...rest}
		>
			{isLoading ? (
				<ActivityIndicator size="small" color="#FCFDFE" />
			) : (
				children
			)}
		</TouchableOpacity>
	);
}

function Title({ children }: TextProps) {
	return (
		<Text className="text-base font-semiBold text-gray-100">{children}</Text>
	);
}

interface IconProps {
	icon: LucideIcon;
}

function Icon({ icon: Icon }: IconProps) {
	return <Icon size={24} color="#FCFDFE" />;
}

Button.Title = Title;
Button.Icon = Icon;

export { Button };
