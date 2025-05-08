import { Text, View, Pressable, FlatList } from "react-native";
import { twMerge } from "tailwind-merge";
import {
	Bed,
	Coffee,
	Film,
	ShoppingBag,
	Utensils,
	type LucideIcon,
} from "lucide-react-native";
import type { ICategoryData } from "@/app/home";

const categoriesIcons: Record<string, LucideIcon> = {
	"146b1a88-b3d3-4232-8b8f-c1f006f1e86d": Utensils,
	"52e81585-f71a-44cd-8bd0-49771e45da44": ShoppingBag,
	"57d6e5ff-35f6-4d21-a521-84f23d511d25": Bed,
	"826910d4-187d-4c15-88f4-382b7e056739": Film,
	"abce52cf-b33b-4b3c-8972-eb72c66c83e4": Coffee,
};

function Category({
	iconId,
	isSelected,
	name,
	onPress,
}: {
	iconId: string;
	isSelected?: boolean;
	name: string;
	onPress?: () => void;
}) {
	const Icon = categoriesIcons[iconId];
	const classNamePressable = isSelected
		? "bg-green-base border-green-base"
		: "bg-gray-100 border-gray-300";
	const classNameText = isSelected ? "text-gray-100" : "text-gray-500";
	return (
		<Pressable
			className={twMerge(
				"h-9 flex-row  border rounded-lg justify-center items-center gap-2 px-3",
				classNamePressable,
			)}
			onPress={onPress}
		>
			<Icon size={16} color={isSelected ? "#FCFDFE" : "#257F49"} />
			<Text className={twMerge("text-sm font-regular", classNameText)}>
				{name}
			</Text>
		</Pressable>
	);
}

interface ICategoriesProps {
	categories: ICategoryData[];
	categoryIdSelected: string;
	onCategorySelected: (categoryId: string) => void;
}

export default function Categories({
	categories,
	categoryIdSelected,
	onCategorySelected,
}: ICategoriesProps) {
	return (
		<FlatList
			className="max-h-9 absolute top-16"
			horizontal
			showsHorizontalScrollIndicator={false}
			data={categories}
			keyExtractor={(item) => item.id}
			contentContainerStyle={{ gap: 8, paddingHorizontal: 24 }}
			renderItem={({ item }) => (
				<Category
					isSelected={categoryIdSelected === item.id}
					onPress={() => onCategorySelected(item.id)}
					iconId={item.id}
					name={item.name}
				/>
			)}
		/>
	);
}
