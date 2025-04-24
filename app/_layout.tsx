// import { AuthProvider } from "@/contexts/AuthContext";
// import { Stack } from "expo-router";

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

import { AuthProvider } from "@/contexts/AuthContext";
import { Slot } from "expo-router";
export const unstable_settings = {
  initialRouteName: "login",
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
