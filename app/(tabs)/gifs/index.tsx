import { SearchBar } from "@/components/ui/search-bar";
import { api } from "@/services/api";
import { Gif } from "@/types";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GifsIndexScreen() {
  const [search, setSearch] = useState("");
  const [randomGif, setRandomGif] = useState<Gif>();

  const fetchRandomGifs = async () => {
    try {
      const response = await api.getRandomGif(1);
      setRandomGif(response.data[0] as Gif);
    } catch (error) {
      console.error(error);
    }
  };

  const player = useVideoPlayer("", (player) => {
    player.loop = true;
  });

  useEffect(() => {
    fetchRandomGifs();
  }, []);

  useEffect(() => {
    if (randomGif?.images.fixed_width.mp4) {
      player.replace(randomGif.images.fixed_width.mp4);
      player.play();
    }
  }, [randomGif, player]);

  return (
    <SafeAreaView className="px-4">
      <View>
        <SearchBar search={search} onSearch={setSearch} />
      </View>
      <View className="py-4">
        <Text className="text-base font-semibold text-gray-900">
          Random Selected Gifs:
        </Text>
        {randomGif && (
          <VideoView
            player={player}
            style={{
              height: Number(randomGif.images.fixed_width.height),
              width: Number(randomGif.images.fixed_width.width),
            }}
            contentFit="contain"
            nativeControls={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
