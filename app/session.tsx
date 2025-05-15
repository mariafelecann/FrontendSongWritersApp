import axios from "axios";
import { useRouter } from "expo-router";
import React from "react";
import { useStorageState } from "./useState";

const AuthContext = React.createContext<{
  signIn: (email: string, password: string) => Promise<void>;

  signOut: () => void;
  register: (email: string, password: string) => Promise<void>;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: async () => {},
  signOut: () => null,
  register: async () => {},
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const router = useRouter();
  return (
    <AuthContext.Provider
      value={{
        signIn: async (email: string, password: string) => {
          try {
            const response = await axios.post(
              "http://192.168.100.36:5000/auth/login",
              {
                email,
                password,
              }
            );

            if (response.status === 200) {
              const token = response.data?.token;
              const email = response.data?.email;
              console.info(JSON.stringify({ token, email }));
              await setSession(JSON.stringify({ token, email }));
            } else {
              console.log("Invalid credentials");
            }
          } catch (error) {
            console.log("Login failed:", error);
          }
        },

        signOut: async () => {
          if (session) {
            try {
              const { email } = JSON.parse(session);
              await axios.post("http://192.168.100.36:5000/auth/logout", {
                email,
              });
            } catch (err) {
              console.log("Logout error:", err);
            }
          }

          setSession(null);
          router.replace("/login");
        },

        register: async (email: string, password: string) => {
          try {
            const response = await axios.post(
              "http://192.168.100.36:5000/auth/register",
              {
                email,
                password,
              }
            );

            if (response.status === 201) {
              console.log("Registration successful");

              await setSession(JSON.stringify({ email }));
            } else if (response.status === 409) {
              console.log("Email already registered");
            } else {
              console.log("Registration failed");
            }
          } catch (error) {
            console.log("Registration failed:", error);
          }
        },

        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
