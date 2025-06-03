// import {
//   Button,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// import { useRouter } from "expo-router";
// import { useState } from "react";
// import { useSession } from "./session";

// export default function Login() {
//   const { signIn } = useSession();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();
//   const handleLogin = async (email: string, password: string) => {
//     await signIn(email, password);
//     router.replace("/");
//   };

//   const handleRegisterButton = () => {
//     router.push({
//       pathname: "/statistics",
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome back! </Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />

//       <Button title="Login" onPress={() => handleLogin(email, password)} />
//       <Text>Don't have an acccount? Don't worry! You can register here:</Text>
//       <TouchableOpacity onPress={handleRegisterButton}>
//         <Text>Register</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     textAlign: "center",
//   },

//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: "80%",
//   },
//   input: {
//     width: "80%",
//     borderWidth: 1,
//     borderColor: "#000",
//     padding: 10,
//     margin: 10,
//     borderRadius: 4,
//   },
// });
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { useRouter } from "expo-router";
import { useState } from "react";
import { useSession } from "./session";

export default function Login() {
  const { signIn } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    const response = await signIn(email, password);
    console.info(response);
    if (response) router.replace("/");
    else Alert.alert("Login nereușit!");
  };

  const handleRegisterButton = () => {
    router.push({
      pathname: "/register",
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Bine ai revenit! 🎶</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#999"
        />

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => handleLogin(email, password)}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.registerText}>Nu ai un cont?</Text>

        <TouchableOpacity onPress={handleRegisterButton}>
          <Text style={styles.registerLink}>Înregistrează-te aici</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 30,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#4a90e2",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 25,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  registerText: {
    fontSize: 16,
    color: "#666",
  },
  registerLink: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4a90e2",
    marginTop: 5,
  },
});
