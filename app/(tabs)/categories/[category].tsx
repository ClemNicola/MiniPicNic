import ProductGrid from "@/components/product-grid";
import { api } from "@/services/api";
import { Product } from "@/types";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

export default function CategoryDetailScreen() {
  const { category } = useLocalSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isImageScrolledOut, setIsImageScrolledOut] = useState(false);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await api.getProductsByCategory(category as string);
        setProducts(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductsByCategory();
  }, [category]);

  const getRandomImageUrl = (category: string) => {
    const seed = category
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return `https://picsum.photos/seed/${seed}/400/258`;
  };

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const imageHeight = 400;
    setIsImageScrolledOut(scrollY > imageHeight - 100);
  };

  return (
    <View className="flex-1">
      <Pressable
        onPress={() => router.back()}
        className={`absolute bg-white z-10 ${
          isImageScrolledOut
            ? "top-0 left-0 w-full pt-20 pb-6 px-4 flex-row items-center gap-2"
            : "top-14 left-6 w-16 h-16 items-center justify-center rounded-full"
        }`}
        style={{ position: "absolute" }}
      >
        <Text className="text-2xl font-bold text-gray-900">←</Text>
        {isImageScrolledOut && (
          <Text className="text-lg font-semibold text-gray-900 capitalize">
            {category}
          </Text>
        )}
      </Pressable>
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        <View className="relative overflow-hidden" style={{ height: 400 }}>
          <Image
            source={{ uri: getRandomImageUrl(category as string) }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
        <View className="p-4">
          <Text className="text-2xl font-bold capitalize text-gray-900">
            {category}
          </Text>
        </View>

        <View className="p-4">
          <ProductGrid products={products} />
        </View>
      </ScrollView>
    </View>
  );
}
