import { Image } from "expo-image";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export function SplashScreenAnimate() {
  const screenWidth = Dimensions.get("window").width;
  const translateX = useSharedValue(-screenWidth);
  const opacity = useSharedValue(1);
  const [isVisible, setIsVisible] = useState(true);

  const hideSplash = () => {
    SplashScreen.hideAsync();
    setIsVisible(false);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    translateX.value = withSequence(
      withTiming(0, {
        duration: 600,
        easing: Easing.out(Easing.ease),
      }),

      withDelay(
        800,
        withTiming(
          screenWidth,
          {
            duration: 500,
            easing: Easing.in(Easing.ease),
          },
          (finished) => {
            if (finished) {
              opacity.value = withTiming(
                0,
                {
                  duration: 300,
                  easing: Easing.ease,
                },
                (fadeFinished) => {
                  if (fadeFinished) {
                    runOnJS(hideSplash)();
                  }
                }
              );
            }
          }
        )
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isVisible) {
    return null;
  }

  const backgroundColor = "#ffffff";

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Animated.View style={[styles.imageContainer, animatedStyle]}>
        <Image
          source={require("@/assets/icons/picnic.png")}
          style={styles.image}
          contentFit="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  imageContainer: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});
