import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="history"
        options={{
          title: "Song History",
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "Your Profile",
        }}
      />
    </Tabs>
  );
}
