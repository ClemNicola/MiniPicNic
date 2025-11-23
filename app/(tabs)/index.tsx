import { api } from "@/services/api";
import { Product } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { Dimensions, Text, View } from "react-native";
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

  const renderItem = ({ item }: { item: string }) => (
    <View className="flex-1 justify-center items-center bg-red-500">
      <Text className="text-2xl font-bold capitalize bg-blue-500">{item}</Text>
    </View>
  );

  return (
    <View id="home-carousel">
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
        }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        onProgressChange={progress}
        renderItem={renderItem}
      />
      <Text className="text-2xl font-bold bg-green-500">Hello World</Text>
    </View>
  );
}
