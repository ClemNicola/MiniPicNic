import ProductGrid from "@/components/product-grid";
import { api } from "@/services/api";
import { Product } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

export default function HomeScreen() {
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

  const progress = useSharedValue(0);

  const getRandomImageUrl = (category: string) => {
    // Generate a consistent seed based on category name
    const seed = category
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return `https://picsum.photos/seed/${seed}/400/258`;
  };

  const renderItem = ({ item }: { item: string }) => (
    <View className="flex-1 justify-center items-center overflow-hidden rounded-3xl mx-2">
      <Image
        source={{ uri: getRandomImageUrl(item) }}
        className="w-full h-full"
        resizeMode="cover"
      />
      <View className="absolute inset-0 bg-black/30 justify-center items-center">
        <Text className="text-2xl font-bold capitalize text-white">{item}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView>
      <View id="home-carousel" className=" pt-12 pb-6">
        <Carousel
          autoPlayInterval={2000}
          data={uniqueCategories}
          height={258}
          loop={true}
          pagingEnabled={true}
          snapEnabled={true}
          width={Dimensions.get("window").width}
          style={{
            width: Dimensions.get("window").width,
            borderRadius: 24,
          }}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          onProgressChange={progress}
          renderItem={renderItem}
        />
      </View>
      <View className="px-4 mb-4">
        <Text className="text-2xl font-bold mb-4 text-gray-900">
          Our Products
        </Text>
        <ProductGrid products={products} />
      </View>
    </ScrollView>
  );
}
