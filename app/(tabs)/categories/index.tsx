import { api } from "@/services/api";
import { Product } from "@/types";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CategoriesIndexScreen() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await api.getProducts();
      setProducts(response);
    } catch (error) {
      console.error(error);
    }
  };

  const uniqueCategories = useMemo(
    () => [...new Set(products.map((product) => product.category))],
    [products]
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  const getRandomImageUrl = (category: string) => {
    const seed = category
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return `https://picsum.photos/seed/${seed}/400/258`;
  };

  return (
    <SafeAreaView>
      <ScrollView className="px-4">
        <View>
          <Text className="text-4xl font-bold mb-4 text-gray-900">
            See all categories
          </Text>
        </View>
        {uniqueCategories.map((category) => (
          <Pressable
            key={category}
            className="mb-4 active:opacity-70"
            onPress={() => router.push(`/categories/${category}`)}
          >
            <View
              className="relative rounded-3xl overflow-hidden"
              style={{ height: 250 }}
            >
              <Image
                source={{ uri: getRandomImageUrl(category) }}
                className="w-full h-full"
                resizeMode="cover"
              />
              <View className="absolute inset-0 bg-black/30 justify-center items-center">
                <Text className="text-xl font-bold capitalize text-white">
                  {category}
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
