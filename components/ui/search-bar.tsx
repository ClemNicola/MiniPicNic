import { Ionicons } from "@expo/vector-icons";
import { Pressable, TextInput, View } from "react-native";

export type SearchBarProps = {
  search: string;
  onSearch: (search: string) => void;
};

export function SearchBar({ search, onSearch }: SearchBarProps) {
  return (
    <View className="flex-row items-center justify-between bg-white rounded-full px-4 py-2">
      <Pressable onPress={() => {}}>
        <Ionicons name="search" size={24} color="black" />
      </Pressable>
      <TextInput
        className="placeholder:text-gray-900 flex-1 px-4"
        placeholder="Search for a gif"
        value={search}
        onChangeText={onSearch}
      />
    </View>
  );
}
