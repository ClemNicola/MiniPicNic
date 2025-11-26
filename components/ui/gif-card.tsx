import { Gif } from "@/types";
import type { VideoPlayer } from "expo-video";
import { VideoView } from "expo-video";
import { Text, View } from "react-native";

export type GifCardProps = {
  gif: Gif;
  player: VideoPlayer;
};

export function GifCard({ gif, player }: GifCardProps) {
  return (
    <>
      <View className="bg-gray-100 rounded-lg aspect-square items-center justify-center overflow-hidden">
        {gif && (
          <VideoView
            player={player}
            style={{
              height: "100%",
              width: "100%",
            }}
            contentFit="cover"
            nativeControls={false}
          />
        )}
      </View>

      <View className="mt-4 flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-base text-gray-900 mb-1">{gif?.title}</Text>
          <Text className="text-sm text-blue-600">{gif?.url}</Text>
        </View>

        {/* remplacer cette view par un component rating */}
        {gif?.rating && gif.rating !== "g" && (
          <View className="bg-gray-600 rounded-full h-16 w-16 items-center justify-center ml-4">
            <Text className="text-white text-xl font-bold">
              {gif.rating.toUpperCase()}+
            </Text>
          </View>
        )}
      </View>
    </>
  );
}
