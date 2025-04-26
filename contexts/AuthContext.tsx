// // import AsyncStorage from "@react-native-async-storage/async-storage";
// // import axios from "axios";
// // import { useRouter } from "expo-router";
// // import React, {
// //   createContext,
// //   ReactNode,
// //   useContext,
// //   useEffect,
// //   useState,
// // } from "react";
// // import { ActivityIndicator, View } from "react-native";

// // type AuthContextType = {
// //   user: string | null;
// //   signIn: (email: string, password: string) => Promise<void>;
// //   signOut: () => void;
// //   isLoading: boolean;
// //   isAuthenticated: boolean;
// // };

// // type AuthProviderProps = {
// //   children: ReactNode;
// // };

// // const AuthContext = createContext<AuthContextType>({
// //   user: null,
// //   signIn: async () => {},
// //   signOut: () => {},
// //   isLoading: true,
// //   isAuthenticated: false,
// // });

// // export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
// //   const [user, setUser] = useState<string | null>(null);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [isAuthenticated, setIsAuthenticated] = useState(false);
// //   const router = useRouter();

// //   useEffect(() => {
// //     const loadUser = async () => {
// //       const storedUser = await AsyncStorage.getItem("user");
// //       if (storedUser) {
// //         setUser(storedUser);
// //         setIsAuthenticated(true);
// //       }
// //       console.info("in load user fac ceva");
// //       setIsLoading(false);
// //     };
// //     loadUser();
// //   }, []);

// //   const signIn = async (email: string, password: string) => {
// //     try {
// //       const response = await axios.post(
// //         "http://192.168.100.36:5000/auth/login",
// //         {
// //           email,
// //           password,
// //         }
// //       );

// //       if (response.status === 200) {
// //         await AsyncStorage.setItem("user", email);
// //         setUser(email);
// //         setIsAuthenticated(true);
// //         router.replace("/");
// //       } else {
// //         console.log("Invalid credentials");
// //       }
// //     } catch (error) {
// //       console.log("Login failed:", error);
// //     }
// //   };

// //   const signOut = () => {
// //     AsyncStorage.removeItem("user");
// //     setUser(null);
// //     setIsAuthenticated(false);
// //   };
// //   if (isLoading) {
// //     return (
// //       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
// //         <ActivityIndicator size="large" />
// //       </View>
// //     );
// //   }

// //   return (
// //     <AuthContext.Provider
// //       value={{ user, signIn, signOut, isLoading, isAuthenticated }}
// //     >
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => useContext(AuthContext);
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import { useRouter } from "expo-router";
// import React, {
//   createContext,
//   ReactNode,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// type AuthContextType = {
//   user: string | null;
//   signIn: (email: string, password: string) => Promise<void>;
//   signOut: () => void;
//   isAuthenticated: boolean;
// };

// type AuthProviderProps = {
//   children: ReactNode;
// };

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   signIn: async () => {},
//   signOut: () => {},
//   isAuthenticated: false,
// });

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<string | null>(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const loadUser = async () => {
//       const storedUser = await AsyncStorage.getItem("user");
//       if (storedUser) {
//         setUser(storedUser);
//         setIsAuthenticated(true);
//       }
//     };
//     loadUser();
//   }, []);

//   // Sign in user
//   const signIn = async (email: string, password: string) => {
//     try {
//       const response = await axios.post(
//         "http://192.168.100.36:5000/auth/login",
//         {
//           email,
//           password,
//         }
//       );

//       if (response.status === 200) {
//         await AsyncStorage.setItem("user", email); // Store user in AsyncStorage
//         setUser(email);
//         setIsAuthenticated(true); // Mark as authenticated
//         router.replace("/"); // Navigate to the main screen
//       } else {
//         console.log("Invalid credentials");
//       }
//     } catch (error) {
//       console.log("Login failed:", error);
//     }
//   };

//   // Sign out user
//   const signOut = () => {
//     AsyncStorage.removeItem("user"); // Remove user from AsyncStorage
//     setUser(null);
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ user, signIn, signOut, isAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
