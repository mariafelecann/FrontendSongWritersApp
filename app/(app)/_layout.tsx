import { useAuth } from "@/contexts/AuthContext";
import { Redirect, Stack } from "expo-router";
export const unstable_settings = {
  initialRouteName: "login",
};

export default function RootLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          title: "",
        }}
      />
    </Stack>
  );
}
