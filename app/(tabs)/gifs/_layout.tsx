import { Stack } from "expo-router";

export default function GifsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
      initialRouteName="index"
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
