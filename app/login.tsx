import { Button, StyleSheet, Text, TextInput, View } from "react-native";

import { router } from "expo-router";
import { useState } from "react";
import { useSession } from "./session";

export default function Login() {
  const { signIn } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (email: string, password: string) => {
    await signIn(email, password);
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome! 🌈 </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Login" onPress={() => handleLogin(email, password)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: "center",
  },

  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    margin: 10,
    borderRadius: 4,
  },
});
