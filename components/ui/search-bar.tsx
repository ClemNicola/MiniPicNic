import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";

export type SearchBarProps = {
  search: string;
  onSearch: (search: string) => void;
  onClear: () => void;
};

export function SearchBar({ search, onSearch, onClear }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      className={`flex-row items-center justify-between rounded-full px-4 py-2 border-2 ${
        isFocused ? "bg-white border-blue-500" : "bg-gray-100 border-gray-200"
      }`}
    >
      <Ionicons name="search" size={24} color="black" />
      <TextInput
        className="placeholder:text-gray-900 flex-1 px-4"
        placeholder="Search for a gif"
        value={search}
        onChangeText={onSearch}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {search.length > 0 && (
        <Pressable onPress={onClear}>
          <Ionicons name="close" size={24} color="black" />
        </Pressable>
      )}
    </View>
  );
}
