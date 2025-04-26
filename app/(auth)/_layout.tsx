// import { AuthProvider } from "@/contexts/AuthContext";
// import { Stack } from "expo-router";

import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";
import { SessionProvider, useSession } from "../session";

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <Stack
//         screenOptions={{
//           headerShown: false,
//         }}
//       >
//         <Stack.Screen
//           name="(auth)/login"
//           options={{
//             title: "",
//           }}
//         />
//       </Stack>
//     </AuthProvider>
//   );
// }

// export const unstable_settings = {
//   initialRouteName: "login",
// };

export default function AuthLayout() {
  const { session, isLoading } = useSession();
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    console.info("not session in rute protejate");
    return <Redirect href="/login" />;
  }
  return (
    <SessionProvider>
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
    </SessionProvider>
  );
}
