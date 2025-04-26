import { useSession } from "@/app/session";
import { Button, StyleSheet, Text, View } from "react-native";

export default function UserScreen() {
  const { signOut } = useSession();
  const handleLogOut = async () => {
    await signOut();
  };
  return (
    <View style={styles.container}>
      <Text>User Profile</Text>
      <Button title="Logout" onPress={handleLogOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
