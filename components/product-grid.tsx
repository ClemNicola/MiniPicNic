import { Product } from "@/types";
import { useRouter } from "expo-router";
import { FlatList, Image, Pressable, Text, View } from "react-native";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const router = useRouter();

  const renderProduct = ({ item: product }: { item: Product }) => (
    <Pressable
      style={{ width: "48%" }}
      className="active:opacity-70 mb-4"
      onPress={() => router.push(`/product/${product.id}` as any)}
    >
      <View className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <View className="relative">
          <Image
            source={{ uri: product.image }}
            className="w-full aspect-square"
            resizeMode="cover"
          />
          <View className="absolute top-3 left-3 bg-green-100 px-2 py-1 rounded-full">
            <Text className="text-xs font-medium text-green-700 capitalize">
              Vertrouwde kwaliteit
            </Text>
          </View>
        </View>
        <View className="p-3">
          <Text
            className="text-sm font-medium text-gray-800 mb-1 leading-tight"
            numberOfLines={2}
          >
            {product.title}
          </Text>
          <Text className="text-xs text-gray-500 mb-2 capitalize">
            {product.category}
          </Text>
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-bold text-gray-900">
              €{product.price.toFixed(2)}
            </Text>
            <View className="bg-blue-600 rounded-full w-8 h-8 items-center justify-center">
              <Text className="text-white font-bold text-lg">→</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderProduct}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
    />
  );
}
