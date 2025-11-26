import { GifCard } from "@/components/ui/gif-card";
import { SearchBar } from "@/components/ui/search-bar";
import { useDebounce } from "@/hooks/useDebounce";
import { api } from "@/services/api";
import { Gif, GiphyResponse, RandomGifResponse } from "@/types";
import { useVideoPlayer } from "expo-video";
import { useCallback, useEffect, useState } from "react";
import { Keyboard, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GifsIndexScreen() {
  const [searchValue, setSearchValue] = useState("");
  const [randomGif, setRandomGif] = useState<Gif>();
  const [gifs, setGifs] = useState<Gif[]>([]);

  const player = useVideoPlayer("", (player) => {
    player.loop = true;
  });

  const fetchRandomGif = async () => {
    try {
      const response = await api.get<RandomGifResponse>("random", {
        rating: "g",
      });
      if (response?.data) {
        setRandomGif(response.data as Gif);
      }
    } catch (error) {
      console.error("Error fetching random GIF:", error);
    }
  };

  const fetchGifs = useCallback(async (query: string) => {
    try {
      const response = await api.get<GiphyResponse>("search", {
        q: query,
        limit: 20,
      });
      if (!response?.data) return;
      setGifs(response.data);
    } catch (error) {
      console.error("Error fetching GIFs:", error);
    }
  }, []);

  const debouncedSearch = useDebounce(searchValue, 200);

  console.log("debouncedSearch", debouncedSearch);
  console.log("searchValue", searchValue);
  console.log("gifs", gifs);

  useEffect(() => {
    // fetchRandomGif();
    // const timer = setInterval(fetchRandomGif, 10000);
    // return () => clearInterval(timer);
    if (debouncedSearch.length >= 2) {
      fetchGifs(debouncedSearch);
    } else {
      setGifs([]);
    }
  }, [debouncedSearch, fetchGifs]);

  useEffect(() => {
    if (!randomGif?.images.fixed_width.mp4) return;

    player.replaceAsync(randomGif.images.fixed_width.mp4);
    player.play();
  }, [randomGif, player]);

  return (
    <SafeAreaView className="flex-1 px-4 bg-white">
      <Pressable
        className="flex-1"
        onPress={() => Keyboard.dismiss()}
        accessible={false}
      >
        <View className="mb-4">
          <SearchBar
            search={searchValue}
            onSearch={setSearchValue}
            onClear={() => setSearchValue("")}
          />
        </View>

        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-900 mb-3">
            Random selected GIF:
          </Text>

          {randomGif && <GifCard gif={randomGif} player={player} />}
        </View>
      </Pressable>
    </SafeAreaView>
  );
}
