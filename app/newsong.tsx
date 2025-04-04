import { FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

SplashScreen.preventAutoHideAsync();

export default function NewSongScreen() {
  const [lyrics, setLyrics] = useState("");
  const lyricsInputRef = useRef<TextInput>(null);
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("C:/Users/maria/OneDrive/Desktop/LICENTA/frontend_licenta/my-app/assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("C:/Users/maria/OneDrive/Desktop/LICENTA/frontend_licenta/my-app/assets/fonts/Montserrat-SemiBold.ttf"),
  });
  useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const handleAnalyze = () => {
    console.log("Analyzing lyrics:", lyrics);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Craft Your Next Hit</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Lyrics:</Text>
            <TextInput
              ref={lyricsInputRef} // Attach the ref to the TextInput
              style={styles.lyricsInput}
              placeholder="Let your creativity flow..."
              multiline
              value={lyrics}
              onChangeText={setLyrics}
              textAlignVertical="top"
              placeholderTextColor="#b0bec5"
            />
          </View>

          <View style={styles.bottomBar}>
            <View style={styles.inspirationNote}>
              <Text style={styles.inspirationText}>
                Got your lyrics down? Prepare for{" "}
                <Text style={styles.inspirationHighlight}>
                  a glimpse into your song's sound :)
                </Text>{" "}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.analyzeButton}
              onPress={handleAnalyze}
            >
              <FontAwesome
                name="magic"
                size={20}
                color="#fff"
                style={styles.aiIcon}
              />
              <Text style={styles.analyzeButtonText}>Analyze</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 20,
    paddingTop: 60,
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 28,
    color: "#37474F",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    flex: 1,
  },
  inputLabel: {
    fontFamily: "Montserrat-Medium",
    fontSize: 16,
    color: "#546E7A",
    marginBottom: 8,
  },
  lyricsInput: {
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    flex: 1,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    textAlignVertical: "top",
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  analyzeButton: {
    backgroundColor: "#3f51b5",
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  analyzeButtonText: {
    fontFamily: "Montserrat-Medium",
    fontSize: 18,
    color: "white",
    marginLeft: 10,
  },
  aiIcon: {
    marginRight: 5,
  },
  inspirationNote: {
    flex: 1,
  },
  inspirationText: {
    fontFamily: "Caveat-Regular",
    fontSize: 20,
    color: "#78909C",
  },
  inspirationHighlight: {
    fontFamily: "Montserrat-SemiBold",
    color: "#2196F3",
  },
});
